import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  const data = await req.json()
  const contrato = await prisma.contrato.create({ data })
  return NextResponse.json(contrato, { status: 201 })
}
