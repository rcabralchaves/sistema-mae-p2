import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  const data = await req.json()
  const relatorio = await prisma.relatorio.create({ data })
  return NextResponse.json(relatorio, { status: 201 })
}
