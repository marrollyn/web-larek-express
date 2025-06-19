import fs from 'fs';
import path from 'path';
import product from '../../models/product';

export default async function writingDB() {
  let data;
  try {
    const filePath = path.resolve(__dirname, 'product.json');
    data = JSON.parse(
      await fs.promises.readFile(path.resolve(filePath), { encoding: 'utf8' }),
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`ошибка чтения файла продуктов: ${msg}`);
  }
  let countProductsDB;
  try {
    countProductsDB = await product.countDocuments();
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`ошибка чтения DB продуктов: ${msg}`);
  }

  if (countProductsDB === 0) {
    try {
      await product.insertMany(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new Error(`ошибка записи продуктов в DB: ${msg}`);
    }
  }
}
