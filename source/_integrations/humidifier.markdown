---
title: "Humidity"
description: "Instructions on how to setup humidity control devices within Home Assistant."
logo: home-assistant.png
ha_category:
  - Humidity
ha_release: 0.104
---

The `humidifier` integration is built for the controlling and monitoring of humidifiers, dehumidifiers, and hygrostat devices.

## Services

### Humidity control services

Available services: `humidifier.set_aux_heat`, `humidifier.set_preset_mode`, `humidifier.set_humidity`, `humidifier.set_fan_mode`, `humidifier.set_operation_mode`, `humidifier.turn_on`, `humidifier.turn_off`

<div class='note'>

Not all humidifier services may be available for your platform. Be sure to check the available services Home Assistant has enabled by checking <img src='/images/screenshots/developer-tool-services-icon.png' alt='service developer tool icon' class="no-shadow" height="38" /> **Services**.

</div>

### Service `humidifier.set_aux_heat`

Turn auxiliary heater on/off for humidifier device (i.e. enable producing heated mist)

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of humidifier devices to control. Else targets all.
| `aux_heat` | no | New value of auxiliary heater.

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: humidifier.set_aux_heat
      data:
        entity_id: humidifier.bedroom
        aux_heat: true
```

### Service `humidifier.set_preset_mode`

Set preset mode for humidifier device. The away mode changes the target humidity permanently to a humidity
reflecting a situation where the humidifier device is set to save energy. This may be used to emulate a
"vacation mode", for example.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of humidifier devices to control. Else targets all.
| `preset_mode` | no | New value of preset mode.

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: humidifier.set_preset_mode
      data:
        entity_id: humidifier.bedroom
        preset_mode: 'eco'
```

### Service `humidifier.set_humidity`

Set target humidity of humidifier device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of humidifier devices to control. Else targets all.
| `humidity` | no | New target humidity for humidifier device

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: humidifier.set_humidity
      data:
        entity_id: humidifier.bedroom
        humidity: 60
```

### Service `humidifier.set_fan_mode`

Set fan operation for humidifier device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of humidifier devices to control. Else targets all.
| `fan_mode` | no | New value of fan mode

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: humidifier.set_fan_mode
      data:
        entity_id: humidifier.bedroom
        fan_mode: 'On Low'
```

### Service `humidifier.set_operation_mode`

Set operation mode for humidifier device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of humidifier devices to control. Else targets all.
| `operation_mode` | no | New value of operation mode

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: humidifier.set_operation_mode
      data:
        entity_id: humidifier.bedroom
        operation_mode: humidify
```

### Service `humidifier.turn_on`

Turn humidifier device on. This is only supported if the humidifier device supports being turned off.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of humidifier devices to control. Targets all when omitted.

### Service `humidifier.turn_off`

Turn humidifier device off. This is only supported if the humidifier device has the humidifier mode "off".

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of humidifier devices to control. Targets all when omitted.
