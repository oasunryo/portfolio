const fs = require('fs');
const dump = JSON.parse(fs.readFileSync('scratch/notion_db_dump.json', 'utf8').substring(fs.readFileSync('scratch/notion_db_dump.json', 'utf8').indexOf('[')));

const skills = dump.filter(item => {
  return item.category.toLowerCase().includes('skill');
});

console.log("Skills found in DB:", skills.length);
console.log(JSON.stringify(skills.map(x => ({ title: x.title, category: x.category, org: x.organization, desc: x.description, ind: x.industry })), null, 2));
