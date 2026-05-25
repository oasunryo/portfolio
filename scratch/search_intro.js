const fs = require('fs');
const dump = JSON.parse(fs.readFileSync('scratch/notion_db_dump.json', 'utf8').substring(fs.readFileSync('scratch/notion_db_dump.json', 'utf8').indexOf('[')));

const keywords = ["about", "intro", "me", "resume", "오준서", "포트폴리오", "self", "introduce", "자기소개"];
const found = dump.filter(item => {
  const t = item.title.toLowerCase();
  return keywords.some(k => t.includes(k));
});

console.log("Found matches:");
console.log(JSON.stringify(found.map(x => ({ title: x.title, category: x.category, org: x.organization, desc: x.description })), null, 2));
