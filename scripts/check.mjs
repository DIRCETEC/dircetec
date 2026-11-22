import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve('public');
const pages=['index.html','privacidade.html','404.html'];
const files=fs.readdirSync(path.join(root,'assets'));
const all=[];
for(const page of pages){
 const text=fs.readFileSync(path.join(root,page),'utf8');
 assert.match(text,/<html lang="pt-BR">/,`lang correto: ${page}`);
 assert.match(text,/<title>[^<]+<\/title>/,`title: ${page}`);
 for(const match of text.matchAll(/(?:src|href)="([^"#?]+)"/g)){
  const url=match[1];
  if(/^(https?:|mailto:|tel:)/.test(url))continue;
  let pathname=url.startsWith('/')?url.slice(1):url;
  if(!pathname||pathname==='/')continue;
  const target=path.join(root,pathname);
  assert.ok(fs.existsSync(target),`Link inválido: ${page} -> ${url}`);
  all.push(`${page}: ${url}`);
 }
}
assert.ok(files.includes('favicon.png'));
assert.ok(files.includes('logo-dirce.webp'));
const config=JSON.parse(fs.readFileSync('wrangler.jsonc','utf8'));
assert.equal(config.name,'dircetec');
assert.equal(config.assets.directory,'./public');
assert.equal(config.assets.not_found_handling,'404-page');
console.log(`OK: ${pages.length} páginas, ${all.length} referências locais e configuração Cloudflare.`);
