import { prisma } from '@/lib/prisma';

// =======================
// GET: Single Product
// =======================
export async function GET(request, { params }) {
  const { id } = params;

  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
  });

  if (!product) {
    return new Response('Product not found', { status: 404 });
  }

  return Response.json(product);
}

// =======================
// PUT: Update Product
// =======================
export async function PUT(request, { params }) {
  const { id } = params;
  const { name, price } = await request.json();

  try {
    await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, price: parseFloat(price) },
    });

    return Response.json({ message: 'Product updated successfully' });
  } catch (error) {
    return new Response('Error updating product', { status: 500 });
  }
}

// =======================
// DELETE: Delete Product
// =======================
export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    return Response.json({ message: 'Product deleted successfully' });
  } catch (error) {
    return new Response('Error deleting product', { status: 500 });
  }
}
