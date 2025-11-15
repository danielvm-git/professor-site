#!/usr/bin/env node

/**
 * Setup Database Script
 * Executa o schema SQL inicial no Neon PostgreSQL
 */

const fs = require('fs');
const path = require('path');

// Cores para terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(message) {
  console.log('\n' + '='.repeat(60));
  log(message, 'cyan');
  console.log('='.repeat(60) + '\n');
}

async function main() {
  logHeader('🚀 Professor Site - Database Setup');

  // Verificar se DATABASE_URL está definida
  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  
  if (!databaseUrl) {
    log('❌ Erro: DATABASE_URL não encontrada!', 'red');
    console.log('\nPara executar este script, você precisa:');
    console.log('\n1. Obter a connection string do Neon Dashboard');
    console.log('2. Exportar como variável de ambiente:\n');
    log('   export DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"', 'yellow');
    console.log('\nOu execute o SQL manualmente no Neon Console:');
    log('   https://console.neon.tech\n', 'cyan');
    process.exit(1);
  }

  log('✓ DATABASE_URL encontrada', 'green');
  log(`  Host: ${extractHost(databaseUrl)}`, 'cyan');

  // Ler arquivo SQL
  const sqlPath = path.join(__dirname, 'init-database.sql');
  
  if (!fs.existsSync(sqlPath)) {
    log(`❌ Arquivo SQL não encontrado: ${sqlPath}`, 'red');
    process.exit(1);
  }

  log('✓ Arquivo SQL encontrado', 'green');

  const sqlContent = fs.readFileSync(sqlPath, 'utf8');
  
  log('\n📋 Schema a ser executado:', 'bold');
  console.log('  - professor_dados_gerais');
  console.log('  - professor_formacao');
  console.log('  - professor_areas_atuacao');
  console.log('  - professor_linhas_pesquisa');
  console.log('  - professor_artigos');
  console.log('  - professor_livros');
  console.log('  - professor_orientacoes');
  console.log('  - professor_atuacoes');
  console.log('  - professor_idiomas');
  console.log('  - professor_eventos');
  console.log('  - sync_log');

  console.log('\n' + '─'.repeat(60));
  log('⚠️  ATENÇÃO:', 'yellow');
  console.log('Este script requer @neondatabase/serverless instalado.\n');
  console.log('Para executar o schema, escolha uma opção:\n');
  
  log('OPÇÃO 1 (Recomendada): Via Neon Console', 'green');
  console.log('1. Acesse: https://console.neon.tech');
  console.log('2. Abra o SQL Editor');
  console.log('3. Cole o conteúdo de: code/scripts/init-database.sql');
  console.log('4. Clique em "Run"\n');

  log('OPÇÃO 2: Via psql', 'cyan');
  console.log('Execute no terminal:\n');
  log(`psql "${databaseUrl}" -f "${sqlPath}"`, 'yellow');
  
  console.log('\n' + '─'.repeat(60));
  console.log('\n✅ Depois de executar o schema, verifique as tabelas:');
  console.log('\n   SELECT table_name FROM information_schema.tables');
  console.log("   WHERE table_schema = 'public' ORDER BY table_name;\n");
}

function extractHost(url) {
  try {
    const match = url.match(/@([^\/]+)/);
    return match ? match[1] : 'unknown';
  } catch {
    return 'unknown';
  }
}

// Executar
main().catch(error => {
  log('\n❌ Erro:', 'red');
  console.error(error.message);
  process.exit(1);
});

