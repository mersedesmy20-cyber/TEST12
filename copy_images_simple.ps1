# Simple image copy script
$old = "C:\Users\Merse\.gemini\antigravity\brain\7622d3b0-0d60-4808-b368-871e510201e3"
$new = "C:\Users\Merse\.gemini\antigravity\brain\e630a1e1-e37e-4a96-af9f-f2ec2c38c08b"
$dest = "c:\Users\Merse\OneDrive\Desktop\glorious-travel\public\images\destinations"

# Old images
Copy-Item "$old\albania_destination_1769697486726.png" "$dest\albania.jpg" -Force
Copy-Item "$old\bulgaria_destination_1769697550646.png" "$dest\bulgaria.jpg" -Force
Copy-Item "$old\croatia_destination_1769697637293.png" "$dest\croatia.jpg" -Force
Copy-Item "$old\cyprus_destination_1769697834971.png" "$dest\cyprus.jpg" -Force
Copy-Item "$old\greece_destination_1769698059369.png" "$dest\greece.jpg" -Force
Copy-Item "$old\montenegro_destination_1769698297163.png" "$dest\montenegro.jpg" -Force

# New images
Copy-Item "$new\turkey_destination_1769756583495.png" "$dest\turkey.jpg" -Force
Copy-Item "$new\spain_destination_1769756657146.png" "$dest\spain.jpg" -Force
Copy-Item "$new\thailand_destination_1769756693570.png" "$dest\thailand.jpg" -Force
Copy-Item "$new\maldives_destination_1769756723149.png" "$dest\maldives.jpg" -Force
Copy-Item "$new\egypt_destination_1769756747702.png" "$dest\egypt.jpg" -Force
Copy-Item "$new\dominican_destination_1769756768717.png" "$dest\dominican.jpg" -Force
Copy-Item "$new\indonesia_destination_1769756815603.png" "$dest\indonesia.jpg" -Force
Copy-Item "$new\vietnam_destination_1769756837094.png" "$dest\vietnam.jpg" -Force
Copy-Item "$new\srilanka_destination_1769756902125.png" "$dest\srilanka.jpg" -Force
Copy-Item "$new\georgia_destination_1769756921638.png" "$dest\georgia.jpg" -Force
Copy-Item "$new\tunisia_destination_1769757003261.png" "$dest\tunisia.jpg" -Force
Copy-Item "$new\zanzibar_destination_1769757064021.png" "$dest\zanzibar.jpg" -Force
Copy-Item "$new\kenya_destination_1769757101524.png" "$dest\kenya.jpg" -Force
Copy-Item "$new\mexico_destination_1769757127017.png" "$dest\mexico.jpg" -Force

Write-Host "Done! Copied 19 images." -ForegroundColor Green
