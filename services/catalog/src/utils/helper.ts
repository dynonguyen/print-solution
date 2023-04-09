export function generateId(length: number = 10): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    id += chars[randomIndex];
  }
  return id;
}

export function toSearchQuery(keyword?: string, searchBy?: string) {
  if (!searchBy || !keyword) return {};

  const searchFields = searchBy.split(',');

  return keyword ? { $or: searchFields.map((key) => ({ [key]: { $regex: keyword, $options: 'i' } })) } : {};
}
