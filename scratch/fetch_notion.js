const fs = require('fs');
const path = require('path');
const { Client } = require('@notionhq/client');

// Load environment variables from .env.local
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

if (!notionToken || !notionDatabaseId) {
  console.error("Missing Notion Token or Database ID in .env.local");
  process.exit(1);
}

const notion = new Client({ auth: notionToken });

async function run() {
  try {
    const response = await notion.databases.query({ database_id: notionDatabaseId });
    console.log("SUCCESS! Fetched items:", response.results.length);
    const parsed = response.results.map((page, idx) => {
      const props = page.properties;
      const title = props.name?.title?.[0]?.plain_text || 'No Title';
      const category = props.type?.select?.name || props.Category?.select?.name || 'No Category';
      const organization = props.organization?.rich_text?.[0]?.plain_text || 'No Org';
      const industry = props.industry?.select?.name || 'No Industry';
      const startDate = props['start date']?.date?.start || '';
      const endDate = props['end date']?.date?.start || '';
      const description = props.description?.rich_text?.[0]?.plain_text || '';
      return {
        id: page.id,
        title,
        category,
        organization,
        industry,
        startDate,
        endDate,
        description
      };
    });
    console.log(JSON.stringify(parsed, null, 2));
  } catch (err) {
    console.error("ERROR querying Notion:", err);
  }
}

run();
