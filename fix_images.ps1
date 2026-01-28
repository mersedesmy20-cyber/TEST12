$src_greece = "public\images\destinations\greece.jpg"
if (-not (Test-Path $src_greece)) { Copy-Item "public\images\destinations\spain.jpg" $src_greece -Force }

Copy-Item $src_greece public\images\destinations\albania.jpg -Force
Copy-Item $src_greece public\images\destinations\bulgaria.jpg -Force
Copy-Item $src_greece public\images\destinations\cyprus.jpg -Force
Copy-Item $src_greece public\images\destinations\montenegro.jpg -Force
Copy-Item $src_greece public\images\destinations\croatia.jpg -Force

$src_france = "public\images\destinations\france.jpg"
if (-not (Test-Path $src_france)) { Copy-Item "public\images\destinations\italy.jpg" $src_france -Force }
Copy-Item $src_france public\images\destinations\czechia.jpg -Force

$src_mexico = "public\images\destinations\mexico.jpg"
Copy-Item $src_mexico public\images\destinations\cuba.jpg -Force
Copy-Item $src_mexico public\images\destinations\dominican.jpg -Force

$src_egypt = "public\images\destinations\egypt.jpg"
Copy-Item $src_egypt public\images\destinations\tunisia.jpg -Force

$src_thailand = "public\images\destinations\thailand.jpg"
Copy-Item $src_thailand public\images\destinations\srilanka.jpg -Force

$src_maldives = "public\images\destinations\maldives.jpg"
Copy-Item $src_maldives public\images\destinations\zanzibar.jpg -Force
