---
title: Wiffi
description: Support for WIFFI devices from stall.biz, e.g., Weatherman, Rainyman, ...
ha_category:
  - DIY
ha_release: '0.110'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@mampfes'
ha_domain: wiffi
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: integration
---

This **Wiffi** {% term integration %} allows you to connect your [STALL WIFFI](https://stall.biz) devices directly to Home Assistant.

{% include integrations/config_flow.md %}

## Configure the WIFFI device

1. Set "CCU-IP Adresse myCCUIP" to the IP address of Home Assistant.
2. Set port for JSON telegrams to configured server port using parameter "send_json".

Home Assistant will open a TCP server socket on the configured port and listens for incoming telegrams from STALL WIFFI devices. Entities from new devices will be automatically added.
