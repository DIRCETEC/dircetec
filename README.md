# DIRCE Tecnologia | Site institucional

Versão 1.1 — identidade visual oficial da DIRCE.

**Site independente do ORICSE.** O código e os arquivos estáticos ficam neste repositório GitHub, conta `DIRCETEC`; a conta Cloudflare que vai hospedar o site pode ser diferente.

## Publicação oficial: Cloudflare Workers Builds (Git integrado)

Este repositório não usa mais o workflow externo de deploy por token do GitHub Actions. O deploy deve ser configurado **diretamente no painel da Cloudflare**, por meio da integração nativa GitHub → Workers Builds. A Cloudflare pode gerar automaticamente o token interno necessário para seus builds. Os antigos secrets `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID` do GitHub **não são usados pelo site** e podem ser removidos pelo administrador quando for conveniente.

1. Acesse https://dash.cloudflare.com/ e escolha **a conta Cloudflare em que a DIRCE será hospedada**. Não toque na conta/Workers do ORICSE.
2. Abra **Workers & Pages**. Antes de criar, veja se já existe um Worker chamado `dircetec`:
   - **Se não existir:** clique em **Create application** (ou Create), selecione criar a partir de um repositório Git e escolha GitHub.
   - **Se já existir:** entre no Worker `dircetec` e abra **Settings > Builds > Connect** (ou equivalente) para vincular seu repositório.
3. Se for solicitado, autorize o aplicativo GitHub **Cloudflare Workers and Pages** para acessar apenas o repositório `DIRCETEC/dircetec`. A conta do GitHub é independente da conta Cloudflare.
4. Configure:
   - Repositório: `DIRCETEC/dircetec`
   - Branch: `main`
   - Nome do Worker: `dircetec` (deve coincidir com `wrangler.jsonc`)
   - Root directory: `/` (raiz)
   - Build command: **em branco** (site estático)
   - Deploy command: `npx wrangler deploy`
   - Build token: use o token gerado pela própria Cloudflare, quando oferecido.
5. Clique em **Save and Deploy / Deploy** e confirme no painel o endereço `*.workers.dev`. Verifique página inicial, `/privacidade.html`, assets, navegação mobile e 404.

Se houver erro de Worker existente/nome em uso, **não apague nada**. Verifique primeiro a qual projeto o nome pertence e quais rotas/dominios estão vinculados.

Documentação oficial: https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/

## Testes locais

```sh
npm install
npm run check
npm run dev
```

O GitHub Action `.github/workflows/check.yml` apenas valida os arquivos. Os deploys passam a ser feitos exclusivamente no Workers Builds.

## Arquivos

- `public/index.html` — página principal
- `public/privacidade.html` — aviso de privacidade
- `public/404.html` — página de erro
- `public/assets/` — identidade visual otimizada, CSS e JavaScript
- `brand-originais/` — três logos PNG originais
- `public/_headers` — cabeçalhos
- `wrangler.jsonc` — configuração Worker Static Assets

## Pendências de negócio

O e-mail `atendimento@oricse.com.br` é provisório, como indicado no site; atualizar quando o canal próprio DIRCE estiver definido. Ainda não há domínio próprio confirmado para a DIRCE. O site não tem banco de dados, formulário dinâmico nem pagamentos.

## Segurança

Nunca incluir senhas, API tokens ou Account IDs em arquivos versionados. Não tocar nos Workers, rotas ou DNS do ORICSE. Manter o nome do Worker e o repositório restritos à DIRCE TEC.
