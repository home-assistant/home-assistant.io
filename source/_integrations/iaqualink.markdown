---
title: Jandy iAqualink
description: Instructions on how to configure Jandy iAqualink integration.
ha_category:
  - Binary sensor
  - Climate
  - Light
  - Sensor
  - Switch
ha_release: 0.99
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@flz'
ha_domain: iaqualink
ha_platforms:
  - binary_sensor
  - climate
  - light
  - sensor
  - switch
ha_integration_type: integration
---

[iAqualink](https://www.iaqualink.com/) by [Jandy](https://www.jandy.com/) allows you to control your pool anytime, anywhere.

There is currently support for the following device types within Home Assistant:

- Binary sensor
- Climate
- Light
- Sensor
- Switch

{% include integrations/config_flow.md %}

## Known limitations

- The platform only supports a single pool.
- Only Pool systems are supported at this time.

## Debugging integration

If you have problems with iAqualink or the integration you can add debug prints to the log.

```yaml
logger:
  default: info
  logs:
    iaqualink: debug
    homeassistant.components.iaqualink: debug
```
