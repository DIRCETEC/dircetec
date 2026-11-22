# DIRCE Tecnologia | Site institucional

Versão 1.1 · 22 de novembro de 2026

**Site independente do ORICSE.** Usa os logos originais fornecidos pelo proprietário em `brand-originais/`. Imagens WebP em `public/assets/` são apenas versões comprimidas para web.

## Publicação recomendada: Cloudflare Workers + GitHub

1. Crie um repositório GitHub novo chamado `dircetec`, sem arquivos pré-criados. **Não use o repositório do ORICSE.**
2. Envie os arquivos deste projeto para o repositório na branch `main`.
3. No [Cloudflare Dashboard](https://dash.cloudflare.com/), entre em **Workers & Pages > Create application > GitHub**. Conecte apenas o repositório `dircetec`.
4. Mantenha o nome do projeto `dircetec` igual ao `name` definido em `wrangler.jsonc`. Selecione branch `main` e diretório raiz `/`.
5. Se houver campo **Build command**, deixe vazio (site estático). Em **Deploy command**, use `npx wrangler deploy`.
6. Clique em **Save and Deploy**, confira a URL `*.workers.dev` informada na tela e teste: página inicial, `/privacidade.html`, assets e URL inexistente (404).

A conexão nativa GitHub → Cloudflare evita adicionar token da Cloudflare nos segredos do GitHub e permite deploy automático ao atualizar a branch principal.

## Testes e execução

```sh
npm install
npm run check
npm run dev
```

Para publicar via terminal se já tiver autorizado sua conta: `npm run deploy`. Não inclua tokens em arquivos nem mensagens.

## Conteúdo

- `public/index.html` — site institucional com logo original, serviços, ORICSE, pilares e contato.
- `public/privacidade.html` — aviso de privacidade do site estático.
- `public/404.html` — resposta customizada para URLs ausentes.
- `public/assets/` — identidade digital comprimida e arquivos estáticos.
- `brand-originais/` — três arquivos PNG exatamente como enviados, sem alterações.
- `public/_headers` — cabeçalhos de proteção básicos e cache.
- `wrangler.jsonc` — Worker Static Assets.

## Pendências de negócio

A ligação `mailto:` utiliza **atendimento@oricse.com.br** como canal provisório informado, e está sinalizada como tal no site. Troque por e-mail institucional da DIRCE quando estiver disponível. Ainda não há domínio próprio definido para o site. O site não tem formulário, banco de dados, contas de usuário ou pagamentos.

## Segurança operacional

Não altere Workers, rotas, DNS ou repositórios do ORICSE. Antes de conectar domínio próprio, confirme que ele pertence à DIRCE e não conflita com outro serviço.
