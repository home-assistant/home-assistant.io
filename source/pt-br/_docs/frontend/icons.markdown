---
title: "Ícones"
description: "Como usar ícones no Home Assistant."
---

Você pode usar ícones no Home Assistant para personalizar a aparência de suas entidades e outros elementos da interface do usuário.

## Ícones do Material Design

O Home Assistant usa os ícones do Material Design por padrão. Você pode encontrar uma lista de todos os ícones disponíveis no site do [Material Design Icons](https://materialdesignicons.com/).

Para usar um ícone, você precisa especificar seu nome, prefixado com `mdi:`. Por exemplo, para usar o ícone de termômetro, você usaria `mdi:thermometer`.

## Usando ícones

Você pode usar ícones em muitos lugares diferentes no Home Assistant, incluindo:

- **Personalização de entidades:** Você pode definir um ícone personalizado para uma entidade usando a seção `customize` em seu arquivo `configuration.yaml`.
- **Cartões do Lovelace:** Muitos cartões do Lovelace permitem que você especifique um ícone a ser usado.
- **Modelos:** Você pode usar modelos para definir ícones dinamicamente com base no estado do seu sistema.

## Ícones personalizados

Se você não conseguir encontrar um ícone que atenda às suas necessidades no conjunto de ícones do Material Design, você também pode usar ícones personalizados.

Para usar ícones personalizados, você precisará criar um diretório `www` em seu diretório de configuração e, em seguida, criar um subdiretório `icons` dentro dele. Você pode então colocar seus arquivos de ícone personalizados neste diretório.

Seus arquivos de ícone personalizados devem estar no formato SVG.

Depois de adicionar seus ícones personalizados, você pode usá-los em sua configuração especificando seu nome, prefixado com `local:`. Por exemplo, se você tiver um ícone chamado `my_custom_icon.svg`, você o usaria da seguinte forma: `local:my_custom_icon`.

## Ícones animados

Você também pode usar ícones animados no Home Assistant. Os ícones animados são uma ótima maneira de adicionar algum interesse visual à sua interface do usuário.

Existem vários conjuntos de ícones animados disponíveis para o Home Assistant, ou você pode criar o seu próprio.

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre como usar ícones, incluindo exemplos de como usar ícones personalizados e animados.
