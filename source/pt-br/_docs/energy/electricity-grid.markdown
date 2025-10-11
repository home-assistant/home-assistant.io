---
title: "Rede Elétrica"
description: "Como integrar sua rede elétrica com o gerenciamento de energia do Home Assistant."
---

Você pode integrar sua rede elétrica com o recurso de gerenciamento de energia do Home Assistant para monitorar seu consumo de energia e os custos associados.

## Sensores necessários

Para integrar sua rede elétrica, você precisará de sensores que meçam o seguinte:

- **Energia consumida da rede:** Este sensor deve medir a quantidade de energia que você consumiu da rede. A unidade de medida deve ser kWh.
- **Energia devolvida à rede:** Se você tiver um sistema de energia solar ou outra forma de geração de energia, este sensor deve medir a quantidade de energia que você devolveu à rede. A unidade de medida deve ser kWh.
- **Preço da eletricidade:** Este sensor deve fornecer o preço atual da eletricidade. A unidade de medida deve ser sua moeda local por kWh.

## Configurando a rede elétrica

Depois de ter os sensores necessários, você pode configurar sua rede elétrica na seção de energia de sua configuração do Home Assistant.

Você precisará selecionar os sensores para energia consumida da rede e energia devolvida à rede. Você também precisará selecionar o sensor para o preço da eletricidade.

## O que você obtém

Depois de configurar sua rede elétrica, o Home Assistant começará a rastrear seu consumo de energia e os custos associados.

O painel de energia mostrará um gráfico do seu consumo de energia ao longo do tempo. Ele também mostrará um detalhamento de quanta energia você consumiu da rede e quanta energia você devolveu à rede.

O painel de energia também mostrará seu custo de eletricidade ao longo do tempo. Essas informações podem ser úteis para entender seus padrões de consumo de energia e para identificar oportunidades para economizar dinheiro.

## Tarifas estáticas vs. em tempo real

Você pode configurar o Home Assistant para usar uma tarifa de eletricidade estática ou uma tarifa em tempo real.

Uma tarifa estática é um preço fixo por kWh. Uma tarifa em tempo real é um preço que muda ao longo do dia com base na oferta e na demanda.

Se você tiver uma tarifa em tempo real, precisará de um sensor que forneça o preço atual da eletricidade. Se você tiver uma tarifa estática, poderá inserir o preço manualmente.

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre como integrar sua rede elétrica com o recurso de gerenciamento de energia.
