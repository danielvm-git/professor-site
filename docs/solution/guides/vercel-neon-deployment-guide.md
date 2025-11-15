# Guia Passo a Passo: Deploy Vercel + Neon + GitHub

**Objetivo:** Fazer o primeiro deploy do site professor-site na Vercel com banco de dados Neon e integração GitHub.

---

## ⚡ Quick Start (TL;DR)

```bash
# 1. Preparar repositório
git checkout -b feature/lattes-integration
git push -u origin feature/lattes-integration

# 2. Criar conta Neon → criar projeto
# 3. Instalar Neon GitHub Integration
# 4. Criar conta Vercel → importar repositório
# 5. Instalar Vercel Neon Integration
# 6. Deploy automático!
```

---

## 📋 Pré-requisitos

✅ **Obrigatórios:**
- Conta GitHub (você já tem)
- Repositório `professor-site` no GitHub
- Git instalado localmente
- Node.js 18+ instalado
- Navegador web moderno

⏱️ **Tempo estimado:** 30-45 minutos

---

## PARTE 1: Preparar o Repositório

### Passo 1.1: Verificar Estado Atual

```bash
cd /Users/me/Sites/danielvm-git/professor-site
git status
git branch
```

### Passo 1.2: Criar Branch de Desenvolvimento

```bash
# Criar e mudar para nova branch
git checkout -b feature/lattes-integration

# Verificar que está na branch correta
git branch
# Deve mostrar: * feature/lattes-integration
```

### Passo 1.3: Push da Branch para GitHub

```bash
git push -u origin feature/lattes-integration
```

✅ **Checkpoint:** Acesse GitHub e verifique que a branch `feature/lattes-integration` existe.

---

## PARTE 2: Configurar Neon Database

### Passo 2.1: Criar Conta no Neon

1. Abra: https://console.neon.tech/signup
2. Clique em **"Sign up with GitHub"**
3. Autorize o Neon a acessar sua conta GitHub
4. Complete o cadastro

**Screenshot esperado:**
```
┌─────────────────────────────────────┐
│  Welcome to Neon                    │
│                                     │
│  [Sign up with GitHub]              │
│  [Sign up with Google]              │
│  [Sign up with Email]               │
└─────────────────────────────────────┘
```

### Passo 2.2: Criar Primeiro Projeto no Neon

1. Você será redirecionado para o Dashboard
2. Clique em **"Create a project"** (ou "New Project")
3. Preencha os dados:

```
Project name: professor-site-db
Region: US East (Ohio) - aws-us-east-2
Postgres version: 16
```

4. Clique em **"Create project"**

⏳ **Aguarde:** Neon vai provisionar o banco (leva ~10-15 segundos)

### Passo 2.3: Salvar Credenciais do Banco

Assim que o projeto for criado, você verá uma tela com as credenciais:

```
┌─────────────────────────────────────────────────┐
│ Connection Details                              │
│                                                 │
│ Host: ep-aged-...us-east-2.aws.neon.tech       │
│ Database: neondb                                │
│ User: your-user                                 │
│ Password: ••••••••••••• [Show] [Copy]           │
│                                                 │
│ Connection string:                              │
│ postgresql://user:pass@host/db?sslmode=require  │
│ [Copy]                                          │
└─────────────────────────────────────────────────┘
```

**IMPORTANTE: SALVE ESSAS CREDENCIAIS!**

Crie um arquivo local (NÃO COMMITAR):

```bash
# No seu computador
nano ~/neon-credentials.txt
```

Cole as credenciais:

```
PROJECT: professor-site-db
HOST: ep-aged-xxxx-xxxxx.us-east-2.aws.neon.tech
DATABASE: neondb
USER: your-user
PASSWORD: sua-senha-aqui

CONNECTION STRING:
postgresql://user:pass@ep-aged-xxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

Salve e feche (Ctrl+O, Enter, Ctrl+X).

### Passo 2.4: Testar Conexão (Opcional mas Recomendado)

Se você tem `psql` instalado:

```bash
# Instalar psql (se não tiver)
brew install postgresql

