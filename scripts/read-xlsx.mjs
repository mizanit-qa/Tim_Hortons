import XLSX from 'xlsx';
import { readFileSync } from 'fs';
const path = process.argv[2];
const wb = XLSX.read(readFileSync(path), { type: 'buffer' });
const ws = wb.Sheets[wb.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
console.log(JSON.stringify(data, null, 2));
