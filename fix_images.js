const fs = require('fs');

try {
  let content = fs.readFileSync('src/data/destinations.ts', 'utf8');
  let count = 0;
  
  // Use a safer regex that looks for name, then description, then image
  const updated = content.replace(/name:\s*"([^"]+)",\s*description:\s*"([^"]+)",\s*image:\s*"([^"]+)"/g, (match, name, desc, imageUrl) => {
    if (imageUrl.includes('images.unsplash.com')) {
      count++;
      // Create a prompt from the name. We translate it roughly or just use the name if pollinations supports it.
      // Pollinations AI understands many languages, but adding some english keywords helps the model.
      const prompt = encodeURIComponent(name + " realistic photography");
      const newImageUrl = `https://image.pollinations.ai/prompt/${prompt}?width=600&height=400&nologo=true`;
      return match.replace(imageUrl, newImageUrl);
    }
    return match;
  });

  fs.writeFileSync('src/data/destinations.ts', updated);
  console.log(`Successfully replaced ${count} images with Pollinations AI placeholders.`);
} catch (e) {
  console.error(e);
}
