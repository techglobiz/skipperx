import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

export async function POST(req) {
  const { email, password } = await req.json();
  console.log('👉 Received from frontend:', { email, password });

  const user = await prisma.user.findUnique({ where: { email } });
  console.log('👉 Found user in DB:', user);

  if (!user) {
    console.log('❌ User not found.');
    return new Response('Invalid credentials', { status: 401 });
  }

  console.log('👉 Comparing passwords...');
  console.log('Plain Password:', password);
  console.log('Hashed Password:', user.password);

  const isValid = await bcrypt.compare(password, user.password);
  console.log('👉 Password match result:', isValid);

  if (!isValid) {
    console.log('❌ Password does not match.');
    return new Response('Invalid credentials', { status: 401 });
  }

  console.log('✅ Login successful!');
  console.log('JWT Secret:', process.env.JWT_SECRET); // should not be empty

  const token = await new SignJWT({ userId: user.id, role: user.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  return Response.json({ token });
}
