<#
Herramientas para pasar fotos HEIC de cartas a PNG recortado con fondo
transparente. Requiere Windows con la extension HEIF instalada.

Modo "preview" (paso 1): genera PNG de cada foto con una rejilla de
referencia en porcentajes, para poder marcar a ojo las 4 esquinas de cada
carta.

  powershell -File tools/procesar-cartas.ps1 -Mode preview -SourceDir images -OutDir images/_preview

Modo "polygon" (paso 2): usando un JSON con las 4 esquinas de cada carta
(en fracciones 0-1 del ancho/alto), recorta cada carta a ese cuadrilatero y
deja transparente todo lo de fuera.

  powershell -File tools/procesar-cartas.ps1 -Mode polygon -SourceDir images -OutDir images/cards -CornersFile tools/esquinas.json

Formato de tools/esquinas.json:
[
  { "file": "IMG_0422.HEIC", "out": "carta-01.png", "corners": [[0.30,0.30],[0.78,0.27],[0.82,0.85],[0.34,0.88]] }
]
Las esquinas van en orden: superior-izq, superior-der, inferior-der, inferior-izq.

Modo "whitebg": para fotos JPG ya tomadas sobre fondo blanco/claro y
uniforme (sin necesidad de marcar esquinas a mano). Detecta el fondo
automaticamente por color, recorta ajustado a la carta y deja el fondo en
blanco solido (no transparente).

  powershell -File tools/procesar-cartas.ps1 -Mode whitebg -SourceDir Pictures -OutDir images/cards -Pattern *.JPG -MaxSize 900

Modo "grid": junta varias imagenes ya procesadas en una hoja de contacto
con numeros, para poder revisar/leer muchas cartas de un vistazo.

  powershell -File tools/procesar-cartas.ps1 -Mode grid -SourceDir images/cards -OutDir images/_grids -Pattern *.png
#>
param(
  [ValidateSet("preview", "polygon", "whitebg", "grid")]
  [string]$Mode = "preview",
  [string]$SourceDir = "images",
  [string]$OutDir = "images/_preview",
  [int]$MaxSize = 1100,
  [int]$Threshold = 30,
  [string]$Pattern = "IMG_*.HEIC",
  [string]$CornersFile = "tools/esquinas.json",
  [int]$GridCols = 5,
  [int]$GridRows = 4
)

$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Runtime.WindowsRuntime
Add-Type -AssemblyName System.Drawing

[Windows.Storage.StorageFile,Windows.Storage,ContentType=WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder,Windows.Graphics.Imaging,ContentType=WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapTransform,Windows.Graphics.Imaging,ContentType=WindowsRuntime] | Out-Null

Function Await($WinRtTask, $ResultType) {
  $asTask = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
    $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1'
  })[0]
  $asTaskGeneric = $asTask.MakeGenericMethod($ResultType)
  $netTask = $asTaskGeneric.Invoke($null, @($WinRtTask))
  $netTask.Wait(-1) | Out-Null
  $netTask.Result
}

function Convert-HeicToBitmap($path, $maxSize) {
  $file = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($path)) ([Windows.Storage.StorageFile])
  $stream = Await ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
  $decoder = Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])

  $w = $decoder.PixelWidth
  $h = $decoder.PixelHeight
  $scale = [Math]::Min(1.0, $maxSize / [Math]::Max($w, $h))
  $tw = [Math]::Max(1, [int]($w * $scale))
  $th = [Math]::Max(1, [int]($h * $scale))

  $transform = New-Object Windows.Graphics.Imaging.BitmapTransform
  $transform.ScaledWidth = $tw
  $transform.ScaledHeight = $th
  $transform.InterpolationMode = [Windows.Graphics.Imaging.BitmapInterpolationMode]::Fant

  $softwareBitmap = Await ($decoder.GetSoftwareBitmapAsync(
      [Windows.Graphics.Imaging.BitmapPixelFormat]::Bgra8,
      [Windows.Graphics.Imaging.BitmapAlphaMode]::Ignore,
      $transform,
      [Windows.Graphics.Imaging.ExifOrientationMode]::RespectExifOrientation,
      [Windows.Graphics.Imaging.ColorManagementMode]::DoNotColorManage
    )) ([Windows.Graphics.Imaging.SoftwareBitmap])

  $bw = $softwareBitmap.PixelWidth
  $bh = $softwareBitmap.PixelHeight

  $buffer = New-Object byte[] ($bw * $bh * 4)
  $winrtBuffer = [System.Runtime.InteropServices.WindowsRuntime.WindowsRuntimeBufferExtensions]::AsBuffer($buffer)
  $softwareBitmap.CopyToBuffer($winrtBuffer)

  $bmp = New-Object System.Drawing.Bitmap($bw, $bh, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $rect = New-Object System.Drawing.Rectangle(0, 0, $bw, $bh)
  $bmpData = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::WriteOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  [System.Runtime.InteropServices.Marshal]::Copy($buffer, 0, $bmpData.Scan0, $buffer.Length)
  $bmp.UnlockBits($bmpData)

  $stream.Dispose()
  return $bmp
}

