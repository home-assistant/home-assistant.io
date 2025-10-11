---
title: "Entidades e Domínios"
description: "Uma explicação sobre entidades e domínios no Home Assistant."
---

No Home Assistant, tudo é representado como uma entidade. Uma entidade é um pedaço de dados que representa um dispositivo, um serviço ou alguma outra informação.

## IDs de Entidade

Cada entidade tem um ID de entidade exclusivo, que é usado para identificá-la no Home Assistant. Os IDs de entidade consistem em duas partes: o domínio e o nome do objeto, separados por um ponto.

Por exemplo, o ID de entidade para uma luz chamada "Luz do Escritório" pode ser `light.office_light`. Neste caso, `light` é o domínio e `office_light` é o nome do objeto.

## Domínios

Os domínios são usados para agrupar entidades do mesmo tipo. Por exemplo, todas as entidades de luz pertencem ao domínio `light`, e todas as entidades de interruptor pertencem ao domínio `switch`.

Existem muitos domínios diferentes no Home Assistant, cada um com seu próprio conjunto de serviços e atributos.

## Nomes de Objetos

O nome do objeto é um nome exclusivo para uma entidade dentro de seu domínio. Por exemplo, se você tiver duas luzes, elas não podem ter o mesmo nome de objeto.

## Estados e Atributos

Cada entidade tem um estado e um conjunto de atributos. O estado representa o valor atual da entidade, como "ligado" ou "desligado" para uma luz.

Os atributos são informações adicionais sobre a entidade, como o brilho de uma luz ou a temperatura de um sensor.

Você pode ver o estado e os atributos de todas as suas entidades na ferramenta de desenvolvedor "Estados".

## Serviços

Os serviços são funções que os componentes do Home Assistant expõem. Você pode chamar serviços em suas automações para controlar seus dispositivos e executar outras tarefas.

Cada domínio tem seu próprio conjunto de serviços. Por exemplo, o domínio `light` tem serviços como `turn_on`, `turn_off` e `toggle`.

Você pode ver uma lista de todos os serviços disponíveis na ferramenta de desenvolvedor "Serviços".

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre entidades e domínios, incluindo uma lista de todos os domínios disponíveis e seus serviços.
