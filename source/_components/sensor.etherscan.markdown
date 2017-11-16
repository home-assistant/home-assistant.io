---
layout: page
title: "Etherscan"
description: "Instructions how to integrate Etherscan.io data within Home Assistant."
date: 2017-06-01 16:20
sidebar: true
comments: false
sharing: true
footer: true
logo: etherscan.png
ha_category: Finance
ha_release: 0.47
ha_iot_class: "Cloud Polling"
---


The `Etherscan` sensor platform displays Ethereum wallet balances from [Etherscan.io](https://etherscan.io).

To add the Etherscan sensor to your installation, specify an ethereum address to watch in the `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: etherscan
    address: '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359'
```

{% configuration %}
address:
  description: Ethereum wallet address to watch.
  required: true
  type: string
name:
  description: The name of the sensor used in the frontend.
  required: false
  type: string
  default: Ethereum Balance
{% endconfiguration %}

