---
title: Climate
description: Instructions on how to setup climate control devices within Home Assistant.
ha_category:
  - Climate
ha_release: 0.19
ha_quality_scale: internal
ha_domain: climate
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The **Climate** {% term integration %} allows you to control and monitor HVAC (heating, ventilating, and air conditioning) devices and thermostats.

{% include integrations/building_block_integration.md %}

## The state of an HVAC entity

An HVAC entity can have the following states, depending on the specific climate device and its capabilities.

- **Off**: The device is turned off.
- **Heat**: The device is set to heat to a target temperature.
- **Cool**: The device is set to cool to a target temperature.
- **Heat/Cool**: The device is set to heat/cool to a target temperature range.
- **Auto**: The device is set to a schedule, learned behavior, AI.
- **Dry**: The device is set to dry/humidity mode.
- **Fan only**: The device only has the fan on. No heating or cooling is taking place.
- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

## Actions

### Climate control actions

Available actions: `climate.set_aux_heat`, `climate.set_preset_mode`, `climate.set_temperature`, `climate.set_humidity`, `climate.set_fan_mode`, `climate.set_hvac_mode`, `climate.set_swing_mode`, `climate.set_swing_horizontal_mode`, `climate.turn_on`, `climate.turn_off`, `climate.toggle`

{% tip %}
Not all climate {% term actions %}  may be available for your platform. You can check which climate action are available under **Developer Tools** -> **Actions**.
{% endtip %}

### Action `climate.set_aux_heat`

Turn auxiliary heater on/off for climate device

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of climate device(s) to control. To target all climate devices, use `all`.
| `aux_heat` | no | New value of auxiliary heater.

#### Automation example

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: climate.set_aux_heat
      target:
        entity_id: climate.kitchen
      data:
        aux_heat: true
```

### Action `climate.set_preset_mode`

Set preset mode for climate device. Away mode changes the target temperature permanently to a temperature
reflecting a situation where the climate device is set to save energy. For example, this may be used to emulate a
"vacation mode."

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of climate device(s) to control. To target all climate devices, use `all`.
| `preset_mode` | no | New value of preset mode.

#### Automation example

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: climate.set_preset_mode
      target:
        entity_id: climate.kitchen
      data:
        preset_mode: "eco"
```

### Action `climate.set_temperature`

Set target temperature of climate device

| Data attribute | Optional | Description |
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
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: climate.set_temperature
      target:
        entity_id: climate.kitchen
      data:
        temperature: 24
        hvac_mode: heat
```

```yaml
### Set temperature range to 20 to 24 in heat_cool mode
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: climate.set_temperature
      target:
        entity_id: climate.kitchen
      data:
        target_temp_high: 24
        target_temp_low: 20
        hvac_mode: heat_cool
```

### Action `climate.set_humidity`

Set target humidity of climate device

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of climate device(s) to control. To target all climate devices, use `all`.
| `humidity` | no | New target humidity for climate device

#### Automation example

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: climate.set_humidity
      target:
        entity_id: climate.kitchen
      data:
        humidity: 60
```

### Action `climate.set_fan_mode`

Set fan operation for climate device

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of climate device(s) to control. To target all climate devices, use `all`.
| `fan_mode` | no | New value of fan mode

#### Automation example

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: climate.set_fan_mode
      target:
        entity_id: climate.kitchen
      data:
        fan_mode: "low"
```

### Action `climate.set_hvac_mode`

Set climate device's HVAC mode

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of climate device(s) to control. To target all climate devices, use `all`.
| `hvac_mode` | no | New value of HVAC mode

#### Automation example

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: climate.set_hvac_mode
      target:
        entity_id: climate.kitchen
      data:
        hvac_mode: heat
```

### Action `climate.set_swing_mode`

Set swing operation mode for climate device

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of climate device(s) to control. To target all climate devices, use `all`.
| `swing_mode` | no | New value of swing mode

#### Automation example

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: climate.set_swing_mode
      target:
        entity_id: climate.kitchen
      data:
        swing_mode: 1
```

### Action `climate.set_swing_horizontal_mode`

Set horizontal swing operation mode for climate device

| Data attribute          | Optional | Description                                                                                                                       |
| ----------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`             | yes      | String or list of strings that define the entity ID(s) of climate device(s) to control. To target all climate devices, use `all`. |
| `swing_horizontal_mode` | no       | New value of horizontal swing mode.                                                                                               |

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - action: climate.set_swing_horizontal_mode
      target:
        entity_id: climate.kitchen
      data:
        swing_horizontal_mode: on
```

### Action `climate.turn_on`

Turn climate device on. This is only supported if the climate device supports being turned off.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of climate device(s) to control. To target all climate devices, use `all`.

### Action `climate.turn_off`

Turn climate device off. This is only supported if the climate device has the HVAC mode `off`.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of climate device(s) to control. To target all climate devices, use `all`.

### Action `climate.toggle`

Toggle climate device. This is only supported if the climate device supports being turned on and off.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of climate device(s) to control. To target all climate devices, use `all`.

## Attributes

The climate entity has extra attributes to represent the state of the thermostat.

| Name | Description |
| ---- | ----------- |
| `hvac_action` | Current state: `heating` / `cooling` / `idle`.
| `fan` | If the fan is currently on or off: `on` / `off`.

It depends on the thermostat you are using which states are available.
