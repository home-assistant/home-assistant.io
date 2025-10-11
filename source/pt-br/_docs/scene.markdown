---
title: "Cenas"
description: "Como usar cenas para definir os estados de seus dispositivos."
---

As cenas no Home Assistant permitem que você capture os estados de seus dispositivos e os restaure posteriormente. Isso é útil para criar diferentes modos de iluminação ou para definir sua casa em um estado específico.

## Criando uma cena

Você pode criar uma cena na seção de configuração do Home Assistant. Ao criar uma cena, você pode escolher quais dispositivos e entidades incluir na cena.

Para cada dispositivo e entidade, você pode especificar o estado em que ele deve estar quando a cena for ativada. Por exemplo, você pode especificar que uma luz deve estar acesa e definida com uma cor específica.

## Ativando uma cena

Depois de criar uma cena, você pode ativá-la a partir da interface do usuário, de uma automação ou de um script.

Quando você ativa uma cena, o Home Assistant restaurará os estados dos dispositivos e entidades na cena para os estados que você especificou ao criar a cena.

## Editando uma cena

Você pode editar uma cena a qualquer momento na seção de configuração do Home Assistant. Você pode adicionar ou remover dispositivos e entidades da cena, e pode alterar os estados dos dispositivos e entidades na cena.

## Usando cenas em automações

As cenas são especialmente úteis em automações. Por exemplo, você pode criar uma automação que ativa uma cena "Boa noite" quando você vai para a cama. Esta cena pode desligar todas as luzes, trancar as portas e ajustar o termostato para uma temperatura confortável.

## Cenas dinâmicas

Você também pode criar cenas dinâmicas que capturam os estados atuais de seus dispositivos. Isso é útil para criar uma cena que corresponda ao estado atual de sua casa.

Para criar uma cena dinâmica, você pode usar o serviço `scene.create`. Este serviço criará uma nova cena com base nos estados atuais de seus dispositivos.

## Transições

Ao ativar uma cena, você pode especificar um tempo de transição. Isso fará com que os dispositivos na cena façam a transição para seus novos estados ao longo do tempo especificado.

Por exemplo, você pode especificar um tempo de transição de 5 segundos ao ativar uma cena de iluminação. Isso fará com que as luzes diminuam ou aumentem gradualmente para seus novos brilhos ao longo de 5 segundos.
