---
title: Climate
description: Instructions on how to setup climate control devices within Home Assistant.
ha_category:
  - Climate
ha_release: 0.19
ha_quality_scale: internal
ha_domain: climate
---

The Climate integration allows you to control and monitor HVAC (heating, ventilating, and air conditioning) devices and thermostats.

## Services

### Climate control services

Available services: `climate.set_aux_heat`, `climate.set_preset_mode`, `climate.set_temperature`, `climate.set_humidity`, `climate.set_fan_mode`, `climate.set_hvac_mode`, `climate.set_swing_mode`, `climate.turn_on`, `climate.turn_off`

<div class='note'>

Not all climate services may be available for your platform. You can check which climate services are available under **Developer Tools** -> **Services**.

</div>

### Service `climate.set_aux_heat`

Turn auxiliary heater on/off for climate device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of climate device(s) to control. To target all climate devices, use `all`.
| `aux_heat` | no | New value of auxiliary heater.

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: climate.set_aux_heat
      target:
        entity_id: climate.kitchen
      data:
        aux_heat: true
```

### Service `climate.set_preset_mode`

Set preset mode for climate device. Away mode changes the target temperature permanently to a temperature
reflecting a situation where the climate device is set to save energy. For example, this may be used to emulate a
"vacation mode."

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of climate device(s) to control. To target all climate devices, use `all`.
| `preset_mode` | no | New value of preset mode.

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: climate.set_preset_mode
      target:
        entity_id: climate.kitchen
      data:
        preset_mode: "eco"
```

### Service `climate.set_temperature`

Set target temperature of climate device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of climate device(s) to control. To target all climate devices, use `all`.
| `temperature` | yes | New target temperature for climate device (commonly referred to as a *setpoint*). Do not use if `hvac_mode` is `heat_cool`.
| `target_temp_high` | yes | The highest temperature that the climate device will allow. Required if `hvac_mode` is `heat_cool`. Required together with `target_temp_low`.
| `target_temp_low` | yes | The lowest temperature that the climate device will allow. Required if `hvac_mode` is `heat_cool`.  Required together with `target_temp_high`.
| `hvac_mode` | yes | HVAC mode to set the climate device to. This defaults to current HVAC mode if not set, or set incorrectly.

#### Automation examples

```yaml
### Set temperature to 24 in heat mode
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: climate.set_temperature
      target:
        entity_id: climate.kitchen
      data:
        temperature: 24
        hvac_mode: heat
```

```yaml
### Set temperature range to 20 to 24 in heat_cool mode
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: climate.set_temperature
      target:
        entity_id: climate.kitchen
      data:
        target_temp_high: 24
        target_temp_low: 20
        hvac_mode: heat_cool
```

### Service `climate.set_humidity`

Set target humidity of climate device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of climate device(s) to control. To target all climate devices, use `all`.
| `humidity` | no | New target humidity for climate device

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: climate.set_humidity
      target:
        entity_id: climate.kitchen
      data:
        humidity: 60
```

### Service `climate.set_fan_mode`

Set fan operation for climate device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of climate device(s) to control. To target all climate devices, use `all`.
| `fan_mode` | no | New value of fan mode

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: climate.set_fan_mode
      target:
        entity_id: climate.kitchen
      data:
        fan_mode: "On Low"
```

### Service `climate.set_hvac_mode`

Set climate device's HVAC mode

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of climate device(s) to control. To target all climate devices, use `all`.
| `hvac_mode` | no | New value of HVAC mode

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: climate.set_hvac_mode
      target:
        entity_id: climate.kitchen
      data:
        hvac_mode: heat
```

### Service `climate.set_swing_mode`

Set swing operation mode for climate device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of climate device(s) to control. To target all climate devices, use `all`.
| `swing_mode` | no | New value of swing mode

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: climate.set_swing_mode
      target:
        entity_id: climate.kitchen
      data:
        swing_mode: 1
```

### Service `climate.turn_on`

Turn climate device on. This is only supported if the climate device supports being turned off.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of climate device(s) to control. To target all climate devices, use `all`.

### Service `climate.turn_off`

Turn climate device off. This is only supported if the climate device has the HVAC mode `off`.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of climate device(s) to control. To target all climate devices, use `all`.

## Attributes

The climate entity has extra attributes to represent the state of the thermostat.

| Name | Description |
| ---- | ----------- |
| `hvac_action` | Current state: `heating` / `cooling` / `idle`.
| `fan` | If the fan is currently on or off: `on` / `off`.

It depends on the thermostat you are using which states are available.
