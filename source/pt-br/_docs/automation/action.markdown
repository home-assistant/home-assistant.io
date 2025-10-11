---
title: "Ações de Automação"
description: "Como usar ações em suas automações."
---

As ações são a parte de uma automação que executa uma tarefa. Por exemplo, uma ação pode ser ligar uma luz, enviar uma notificação ou ajustar um termostato.

## Chamando um serviço

A ação mais comum é chamar um serviço. Os serviços são funções que os componentes do Home Assistant expõem.

Para chamar um serviço, você precisa especificar o nome do serviço e quaisquer dados que o serviço exija. Por exemplo, para ligar uma luz, você chamaria o serviço `light.turn_on` e especificaria o `entity_id` da luz que deseja ligar.

## Atraso

A ação de atraso pausará a execução da automação por um período de tempo especificado. Isso é útil para criar automações que precisam esperar que algo aconteça antes de continuar.

## Espera

A ação de espera pausará a execução da automação até que uma determinada condição seja atendida. Isso é útil para criar automações que precisam esperar por um evento específico antes de continuar.

## Condição

A ação de condição permite que você execute ações apenas se uma determinada condição for atendida. Isso é útil para criar automações que se comportam de maneira diferente dependendo do estado do seu sistema.

## Evento

A ação de evento permite que você dispare um evento. Os eventos podem ser usados para acionar outras automações ou para indicar a outras integrações que algo está acontecendo.

## Escolha

A ação de escolha permite que você execute diferentes sequências de ações com base em uma condição. Isso é útil para criar automações complexas que podem se comportar de maneira diferente dependendo do estado do seu sistema.

## Repetir

A ação de repetir permite que você execute uma sequência de ações várias vezes. Isso é útil para criar automações que precisam executar a mesma tarefa várias vezes.

## Cena

A ação de cena permite que você ative uma cena. As cenas são um conjunto de estados de entidade que você pode salvar e restaurar.

## Script

A ação de script permite que você execute um script. Os scripts são sequências de ações que você pode executar sob demanda.
