import fs from 'fs';
import path from 'path';

export default async function readData() {
  try {
    const filePath = path.resolve(__dirname, 'product.json');
    const data = await fs.promises.readFile(path.resolve(filePath), { encoding: 'utf8' });
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`ошибка чтения файла продуктов: ${msg}`);
  }
}
