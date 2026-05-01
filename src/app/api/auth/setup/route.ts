import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'
import { createToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json()

  const count = await prisma.user.count()
  if (count > 0) {
    return NextResponse.json({ error: 'Sistema já configurado' }, { status: 400 })
  }

  const hashed = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({ data: { name, email, password: hashed } })

  const token = await createToken({ id: user.id, email: user.email, name: user.name })
  const cookieStore = await cookies()
  cookieStore.set('session', token, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 7 })

  return NextResponse.json({ ok: true })
}
