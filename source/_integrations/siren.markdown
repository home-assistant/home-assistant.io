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

Available services: `siren.turn_on`, `siren.turn_off`, `siren.toggle`

<div class='note'>

Not all siren services may be available for your platform. Be sure to check the available services Home Assistant has enabled by checking the Services page in the [Developer Tools](/docs/tools/dev-tools/).

</div>

### Service `siren.turn_on`

Turn the siren on.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`'s of sirens to control.

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
