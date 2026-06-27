'use server'
import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginAction(formData: FormData) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  const password = formData.get("password") as string
  const email = formData.get("email") as string

  const validEmail = email === process.env.ADMIN_EMAIL

  const validPassword = await bcrypt.compare(
    password,
    process.env.ADMIN_PASSWORD_HASH!
  )

  if (!validEmail || !validPassword) {
    throw new Error('Credenciais inválidas')
  }

  const token = await new SignJWT({
    email: email,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);

  const cookieStore = await cookies()

  cookieStore.set('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/'
  })

  redirect('/admin')
}