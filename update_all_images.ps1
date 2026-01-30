# Update ALL destination images with new unique AI-generated images
# Generated: 2026-01-30

$brainPath = "C:\Users\Merse\.gemini\antigravity\brain\e630a1e1-e37e-4a96-af9f-f2ec2c38c08b"
$destPath = "c:\Users\Merse\OneDrive\Desktop\glorious-travel\public\images\destinations"

Write-Host "`nStarting image update process..." -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor DarkGray

# Previously generated images (from earlier session)
$oldBrainPath = "C:\Users\Merse\.gemini\antigravity\brain\7622d3b0-0d60-4808-b368-871e510201e3"

Write-Host "`nCopying images from previous session..." -ForegroundColor Yellow

Write-Host "  → Albania" -ForegroundColor Green
Copy-Item "$oldBrainPath\albania_destination_1769697486726.png" "$destPath\albania.jpg" -Force

Write-Host "  → Bulgaria" -ForegroundColor Green
Copy-Item "$oldBrainPath\bulgaria_destination_1769697550646.png" "$destPath\bulgaria.jpg" -Force

Write-Host "  → Croatia" -ForegroundColor Green
Copy-Item "$oldBrainPath\croatia_destination_1769697637293.png" "$destPath\croatia.jpg" -Force

Write-Host "  → Cyprus" -ForegroundColor Green
Copy-Item "$oldBrainPath\cyprus_destination_1769697834971.png" "$destPath\cyprus.jpg" -Force

Write-Host "  → Greece" -ForegroundColor Green
Copy-Item "$oldBrainPath\greece_destination_1769698059369.png" "$destPath\greece.jpg" -Force

Write-Host "  → Montenegro" -ForegroundColor Green
Copy-Item "$oldBrainPath\montenegro_destination_1769698297163.png" "$destPath\montenegro.jpg" -Force

Write-Host "`nCopying NEW images from current session..." -ForegroundColor Yellow

Write-Host "  → Turkey" -ForegroundColor Green
Copy-Item "$brainPath\turkey_destination_1769756583495.png" "$destPath\turkey.jpg" -Force

Write-Host "  → Spain" -ForegroundColor Green
Copy-Item "$brainPath\spain_destination_1769756657146.png" "$destPath\spain.jpg" -Force

Write-Host "  → Thailand" -ForegroundColor Green
Copy-Item "$brainPath\thailand_destination_1769756693570.png" "$destPath\thailand.jpg" -Force

Write-Host "  → Maldives" -ForegroundColor Green
Copy-Item "$brainPath\maldives_destination_1769756723149.png" "$destPath\maldives.jpg" -Force

Write-Host "  → Egypt" -ForegroundColor Green
Copy-Item "$brainPath\egypt_destination_1769756747702.png" "$destPath\egypt.jpg" -Force

Write-Host "  → Dominican Republic" -ForegroundColor Green
Copy-Item "$brainPath\dominican_destination_1769756768717.png" "$destPath\dominican.jpg" -Force

Write-Host "  → Indonesia (Bali)" -ForegroundColor Green
Copy-Item "$brainPath\indonesia_destination_1769756815603.png" "$destPath\indonesia.jpg" -Force

Write-Host "  → Vietnam" -ForegroundColor Green
Copy-Item "$brainPath\vietnam_destination_1769756837094.png" "$destPath\vietnam.jpg" -Force

Write-Host "  → Sri Lanka" -ForegroundColor Green
Copy-Item "$brainPath\srilanka_destination_1769756902125.png" "$destPath\srilanka.jpg" -Force

Write-Host "  → Georgia" -ForegroundColor Green
Copy-Item "$brainPath\georgia_destination_1769756921638.png" "$destPath\georgia.jpg" -Force

Write-Host "  → Tunisia" -ForegroundColor Green
Copy-Item "$brainPath\tunisia_destination_1769757003261.png" "$destPath\tunisia.jpg" -Force

Write-Host "  → Zanzibar" -ForegroundColor Green
Copy-Item "$brainPath\zanzibar_destination_1769757064021.png" "$destPath\zanzibar.jpg" -Force

Write-Host "  → Kenya" -ForegroundColor Green
Copy-Item "$brainPath\kenya_destination_1769757101524.png" "$destPath\kenya.jpg" -Force

Write-Host "  → Mexico" -ForegroundColor Green
Copy-Item "$brainPath\mexico_destination_1769757127017.png" "$destPath\mexico.jpg" -Force

Write-Host "`n" + ("=" * 60) -ForegroundColor DarkGray
Write-Host "All images updated successfully!" -ForegroundColor Green
Write-Host "`nSummary:" -ForegroundColor Cyan
Write-Host "  * Total images updated: 19" -ForegroundColor White
Write-Host "  * From previous session: 6 (Albania, Bulgaria, Croatia, Cyprus, Greece, Montenegro)" -ForegroundColor White
Write-Host "  * New in this session: 13 (Turkey, Spain, Thailand, Maldives, Egypt, Dominican, Indonesia, Vietnam, Sri Lanka, Georgia, Tunisia, Zanzibar, Kenya, Mexico)" -ForegroundColor White
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "  1. Check the images in: $destPath" -ForegroundColor White
Write-Host "  2. Restart your dev server to see the changes" -ForegroundColor White
Write-Host "  3. Remaining countries need images: Italy, France, Czechia, UAE, Cuba" -ForegroundColor Magenta
Write-Host ""
