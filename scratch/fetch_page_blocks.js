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
const pageId = '281fbe0a-b290-8006-8304-ff192cb035b7';

async function run() {
  try {
    const response = await notion.blocks.children.list({ block_id: pageId });
    console.log("Blocks found:", response.results.length);
    for (const block of response.results) {
      console.log(`Type: ${block.type}`);
      if (block.type === 'paragraph') {
        console.log("Text:", block.paragraph.rich_text.map(t => t.plain_text).join(''));
      } else if (block.type === 'heading_1') {
        console.log("H1:", block.heading_1.rich_text.map(t => t.plain_text).join(''));
      } else if (block.type === 'heading_2') {
        console.log("H2:", block.heading_2.rich_text.map(t => t.plain_text).join(''));
      } else if (block.type === 'heading_3') {
        console.log("H3:", block.heading_3.rich_text.map(t => t.plain_text).join(''));
      } else if (block.type === 'bulleted_list_item') {
        console.log("Bullet:", block.bulleted_list_item.rich_text.map(t => t.plain_text).join(''));
      } else if (block.type === 'child_database') {
        console.log("Child DB Title:", block.child_database.title);
      } else if (block.type === 'child_page') {
        console.log("Child Page Title:", block.child_page.title);
      }
      console.log("------------------------");
    }
  } catch (err) {
    console.error("ERROR retrieving blocks:", err.message);
  }
}

run();
