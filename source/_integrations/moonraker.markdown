---
title: Moonraker
description: Integration between Moonraker and Home Assistant.
ha_category:
  - Binary Sensor
  - Button
  - Sensor
ha_config_flow: true
ha_release: 2021.11
ha_codeowners:
  - '@cmroche'
ha_iot_class: Local Push
ha_domain: moonraker
ha_zeroconf: true
ha_platforms:
  - binary_sensor
  - button
  - sensor
---

[Moonraker](https://moonraker.readthedocs.io/en/latest/) is an HTTP and websocket interface for your 3D printer. This is the main integration to integrate Moonraker sensors.

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensor)

{% include integrations/config_flow.md %}

### API Key

If you've configured an API key in Moonraker, you will be required to use that API key. The API key can usually be requested by an UIs you are using with Moonraker, such as [Fluidd](https://docs.fluidd.xyz) or [Mainsail](https://docs.mainsail.xyz). You may also request or change the API key directly with Moonraker, see the Moonraker [documentation](https://moonraker.readthedocs.io/en/latest/web_api/#get-the-current-api-key).

## Sensor

The Moonraker integration provides the follow sensors for monitoring print progress.

- Extruder Temperature
- Extruder Target Temperature
- Bed Temperature
- Bed Target Temperature
- Print Progress
- Print Duration
- Print File
