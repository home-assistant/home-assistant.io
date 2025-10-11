---
title: "Objeto de Estado"
description: "Uma explicação sobre o objeto de estado no Home Assistant."
---

O objeto de estado no Home Assistant representa o estado atual de uma entidade. Ele contém informações como o estado da entidade, seus atributos e quando foi atualizado pela última vez.

## Atributos do objeto de estado

O objeto de estado tem os seguintes atributos:

- **entity_id:** O ID da entidade, como `light.office_light`.
- **state:** O estado atual da entidade, como "ligado" ou "desligado".
- **attributes:** Um dicionário de atributos para a entidade.
- **last_changed:** A data e hora em que a entidade mudou de estado pela última vez.
- **last_updated:** A data e hora em que a entidade foi atualizada pela última vez.
- **context:** Um objeto de contexto que contém informações sobre o que causou a mudança de estado.

## Acessando o objeto de estado

Você pode acessar o objeto de estado para uma entidade em seus modelos e scripts.

Em modelos, você pode usar a função `states()` para obter o objeto de estado para uma entidade. Por exemplo, para obter o objeto de estado para a entidade `light.office_light`, você usaria o seguinte:

```jinja2
{{ states.light.office_light }}
```

Isso retornaria o objeto de estado completo para a entidade.

Você também pode acessar atributos individuais do objeto de estado. Por exemplo, para obter o estado da entidade, você usaria o seguinte:

```jinja2
{{ states.light.office_light.state }}
```

## O atributo `attributes`

O atributo `attributes` é um dicionário de atributos para a entidade. Esses atributos são específicos para o tipo de entidade. Por exemplo, uma entidade de luz pode ter atributos como `brightness` e `rgb_color`, enquanto um sensor de temperatura pode ter atributos como `unit_of_measurement` e `device_class`.

Você pode acessar atributos individuais no dicionário `attributes`. Por exemplo, para obter o brilho de uma luz, você usaria o seguinte:

```jinja2
{{ states.light.office_light.attributes.brightness }}
```

## O objeto de contexto

O objeto de contexto contém informações sobre o que causou a mudança de estado. Isso pode ser útil para depurar automações e scripts.

O objeto de contexto tem os seguintes atributos:

- **id:** Um ID exclusivo para o contexto.
- **parent_id:** O ID do contexto pai, se houver.
- **user_id:** O ID do usuário que causou a mudança de estado, se aplicável.

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre o objeto de estado, incluindo uma lista de todos os atributos disponíveis e como usá-los em seus modelos e scripts.
