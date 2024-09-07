---
title: Water heater
description: Instructions on how to setup water heater devices within Home Assistant.
ha_release: 0.81
ha_domain: water_heater
ha_quality_scale: internal
ha_category: []
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The **Water heater** {% term integration %} is built for the controlling and monitoring of hot water heaters.

To enable this {% term integration %}, pick one of the platforms, and add it to your {% term "`configuration.yaml`" %}:

```yaml
# Example configuration.yaml entry
water_heater:
  platform: demo
```

## Actions

### Water heater control actions

Available actions: `water_heater.set_temperature`, `water_heater.turn_away_mode_on`, `water_heater.turn_away_mode_off`, `water_heater.set_operation_mode`

{% tip %}
Not all water heater actions may be available for your platform. Be sure to check the available actions Home Assistant has enabled by checking **Developer Tools** > **Actions**.
{% endtip %}

### Action `water_heater.set_temperature`

Sets target temperature of water heater device.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at the `entity_id` of water heater devices to control. Use `entity_id: all` to target all.
| `temperature` | no | New target temperature for water heater
| `operation_mode` | yes | Operation mode to set the temperature to. This defaults to current_operation mode if not set, or set incorrectly. For a list of possible modes, refer to the {% term integration %} documentation.

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - action: water_heater.set_temperature
      target:
        entity_id: water_heater.demo
      data:
        temperature: 24
        operation_mode: eco
```

### Action `water_heater.set_operation_mode`

Set operation mode for water heater device

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at the `entity_id` of water heater devices to control. Use `entity_id: all` to target all.
| `operation_mode` | no | New value of operation mode. For a list of possible modes, refer to the integration documentation.

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - action: water_heater.set_operation_mode
      target:
        entity_id: water_heater.demo
      data:
        operation_mode: eco
```

### Action `water_heater.set_away_mode`

Turn away mode on or off for water heater device

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at the `entity_id` of water heater devices to control. Use `entity_id: all` to target all.
| `away_mode` | no | New value of away mode. 'on'/'off' or True/False

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - action: water_heater.set_away_mode
      target:
        entity_id: water_heater.demo
      data:
        away_mode: true
```
