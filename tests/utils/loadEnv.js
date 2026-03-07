import fs from 'fs';
import path from 'path';

function stripQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

export function loadEnvFile(envPath = '.env') {
  const fullPath = path.resolve(process.cwd(), envPath);
  if (!fs.existsSync(fullPath)) return;

  const content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const equalIndex = line.indexOf('=');
    if (equalIndex < 1) continue;

    const key = line.slice(0, equalIndex).trim();
    const value = stripQuotes(line.slice(equalIndex + 1).trim());
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}
