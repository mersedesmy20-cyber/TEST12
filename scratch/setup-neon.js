// Scratch script to query Neon API and set up DATABASE_URL
// Run: node scratch/setup-neon.js

const API_KEY = "napi_in0z9yd3lgnl0crjl4u0pxr4ar9n3s6snkpkfgnp8878y0nf2zb4mpf2ham79yax";

async function setupNeon() {
  console.log("Connecting to Neon.tech API...");
  try {
    const res = await fetch("https://api.neon.tech/api/v2/projects", {
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Accept": "application/json"
      }
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Neon API error:", err);
      return;
    }

    const data = await res.json();
    const projects = data.projects || [];
    
    if (projects.length === 0) {
      console.log("No projects found in your Neon account. Creating one...");
      // We can create a project via API if empty, but let's check first.
      return;
    }

    const project = projects[0];
    console.log(`Found project: ${project.name} (ID: ${project.id})`);

    // Fetch connection URI
    const connRes = await fetch(`https://api.neon.tech/api/v2/projects/${project.id}/connection_uri?role_name=neondb_owner&database_name=neondb`, {
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Accept": "application/json"
      }
    });

    if (!connRes.ok) {
      // Try listing connection URIs
      console.error("Could not fetch connection URI directly.");
      return;
    }

    const connData = await connRes.json();
    const dbUrl = connData.connection_uri;
    
    if (dbUrl) {
      // Append sslmode=require if not present
      const finalUrl = dbUrl.includes("sslmode") ? dbUrl : `${dbUrl}?sslmode=require`;
      console.log("\n🚀 Successfully retrieved DATABASE_URL!");
      console.log(`Connection string: ${finalUrl.replace(/:[^:@]+@/, ":****@")}`); // Mask password in logs
      
      // We will write this to .env.local and .env
      const fs = require('fs');
      const path = require('path');
      
      // Update .env.local
      const envLocalPath = path.join(__dirname, '../.env.local');
      if (fs.existsSync(envLocalPath)) {
        let content = fs.readFileSync(envLocalPath, 'utf8');
        content = content.replace(/DATABASE_URL="[^"]*"/, `DATABASE_URL="${finalUrl}"`);
        fs.writeFileSync(envLocalPath, content, 'utf8');
        console.log("Updated .env.local with DATABASE_URL.");
      }

      // Update .env
      const envPath = path.join(__dirname, '../.env');
      fs.writeFileSync(envPath, `DATABASE_URL="${finalUrl}"\n`, 'utf8');
      console.log("Updated .env with DATABASE_URL.");
    } else {
      console.log("Connection URI is empty.");
    }

  } catch (err) {
    console.error("Failed to connect to Neon API:", err);
  }
}

setupNeon();
