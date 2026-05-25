const fs = require('fs');
const dump = JSON.parse(fs.readFileSync('scratch/notion_db_dump.json', 'utf8').substring(fs.readFileSync('scratch/notion_db_dump.json', 'utf8').indexOf('[')));

const filtered = dump.filter(item => {
  const t = item.title.toLowerCase();
  const c = item.category.toLowerCase();
  const ind = item.industry.toLowerCase();
  return ind.includes('semi') || t.includes('semi') || t.includes('hynix') || t.includes('amkor') || t.includes('spotfire') || t.includes('wafer') || t.includes('dicing') || t.includes('molding');
});

console.log("Filtered Semiconductor Items:");
console.log(JSON.stringify(filtered.map(x => ({ title: x.title, category: x.category, org: x.organization, desc: x.description, start: x.startDate, end: x.endDate })), null, 2));
