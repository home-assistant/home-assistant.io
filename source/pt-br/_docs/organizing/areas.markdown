---
title: "Áreas"
description: "Como usar áreas para organizar seus dispositivos."
---

As áreas no Home Assistant permitem que você agrupe seus dispositivos por sala ou outra área em sua casa. Isso pode tornar mais fácil encontrar e controlar seus dispositivos.

## Criando uma área

Você pode criar áreas na seção "Áreas & Zonas" de sua configuração do Home Assistant.

Para criar uma nova área, clique no botão "Adicionar Área". Você será solicitado a dar um nome à área. Você também pode adicionar um alias e uma imagem à área.

## Atribuindo dispositivos a áreas

Depois de criar uma área, você pode atribuir dispositivos a ela. Para fazer isso, vá para a página do dispositivo do dispositivo que deseja atribuir e selecione a área no menu suspenso "Área".

Você também pode atribuir entidades a áreas. Para fazer isso, vá para a página de configurações da entidade e selecione a área no menu suspenso "Área".

## Usando áreas em automações

As áreas podem ser usadas em automações para controlar todos os dispositivos em uma área ao mesmo tempo. Por exemplo, você poderia criar uma automação que desliga todas as luzes da sala de estar quando você sai de casa.

Para fazer isso, você usaria o `area_id` em suas ações. Por exemplo, para desligar todas as luzes da sala de estar, você usaria a seguinte ação:

```yaml
action:
  - service: light.turn_off
    target:
      area_id: living_room
```

## Cartão de área

O cartão de área é um cartão Lovelace que exibe todos os dispositivos em uma área. Isso pode ser uma maneira conveniente de ver e controlar todos os dispositivos em uma sala.

Para usar o cartão de área, adicione-o ao seu painel Lovelace e especifique o `area_id` da área que deseja exibir.

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre como usar áreas, incluindo exemplos de como usar áreas em automações e como configurar o cartão de área.
