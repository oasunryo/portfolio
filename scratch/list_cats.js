const fs = require('fs');
const dump = JSON.parse(fs.readFileSync('scratch/notion_db_dump.json', 'utf8').substring(fs.readFileSync('scratch/notion_db_dump.json', 'utf8').indexOf('[')));

const counts = {};
dump.forEach(item => {
  counts[item.category] = (counts[item.category] || 0) + 1;
});
console.log("Unique Categories and Counts:");
console.log(JSON.stringify(counts, null, 2));
