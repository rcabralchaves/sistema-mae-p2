#!/bin/bash
# Script para resetar o banco e iniciar o sistema

echo "======================================"
echo "Sistema Psicopedagógico"
echo "======================================"
echo ""
echo "🔄 Resetando banco de dados..."

# Remove arquivo antigo
rm -f "prisma/dev.db"
echo "✓ Banco resetado"

echo ""
echo "🚀 Iniciando servidor..."
echo ""
echo "Acesse: http://localhost:3000"
echo ""
echo "Você verá uma tela para CRIAR SUA CONTA"
echo "Digite seu nome, email e senha."
echo ""
echo "Para parar o servidor, pressione Ctrl + C"
echo ""
echo "======================================"
echo ""

npm run dev
