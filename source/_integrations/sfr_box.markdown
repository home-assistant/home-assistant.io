---
title: SFR Box
description: Instructions on how to integrate SFR Box into Home Assistant.
ha_category:
  - Sensor
ha_release: 2023.2
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@epenet'
ha_domain: sfr_box
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - sensor
ha_integration_type: device
---

The SFR Box integration offers integration with the **SFR** broadband router.

This integration provides the following platforms:

- Binary Sensors - such as ADSL status.
- Buttons - such as reboot.
- Sensors - such as ADSL line status, attenuation, noise and data rate.

{% include integrations/config_flow.md %}
