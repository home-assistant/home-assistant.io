---
title: "hass"
description: "O script de linha de comando `hass`."
---

O script de linha de comando `hass` é uma ferramenta poderosa que permite que você interaja com sua instância do Home Assistant a partir da linha de comando.

## Usando `hass`

Para usar o script `hass`, você precisará abrir um terminal e navegar até o diretório onde o Home Assistant está instalado. A partir daqui, você pode executar o script usando o seguinte comando:

```bash
hass
```

## Comandos

O script `hass` tem vários comandos diferentes que você pode usar:

- **--version:** Mostra a versão atual do Home Assistant.
- **--config:** Especifica o diretório de configuração a ser usado.
- **--debug:** Ativa o modo de depuração.
- **--open-ui:** Abre a interface do usuário do Home Assistant em seu navegador da web.
- **--script:** Executa um script.

## Executando scripts

Você pode usar o script `hass` para executar scripts a partir da linha de comando. Para fazer isso, você usará o comando `--script` seguido do nome do script que deseja executar.

Por exemplo, para executar o script `check_config`, você usaria o seguinte comando:

```bash
hass --script check_config
```

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre o script de linha de comando `hass`, incluindo uma lista de todos os comandos e opções disponíveis.
