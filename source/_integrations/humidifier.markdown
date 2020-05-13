---
title: "Humidifier"
description: "Instructions on how to setup humidity control devices within Home Assistant."
logo: home-assistant.png
ha_category:
  - Humidifier
ha_release: "0.110"
---

The `humidifier` integration is built for the controlling and monitoring of humidifiers, dehumidifiers, and hygrostat devices.

## Services

### Humidifier services

Available services: `humidifier.set_mode`, `humidifier.set_humidity`, `humidifier.turn_on`, `humidifier.turn_off`

<div class='note'>

Not all humidifier services may be available for your platform. Be sure to check the available services Home Assistant has enabled by checking <img src='/images/screenshots/developer-tool-services-icon.png' alt='service developer tool icon' class="no-shadow" height="38" /> **Services**.

</div>

### Service `humidifier.set_mode`

Set mode for humidifier device. This service is only available if the device supports operating in several working modes. The list of available modes and the device functionality in every mode depend on the device itself.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`'s of humidifier devices to control.
| `preset_mode` | no | New value of preset mode.

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: humidifier.set_mode
      data:
        entity_id: humidifier.bedroom
        preset_mode: 'eco'
```

### Service `humidifier.set_humidity`

Set target humidity of humidifier device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`'s of humidifier devices to control.
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

### Service `humidifier.turn_on`

Turn humidifier device on.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`'s of humidifier devices to control.

### Service `humidifier.turn_off`

Turn humidifier device off.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings that point at `entity_id`'s of humidifier devices to control.
