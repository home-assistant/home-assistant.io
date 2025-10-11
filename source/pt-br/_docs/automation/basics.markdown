---
title: "Noções Básicas de Automação"
description: "Uma introdução aos conceitos básicos de automação no Home Assistant."
---

As automações no Home Assistant permitem que você automatize seu sistema respondendo a eventos. Por exemplo, você pode criar uma automação que liga as luzes quando o sol se põe ou envia uma notificação quando um sensor de movimento é acionado.

## Componentes de uma automação

Uma automação consiste em três partes principais:

- **Gatilho:** Um gatilho é um evento que inicia a automação. Por exemplo, um gatilho pode ser o acionamento de um sensor de movimento, o pressionamento de um botão ou uma hora específica do dia.
- **Condição:** Uma condição é um teste que o Home Assistant executa antes de executar a ação da automação. Se a condição for verdadeira, a ação será executada. Se a condição for falsa, a ação não será executada.
- **Ação:** Uma ação é uma tarefa que o Home Assistant executa quando a automação é acionada e a condição é atendida. Por exemplo, uma ação pode ser ligar uma luz, enviar uma notificação ou ajustar um termostato.

## Criando uma automação

Você pode criar automações na seção de configuração do Home Assistant. A interface do usuário irá guiá-lo através do processo de criação de uma automação, permitindo que você especifique o gatilho, a condição e a ação.

Você também pode criar automações editando o arquivo `automations.yaml` em seu diretório de configuração do Home Assistant.

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

Neste exemplo:

- O **gatilho** é o estado da entidade `binary_sensor.motion_sensor_office` mudando para `on`.
- Não há **condição**, então a ação sempre será executada quando o gatilho for acionado.
- A **ação** é chamar o serviço `light.turn_on` para ligar a entidade `light.office_light`.

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre como criar automações, incluindo uma lista de todos os gatilhos, condições e ações disponíveis.
