---
title: "Modelagem"
description: "Como usar modelos para criar configurações dinâmicas."
---

A modelagem no Home Assistant permite que você crie configurações dinâmicas que podem mudar com base no estado do seu sistema. Os modelos são uma maneira poderosa de personalizar seu sistema Home Assistant.

## O que é um modelo?

Um modelo é um pedaço de texto que é avaliado pelo Home Assistant. O modelo pode conter espaços reservados que são substituídos por valores do estado atual do seu sistema.

Por exemplo, você poderia usar um modelo para criar uma notificação que inclua o nome da pessoa que acabou de chegar em casa.

## Sintaxe do modelo

Os modelos no Home Assistant usam a linguagem de modelagem Jinja2. Jinja2 é uma linguagem de modelagem poderosa e flexível que é amplamente utilizada em aplicações web.

A sintaxe básica para um modelo é `{{ expression }}`. A expressão dentro das chaves duplas é avaliada pelo Home Assistant, e o resultado é inserido no texto.

## Acessando estados e atributos

Você pode acessar os estados e atributos das entidades em seus modelos usando a função `states()`.

Por exemplo, para obter o estado da entidade `light.office_light`, você usaria o seguinte modelo:

```jinja2
{{ states('light.office_light') }}
```

Para obter o valor do atributo `brightness` da mesma entidade, você usaria o seguinte modelo:

```jinja2
{{ state_attr('light.office_light', 'brightness') }}
```

## Usando modelos em automações

Você pode usar modelos em muitos lugares diferentes em suas automações, incluindo:

- **Dados de serviço:** Você pode usar modelos para passar dados dinâmicos para serviços.
- **Condições:** Você pode usar modelos para criar condições personalizadas.
- **Gatilhos:** Você pode usar modelos para criar gatilhos personalizados.
- **Nomes de entidades:** Você pode usar modelos para criar nomes de entidades dinâmicos.

## Ferramenta de desenvolvedor de modelos

O Home Assistant inclui uma ferramenta de desenvolvedor de modelos que você pode usar para testar seus modelos em tempo real. Esta ferramenta é uma ótima maneira de experimentar modelos e ver como eles se comportam.

Você pode acessar a ferramenta de desenvolvedor de modelos na seção de configuração do Home Assistant.

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre como usar modelos, incluindo uma lista de todas as funções e filtros disponíveis.
