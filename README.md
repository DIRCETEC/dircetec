# DIRCE Tecnologia | Site institucional

Versão 1.1. Projeto independente do ORICSE. Código e identidade visual originais preservados.

## Publicação: GitHub Actions + Cloudflare Workers via API Token

Repositório: `DIRCETEC/dircetec` (branch `main`).
Worker: `dircetec` (configurado em `wrangler.jsonc`).

A conta Cloudflare usada para o deploy pode ser diferente da conta GitHub. O token e o Account ID precisam corresponder à **mesma conta Cloudflare**.

### Reiniciar as credenciais com segurança

1. No painel da Cloudflare, selecione a conta onde a DIRCE será hospedada e copie o **Account ID** em Workers & Pages > Account Details. Não confunda Account ID com Zone ID.
2. Confirme se já existe um Worker `dircetec` *nessa conta*. Se for um Worker novo e ainda não existir, seu token precisará de **Workers Admin** no escopo de produto para criá-lo via `wrangler deploy`. Para reduzir privilégios, você pode primeiro criar esse Worker `dircetec` manualmente no dashboard e então usar um token de **Workers Editor** apenas para publicar versões futuras.
3. Crie **novo API Token** na Cloudflare, limitado à conta que hospedará a DIRCE. Não use Global API Key. Nome sugerido: `DIRCE TEC GitHub Deploy`.
4. Acesse https://github.com/DIRCETEC/dircetec/settings/secrets/actions e substitua os valores antigos de:
   - `CLOUDFLARE_API_TOKEN` = novo token, nunca publicado ou compartilhado no chat;
   - `CLOUDFLARE_ACCOUNT_ID` = Account ID da conta escolhida.
5. Execute **manualmente** o workflow `Publicar DIRCE TEC na Cloudflare` em https://github.com/DIRCETEC/dircetec/actions/workflows/deploy.yml, escolhendo Run workflow > main.
6. Só após confirmar um deploy bem-sucedido, revogue o token antigo (se exclusivo da DIRCE) e considere habilitar o deploy automático por push.

Neste momento o workflow é **somente manual** (`workflow_dispatch`), para não disparar tentativas usando os secrets antigos.

Documentação:
- https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/
- https://developers.cloudflare.com/workers/authorization/workers/

### Comandos

```sh
npm install
npm run check
npm run dev
```

Os testes automáticos do GitHub ficam em `.github/workflows/check.yml`. A publicação manual usa `.github/workflows/deploy.yml`.

### Estrutura

- `public/index.html` — página principal
- `public/privacidade.html` — aviso de privacidade
- `public/404.html` — página de erro
- `public/assets/` — imagens, favicon, CSS e JavaScript
- `brand-originais/` — três logos PNG originais
- `public/_headers` — cabeçalhos de segurança e cache
- `wrangler.jsonc` — Worker Static Assets

### Pendências

O email `atendimento@oricse.com.br` permanece provisório até que seja definido o canal de atendimento DIRCE. Nenhum domínio próprio foi confirmado. Não alterar repositórios, Workers, DNS ou rotas do ORICSE. Não adicionar tokens ou senhas em arquivos versionados.
