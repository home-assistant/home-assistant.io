---
title: "Scripts"
description: "Como usar scripts para criar automações complexas."
---

Os scripts no Home Assistant permitem que você crie sequências de ações que podem ser executadas sob demanda. Isso é útil para criar automações complexas ou para executar uma série de ações com um único clique.

## Criando um script

Você pode criar um script na seção de configuração do Home Assistant. Ao criar um script, você pode adicionar uma sequência de ações a serem executadas.

As ações em um script podem ser qualquer uma das ações disponíveis no Home Assistant, como ligar uma luz, enviar uma notificação ou ajustar um termostato.

## Executando um script

Depois de criar um script, você pode executá-lo a partir da interface do usuário, de uma automação ou de outro script.

Quando você executa um script, o Home Assistant executará as ações no script em ordem, uma após a outra.

## Passando variáveis para scripts

Você pode passar variáveis para scripts ao executá-los. Isso permite que você crie scripts mais flexíveis que podem se comportar de maneira diferente dependendo das variáveis que você passa.

Por exemplo, você pode criar um script que liga uma luz e define seu brilho para um valor específico. Você pode então passar o brilho como uma variável ao executar o script.

## Usando scripts em automações

Os scripts são especialmente úteis em automações. Por exemplo, você pode criar uma automação que executa um script "Hora de dormir" quando você vai para a cama. Este script pode desligar todas as luzes, trancar as portas e ajustar o termostato para uma temperatura confortável.

## Scripts vs. Cenas

Scripts e cenas são semelhantes, pois ambos permitem que você defina um conjunto de estados para seus dispositivos. No entanto, existem algumas diferenças importantes.

As cenas são projetadas para capturar os estados de seus dispositivos em um determinado momento. Os scripts, por outro lado, são projetados para executar uma sequência de ações.

As cenas são úteis para criar diferentes modos de iluminação ou para definir sua casa em um estado específico. Os scripts são úteis para criar automações complexas ou para executar uma série de ações com um único clique.

## Atrasos e esperas

Você pode adicionar atrasos e esperas aos seus scripts. Os atrasos pausarão a execução do script por um período de tempo especificado. As esperas pausarão a execução do script até que uma determinada condição seja atendida.

Atrasos e esperas são úteis para criar scripts que precisam esperar que algo aconteça antes de continuar.

## Escolhas e condições

Você pode usar escolhas e condições para adicionar lógica aos seus scripts. As escolhas permitem que você execute diferentes ações com base em uma condição. As condições permitem que você execute ações apenas se uma determinada condição for atendida.

Escolhas e condições são úteis para criar scripts que podem se comportar de maneira diferente dependendo do estado do seu sistema.
