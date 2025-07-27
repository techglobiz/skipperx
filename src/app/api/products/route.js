import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { prisma } from '@/lib/prisma';



// GET all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true }, // include category relation
    });
    return Response.json(products);
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    return new Response('Error fetching products', { status: 500 });
  }
}


// POST create product
export async function POST(request) {
  try {
    const formData = await request.formData();

    const name = formData.get('name');
    const price = formData.get('price');
    const categoryId = parseInt(formData.get('categoryId'));
    const file = formData.get('image');

    console.log('Received Data:', { name, price, categoryId, file });

    if (!file || !file.name) {
      console.error('File missing in request');
      return new Response('Image file is required', { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), 'public/uploads');

    // Make sure the uploads directory exists
    await mkdir(uploadDir, { recursive: true });

    const filename = Date.now() + '_' + file.name;
    const filePath = path.join(uploadDir, filename);

    await writeFile(filePath, buffer);
    const imagePath = `/uploads/${filename}`;

    const newProduct = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        image: imagePath,
        categoryId,
      },
    });

    return Response.json(newProduct);
  } catch (error) {
    console.error('❌ Error creating product:', error);
    return new Response('Error creating product', { status: 500 });
  }
}