function Add-Grid($bmp) {
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(160, 255, 40, 40), 2)
  $font = New-Object System.Drawing.Font("Consolas", 16, [System.Drawing.FontStyle]::Bold)
  $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(220, 255, 255, 0))
  $shadowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(220, 0, 0, 0))

  for ($p = 10; $p -lt 100; $p += 10) {
    $x = [int]($bmp.Width * $p / 100)
    $y = [int]($bmp.Height * $p / 100)
    $g.DrawLine($pen, $x, 0, $x, $bmp.Height)
    $g.DrawLine($pen, 0, $y, $bmp.Width, $y)
    $g.DrawString("$p", $font, $shadowBrush, [float]($x + 3), 3)
    $g.DrawString("$p", $font, $brush, [float]($x + 2), 2)
    $g.DrawString("$p", $font, $shadowBrush, 3, [float]($y + 3))
    $g.DrawString("$p", $font, $brush, 2, [float]($y + 2))
  }
  $g.Dispose()
}

function Invoke-PolygonCrop($bmp, $pointsFrac, [double]$shrink = 0.035) {
  $w = $bmp.Width
  $h = $bmp.Height

  $cx = (($pointsFrac | ForEach-Object { $_[0] }) | Measure-Object -Average).Average
  $cy = (($pointsFrac | ForEach-Object { $_[1] }) | Measure-Object -Average).Average

  $pts = $pointsFrac | ForEach-Object {
    $fx = $_[0] - ($_[0] - $cx) * $shrink
    $fy = $_[1] - ($_[1] - $cy) * $shrink
    New-Object System.Drawing.PointF(([float]($fx * $w)), ([float]($fy * $h)))
  }

  $mask = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($mask)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.Clear([System.Drawing.Color]::Black)
  $whiteBrush = [System.Drawing.Brushes]::White
  $g.FillPolygon($whiteBrush, $pts)
  $g.Dispose()

  $rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
  $bmpData = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $maskData = $mask.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $stride = $bmpData.Stride
  $bytes = New-Object byte[] ($stride * $h)
  $maskBytes = New-Object byte[] ($stride * $h)
  [System.Runtime.InteropServices.Marshal]::Copy($bmpData.Scan0, $bytes, 0, $bytes.Length)
  [System.Runtime.InteropServices.Marshal]::Copy($maskData.Scan0, $maskBytes, 0, $maskBytes.Length)

  for ($i = 0; $i -lt $bytes.Length; $i += 4) {
    $bytes[$i + 3] = $maskBytes[$i]
  }

  [System.Runtime.InteropServices.Marshal]::Copy($bytes, 0, $bmpData.Scan0, $bytes.Length)
  $bmp.UnlockBits($bmpData)
  $mask.UnlockBits($maskData)
  $mask.Dispose()

  $xs = $pts | ForEach-Object { $_.X }
  $ys = $pts | ForEach-Object { $_.Y }
  $pad = 8
  $minX = [Math]::Max(0, ([int]($xs | Measure-Object -Minimum).Minimum) - $pad)
  $minY = [Math]::Max(0, ([int]($ys | Measure-Object -Minimum).Minimum) - $pad)
  $maxX = [Math]::Min($w - 1, ([int]($xs | Measure-Object -Maximum).Maximum) + $pad)
  $maxY = [Math]::Min($h - 1, ([int]($ys | Measure-Object -Maximum).Maximum) + $pad)

  return New-Object System.Drawing.Rectangle($minX, $minY, ($maxX - $minX + 1), ($maxY - $minY + 1))
}

