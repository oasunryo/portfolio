const fs = require('fs');
const path = require('path');
const { Client } = require('@notionhq/client');

let notionToken = '';
const envPath = path.join(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const tokenMatch = envContent.match(/NOTION_TOKEN=(.*)/);
  if (tokenMatch) notionToken = tokenMatch[1].trim();
}

const notion = new Client({ auth: notionToken });
const relatedDbId = '281fbe0a-b290-8043-9ff8-000bd8450b30';

async function run() {
  try {
    const db = await notion.databases.retrieve({ database_id: relatedDbId });
    console.log("DB Title:", db.title);
    const response = await notion.databases.query({ database_id: relatedDbId });
    console.log("Items found:", response.results.length);
    if (response.results.length > 0) {
      console.log("First item properties:");
      console.log(JSON.stringify(response.results[0].properties, null, 2));
    }
  } catch (err) {
    console.error("ERROR retrieving related DB:", err.message);
  }
}

run();
