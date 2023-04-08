export function getFileExt(filename: string) {
  return filename.slice(filename.lastIndexOf('.'));
}

export function toNumber(
  value: any,
  defaultValue?: number,
  options: { allowNull?: boolean; allowNegative?: boolean; allowZero?: boolean } = {}
) {
  const { allowNegative = true, allowNull = true, allowZero = true } = options;

  if (!allowNull && value === null) return defaultValue;

  const numValue = Number(value);

  if (isNaN(numValue)) return defaultValue;
  if (!allowNegative && numValue < 0) return defaultValue;
  if (!allowZero && numValue === 0) return defaultValue;

  return numValue;
}

export function toVND(price: number) {
  return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

export function generateId(length: number = 10): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    id += chars[randomIndex];
  }
  return id;
}
