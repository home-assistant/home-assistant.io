---
title: "Humidity"
description: "Instructions on how to setup humidity control devices within Home Assistant."
logo: home-assistant.png
ha_category:
  - Humidity
ha_release: 0.102
---

The `humidity` integration is built for the controlling and monitoring of humidifiers, dehumidifiers, and hygrostat devices.

## Services

### Humidity control services

Available services: `humidity.set_preset_mode`, `humidity.set_humidity`, `humidity.set_fan_mode`, `humidity.set_humidifier_mode`, `humidity.turn_on`, `humidity.turn_off`

<div class='note'>

Not all humidity services may be available for your platform. Be sure to check the available services Home Assistant has enabled by checking <img src='/images/screenshots/developer-tool-services-icon.png' alt='service developer tool icon' class="no-shadow" height="38" /> **Services**.

</div>

### Service `humidity.set_preset_mode`

Set preset mode for humidity device. The away mode changes the target humidity permanently to a humidity
reflecting a situation where the humidity device is set to save energy. This may be used to emulate a
"vacation mode", for example.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of humidity devices to control. Else targets all.
| `preset_mode` | no | New value of preset mode.

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: humidity.set_preset_mode
      data:
        entity_id: humidity.kitchen
        preset_mode: 'eco'
```

### Service `humidity.set_humidity`

Set target humidity of humidity device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of humidity devices to control. Else targets all.
| `humidity` | no | New target humidity for humidity device

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: humidity.set_humidity
      data:
        entity_id: humidity.kitchen
        humidity: 60
```

### Service `humidity.set_fan_mode`

Set fan operation for humidity device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of humidity devices to control. Else targets all.
| `fan_mode` | no | New value of fan mode

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: humidity.set_fan_mode
      data:
        entity_id: humidity.kitchen
        fan_mode: 'On Low'
```

### Service `humidity.set_humidifier_mode`

Set humidifier mode for humidity device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of humidity devices to control. Else targets all.
| `humidifier_mode` | no | New value of humidifier mode

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: humidity.set_humidifier_mode
      data:
        entity_id: humidity.kitchen
        humidifier_mode: humidify
```

### Service `humidity.turn_on`

Turn humidity device on. This is only supported if the humidity device supports being turned off.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of humidity devices to control. Targets all when omitted.

### Service `humidity.turn_off`

Turn humidity device off. This is only supported if the humidity device has the humidifier mode "off".

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of humidity devices to control. Targets all when omitted.
