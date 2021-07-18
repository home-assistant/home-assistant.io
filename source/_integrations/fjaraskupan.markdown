---
title: Fjäråskupan
description: Instructions on how to configure fjäråskupan integration.
ha_category:
  - Binary Sensor
  - Fan
  - Light
ha_release: 2021.8
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@elupus'
ha_domain: fjaraskupan
ha_platforms:
  - binary_sensor
  - fam
  - light
---

[Fjäråskupan](https://fjaraskupan.se/) allows you to control your Bluetooth equipped kitchen fan.

There is currently support for the following device types within Home Assistant:

- Binary Sensor
- Fan
- Light

The integration allow control of fan speeds, lights and after cooking timer for kitchen fans.

{% include integrations/config_flow.md %}

## Debugging integration

If you have problems with the integration you can add debug prints to the log.

```yaml
logger:
  default: info
  logs:
    homeassistant.components.fjaraskupan: debug
```
