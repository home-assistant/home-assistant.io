---
title: Fan
description: Instructions on how to setup Fan devices within Home Assistant.
ha_category:
  - Fan
ha_release: 0.27
ha_quality_scale: internal
ha_domain: fan
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The **Fan** {% term integration %} allows you to control and monitor fan devices.

{% include integrations/building_block_integration.md %}

## The state of a fan entity

The state of a fan entity can be either **On** or **Off**.

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

## Actions

### Fan control actions

Available actions:
`fan.set_percentage`, `fan.set_preset_mode`, `fan.set_direction`, `fan.oscillate`, `fan.turn_on`, `fan.turn_off`, `fan.toggle`, `fan.increase_speed`, `fan.decrease_speed`

{% note %}

Not all fan actions may be available for your platform. You can check which actions are available for your fan(s) under **Developer Tools** > **Actions**.

{% endnote %}

### Action `fan.set_percentage`

Sets the speed percentage for fan device.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of fan device(s) to control. To target all fan devices, use `all`.
| `percentage` | no | Percentage speed setting

#### Automation example

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: fan.set_percentage
      target:
        entity_id: fan.kitchen
      data:
        percentage: 33
```

### Action `fan.set_preset_mode`

Sets a preset mode for the fan device. Available preset modes are defined by the integration that supplies the fan entity to Home Assistant. For example, the ESPHome [Speed Fan](https://esphome.io/components/fan/speed.html) component provides three available presets by default: `Low`, `Medium`, and `High`.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of fan device(s) to control. To target all fan devices, use `all`.
| `preset_mode` | no | The preset mode

#### Automation example

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: fan.set_preset_mode
      target:
        entity_id: fan.kitchen
      data:
        preset_mode: auto
```

### Action `fan.set_direction`

Sets the rotation for fan device.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of fan device(s) to control. To target all fan devices, use `all`.
| `direction` | no | The direction to rotate. Either `forward` or `reverse`

#### Automation example

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: fan.set_direction
      target:
        entity_id: fan.kitchen
      data:
        direction: forward
```

### Action `fan.oscillate`

Sets the oscillation for fan device.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of fan device(s) to control. To target all fan devices, use `all`.
| `oscillating` | no | Flag to turn on/off oscillation. Either `True` or `False`.

#### Automation example

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: fan.oscillate
      target:
        entity_id: fan.kitchen
      data:
        oscillating: True
```

### Action `fan.turn_on`

Turn fan device on. This is only supported if the fan device supports being turned off. See a similar example under `fan.turn_off`.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of fan device(s) to control. To target all fan devices, use `all`.
| `percentage` | yes | Percentage speed setting
| `preset_mode` | yes | The preset mode

### Action `fan.turn_off`

Turn fan device off. This is only supported if the fan device supports being turned on.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of fan device(s) to control. To target all fan devices, use `all`.


#### Automation example

```yaml
automation:
  triggers:
    - trigger: time
      at: "07:15:00"
  actions:
    - action: fan.turn_off
      target:
        entity_id: fan.kitchen
      data:
        speed: low
```

### Action `fan.increase_speed`

Increases the speed of the fan device.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of fan device(s) to control. To target all fan devices, use `all`.
| `percentage_step` | yes | Increase speed by a percentage. Should be between 0..100.

#### Automation example

```yaml
automation:
  triggers:
  - trigger: device
    device_id: 097cd9f706a86e9163acb64ba7d630da
    domain: lutron_caseta
    type: press
    subtype: raise
  actions:
  - action: fan.increase_speed
    target:
      entity_id: fan.dining_room_fan_by_front_door
```

### Action `fan.decrease_speed`

Decreases the speed of the fan device.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of fan device(s) to control. To target all fan devices, use `all`.
| `percentage_step` | yes | Decrease speed by a percentage. Should be between 0..100.

#### Automation example

```yaml
automation:
  triggers:
  - trigger: device
    device_id: 097cd9f706a86e9163acb64ba7d630da
    domain: lutron_caseta
    type: press
    subtype: lower
  actions:
  - action: fan.decrease_speed
    target:
      entity_id: fan.dining_room_fan_by_front_door
```
