---
title: Sure Petcare
description: Instructions on how to integrate the Sure Petcare cat and pet flaps into Home Assistant.
ha_category:
  - Binary sensor
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

The **Sure Petcare** {% term integration %} allows you to get information on your Sure Petcare Connect Pet or Cat Flap.

{% include integrations/config_flow.md %}


## Actions

### Action: Set lock state

The `surepetcare.set_lock_state` action changes the locking state of a flap.

| Data attribute | Required | Type | Description |
| ---------------------- | -------- | -------- | ----------- |
| `flap_id` | `True` | integer | Flap ID to change - see below for instructions on finding device ID
| `lock_state` | `True` | string | New state to change the flap to

`lock_state` should be one of:

- `unlocked` - flap is unlocked, pets are allowed both in and out.
- `locked_in` - flap is 'in only' - pets can come in but not go back out.
- `locked_out` - flap is 'out only' - pets can go out, but not back in.
- `locked_all` - flap is locked both ways.

### Action: Set pet location

The `surepetcare.set_pet_location` action sets the pet location.

| Data attribute | Required | Type | Description |
| ---------------------- | -------- | -------- | ----------- |
| `name` | yes | string | Pet name
| `location` | yes | string | Pet location

`location` should be one of:

- `Inside` - Pet is inside.
- `Outside` - Pet is outside.

### Action: Set curfew

The `surepetcare.set_curfew` action sets curfew times for a flap. Curfew automatically locks and unlocks the flap at specified times daily.

| Data attribute | Required | Type | Description |
| ---------------------- | -------- | -------- | ----------- |
| `flap_id` | yes | string or integer | Flap ID to change - see below for instructions on finding device ID
| `lock_time` | yes | string | Time to automatically lock the flap each day. Format: HH:MM:SS (24-hour format). For example: "22:00:00" for 10 PM.
| `unlock_time` | yes | string | Time to automatically unlock the flap each day. Format: HH:MM:SS (24-hour format). For example: "07:00:00" for 7 AM.

This example configures the flap to automatically lock at 10 PM and unlock at 7 AM every day:

```yaml
action: surepetcare.set_curfew
data:
  flap_id: 123456
  lock_time: "22:00:00"
  unlock_time: "07:00:00"
```

## Finding device IDs

The `flap_id` can be found following these instructions:

- Log into [surepetcare.io](https://surepetcare.io/).
- Open the sidebar and click your flap.
- The `flap_id` will be at the end of the URL (i.e., `https://surepetcare.io/control/device/FLAP-ID`)