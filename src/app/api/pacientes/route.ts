import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  const pacientes = await prisma.paciente.findMany({ orderBy: { nome: 'asc' } })
  return NextResponse.json(pacientes)
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const paciente = await prisma.paciente.create({ data })
  return NextResponse.json(paciente, { status: 201 })
}
