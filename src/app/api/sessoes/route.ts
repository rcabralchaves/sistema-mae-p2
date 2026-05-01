import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  const data = await req.json()
  const sessao = await prisma.sessao.create({ data })
  return NextResponse.json(sessao, { status: 201 })
}
