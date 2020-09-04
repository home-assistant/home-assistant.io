---
title: Fan
description: Instructions on how to setup Fan devices within Home Assistant.
ha_category:
  - Fan
ha_release: 0.27
ha_quality_scale: internal
ha_domain: fan
---

The Fan integration allows you to control and monitor Fan devices.

## Services

### Fan control services

Available services:
`fan.set_speed`, `fan.set_direction`, `fan.oscillate`, `fan.turn_on`, `fan.turn_off`, `fan.toggle`

<div class='note'>

Not all fan services may be available for your platform. Be sure to check the available services Home Assistant has enabled by checking <img src='/images/screenshots/developer-tool-services-icon.png' alt='service developer tool icon' class="no-shadow" height="38" /> **Services**.

</div>

### Service `fan.set_speed`

Sets the speed for fan device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of fan device(s) to control. To target all fan devices, use `all`.
| `speed` | no | Speed setting

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: fan.set_speed
      data:
        entity_id: fan.kitchen
        speed: low
```

### Service `fan.set_direction`

Sets the rotation for fan device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of fan device(s) to control. To target all fan devices, use `all`.
| `direction` | no | The direction to rotate. Either `forward` or `reverse`

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: fan.set_direction
      data:
        entity_id: fan.kitchen
        direction: forward
```

### Service `fan.oscillate`

Sets the oscillation for fan device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of fan device(s) to control. To target all fan devices, use `all`.
| `oscillating` | no | Flag to turn on/off oscillation. Either `True` or `False`.

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: fan.oscillate
      data:
        entity_id: fan.kitchen
        oscillating: True
```

### Service `fan.turn_on`

Turn fan device on. This is only supported if the fan device supports being turned off.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of fan device(s) to control. To target all fan devices, use `all`.

### Service `fan.turn_off`

Turn fan device off. This is only supported if the fan device supports being turned on.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that define the entity ID(s) of fan device(s) to control. To target all fan devices, use `all`.
