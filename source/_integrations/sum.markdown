---
title: Sum
description: Instructions on how to integrate sum sensors into Home Assistant.
ha_category:
  - Helper
  - Sensor
  - Utility
ha_iot_class: Local Push
ha_release: 2022.10.0
ha_quality_scale: internal
ha_codeowners:
  - '@gjohansson-ST'
ha_domain: sum
ha_config_flow: true
ha_platforms:
  - sensor
ha_integration_type: helper
---

The Sum integration consumes the state from other sensors to calculate the sum of it's states.

If any source sensor provides an unknown state, this sensor will also be in unknown state.

If the unit of measurement of the sensors differs, the Sum sensor will continue to calculate the sum but provide a warning in the log.

{% include integrations/config_flow.md %}
