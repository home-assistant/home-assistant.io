---
title: Water Heater
description: Instructions on how to setup water heater devices within Home Assistant.
ha_release: 0.81
ha_domain: water_heater
ha_iot_class:
---

The `water_heater` integration is built for the controlling and monitoring of hot water heaters.

To enable this component, pick one of the platforms, and add it to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
water_heater:
  platform: demo
```

## Services

### Water heater control services

Available services: `water_heater.set_temperature`, `water_heater.turn_away_mode_on`, `water_heater.turn_away_mode_off`, `water_heater.set_operation_mode`

<div class='note'>

Not all water heater services may be available for your platform. Be sure to check the available services Home Assistant has enabled by checking **Developer Tools** -> **Services**.

</div>

### Service `water_heater.set_temperature`

Sets target temperature of water heater device.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of water heater devices to control. Use `entity_id: all` to target all.
| `temperature` | no | New target temperature for water heater
| `operation_mode` | yes | Operation mode to set the temperature to. This defaults to current_operation mode if not set, or set incorrectly.

#### Automation example 

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: water_heater.set_temperature
      target:
        entity_id: water_heater.demo
      data:
        temperature: 24
        operation_mode: eco
```

### Service `water_heater.set_operation_mode`

Set operation mode for water heater device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of water heater devices to control. Use `entity_id: all` to target all.
| `operation_mode` | no | New value of operation mode

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: water_heater.set_operation_mode
      target:
        entity_id: water_heater.demo
      data:
        operation_mode: eco
```

### Service `water_heater.set_away_mode`

Turn away mode on or off for water heater device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of water heater devices to control. Use `entity_id: all` to target all.
| `away_mode` | no | New value of away mode. 'on'/'off' or True/False

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: water_heater.set_away_mode
      target:
        entity_id: water_heater.demo
      data:
        away_mode: true
```
