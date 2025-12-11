---
title: Etherscan
description: Instructions on how to integrate Etherscan.io data within Home Assistant.
ha_category:
  - Finance
ha_release: 0.47
ha_iot_class: Cloud Polling
ha_domain: etherscan
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `Etherscan` sensor platform displays Ether and ERC-20 token balances from [Etherscan.io](https://etherscan.io).

To add the Etherscan sensor to your installation, specify an Ethereum address to watch in the {% term "`configuration.yaml`" %} file. You can also optionally provide a token name to retrieve and ERC-20 token balance. If no token is provided then the balance retrieved will be in ETH. You can also optionally provide the token contract address in case the token name is not found.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: etherscan
    address: "0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359"
  - platform: etherscan
    address: "0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359"
    token: OMG
  - platform: etherscan
    address: "0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359"
    token_address: "0xef68e7c694f40c8202821edf525de3782458639f"
    token: LRC
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
  default: ETH Balance
token:
  description: The ERC20 token symbol. i.e., OMG.
  required: false
  type: string
token_address:
  description: The ERC20 token contract address.
  required: false
  type: string
{% endconfiguration %}
