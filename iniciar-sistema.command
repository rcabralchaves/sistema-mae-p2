#!/bin/bash
cd "$(dirname "$0")"

echo "🌸 Iniciando Sistema Psicopedagógico..."

# Inicializar banco se não existir
if [ ! -f "prisma/dev.db" ]; then
  echo "📦 Criando banco de dados..."
  node iniciar-banco.mjs
fi

# Verificar se porta 3000 já está em uso
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
  echo "✅ Sistema já está rodando!"
  open http://localhost:3000
  exit 0
fi

echo "🚀 Iniciando servidor..."
npm run dev &

echo "⏳ Aguardando servidor iniciar..."
sleep 8

echo "🌐 Abrindo navegador..."
open http://localhost:3000

echo ""
echo "✅ Sistema iniciado em http://localhost:3000"
echo "   Para encerrar, feche esta janela ou pressione Ctrl+C"
echo ""

wait
