import path from 'path';
import fs from 'fs/promises';

export async function uploadFile(file) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), 'public', 'uploads');

  // Ensure the uploads directory exists
  await fs.mkdir(uploadDir, { recursive: true });

  // Generate a unique file name
  const filename = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadDir, filename);

  // Save the file
  await fs.writeFile(filePath, buffer);

  // Return the public URL
  return `/uploads/${filename}`;
}
