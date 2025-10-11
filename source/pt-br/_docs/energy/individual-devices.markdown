---
title: "Dispositivos Individuais"
description: "Como acompanhar o consumo de energia de dispositivos individuais no Home Assistant."
---

Você pode acompanhar o consumo de energia de dispositivos individuais no Home Assistant, adicionando-os ao painel de energia.

## Sensores necessários

Para acompanhar o consumo de energia de um dispositivo individual, você precisará de um sensor que meça seu consumo de energia. A unidade de medida deve ser kWh.

Existem muitas maneiras de obter um sensor para o consumo de energia de um dispositivo individual:

- **Plugues inteligentes:** Muitos plugues inteligentes incluem recursos de monitoramento de energia. Você pode usá-los para monitorar o consumo de energia de aparelhos individuais.
- **Interruptores inteligentes:** Alguns interruptores inteligentes também incluem recursos de monitoramento de energia.
- **Monitores de energia para toda a casa:** Se você tiver um monitor de energia para toda a casa, poderá usá-lo para rastrear o consumo de energia de circuitos individuais.
- **Dispositivos com monitoramento de energia integrado:** Alguns dispositivos, como máquinas de lavar e secar, possuem monitoramento de energia integrado. Se esses dispositivos forem compatíveis com o Home Assistant, você poderá usar seus sensores de energia no painel de energia.

## Adicionando dispositivos ao painel de energia

Depois de ter um sensor para o consumo de energia de um dispositivo individual, você pode adicioná-lo ao painel de energia na seção de energia de sua configuração do Home Assistant.

O painel de energia mostrará um detalhamento do consumo de energia por dispositivo. Essas informações podem ser úteis para identificar quais dispositivos estão usando mais energia e para encontrar oportunidades para economizar dinheiro.

## Dispositivos que relatam energia em W ou kW

Se você tiver um dispositivo que relata o consumo de energia em W ou kW, precisará criar um sensor que o converta para kWh. Você pode fazer isso usando a integração `integration`.

A integração `integration` irá integrar o sensor de energia ao longo do tempo para lhe dar o consumo de energia em kWh.

Depois de criar o sensor de kWh, você pode adicioná-lo ao painel de energia.

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre como acompanhar o consumo de energia de dispositivos individuais.
