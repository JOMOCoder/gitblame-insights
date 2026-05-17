#!/usr/bin/env node
// 🔍 gitblame-insights — Code Ownership Analyzer

const { execSync } = require('child_process');
const path = require('path');
const fs   = require('fs');

const GREEN  = '\x1b[32m'; const YELLOW = '\x1b[33m';
const CYAN   = '\x1b[36m'; const BOLD   = '\x1b[1m';
const DIM    = '\x1b[2m';  const NC     = '\x1b[0m';

function run(cmd) {
  try { return execSync(cmd, { encoding: 'utf8', stdio: ['pipe','pipe','pipe'] }).trim(); }
  catch { return ''; }
}

function getTrackedFiles(dir = '.') {
  return run(`git ls-files ${dir}`).split('\n').filter(f => f && fs.existsSync(f));
}

function blameFile(file) {
  const output = run(`git blame --line-porcelain "${file}"`);
  const owners = {};
  const authorLines = output.split('\n').filter(l => l.startsWith('author '));
  authorLines.forEach(line => {
    const author = line.replace('author ', '').trim();
    owners[author] = (owners[author] || 0) + 1;
  });
  return { file, owners, total: authorLines.length };
}

function getChurn(days = 90, limit = 10) {
  const since = new Date(Date.now() - days * 86400000).toISOString().split('T')[0];
  const log = run(`git log --since="${since}" --name-only --pretty=format:"" `);
  const counts = {};
  log.split('\n').filter(Boolean).forEach(f => { counts[f] = (counts[f] || 0) + 1; });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, limit);
}

function printOwnershipReport(dir = 'src/') {
  console.log(`\n${CYAN}${BOLD}📊 Code Ownership Report — ${dir}${NC}`);
  console.log('─'.repeat(60));
  const files = getTrackedFiles(dir);
  if (!files.length) { console.log('  No tracked files found.'); return; }
  files.slice(0, 15).forEach(file => {
    const { owners, total } = blameFile(file);
    if (!total) return;
    const top = Object.entries(owners).sort((a,b) => b[1]-a[1])[0];
    if (!top) return;
    const pct = Math.round((top[1] / total) * 100);
    const bar = GREEN + '█'.repeat(Math.round(pct/5)) + NC + DIM + '░'.repeat(20 - Math.round(pct/5)) + NC;
    console.log(`  ${file.padEnd(35)} ${top[0].padEnd(15)} ${bar} ${pct}%`);
  });
}

function printChurnReport(days = 90) {
  console.log(`\n${YELLOW}${BOLD}🔥 Top Churn Files (last ${days} days)${NC}`);
  console.log('─'.repeat(60));
  const churn = getChurn(days);
  if (!churn.length) { console.log('  No churn data found.'); return; }
  churn.forEach(([file, count]) => {
    console.log(`  ${file.padEnd(45)} ${YELLOW}${count} changes${NC}`);
  });
}

const cmd = process.argv[2] || 'analyze';
const target = process.argv[3] || '.';

console.log(`\n${CYAN}${BOLD}🔍 gitblame-insights${NC}\n`);

if (cmd === 'analyze' || cmd === 'owners') printOwnershipReport(target);
if (cmd === 'analyze' || cmd === 'churn')  printChurnReport(90);

console.log();
