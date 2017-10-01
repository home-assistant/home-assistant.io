---
layout: page
title: "Climate"
description: "Instructions how to setup climate control devices within Home Assistant."
date: 2016-08-26 19:00
sidebar: true
comments: false
sharing: true
footer: true
---


The `climate` component is built for the controlling and monitoring of HVAC (heating, ventilating, and air conditioning) and thermostat devices.
 
To enable this component, pick one of the platforms, and add it to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
climate:
  platform: demo
```

## {% linkable_title Services %}

### {% linkable_title Climate control services %}
Available services: `climate.set_aux_heat`, `climate.set_away_mode`, `climate.set_temperature`, `climate.set_humidity`, `climate.set_fan_mode`, `climate.set_operation_mode`, `climate.set_swing_mode`, `climate.set_hold_mode`

<p class='note'>
Not all climate services may be available for your platform. Be sure to check the available services Home Assistant has enabled by checking <img src='/images/screenshots/developer-tool-services-icon.png' alt='service developer tool icon' class="no-shadow" height="38" /> **Services**.
</p>

### {% linkable_title Service `climate.set_aux_heat` %}

Turn auxiliary heater on/off for climate device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `aux_heat` | no | New value of auxiliary heater.

#### {% linkable_title Automation example  %}

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

### {% linkable_title Service `climate.set_away_mode` %}

Set away mode for climate device. The away mode changes the target temperature permanently to a temperature 
reflecting a situation where the climate device is set to save energy. This may be used to emulate a
"vacation mode", for example.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `away_mode` | no | New value of away mode.

#### {% linkable_title Automation example  %}

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: climate.set_away_mode
      data:
        entity_id: climate.kitchen
        away_mode: 'on'
```


### {% linkable_title Service `climate.set_hold_mode` %}

Set hold mode for climate device. The hold mode changes the target temperature of the client device temporarily to
a different temperature. Typical hold modes provided by a climate device are "away" or "home", where the hold temperature
is chosen depending on a predefined climate, or "temperature" hold, where a particular temperature is selected as the
temporary target temperature. The particular modes available depend on the climate device.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `hold_mode` | no | New value of hold mode.

#### {% linkable_title Automation example  %}

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: climate.set_hold_mode
      data:
        entity_id: climate.kitchen
        hold_mode: 'away'
```

### {% linkable_title Service `climate.set_temperature` %}

Set target temperature of climate device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `temperature` | no | New target temperature for hvac
| `target_temp_high` | yes | New target high temperature for hvac
| `target_temp_low` | yes | New target low temperature for hvac
| `operation_mode` | yes | Operation mode to set temperature to. This defaults to current_operation mode if not set, or set incorrectly.

#### {% linkable_title Automation example  %}

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
        operation_mode: Heat
```

### {% linkable_title Service `climate.set_humidity` %}

Set target humidity of climate device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `humidity` | no | New target humidity for climate device

#### {% linkable_title Automation example  %}

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

### {% linkable_title Service `climate.set_fan_mode` %}

Set fan operation for climate device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `fan_mode` | no | New value of fan mode

#### {% linkable_title Automation example  %}

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

### {% linkable_title Service `climate.set_operation_mode` %}

Set operation mode for climate device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `operation_mode` | no | New value of operation mode

#### {% linkable_title Automation example  %}

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: climate.set_operation_mode
      data:
        entity_id: climate.kitchen
        operation_mode: Heat
```

### {% linkable_title Service `climate.set_swing_mode` %}

Set operation mode for climate device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of climate devices to control. Else targets all.
| `swing_mode` | no | New value of swing mode

#### {% linkable_title Automation example  %}

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
#### {% linkable_title Customization  %}

The step for the setpoint can be adjusted (default to 0,5 increments) by adding the following line into configuration

```yaml
customize:
  - entity_id
      target_temp_step: 1
```
