---
title: Yardian
description: Instructions on how to integrate Yardian device within Home Assistant.
ha_category:
  - Irrigation
  - Sensor
  - Switch
ha_config_flow: true
ha_release: 2023.9
ha_iot_class: Local Polling
ha_codeowners:
  - '@h3l1o5'
ha_domain: yardian
ha_platforms:
  - binary_sensor
  - switch
ha_integration_type: integration
---

The **Yardian** {% term integration %} allows you to control your [Yardian Smart Sprinkler Controller](https://yardian.com/products/yardian-pro-smart-sprinkler-controller/).

There is currently support for the following platforms within Home Assistant:

- Switch - Allows you to view the status of zones and control them.
- Binary sensor - Shows watering status along with standby and freeze prevent diagnostics. Per-zone enabled diagnostics are provided but disabled by default.

{% include integrations/config_flow.md %}

During the configuration, you will have to manually set the **Host** and the **Access Token**. You can find them inside your [Yardian App](https://yardian.com/app/).

![Yardian Host/Token Location](/images/integrations/yardian/yardian_config_flow.jpg)

## Supported functionality

The **Yardian** integration provides the following entities.

### Binary sensors

- **Watering running**: Is `on` when a zone is currently irrigating.
- **Standby**:  Is `on` when the controller is in standby mode.
- **Freeze prevent**: Turns on when the controller enables freeze prevention.
- **Zone enabled**: `On` if a zone is enabled. These entities are disabled by default and created per zone.


## Actions

### yardian.start_irrigation

Start a zone for a given number of minutes. This action accepts an Yardian Zone switch {% term entity %} and allows a given duration.

| Data attribute | Optional | Description                                           |
| ---------------------- | -------- | ----------------------------------------------------- |
| `entity_id`            | yes      | The Yardian Zone switch to turn on.                   |
| `duration`             | no       | Number of minutes for this zone to be turned on.      |
