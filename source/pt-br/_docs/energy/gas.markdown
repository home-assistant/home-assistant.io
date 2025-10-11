---
title: "Gás"
description: "Como integrar seu consumo de gás com o gerenciamento de energia do Home Assistant."
---

Você pode integrar seu consumo de gás com o recurso de gerenciamento de energia do Home Assistant para monitorar seu uso de gás e os custos associados.

## Sensores necessários

Para integrar seu consumo de gás, você precisará de um sensor que meça seu consumo de gás. A unidade de medida deve ser m³ ou ft³.

Se você não tiver um sensor que meça seu consumo de gás, talvez seja possível criar um usando um contador de pulsos ou lendo seu medidor com uma câmera.

## Configurando o gás

Depois de ter o sensor necessário, você pode configurar seu consumo de gás na seção de energia de sua configuração do Home Assistant.

Você precisará selecionar o sensor para seu consumo de gás. Você também pode inserir o preço do seu gás.

## O que você obtém

Depois de configurar seu consumo de gás, o Home Assistant começará a rastrear seu uso de gás e os custos associados.

O painel de energia mostrará um gráfico do seu consumo de gás ao longo do tempo. Ele também mostrará seu custo de gás ao longo do tempo.

Essas informações podem ser úteis para entender seus padrões de consumo de gás e para identificar oportunidades para economizar dinheiro.

## Conversão de gás para kWh

Em algumas regiões, o gás é cobrado por kWh em vez de m³ ou ft³. Se este for o seu caso, você pode configurar o Home Assistant para converter seu consumo de gás para kWh.

Você precisará saber o valor calorífico do seu gás, que geralmente pode ser encontrado em sua conta de gás.

Depois de ter o valor calorífico, você pode inseri-lo na seção de energia de sua configuração do Home Assistant. O Home Assistant usará esse valor para converter seu consumo de gás para kWh.

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre como integrar seu consumo de gás com o recurso de gerenciamento de energia.
