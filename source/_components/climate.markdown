---
title: "Climate"
description: "Instructions on how to setup climate control devices within Home Assistant."
logo: home-assistant.png
ha_category:
  - Climate
ha_qa_scale: internal
ha_release: 0.19
---

The `climate` integration is built for the controlling and monitoring of HVAC (heating, ventilating, and air conditioning) and thermostat devices.

## Services

### Climate control services

Available services: `climate.set_aux_heat`, `climate.set_preset_mode`, `climate.set_temperature`, `climate.set_humidity`, `climate.set_fan_mode`, `climate.set_hvac_mode`, `climate.set_swing_mode`, `climate.turn_on`, `climate.turn_off`

<div class='note'>\

Not all climate services may be available for your platform. Be sure to check the available services Home Assistant has enabled by checking <img src='/images/screenshots/developer-tool-services-icon.png' alt='service developer tool icon' class="no-shadow" height="38" /> **Services**.

</div>

### Service `climate.set_aux_heat`

Turn auxiliary heater on/off for climate device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `aux_heat` | no | New value of auxiliary heater.

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: climate.set_aux_heat
      data:
        entity_id: climate.kitchen
        aux_heat: true
```

### Service `climate.set_preset_mode`

Set preset mode for climate device. The away mode changes the target temperature permanently to a temperature
reflecting a situation where the climate device is set to save energy. This may be used to emulate a
"vacation mode", for example.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `preset_mode` | no | New value of preset mode.

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: climate.set_preset_mode
      data:
        entity_id: climate.kitchen
        preset_mode: 'eco'
```

### Service `climate.set_temperature`

Set target temperature of climate device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `temperature` | no | New target temperature for hvac
| `target_temp_high` | yes | New target high temperature for hvac
| `target_temp_low` | yes | New target low temperature for hvac
| `hvac_mode` | yes | HVAC mode to set temperature to. This defaults to current HVAC mode if not set, or set incorrectly.

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: climate.set_temperature
      data:
        entity_id: climate.kitchen
        temperature: 24
        hvac_mode: heat
```

### Service `climate.set_humidity`

Set target humidity of climate device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `humidity` | no | New target humidity for climate device

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: climate.set_humidity
      data:
        entity_id: climate.kitchen
        humidity: 60
```

### Service `climate.set_fan_mode`

Set fan operation for climate device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `fan_mode` | no | New value of fan mode

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: climate.set_fan_mode
      data:
        entity_id: climate.kitchen
        fan_mode: 'On Low'
```

### Service `climate.set_hvac_mode`

Set HVAC mode for climate device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `hvac_mode` | no | New value of HVAC mode

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: climate.set_hvac_mode
      data:
        entity_id: climate.kitchen
        hvac_mode: heat
```

### Service `climate.set_swing_mode`

Set swing operation mode for climate device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `swing_mode` | no | New value of swing mode

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: climate.set_swing_mode
      data:
        entity_id: climate.kitchen
        swing_mode: 1
```

### Service `climate.turn_on`

Turn climate device on. This is only supported if the climate device supports being turned off.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Targets all when omitted.

### Service `climate.turn_off`

Turn climate device off. This is only supported if the climate device has the hvac mode "off".

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Targets all when omitted.
