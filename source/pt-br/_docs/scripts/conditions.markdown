---
title: "Condições de Script"
description: "Como usar condições em seus scripts."
---

As condições em scripts permitem que você execute ações apenas se certos critérios forem atendidos. Isso permite que você crie scripts mais poderosos e flexíveis.

## Tipos de condições

Os mesmos tipos de condições que estão disponíveis em automações também estão disponíveis em scripts. Isso inclui:

- **Estado:** Verifica o estado de uma entidade.
- **Estado numérico:** Verifica o estado numérico de uma entidade.
- **Sol:** Verifica a posição do sol.
- **Zona:** Verifica se um dispositivo está em uma zona específica.
- **Hora:** Verifica a hora atual.
- **Modelo:** Usa um modelo para criar uma condição personalizada.

## Múltiplas condições

Você pode usar várias condições em um script. Por padrão, todas as condições devem ser verdadeiras para que as ações após a condição sejam executadas.

Você também pode usar as condições `e`, `ou` e `não` para criar uma lógica mais complexa.

## Exemplo de condição

Aqui está um exemplo de um script que usa uma condição para ligar uma luz apenas se for depois do pôr do sol:

```yaml
- alias: Ligar a luz da varanda
  sequence:
    - condition: sun
      after: sunset
    - service: light.turn_on
      target:
        entity_id: light.porch_light
```

Neste exemplo, o script primeiro verificará se o sol já se pôs. Se a condição for verdadeira, o script continuará a executar a próxima ação, que é ligar a luz da varanda. Se a condição for falsa, o script irá parar.

## Usando modelos em condições

Você também pode usar modelos para criar condições mais complexas. Os modelos permitem que você crie condições personalizadas com base no estado do seu sistema.

Por exemplo, você poderia usar um modelo para verificar se a temperatura externa está acima de um determinado limite antes de ligar o ar condicionado.

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre como usar condições em seus scripts, incluindo uma lista de todos os tipos de condição disponíveis.