# Testar conexão
psql "postgresql://user:pass@ep-aged-xxxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

Você deve ver:

```
psql (16.x, server 16.x)
SSL connection (protocol: TLSv1.3...)
Type "help" for help.

neondb=>
```

Digite `\q` para sair.

✅ **Checkpoint:** Banco Neon criado e testado.

---

## PARTE 3: Instalar Neon GitHub Integration

### Passo 3.1: Acessar Integrations no Neon

1. No Dashboard do Neon, clique em **"Settings"** (engrenagem, canto inferior esquerdo)
2. Clique em **"Integrations"** no menu lateral
3. Procure por **"GitHub"**

### Passo 3.2: Instalar GitHub Integration

1. Clique em **"Add"** ou **"Install"** no card do GitHub
2. Você será redirecionado para GitHub
3. Selecione onde instalar:
   - **Only select repositories** (recomendado)
   - Marque apenas: `professor-site`
4. Clique em **"Install & Authorize"**

### Passo 3.3: Configurar Branch Mapping

1. Volte para o Neon Dashboard → Integrations → GitHub
2. Clique em **"Configure"** ao lado do repositório
3. Configure:

```
Repository: danielvm-git/professor-site
Main branch: main
Preview branch pattern: feature/*
Auto-delete branches: ✅ Enabled
```

4. Clique em **"Save"**

**O que isso faz:**
- Cada branch `feature/*` cria um database branch automático
- Quando você deleta a branch Git, o DB branch também é deletado
- Economia de recursos e organização automática!

✅ **Checkpoint:** GitHub Integration instalada.

---

## PARTE 4: Configurar Vercel

### Passo 4.1: Criar Conta na Vercel

1. Abra: https://vercel.com/signup
2. Clique em **"Continue with GitHub"**
3. Autorize a Vercel

### Passo 4.2: Importar Repositório

1. No Dashboard Vercel, clique em **"Add New..."** → **"Project"**
2. Na lista de repositórios, procure: `professor-site`
3. Clique em **"Import"**

### Passo 4.3: Configurar Build Settings

Na tela de configuração do projeto:

```
Framework Preset: Next.js (detectado automaticamente)

Root Directory: code/
Build Command: npm run build
Output Directory: .next (default)
Install Command: npm install

Environment Variables: (deixe vazio por enquanto)
```

**IMPORTANTE:** Não clique em "Deploy" ainda!

### Passo 4.4: Configurar Git Integration

Ainda na tela de configuração:

```
Git Configuration:
  Production Branch: main
  Preview Branches: All branches ✅
```

**NÃO CLIQUE EM DEPLOY AINDA!** Primeiro vamos instalar a integração Neon.

✅ **Checkpoint:** Projeto Vercel configurado (mas não deployed).

---

## PARTE 5: Integrar Neon com Vercel

### Passo 5.1: Acessar Vercel Marketplace

1. No Dashboard Vercel, vá para o seu projeto
2. Clique em **"Settings"** → **"Integrations"**
3. Ou acesse diretamente: https://vercel.com/integrations/neon/new

### Passo 5.2: Adicionar Integração Neon

1. Na página do Marketplace, procure por **"Neon"**
2. Clique no card "Neon - Serverless Postgres"
3. Clique em **"Add Integration"**

### Passo 5.3: Escolher Modo de Integração

Você verá duas opções:

```
┌─────────────────────────────────────────────┐
│ How would you like to integrate Neon?       │
│                                             │
│ ○ Create New Neon Account                   │
│   - Vercel manages your Neon account        │
│   - Billing through Vercel                  │
│                                             │
│ ● Link Existing Neon Account ✅             │
│   - You already have a Neon account         │
│   - Billing through Neon                    │
└─────────────────────────────────────────────┘
```

