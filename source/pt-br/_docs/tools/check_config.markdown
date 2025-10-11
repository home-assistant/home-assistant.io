---
title: "Verificar Configuração"
description: "Como usar a ferramenta de verificação de configuração para validar sua configuração."
---

A ferramenta de verificação de configuração no Home Assistant permite que você valide seus arquivos de configuração em busca de erros antes de reiniciar o Home Assistant.

## Usando a ferramenta de verificação de configuração

Você pode encontrar a ferramenta de verificação de configuração na seção "Controles do Servidor" em suas ferramentas de desenvolvedor.

Para usar a ferramenta, basta clicar no botão "Verificar Configuração". O Home Assistant irá então verificar seus arquivos de configuração em busca de erros.

Se forem encontrados erros, eles serão exibidos na tela. Você pode então corrigir os erros e executar a verificação de configuração novamente.

Se nenhum erro for encontrado, você verá uma mensagem "Configuração válida!".

## Importância de verificar sua configuração

É importante verificar sua configuração antes de reiniciar o Home Assistant para evitar problemas. Se seus arquivos de configuração contiverem erros, o Home Assistant pode não iniciar corretamente.

A ferramenta de verificação de configuração é uma maneira rápida e fácil de garantir que seus arquivos de configuração sejam válidos.

## Verificando a configuração a partir da linha de comando

Você também pode verificar sua configuração a partir da linha de comando. Para fazer isso, você pode usar o seguinte comando:

```bash
hass --script check_config
```

Este comando verificará seus arquivos de configuração e relatará quaisquer erros que encontrar.

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre como usar a ferramenta de verificação de configuração.
