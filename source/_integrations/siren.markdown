---
title: Siren
description: Instructions on how to set up siren devices within Home Assistant.
ha_category:
  - Siren
ha_release: '2021.8'
ha_domain: siren
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
  - '@raman325'
ha_integration_type: entity
---

The Siren integration is built for the controlling and monitoring of siren/chime devices.

Siren entities are created automatically by integrations that support them.

## Services

### siren services

Available services: `siren.turn_on`, `siren.turn_off`, `siren.toggle`

### Service `siren.turn_on`

Turn the siren on.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of sirens to control.

There are three optional input parameters that can be passed into the service call depending on whether or not your device supports them. Check the device's integration documentation for more details.

| Parameter Name  | Input Type              | Notes                                                                               |
|---------------- |-------------------------|-------------------------------------------------------------------------------------|
| `tone`          | `string` or `integer`   | When the `available_tones` property is a map, either the key or value can be used.  |
| `duration`      | `integer`               |                                                                                     |
| `volume_level`  | `float` between 0 and 1 |                                                                                     |

### Service `siren.turn_off`

Turn the siren off.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of sirens to control.

### Service `siren.toggle`

Toggle the siren on/off.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of sirens to control.