function Import-JpegBitmap($path, $maxSize) {
  $orig = [System.Drawing.Image]::FromFile($path)

  if ([Array]::IndexOf($orig.PropertyIdList, 274) -ge 0) {
    $orientation = $orig.GetPropertyItem(274).Value[0]
    switch ($orientation) {
      3 { $orig.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipNone) }
      6 { $orig.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone) }
      8 { $orig.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone) }
    }
  }

  $scale = [Math]::Min(1.0, $maxSize / [Math]::Max($orig.Width, $orig.Height))
  $tw = [Math]::Max(1, [int]($orig.Width * $scale))
  $th = [Math]::Max(1, [int]($orig.Height * $scale))

  $bmp = New-Object System.Drawing.Bitmap($tw, $th, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($orig, 0, 0, $tw, $th)
  $g.Dispose()
  $orig.Dispose()
  return $bmp
}

function ConvertTo-WhiteBackground($bmp, [int]$threshold) {
  $w = $bmp.Width
  $h = $bmp.Height
  $rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
  $data = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $stride = $data.Stride
  $bytes = New-Object byte[] ($stride * $h)
  [System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $bytes.Length)

  $sampleSize = 14
  $sum = @(0.0, 0.0, 0.0)
  $count = 0
  $corners = @(
    @(0, 0), @(($w - $sampleSize), 0), @(0, ($h - $sampleSize)), @(($w - $sampleSize), ($h - $sampleSize))
  )
  foreach ($c in $corners) {
    $cx = [Math]::Max(0, $c[0]); $cy = [Math]::Max(0, $c[1])
    for ($y = $cy; $y -lt [Math]::Min($h, $cy + $sampleSize); $y++) {
      $rowOff = $y * $stride
      for ($x = $cx; $x -lt [Math]::Min($w, $cx + $sampleSize); $x++) {
        $off = $rowOff + $x * 4
        $sum[0] += $bytes[$off]
        $sum[1] += $bytes[$off + 1]
        $sum[2] += $bytes[$off + 2]
        $count++
      }
    }
  }
  $bgB = $sum[0] / $count
  $bgG = $sum[1] / $count
  $bgR = $sum[2] / $count

  $softBand = $threshold * 1.8
  $minX = $w; $minY = $h; $maxX = 0; $maxY = 0

  for ($y = 0; $y -lt $h; $y++) {
    $rowOff = $y * $stride
    for ($x = 0; $x -lt $w; $x++) {
      $off = $rowOff + $x * 4
      $b = $bytes[$off]; $g2 = $bytes[$off + 1]; $r = $bytes[$off + 2]
      $db = $b - $bgB; $dg = $g2 - $bgG; $dr = $r - $bgR
      $dist = [Math]::Sqrt($db * $db + $dg * $dg + $dr * $dr)

      if ($dist -lt $threshold) {
        $bytes[$off] = 255; $bytes[$off + 1] = 255; $bytes[$off + 2] = 255
      }
      elseif ($dist -lt $softBand) {
        $t = ($dist - $threshold) / ($softBand - $threshold)
        $bytes[$off] = [byte](255 - (255 - $b) * $t)
        $bytes[$off + 1] = [byte](255 - (255 - $g2) * $t)
        $bytes[$off + 2] = [byte](255 - (255 - $r) * $t)
      }

      $bytes[$off + 3] = 255

      if ($dist -ge $threshold) {
        if ($x -lt $minX) { $minX = $x }
        if ($x -gt $maxX) { $maxX = $x }
        if ($y -lt $minY) { $minY = $y }
        if ($y -gt $maxY) { $maxY = $y }
      }
    }
  }

  [System.Runtime.InteropServices.Marshal]::Copy($bytes, 0, $data.Scan0, $bytes.Length)
  $bmp.UnlockBits($data)

  $pad = 10
  $minX = [Math]::Max(0, $minX - $pad)
  $minY = [Math]::Max(0, $minY - $pad)
  $maxX = [Math]::Min($w - 1, $maxX + $pad)
  $maxY = [Math]::Min($h - 1, $maxY + $pad)

  return New-Object System.Drawing.Rectangle($minX, $minY, ($maxX - $minX + 1), ($maxY - $minY + 1))
}

