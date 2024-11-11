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

The **Siren** {% term integration %} is built for the controlling and monitoring of siren/chime devices.

{% include integrations/building_block_integration.md %}

## The state of a siren entity

The state of a siren entity can be either **On** or **Off**.

In addition, the entity can have the following states:

- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

## Actions

### Siren actions

Available {% term actions %}: `siren.turn_on`, `siren.turn_off`, `siren.toggle`

### Action `siren.turn_on`

Turn the siren on.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of sirens to control.

There are three optional input parameters that can be passed into the action depending on whether or not your device supports them. Check the device's integration documentation for more details.

| Parameter Name  | Input Type              | Notes                                                                               |
|---------------- |-------------------------|-------------------------------------------------------------------------------------|
| `tone`          | `string` or `integer`   | When the `available_tones` property is a map, either the key or value can be used.  |
| `duration`      | `integer`               |                                                                                     |
| `volume_level`  | `float` between 0 and 1 |                                                                                     |

### Action `siren.turn_off`

Turn the siren off.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of sirens to control.

### Action `siren.toggle`

Toggle the siren on/off.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of sirens to control.