Selecione: **"Link Existing Neon Account"**

Clique em **"Continue"**

### Passo 5.4: Autorizar Conexão

1. Você será redirecionado para o Neon
2. Faça login no Neon (se solicitado)
3. Autorize a Vercel a acessar seu projeto Neon
4. Selecione o projeto: `professor-site-db`
5. Clique em **"Connect"**

### Passo 5.5: Configurar Preview Branches

```
┌─────────────────────────────────────────────┐
│ Configure Preview Branches                  │
│                                             │
│ ✅ Enable database branching                │
│ ✅ Auto-create branches for preview deploys │
│ ✅ Delete branches when preview is deleted  │
│                                             │
│ Branch naming: automatic (recommended)      │
└─────────────────────────────────────────────┘
```

Deixe todas as opções marcadas e clique em **"Save"**

### Passo 5.6: Verificar Variáveis de Ambiente

1. Volte para Vercel → Seu projeto → Settings → Environment Variables
2. Você deve ver (adicionadas automaticamente):

```
DATABASE_URL
POSTGRES_URL
POSTGRES_PRISMA_URL
POSTGRES_URL_NON_POOLING
POSTGRES_USER
POSTGRES_HOST
POSTGRES_PASSWORD
POSTGRES_DATABASE
POSTGRES_URL_NO_SSL
POSTGRES_POOLER_URL
```

✅ **Checkpoint:** Integração Neon-Vercel completa!

---

## PARTE 6: Criar Schema do Banco

### Passo 6.1: Criar Script SQL

No seu computador:

```bash
cd /Users/me/Sites/danielvm-git/professor-site
mkdir -p code/scripts
nano code/scripts/init-database.sql
```

Cole o schema SQL completo (da seção 4 do `lattes-integration-plan.md`).

Salve (Ctrl+O, Enter, Ctrl+X).

### Passo 6.2: Executar Script via Neon Console

1. Acesse: https://console.neon.tech
2. Selecione seu projeto: `professor-site-db`
3. Clique em **"SQL Editor"** (ícone </> na barra lateral)
4. Abra o arquivo `init-database.sql` localmente
5. Copie todo o conteúdo
6. Cole no SQL Editor do Neon
7. Clique em **"Run"** (ou Ctrl+Enter)

Você verá mensagens:

```
CREATE TABLE
CREATE TABLE
CREATE TABLE
...
CREATE INDEX
CREATE INDEX
...
```

### Passo 6.3: Verificar Tabelas Criadas

No SQL Editor, execute:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

Deve retornar:

```
table_name
──────────────────────────────
professor_areas_atuacao
professor_artigos
professor_atuacoes
professor_dados_gerais
professor_eventos
professor_formacao
professor_idiomas
professor_linhas_pesquisa
professor_livros
professor_orientacoes
sync_log
```

✅ **Checkpoint:** Schema do banco criado!

---

## PARTE 7: Instalar Dependências no Projeto

### Passo 7.1: Instalar Pacotes Neon

```bash
cd /Users/me/Sites/danielvm-git/professor-site/code

npm install @neondatabase/serverless
npm install fast-xml-parser
npm install -D @types/node
```

### Passo 7.2: Atualizar package.json

Verifique que as dependências foram adicionadas:

```bash
cat package.json | grep -A 5 "dependencies"
```

Deve incluir:

```json
"dependencies": {
  "@neondatabase/serverless": "^0.9.0",
  "fast-xml-parser": "^4.3.0",
  ...
}
```

### Passo 7.3: Commit as Mudanças

```bash
git add package.json package-lock.json code/scripts/
git commit -m "chore: add Neon database and XML parser dependencies"
git push origin feature/lattes-integration
```

✅ **Checkpoint:** Dependências instaladas.

---

## PARTE 8: Primeiro Deploy!

### Passo 8.1: Fazer Push Final

