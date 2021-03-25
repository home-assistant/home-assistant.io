---
title: Siren
description: Instructions on how to set up siren devices within Home Assistant.
ha_category:
  - Siren
ha_release: '2021.5'
ha_domain: siren
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
  - '@raman325'
ha_iot_class:
---

The `siren` integration is built for the controlling and monitoring of siren/chime devices.

## Services

### siren services

Available services: `siren.set_active_tone`, `siren.set_volume_level`, `siren.turn_on`, `siren.turn_off`, `siren.toggle`

<div class='note'>

Not all siren services may be available for your platform. Be sure to check the available services Home Assistant has enabled by checking the Services page in the [Developer Tools](/docs/tools/dev-tools/).

</div>

### Service `siren.set_active_tone`

Set active tone for the siren device. This service is only available if the device supports different tones. The list of available tones depend on the device itself.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of siren devices to control.
| `tone` | no  | New activee tone.

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: siren.set_active_tone
      target:
        entity_id: siren.doorbell
      data:
        tone: "doorbell"
```

### Service `siren.set_volume_level`

Set volume level of the siren device

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of siren devices to control.
| `volume_level` | no  | New volume level for siren device

#### Automation example

```yaml
automation:
  trigger:
    platform: time
    at: "07:15:00"
  action:
    - service: siren.set_volume_level
      target:
        entity_id: siren.doorbell
      data:
        humidity: 0.5
```

### Service `siren.turn_on`

Turn the siren device on.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of siren devices to control.

### Service `siren.turn_off`

Turn the siren device off.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of siren devices to control.

### Service `siren.toggle`

Toggle the siren device on/off.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of siren devices to control.
