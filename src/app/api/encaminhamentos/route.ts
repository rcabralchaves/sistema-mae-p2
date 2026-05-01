import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  const data = await req.json()
  const enc = await prisma.encaminhamento.create({ data })
  return NextResponse.json(enc, { status: 201 })
}
