---
layout: page
title: "SoChain"
description: "Instructions how to integrate chain.so data within Home Assistant."
date: 2017-06-01 16:20
sidebar: true
comments: false
sharing: true
footer: true
logo: sochain.png
ha_category: Finance
ha_release: 0.61
ha_iot_class: "Cloud Polling"
---


The `SoChain` sensor platform displays supported cryptocurrency wallet balances from [SoChain](https://chain.so).

To add the SoChain sensor to your installation, specify a network and address to watch in the `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: sochain
    network: LTC
    address: 'M9m37h3dVkLDS13wYK7vcs7ck6MMMX6yhK'
```

{% configuration %}
network:
  description: The network or blockchain of the cryptocurrency to watch.
  required: true
  type: string
address:
  description: Cryptocurrency wallet address to watch.
  required: true
  type: string
name:
  description: The name of the sensor used in the frontend. (recommended)
  required: false
  type: string
  default: Crypto Balance
{% endconfiguration %}

Supported networks (which can also be found [here](https://chain.so/api#networks-supported)) are:

* BTC
* LTC
* DOGE
* DASH
