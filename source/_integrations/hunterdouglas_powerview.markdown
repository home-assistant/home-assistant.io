---
title: Hunter Douglas PowerView
description: Instructions on how to setup Hunter Douglas PowerView scenes within Home Assistant.
ha_category:
  - Cover
  - Scene
  - Sensor
ha_release: 0.15
ha_domain: hunterdouglas_powerview
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@bdraco'
ha_homekit: true
ha_platforms:
  - cover
  - scene
  - sensor
ha_zeroconf: true
ha_dhcp: true
---

The `hunterdouglas_powerview` integration allows you to integrate your [Hunter Douglas PowerView](https://www.hunterdouglas.com/operating-systems/powerview-motorization/support) devices in Home Assistant.

There is currently support for the following device types within Home Assistant:

- Cover
- Scene
- Sensor

{% include integrations/config_flow.md %}

## Example Automations

``` yaml
- alias: "blinds closed at night"
  trigger:
    platform: time
    at: "18:00:00"
  action:
    - service: scene.turn_on
      target:
        entity_id: scene.10877
```
