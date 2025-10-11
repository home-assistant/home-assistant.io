---
title: "Condições de Automação"
description: "Como usar condições para controlar suas automações."
---

As condições em automações permitem que você execute ações apenas se certos critérios forem atendidos. Isso permite que você crie automações mais poderosas e flexíveis.

## Tipos de condições

Existem muitos tipos diferentes de condições que você pode usar em suas automações, incluindo:

- **Estado:** Verifica o estado de uma entidade.
- **Estado numérico:** Verifica o estado numérico de uma entidade.
- **Sol:** Verifica a posição do sol.
- **Zona:** Verifica se um dispositivo está em uma zona específica.
- **Hora:** Verifica a hora atual.
- **Modelo:** Usa um modelo para criar uma condição personalizada.

## Múltiplas condições

Você pode usar várias condições em uma automação. Por padrão, todas as condições devem ser verdadeiras para que a ação seja executada.

Você também pode usar as condições `e`, `ou` e `não` para criar uma lógica mais complexa.

## Exemplo de condição

Aqui está um exemplo de uma automação que usa uma condição para ligar uma luz apenas se for depois do pôr do sol:

```yaml
- alias: Ligar a luz da varanda ao pôr do sol
  trigger:
    - platform: state
      entity_id: binary_sensor.motion_sensor_porch
      to: 'on'
  condition:
    - condition: sun
      after: sunset
  action:
    - service: light.turn_on
      target:
        entity_id: light.porch_light
```

Neste exemplo:

- O **gatilho** é o estado da entidade `binary_sensor.motion_sensor_porch` mudando para `on`.
- A **condição** é que o sol já tenha se posto.
- A **ação** é chamar o serviço `light.turn_on` para ligar a entidade `light.porch_light`.

## Usando modelos em condições

Você também pode usar modelos para criar condições mais complexas. Os modelos permitem que você crie condições personalizadas com base no estado do seu sistema.

Por exemplo, você poderia usar um modelo para verificar se a temperatura externa está acima de um determinado limite antes de ligar o ar condicionado.

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre como usar condições em suas automações, incluindo uma lista de todos os tipos de condição disponíveis.
