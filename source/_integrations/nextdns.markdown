---
title: NextDNS
description: Instructions on how to integrate NextDNS within Home Assistant.
ha_category:
  - Network
ha_release: 2022.8.0
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bieniu'
ha_domain: nextdns
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: integration
---

NextDNS is a DNS service that protects from all kinds of security threats, blocks ads and trackers on websites and in apps and provides a safe and supervised Internet for kids — on all devices and on all networks. The NextDNS integration allows you to monitor your NextDNS statistics.

## Setup

To obtain API key go to the [NextDNS](https://nextdns.io/) site >> Account section.

{% include integrations/config_flow.md %}
