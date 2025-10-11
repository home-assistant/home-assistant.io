---
title: "Gatilhos de Automação"
description: "Como usar gatilhos para iniciar suas automações."
---

Os gatilhos são a parte de uma automação que a inicia. Por exemplo, um gatilho pode ser o acionamento de um sensor de movimento, o pressionamento de um botão ou uma hora específica do dia.

## Tipos de gatilhos

Existem muitos tipos diferentes de gatilhos que você pode usar em suas automações, incluindo:

- **Estado:** Dispara quando o estado de uma entidade muda.
- **Estado numérico:** Dispara quando o estado numérico de uma entidade cruza um limite.
- **Sol:** Dispara ao nascer ou pôr do sol.
- **Zona:** Dispara quando um dispositivo entra ou sai de uma zona.
- **Hora:** Dispara em um horário específico do dia.
- **Padrão de tempo:** Dispara em um padrão de tempo recorrente, como a cada 5 minutos.
- **Evento:** Dispara quando um evento específico é disparado.
- **Webhook:** Dispara quando uma solicitação da web é recebida em um URL específico.
- **MQTT:** Dispara quando uma mensagem é recebida em um tópico MQTT específico.
- **Modelo:** Usa um modelo para criar um gatilho personalizado.

## Múltiplos gatilhos

Você pode usar vários gatilhos em uma automação. Se qualquer um dos gatilhos for acionado, a automação será executada.

## ID do gatilho

Você pode atribuir um ID a cada gatilho em uma automação. Isso permite que você identifique qual gatilho iniciou a automação.

O ID do gatilho está disponível na variável `trigger.id` em suas ações e condições.

## Exemplo de gatilho

Aqui está um exemplo de uma automação que usa um gatilho de estado para ligar uma luz quando um sensor de movimento é acionado:

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

Neste exemplo, o gatilho é o estado da entidade `binary_sensor.motion_sensor_office` mudando para `on`.

## Usando modelos em gatilhos

Você também pode usar modelos para criar gatilhos mais complexos. Os modelos permitem que você crie gatilhos personalizados com base no estado do seu sistema.

Por exemplo, você poderia usar um modelo para disparar uma automação quando a temperatura externa subir acima de um determinado limite.

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre como usar gatilhos em suas automações, incluindo uma lista de todos os tipos de gatilho disponíveis.
