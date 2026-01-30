# Update destination images with new unique images

$brainPath = "C:\Users\Merse\.gemini\antigravity\brain\7622d3b0-0d60-4808-b368-871e510201e3"
$destPath = "c:\Users\Merse\OneDrive\Desktop\glorious-travel\public\images\destinations"

# Copy new images
Write-Host "Copying Albania image..." -ForegroundColor Cyan
Copy-Item "$brainPath\albania_destination_1769697486726.png" "$destPath\albania.jpg" -Force

Write-Host "Copying Bulgaria image..." -ForegroundColor Cyan
Copy-Item "$brainPath\bulgaria_destination_1769697550646.png" "$destPath\bulgaria.jpg" -Force

Write-Host "Copying Croatia image..." -ForegroundColor Cyan
Copy-Item "$brainPath\croatia_destination_1769697637293.png" "$destPath\croatia.jpg" -Force

Write-Host "Copying Cyprus image..." -ForegroundColor Cyan
Copy-Item "$brainPath\cyprus_destination_1769697834971.png" "$destPath\cyprus.jpg" -Force

Write-Host "Copying Greece image..." -ForegroundColor Cyan
Copy-Item "$brainPath\greece_destination_1769698059369.png" "$destPath\greece.jpg" -Force

Write-Host "Copying Montenegro image..." -ForegroundColor Cyan
Copy-Item "$brainPath\montenegro_destination_1769698297163.png" "$destPath\montenegro.jpg" -Force

Write-Host "`nAll images updated successfully!" -ForegroundColor Green
Write-Host "Updated countries: Albania, Bulgaria, Croatia, Cyprus, Greece, Montenegro" -ForegroundColor Yellow
