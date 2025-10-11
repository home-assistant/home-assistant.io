---
title: "YAML"
description: "Uma introdução ao YAML e como ele é usado no Home Assistant."
---

YAML (YAML Ain't Markup Language) é um formato de serialização de dados legível por humanos. É comumente usado para arquivos de configuração e em aplicações onde os dados estão sendo armazenados ou transmitidos.

No Home Assistant, o YAML é usado para configurar a maioria dos aspectos do seu sistema, incluindo automações, scripts, cenas e integrações.

## Sintaxe YAML

O YAML usa indentação para indicar a estrutura dos dados. A indentação é feita com espaços, não com tabulações.

O YAML tem dois tipos principais de estruturas:

- **Mapeamentos (dicionários):** Mapeamentos são coleções de pares chave-valor. Cada par chave-valor está em sua própria linha, e a chave e o valor são separados por dois pontos.
- **Listas (arrays):** Listas são coleções de itens. Cada item em uma lista está em sua própria linha e é precedido por um hífen.

## Exemplo de YAML

Aqui está um exemplo de um arquivo YAML simples que define uma automação no Home Assistant:

```yaml
- alias: Ligar a luz do escritório quando houver movimento
  trigger:
    - platform: state
      entity_id: binary_sensor.motion_sensor_office
      to: 'on'
  action:
    - service: light.turn_on
      target:
        entity_id: light.office_light
```

Neste exemplo:

- A automação é um item em uma lista.
- A automação tem três chaves: `alias`, `trigger` e `action`.
- A chave `trigger` tem uma lista de gatilhos como seu valor.
- A chave `action` tem uma lista de ações como seu valor.

## Editando arquivos YAML

Você pode editar seus arquivos de configuração YAML usando qualquer editor de texto. No entanto, é recomendado usar um editor que suporte o realce de sintaxe YAML, pois isso pode ajudar a evitar erros.

O Home Assistant também inclui um editor de arquivos integrado que você pode usar para editar seus arquivos de configuração a partir da interface do usuário.

## Validando arquivos YAML

Antes de reiniciar o Home Assistant, é uma boa ideia validar seus arquivos de configuração para garantir que eles não contenham nenhum erro.

Você pode fazer isso navegando até a seção "Controles do Servidor" em suas ferramentas de desenvolvedor e clicando no botão "Verificar Configuração".

Se houver erros em seus arquivos de configuração, o Home Assistant irá informá-lo para que você possa corrigi-los.

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre como usar o YAML, incluindo exemplos de como configurar diferentes integrações.
