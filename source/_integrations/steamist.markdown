---
title: Steamist
description: Documentation about Steamist steam showers.
ha_category:
  - Sensor
  - Switch
ha_iot_class: Local Polling
ha_release: 2022.2
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
ha_dhcp: true
ha_domain: steamist
ha_platforms:
  - sensor
  - switch
ha_integration_type: integration
---

The Steamist will allow you to monitor the state of your [Steamist](https://steamist.com/digital-controls/) steam shower and turn on and off the steam generator.

## Supported devices

- 450 Digital Control
- 550 Digital Control

{% include integrations/config_flow.md %}
