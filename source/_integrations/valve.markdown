---
title: Valve
description: Instructions on how to integrate valves into Home Assistant.
ha_category:
  - Valve
ha_release: 2024.1
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: valve
ha_integration_type: entity
---

The valve entity in Home Assistant provides an interface to control valves such as water, gas, or air valves.

{% include integrations/building_block_integration.md %}

## Device class

You can change the device class of the valve in the [customize section](/docs/configuration/customizing-devices/). Valves support the following device classes:

- **None**: Generic valve. This is the default and doesn't need to be set.
- **water**: Valve that controls the flow of water through a system.
- **gas**: Valve that controls the flow of gas through a system.

## Services

### Valve control services

All valves respond to `valve.open`, `valve.close`, and `valve.toggle`.
Valves that allow setting a specific position may also be controlled with `valve.set_position` and `valve.stop`.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of valves. Use `entity_id: all` to target all.

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: valve.close
      target:
        entity_id: valve.demo
```

### Service `valve.set_position`

Set the position of one or multiple valves if they support setting a specific position.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of valves. Use `entity_id: all` to target all.
| `position` | no | Integer between 0 (fully closed) and 100 (fully open).

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: valve.set_position
      target:
        entity_id: valve.demo
      data:
        position: 50
```