```bash
# Certifique-se de estar na branch correta
git branch
# Deve mostrar: * feature/lattes-integration

# Se tiver mudanças pendentes
git status
git add .
git commit -m "feat: initial Lattes integration setup"
git push origin feature/lattes-integration
```

### Passo 8.2: Trigger Deploy no Vercel

A Vercel vai automaticamente detectar o push e iniciar o deploy!

1. Acesse: https://vercel.com
2. Vá para o projeto `professor-site`
3. Clique em **"Deployments"**
4. Você verá um deploy em progresso para a branch `feature/lattes-integration`

```
┌─────────────────────────────────────────────┐
│ 🔄 Building...                              │
│                                             │
│ Branch: feature/lattes-integration          │
│ Commit: feat: initial Lattes integration    │
│                                             │
│ ▸ Installing dependencies...               │
│ ▸ Building application...                  │
└─────────────────────────────────────────────┘
```

### Passo 8.3: Verificar Preview Branch no Neon

1. Acesse o Neon Dashboard
2. Clique em **"Branches"** na barra lateral
3. Você deve ver:

```
┌─────────────────────────────────────────────┐
│ Branches                                    │
│                                             │
│ main (primary) ●                            │
│ └─ feature-lattes-integration (preview) ◯   │
│    Created: just now                        │
│    Parent: main                             │
└─────────────────────────────────────────────┘
```

**Isso significa que:**
- Neon criou automaticamente um branch de database para sua branch Git
- O preview deploy usa esse database branch
- Production (main) usa o database main

### Passo 8.4: Acessar Preview URL

Quando o deploy terminar:

1. Na Vercel, clique no deploy que completou
2. Clique em **"Visit"** ou copie a Preview URL
3. Formato: `https://professor-site-xxxxx.vercel.app`

**Teste o site:**
- Frontend deve carregar normalmente
- APIs ainda não estão implementadas (próxima fase)

✅ **Checkpoint:** Primeiro deploy completo!

---

## PARTE 9: Deploy em Production

### Passo 9.1: Merge para Main

Só faça isso depois de testar o preview!

```bash
# Mudar para main
git checkout main

# Puxar últimas mudanças
git pull origin main

# Merge da feature branch
git merge feature/lattes-integration

# Push para production
git push origin main
```

### Passo 9.2: Production Deploy Automático

A Vercel vai automaticamente fazer deploy da branch `main` em produção!

1. Acesse Vercel → Deployments
2. Aguarde o deploy de production completar
3. URL de produção: `https://professor-site.vercel.app` (ou seu domínio custom)

### Passo 9.3: Verificar Production Database

1. No Neon Dashboard → Branches
2. Confirme que `main` é o branch primário
3. Esse é o banco que a produção está usando

✅ **Checkpoint:** Deploy em produção completo!

---

## PARTE 10: Configurar Domínio Custom (Opcional)

### Passo 10.1: Adicionar Domínio na Vercel

1. Vercel → Seu projeto → Settings → Domains
2. Clique em **"Add"**
3. Digite seu domínio (ex: `marianasombrio.com`)
4. Clique em **"Add"**

### Passo 10.2: Configurar DNS

A Vercel vai mostrar as configurações DNS:

