# Sistema Psicopedagógico — Primeiros Passos

## ⚠️ IMPORTANTE: Criar sua primeira conta

**Siga EXATAMENTE estes passos para criar sua conta:**

### 1. Deletar arquivo de banco de dados antigo
Se você viu apenas a tela de "Login" (sem opção de criar conta), é porque há um banco de dados antigo. Vamos limpar:

```bash
rm -f "prisma/dev.db"
```

Ou simplesmente delete o arquivo `dev.db` que fica em `SISTEMA MAE P2/sistema-mae-p2/prisma/dev.db`

### 2. Iniciar o sistema

Na pasta `sistema-mae-p2`, abra o Terminal e digite:

```bash
npm run dev
```

Ou double-click em `iniciar-sistema.command`

### 3. Abrir no navegador

Acesse: **http://localhost:3000**

Você verá uma tela de **CRIAR CONTA** (não uma tela de login)

### 4. Preencher seus dados

- **Nome:** Digite o nome da psicopedagoga
- **E-mail:** Digite um e-mail (ex: mae@sistema.com)
- **Senha:** Digite uma senha segura

Clique em **"Criar conta"**

### 5. ✅ Pronto!

Você será redirecionado para o **Dashboard** do sistema.

---

## 📋 Se ainda vir só "Login"

Se após deletar `dev.db` ainda aparecer uma tela de login, faça isto:

1. **Parar o servidor:** Pressione `Ctrl + C` no terminal
2. **Deletar o arquivo novamente:**
   ```bash
   rm -f prisma/dev.db
   ```
3. **Reiniciar:** `npm run dev`
4. **Limpar cache do navegador:** Pressione `Ctrl + Shift + Delete` e limpe
5. **Recarregar:** Pressione `Ctrl + R`

---

## 🚀 Usar o sistema após criar conta

Depois de criar a conta, você pode:

- ✅ Adicionar alunos (contexto escolar)
- ✅ Adicionar pacientes (contexto clínico)
- ✅ Registrar sessões e frequência
- ✅ Gerar atestados de frequência
- ✅ Criar contratos
- ✅ Registrar encaminhamentos
- ✅ Criar relatórios e pareceres
- ✅ Acessar biblioteca de testes
- ✅ Acessar materiais de intervenção

---

## ❓ Dúvidas?

Se o sistema não iniciar, verifique:

- ✓ Terminal na pasta correta: ` MAE P2/sistemaSISTEMA-mae-p2`
- ✓ Node.js instalado: `node --version`
- ✓ Dependências instaladas: `npm install`
- ✓ Arquivo `dev.db` foi deletado: `rm -f prisma/dev.db`

Depois: `npm run dev` e acesse http://localhost:300o

