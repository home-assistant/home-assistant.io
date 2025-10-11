---
title: "Bateria Doméstica"
description: "Como integrar sua bateria doméstica com o gerenciamento de energia do Home Assistant."
---

Se você tiver um sistema de bateria doméstica, poderá integrá-lo ao recurso de gerenciamento de energia do Home Assistant para monitorar o carregamento e o descarregamento de sua bateria.

## Sensores necessários

Para integrar sua bateria doméstica, você precisará de dois sensores:

- **Sensor de carga:** Este sensor deve medir a quantidade de energia que está sendo carregada em sua bateria. A unidade de medida deve ser kWh.
- **Sensor de descarga:** Este sensor deve medir a quantidade de energia que está sendo descarregada de sua bateria. A unidade de medida deve ser kWh.

Se você não tiver sensores que meçam a carga e a descarga de sua bateria, talvez seja possível criá-los usando a integração `integration`.

## Configurando a bateria

Depois de ter os sensores necessários, você pode configurar sua bateria na seção de energia de sua configuração do Home Assistant.

Você precisará selecionar os sensores de carga e descarga para sua bateria. Você também pode dar um nome à sua bateria.

## O que você obtém

Depois de configurar sua bateria, o Home Assistant começará a rastrear o carregamento e o descarregamento de sua bateria.

O painel de energia mostrará um gráfico do estado de carga de sua bateria ao longo do tempo. Ele também mostrará um detalhamento de quanta energia foi carregada e descarregada de sua bateria.

Essas informações podem ser úteis para entender como sua bateria está sendo usada e para identificar oportunidades para otimizar o uso da bateria.

## Previsão de bateria

O recurso de gerenciamento de energia do Home Assistant também inclui uma previsão de bateria. Esta previsão estima quanto tempo sua bateria durará com base em seu uso atual.

A previsão da bateria pode ser útil para planejar o uso de energia e para garantir que você tenha energia suficiente para passar por uma queda de energia.

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre como integrar sua bateria doméstica com o recurso de gerenciamento de energia.
