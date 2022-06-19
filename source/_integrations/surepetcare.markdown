---
title: Sure Petcare
description: Instructions on how to integrate the Sure Petcare cat and pet flaps into Home Assistant.
ha_category:
  - Binary Sensor
  - Lock
  - Sensor
ha_release: 0.104
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@benleb'
  - '@danielhiversen'
ha_domain: surepetcare
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - lock
  - sensor
ha_integration_type: integration
---

The `surepetcare` component allows you to get information on your Sure Petcare Connect Pet or Cat Flap.

{% include integrations/config_flow.md %}


## Services

### Service `surepetcare.set_lock_state`

This service lets you change the locking state of a flap.

| Service data attribute | Required | Type | Description |
| ---------------------- | -------- | -------- | ----------- |
| `flap_id` | `True` | integer | Flap ID to change - see below for instructions on finding device IDs
| `lock_state` | `True` | string | New state to change the flap to

`lock_state` should be one of:

- `unlocked` - flap is unlocked, pets are allowed both in and out.
- `locked_in` - flap is 'in only' - pets can come in but not go back out.
- `locked_out` - flap is 'out only' - pets can go out, but not back in.
- `locked_all` - flap is locked both ways.

### Service `surepetcare.set_pet_location`

This service lets you set the pet location.

| Service data attribute | Required | Type | Description |
| ---------------------- | -------- | -------- | ----------- |
| `name` | yes | string | Pet name
| `location` | yes | string | Pet location

`location` should be one of:

- `Inside` - Pet is inside.
- `Outside` - Pet is outside.
