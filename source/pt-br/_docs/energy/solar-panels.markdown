---
title: "Painéis Solares"
description: "Como integrar seus painéis solares com o gerenciamento de energia do Home Assistant."
---

Se você tiver painéis solares, poderá integrá-los ao recurso de gerenciamento de energia do Home Assistant para monitorar sua produção de energia solar.

## Sensores necessários

Para integrar seus painéis solares, você precisará de um sensor que meça sua produção de energia solar. A unidade de medida deve ser kWh.

Se você não tiver um sensor que meça sua produção de energia solar, talvez seja possível criar um usando os dados de seu inversor solar.

## Configurando os painéis solares

Depois de ter o sensor necessário, você pode configurar seus painéis solares na seção de energia de sua configuração do Home Assistant.

Você precisará selecionar o sensor para sua produção de energia solar. Você também pode inserir o custo de sua instalação de painel solar.

## O que você obtém

Depois de configurar seus painéis solares, o Home Assistant começará a rastrear sua produção de energia solar.

O painel de energia mostrará um gráfico de sua produção de energia solar ao longo do tempo. Ele também mostrará um detalhamento de quanta de sua energia solar foi usada por sua casa e quanta foi devolvida à rede.

O painel de energia também mostrará seu retorno sobre o investimento (ROI) para sua instalação de painel solar. Essas informações podem ser úteis para entender o desempenho de seus painéis solares e para ver quanto dinheiro você está economizando.

## Previsão solar

O recurso de gerenciamento de energia do Home Assistant também inclui uma previsão solar. Esta previsão estima quanta energia seus painéis solares produzirão ao longo do dia.

A previsão solar pode ser útil para planejar o uso de energia e para garantir que você aproveite ao máximo seus painéis solares.

Para usar a previsão solar, você precisará configurar a integração `forecast.solar`. Esta integração usa dados de seu inversor solar e dados meteorológicos para prever sua produção de energia solar.

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre como integrar seus painéis solares com o recurso de gerenciamento de energia.
