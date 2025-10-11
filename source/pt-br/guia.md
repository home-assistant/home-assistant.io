# Guia de Tradução para o Home Assistant em Português do Brasil

Olá! Este guia foi criado para ajudar você a traduzir o conteúdo do site e da documentação do Home Assistant para o Português do Brasil. Sua contribuição é muito importante para a comunidade!

## Estrutura de Arquivos

- A pasta `source/` contém todos os arquivos originais em Inglês.
- A pasta `source/pt-br/` contém todos os arquivos traduzidos para o Português do Brasil.

Para traduzir um arquivo, você deve replicar a mesma estrutura de pastas do diretório `source/` dentro do diretório `source/pt-br/`.

**Exemplo:**
O arquivo original `source/_docs/automation.markdown` deve ser traduzido e salvo como `source/pt-br/_docs/automation.markdown`.

## Como Traduzir

1.  **Escolha um arquivo:** Encontre um arquivo dentro de `source/` que ainda não tenha uma versão correspondente em `source/pt-br/`.
2.  **Crie o novo arquivo:** Crie um novo arquivo com o mesmo nome e na mesma estrutura de pastas dentro de `source/pt-br/`.
3.  **Copie o conteúdo:** Copie todo o conteúdo do arquivo original para o novo arquivo que você criou.
4.  **Traduza o texto:** Com o conteúdo copiado, traduza apenas os textos que são visíveis para o usuário.

### O que Traduzir

- Títulos e descrições no cabeçalho do arquivo (frontmatter).
- Textos corridos, parágrafos e listas.
- Conteúdo dentro de avisos e notas (`{% warning %}`, `{% note %}`).
- O texto alternativo de imagens (`alt='...'`).

**Exemplo de Cabeçalho (Frontmatter):**

**Original:**
```markdown
---
title: "Authentication"
description: "Documentation on authentication in Home Assistant."
---
```

**Traduzido:**
```markdown
---
title: "Autenticação"
description: "Documentação sobre autenticação no Home Assistant."
---
```

### O que NÃO Traduzir

- **Código:** Blocos de código, nomes de variáveis, comandos.
- **Nomes das chaves no cabeçalho:** Não traduza `title:`, `description:`, etc.
- **Tags e links:** Não altere URLs, links para outras páginas ou tags como `{% warning %}`.
- **Nomes de arquivos e caminhos:** Mantenha os nomes de arquivos e caminhos de imagens os mesmos.

## Uma Nota Sobre a Pasta `_integrations`

A pasta `source/_integrations` contém mais de 1300 arquivos. A tradução desta pasta é uma tarefa grande e pode ser difícil de realizar em alguns ambientes de desenvolvimento online devido a limitações no número de arquivos que podem ser modificados de uma só vez.

Se você deseja ajudar a traduzir as integrações, recomendamos que configure um ambiente de desenvolvimento local em seu computador. Isso permitirá que você trabalhe com um grande número de arquivos sem encontrar erros.

Obrigado por sua contribuição!
