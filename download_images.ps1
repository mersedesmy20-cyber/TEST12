$dest = "public/images/destinations"
New-Item -ItemType Directory -Force -Path $dest

$images = @{
    "montenegro" = "https://unsplash.com/photos/mB0pUmkR6tY/download?force=true";
    "albania" = "https://unsplash.com/photos/D45K7gD4W4U/download?force=true";
    "france" = "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop";
    "italy" = "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2086&auto=format&fit=crop";
    "croatia" = "https://unsplash.com/photos/P_Jg_l82TnM/download?force=true";
    "bulgaria" = "https://unsplash.com/photos/En1HGRiiWI3/download?force=true";
    "cyprus" = "https://unsplash.com/photos/S-qU2AphN-E/download?force=true";
    "czechia" = "https://unsplash.com/photos/4yUaZ3v54M4/download?force=true";
    "turkey" = "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071&auto=format&fit=crop";
    "spain" = "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=2070&auto=format&fit=crop";
    "greece" = "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1887&auto=format&fit=crop";
    "uae" = "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop";
    "thailand" = "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2039&auto=format&fit=crop";
    "srilanka" = "https://unsplash.com/photos/m14-lq4hK-Y/download?force=true";
    "indonesia" = "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2076&auto=format&fit=crop";
    "maldives" = "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1965&auto=format&fit=crop";
    "vietnam" = "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2070&auto=format&fit=crop";
    "georgia" = "https://images.unsplash.com/photo-1565008576549-57569a49371d?q=80&w=2070&auto=format&fit=crop";
    "egypt" = "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=2070&auto=format&fit=crop";
    "tunisia" = "https://unsplash.com/photos/f0R5F8yq4tE/download?force=true";
    "zanzibar" = "https://unsplash.com/photos/M-1mrM4gT4g/download?force=true";
    "kenya" = "https://images.unsplash.com/photo-1489396160836-2c99c977e970?q=80&w=2070&auto=format&fit=crop";
    "dominican" = "https://unsplash.com/photos/L-2B00zU9Wc/download?force=true";
    "mexico" = "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?q=80&w=2070&auto=format&fit=crop";
    "cuba" = "https://unsplash.com/photos/D3E9f0c2lE8/download?force=true";
}

foreach ($name in $images.Keys) {
    $url = $images[$name]
    $file = "$dest/$name.jpg"
    Write-Host "Downloading $name..."
    try {
        Invoke-WebRequest -Uri $url -OutFile $file
    } catch {
        Write-Host "Failed to download $name - Error: $_"
    }
}
