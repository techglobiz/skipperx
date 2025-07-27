import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { uploadFile } from '@/lib/upload';


// Get Single Product
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }
    
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true
      }
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Update Product
export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }
    
    const formData = await req.formData();
    const name = formData.get('name');
    const price = parseFloat(formData.get('price'));
    const categoryId = parseInt(formData.get('categoryId'));
    const imageFile = formData.get('image');

    // Validate required fields
    if (!name || isNaN(price) || isNaN(categoryId)) {
      return NextResponse.json({ 
        error: 'Missing or invalid required fields: name, price, categoryId' 
      }, { status: 400 });
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Check if category exists
    const categoryExists = await prisma.category.findUnique({
      where: { id: categoryId }
    });

    if (!categoryExists) {
      return NextResponse.json({ error: 'Category not found' }, { status: 400 });
    }

    // Prepare update data
    const updateData = {
      name: name.trim(),
      price,
      categoryId,
    };

    // Handle image upload if provided
    if (imageFile && imageFile.size > 0) {
      const imagePath = await uploadFile(imageFile);
      updateData.image = imagePath;
    }

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: updateData,
      include: {
        category: true
      }
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ 
      error: 'Failed to update product. Please try again.' 
    }, { status: 500 });
  }
}

// Delete Product
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ 
      error: 'Failed to delete product. Please try again.' 
    }, { status: 500 });
  }
}
