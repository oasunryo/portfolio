const fs = require('fs');
const path = require('path');
const { Client } = require('@notionhq/client');

let notionToken = '';
let notionDatabaseId = '';

const envPath = path.join(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const tokenMatch = envContent.match(/NOTION_TOKEN=(.*)/);
  const dbMatch = envContent.match(/NOTION_DATABASE_ID=(.*)/);
  if (tokenMatch) notionToken = tokenMatch[1].trim();
  if (dbMatch) notionDatabaseId = dbMatch[1].trim();
}

const notion = new Client({ auth: notionToken });

async function run() {
  try {
    const db = await notion.databases.retrieve({ database_id: notionDatabaseId });
    console.log("DB Title:", JSON.stringify(db.title, null, 2));
    console.log("DB Description:", JSON.stringify(db.description, null, 2));
  } catch (err) {
    console.error("ERROR retrieving DB:", err);
  }
}

run();
