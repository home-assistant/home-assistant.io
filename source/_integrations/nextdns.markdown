---
title: NextDNS
description: Instructions on how to integrate NextDNS within Home Assistant.
ha_category:
  - Network
ha_release: 2022.8
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bieniu'
ha_domain: nextdns
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - sensor
  - switch
ha_integration_type: service
---

NextDNS is a DNS service that protects from all kinds of security threats, blocks ADS and trackers on websites and in apps, and provides a safe and supervised Internet for kids — on all devices and on all networks. The NextDNS integration allows you to monitor NextDNS statistics and control its configuration.

## Prerequisites

To obtain API key go to the NextDNS site >> [Account section](https://my.nextdns.io/account).

{% include integrations/config_flow.md %}
