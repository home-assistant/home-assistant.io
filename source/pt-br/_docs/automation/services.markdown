---
title: "Serviços de Automação"
description: "Como usar serviços em suas automações."
---

Os serviços no Home Assistant são funções que os componentes expõem. Você pode chamar serviços em suas automações para controlar seus dispositivos e executar outras tarefas.

## Chamando um serviço

Para chamar um serviço, você precisa especificar o nome do serviço e quaisquer dados que o serviço exija.

O nome do serviço consiste em duas partes: o domínio e o nome do serviço, separados por um ponto. Por exemplo, o serviço para ligar uma luz está no domínio `light` e é chamado `turn_on`. O nome completo do serviço é `light.turn_on`.

Os dados que um serviço exige dependem do serviço. Por exemplo, o serviço `light.turn_on` exige um `entity_id` para especificar qual luz ligar.

## Encontrando serviços disponíveis

Você pode encontrar uma lista de todos os serviços disponíveis na ferramenta de desenvolvedor "Serviços". Esta ferramenta também permite que você teste os serviços chamando-os com diferentes dados.

## Usando serviços em automações

Você pode chamar serviços em suas automações usando a ação `service`. Por exemplo, para ligar uma luz em uma automação, você usaria a seguinte ação:

```yaml
action:
  - service: light.turn_on
    target:
      entity_id: light.office_light
```

## Passando dados para serviços

Você pode passar dados para serviços usando a chave `data`. Por exemplo, para definir o brilho de uma luz, você usaria a seguinte ação:

```yaml
action:
  - service: light.turn_on
    target:
      entity_id: light.office_light
    data:
      brightness: 255
```

## Usando modelos em dados de serviço

Você pode usar modelos para passar dados dinâmicos para serviços. Por exemplo, você poderia usar um modelo para definir a cor de uma luz com base na temperatura externa.

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre como usar serviços em suas automações, incluindo uma lista de todos os serviços disponíveis e seus dados necessários.
