---
title: Sure Petcare
description: Instructions on how to integrate the Sure Petcare cat and pet flaps into Home Assistant.
ha_category:
  - Binary sensor
  - Device tracker
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
  - device_tracker
  - lock
  - sensor
ha_integration_type: integration
---

The Sure Petcare integration allows you to get information on your Sure Petcare Connect Pet or Cat Flap.

{% include integrations/config_flow.md %}

## Device tracker

The **Sure Petcare** integration provides device tracking for your pets. Each pet registered with your Sure Petcare account will have a corresponding device tracker entity. The entity shows whether the pet is currently inside (home) or outside (away).

The device tracker will show:

- **Home**: When the pet is inside.
- **Away**: When the pet is outside.
- **Unknown**: When the pet's location cannot be determined.

The device tracker entity also provides additional information as state attributes:

- `since`: The timestamp when the pet's location was last updated.
- `where`: The numeric location value from the Sure Petcare system.

## Actions

### Action `surepetcare.set_lock_state`

This action lets you change the locking state of a flap.

| Data attribute | Required | Type | Description |
| ---------------------- | -------- | -------- | ----------- |
| `flap_id` | `True` | integer | Flap ID to change - see below for instructions on finding device ID
| `lock_state` | `True` | string | New state to change the flap to

The `flap_id` can be found following these instructions:

- Log into [surepetcare.io](https://surepetcare.io/).
- Open the sidebar and click your flap.
- The `flap_id` will be at the end of the URL (i.e., `https://surepetcare.io/control/device/FLAP-ID`)

`lock_state` should be one of:

- `unlocked` - flap is unlocked, pets are allowed both in and out.
- `locked_in` - flap is 'in only' - pets can come in but not go back out.
- `locked_out` - flap is 'out only' - pets can go out, but not back in.
- `locked_all` - flap is locked both ways.

### Action `surepetcare.set_pet_location`

This action lets you set the pet location.

| Data attribute | Required | Type | Description |
| ---------------------- | -------- | -------- | ----------- |
| `name` | yes | string | Pet name
| `location` | yes | string | Pet location

`location` should be one of:

- `Inside` - Pet is inside.
- `Outside` - Pet is outside.
