---
title: Humidifier
description: Instructions on how to set up humidity control devices within Home Assistant.
ha_category:
  - Humidifier
ha_release: '0.112'
ha_domain: humidifier
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
  - '@Shulyaka'
---

The `humidifier` integration is built for the controlling and monitoring of humidifiers, dehumidifiers, and hygrostat devices.

## Services

### Humidifier services

Available services: `humidifier.set_mode`, `humidifier.set_humidity`, `humidifier.turn_on`, `humidifier.turn_off`, `humidifier.toggle`

<div class='note'>

Not all humidifier services may be available for your platform. Be sure to check the available services Home Assistant has enabled by checking the Services page in the [Developer Tools](/docs/tools/dev-tools/).

</div>

### Service `humidifier.set_mode`

Set mode for the humidifier device. This service is only available if the device supports operating in several working modes. The list of available modes and the device functionality in every mode depend on the device itself.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of humidifier devices to control.
| `mode` | no  | New mode.

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: humidifier.set_mode
      target:
        entity_id: humidifier.bedroom
      data:
        preset_mode: "eco"
```

### Service `humidifier.set_humidity`

Set target humidity of the humidifier device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of humidifier devices to control.
| `humidity` | no  | New target humidity for humidifier device

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: humidifier.set_humidity
      target:
        entity_id: humidifier.bedroom
      data:
        humidity: 60
```

### Service `humidifier.turn_on`

Turn the humidifier device on.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of humidifier devices to control.

### Service `humidifier.turn_off`

Turn the humidifier device off.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of humidifier devices to control.

### Service `humidifier.toggle`

Toggle the humidifier device on/off.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of humidifier devices to control.