```
Type: A
Name: @
Value: 76.76.19.19

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

1. Acesse seu provedor de domínio
2. Adicione esses registros DNS
3. Aguarde propagação (pode levar até 24h, geralmente 15min)

### Passo 10.3: Verificar Domínio

1. Espere a Vercel verificar o domínio
2. SSL será automaticamente configurado
3. Acesse seu domínio custom!

✅ **Checkpoint:** Domínio custom configurado!

---

## 🎉 Parabéns! Setup Completo

Você agora tem:

- ✅ GitHub → Vercel integration (deploy automático)
- ✅ GitHub → Neon integration (database branching)
- ✅ Vercel → Neon integration (env vars automáticas)
- ✅ Preview branches funcionando
- ✅ Production deploy funcionando
- ✅ Database schema criado
- ✅ Dependências instaladas

---

## 🧪 Próximos Passos

1. **Implementar API Routes** (veja `lattes-integration-plan.md`)
2. **Criar componentes do frontend**
3. **Upload do primeiro XML do Lattes**
4. **Testar sincronização**
5. **Configurar Cron Job para atualização mensal**

---

## 🆘 Troubleshooting

### Erro: "Build failed"

```bash
# Teste build localmente
cd code
npm install
npm run build
```

Se funcionar local, verifique:
- Variáveis de ambiente no Vercel
- Root directory está como `code/`
- Node version (Vercel usa 18.x por padrão)

### Erro: "Database connection failed"

1. Verifique env vars no Vercel: Settings → Environment Variables
2. Confirme que `DATABASE_URL` está presente
3. Teste conexão no Neon SQL Editor

### Preview branch não cria database branch

1. Neon Dashboard → Settings → Integrations → GitHub
2. Verifique que a integração está ativa
3. Verifique o branch pattern: `feature/*`
4. Delete e recrie a branch Git

### Deploy fica preso em "Building"

1. Vercel Dashboard → Deployments → clique no deploy
2. Veja os logs para identificar o erro
3. Problemas comuns:
   - Erro de TypeScript
   - Dependência faltando
   - Build command incorreto

---

## 📞 Recursos e Suporte

| Recurso | Link |
|---------|------|
| Neon Docs | https://neon.com/docs |
| Neon Discord | https://discord.gg/neon |
| Vercel Docs | https://vercel.com/docs |
| Vercel Support | https://vercel.com/help |
| Next.js Docs | https://nextjs.org/docs |

---

## ✅ Checklist Final

Use isso para confirmar que tudo está funcionando:

**Neon:**
- [ ] Conta criada
- [ ] Projeto `professor-site-db` criado
- [ ] GitHub Integration instalada
- [ ] Preview branches habilitados
- [ ] Schema do banco criado
- [ ] SQL Editor funciona

**Vercel:**
- [ ] Conta criada
- [ ] Projeto importado do GitHub
- [ ] Root directory: `code/`
- [ ] Production branch: `main`
- [ ] Preview branches habilitados
- [ ] Neon Integration instalada
- [ ] Environment variables configuradas

**Git/GitHub:**
- [ ] Branch `feature/lattes-integration` criada
- [ ] Dependências commitadas
- [ ] Push funciona sem erros

**Deploy:**
- [ ] Preview deploy funciona
- [ ] Production deploy funciona
- [ ] Preview URL acessível
- [ ] Production URL acessível
- [ ] Database branch criado para preview
- [ ] Database main usado em production

---

## 🎯 Resultado Final

Após seguir este guia, você terá:

```
┌─────────────────────────────────────────────┐
│                                             │
│  GitHub Repository (professor-site)         │
│         ↓                                   │
│  ┌──────────────┐      ┌─────────────┐     │
│  │   Vercel     │◄────►│    Neon     │     │
│  │              │      │             │     │
│  │ - Hosting    │      │ - Database  │     │
│  │ - Builds     │      │ - Branching │     │
│  │ - Functions  │      │ - Backups   │     │
│  └──────────────┘      └─────────────┘     │
│         ↓                                   │
│  Production: professor-site.vercel.app      │
│  Preview: professor-site-xxxxx.vercel.app   │
│                                             │
└─────────────────────────────────────────────┘
```

**Fluxo de desenvolvimento:**
1. Criar branch Git → Database branch automático
2. Commit código → Preview deploy automático
3. Merge para main → Production deploy automático
4. Delete branch → Database branch deletado automático

🚀 **Tudo automatizado!**

---

**Documento criado em:** Novembro 2024  
**Última atualização:** Novembro 2024  
**Versão:** 1.0

