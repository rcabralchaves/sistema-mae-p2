import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'
import { createToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return NextResponse.json({ error: 'Email ou senha inválidos' }, { status: 401 })
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return NextResponse.json({ error: 'Email ou senha inválidos' }, { status: 401 })
  }

  const token = await createToken({ id: user.id, email: user.email, name: user.name })
  const cookieStore = await cookies()
  cookieStore.set('session', token, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 7 })

  return NextResponse.json({ ok: true })
}
