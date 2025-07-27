import { prisma } from '@/lib/prisma';
import { uploadFile } from '@/lib/upload'; // If you have an upload handler


// GET
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });

    if (!category) return new Response('Category not found', { status: 404 });

    return Response.json(category);
  } catch (error) {
    console.error('❌ GET Category Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// PUT method
export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    const formData = await request.formData();
    const name = formData.get('name');
    const file = formData.get('image');

    let imageUrl = null;

    if (file && typeof file === 'object' && file.size > 0) {
      imageUrl = await uploadFile(file);
    }

    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(id) },
      data: {
        name,
        ...(imageUrl && { image: imageUrl }),
      },
    });

    return Response.json(updatedCategory);
  } catch (error) {
    console.error('❌ PUT Category Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// DELETE
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await prisma.category.delete({
      where: { id: parseInt(id) },
    });

    return Response.json({ message: 'Category deleted' });
  } catch (error) {
    console.error('❌ DELETE Category Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