function New-ContactSheet($files, $outPath, [int]$cols, [int]$rows, [int]$cellSize) {
  $perSheet = $cols * $rows
  $sheetIndex = 0
  for ($start = 0; $start -lt $files.Count; $start += $perSheet) {
    $sheetIndex++
    $batch = $files[$start..[Math]::Min($start + $perSheet - 1, $files.Count - 1)]

    $sheet = New-Object System.Drawing.Bitmap(($cols * $cellSize), ($rows * $cellSize), [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($sheet)
    $g.Clear([System.Drawing.Color]::White)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $font = New-Object System.Drawing.Font("Consolas", 14, [System.Drawing.FontStyle]::Bold)
    $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::Red)
    $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::LightGray, 1)

    for ($i = 0; $i -lt $batch.Count; $i++) {
      $col = $i % $cols
      $row = [Math]::Floor($i / $cols)
      $cx = $col * $cellSize
      $cy = $row * $cellSize

      $img = [System.Drawing.Image]::FromFile($batch[$i].FullName)
      $scale = [Math]::Min(($cellSize - 6) / $img.Width, ($cellSize - 26) / $img.Height)
      $dw = [int]($img.Width * $scale)
      $dh = [int]($img.Height * $scale)
      $dx = $cx + [int](($cellSize - $dw) / 2)
      $dy = $cy + 20
      $g.DrawImage($img, $dx, $dy, $dw, $dh)
      $img.Dispose()

      $g.DrawRectangle($pen, $cx, $cy, $cellSize, $cellSize)
      $label = "$($start + $i + 1)"
      $g.DrawString($label, $font, $brush, ($cx + 4), ($cy + 2))
    }

    $g.Dispose()
    $sheetOut = $outPath -replace '\.png$', "-$sheetIndex.png"
    $sheet.Save($sheetOut, [System.Drawing.Imaging.ImageFormat]::Png)
    $sheet.Dispose()
    Write-Output "Hoja $sheetIndex -> $sheetOut ($($batch.Count) cartas)"
  }
}

New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

if ($Mode -eq "preview") {
  $files = Get-ChildItem -Path $SourceDir -Filter $Pattern | Sort-Object Name
  $i = 0
  foreach ($f in $files) {
    $i++
    $num = "{0:D2}" -f $i
    $outPath = Join-Path $OutDir "preview-$num.png"
    Write-Output "$($f.Name) -> $outPath"
    $bmp = Convert-HeicToBitmap $f.FullName $MaxSize
    Add-Grid $bmp
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
  }
  Write-Output "Listo: $i previews en $OutDir"
}
elseif ($Mode -eq "polygon") {
  $entries = Get-Content $CornersFile -Raw | ConvertFrom-Json
  foreach ($e in $entries) {
    $srcPath = (Resolve-Path (Join-Path $SourceDir $e.file)).Path
    $outPath = Join-Path $OutDir $e.out
    Write-Output "$($e.file) -> $outPath"
    $bmp = Convert-HeicToBitmap $srcPath $MaxSize
    $cropRect = Invoke-PolygonCrop $bmp $e.corners
    $cropped = $bmp.Clone($cropRect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $bmp.Dispose()
    $cropped.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
  }
  Write-Output "Listo: $($entries.Count) cartas procesadas en $OutDir"
}
elseif ($Mode -eq "whitebg") {
  $files = Get-ChildItem -Path $SourceDir -Filter $Pattern | Sort-Object Name
  $i = 0
  foreach ($f in $files) {
    $i++
    $num = "{0:D3}" -f $i
    $outPath = Join-Path $OutDir "mgk-$num.png"
    Write-Output "$($f.Name) -> $outPath"
    $bmp = Import-JpegBitmap $f.FullName $MaxSize
    $cropRect = ConvertTo-WhiteBackground $bmp $Threshold
    $cropped = $bmp.Clone($cropRect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $bmp.Dispose()
    $cropped.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
  }
  Write-Output "Listo: $i cartas procesadas en $OutDir"
}
elseif ($Mode -eq "grid") {
  $files = Get-ChildItem -Path $SourceDir -Filter $Pattern | Sort-Object Name
  $outPath = Join-Path $OutDir "grid.png"
  New-ContactSheet $files $outPath $GridCols $GridRows 260
}
