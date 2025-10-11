---
title: "Automação YAML"
description: "Como criar automações usando YAML."
---

Embora o editor de automação seja a maneira mais fácil de criar e editar automações, você também pode criar automações usando YAML. Isso é útil para automações mais complexas ou se você preferir trabalhar com código.

## O arquivo `automations.yaml`

As automações são armazenadas no arquivo `automations.yaml` em seu diretório de configuração do Home Assistant. Cada automação é representada por um item em uma lista.

## Sintaxe da automação

Cada automação tem as seguintes chaves:

- **alias:** (Opcional) Um nome amigável para a automação.
- **description:** (Opcional) Uma descrição do que a automação faz.
- **trigger:** (Obrigatório) Uma lista de gatilhos que iniciam a automação.
- **condition:** (Opcional) Uma lista de condições que devem ser atendidas para que a ação seja executada.
- **action:** (Obrigatório) Uma lista de ações a serem executadas quando a automação for acionada e as condições forem atendidas.
- **mode:** (Opcional) O modo de automação.
- **id:** (Opcional) Um ID exclusivo para a automação.

## Exemplo de automação

Aqui está um exemplo de uma automação simples que liga uma luz quando um sensor de movimento é acionado:

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

## Recarregando automações

Depois de fazer alterações em seu arquivo `automations.yaml`, você precisará recarregar suas automações para que as alterações entrem em vigor.

Você pode fazer isso navegando até a seção "Controles do Servidor" em suas ferramentas de desenvolvedor e clicando no botão "Recarregar Automações".

## Dividindo sua configuração

Se você tiver muitas automações, pode ser útil dividir sua configuração em vários arquivos. Isso pode ajudar a manter suas automações organizadas e mais fáceis de gerenciar.

Você pode fazer isso usando a diretiva `!include` em seu arquivo `configuration.yaml`. Por exemplo, você poderia criar um diretório chamado `automations` e, em seguida, criar arquivos separados para cada uma de suas automações.

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre como criar automações usando YAML, incluindo uma lista de todos os gatilhos, condições e ações disponíveis.
