import fs from 'fs';

export function toBase64(filePath: string) {
  const img = fs.readFileSync(filePath);

  const base64 = Buffer.from(img).toString('base64');
  return "data:image/png;base64," + base64
}