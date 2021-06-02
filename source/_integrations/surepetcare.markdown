---
title: Sure Petcare
description: Instructions on how to integrate the Sure Petcare cat and pet flaps into Home Assistant.
ha_category:
  - Binary Sensor
  - Sensor
ha_release: 0.104
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@benleb'
ha_domain: surepetcare
ha_platforms:
  - binary_sensor
  - sensor
---

The `surepetcare` component allows you to get information on your Sure Petcare Connect Pet or Cat Flap.

## Configuration

To add a flap, feeder or pet, add the following to your `configuration.yaml` file. The Hubs a flap or feeder is connected to, will be discovered automatically.

```yaml
# Example configuration.yaml entry
surepetcare:
  username: YOUR_SURE_PETCARE_LOGIN
  password: YOUR_SURE_PETCARE_PASSWORD
```

{% configuration %}
  username:
    description: The Sure Petcare Username/Email
    required: true
    type: string
  password:
    description: The Sure Petcare Password
    required: true
    type: string
{% endconfiguration %}

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


## Initial Setup / Hints
On initial setup, your cats won't have an in / out status. This is an edge case which causes the intergration to fail to load with KeyError: 'status', simply make sure all cats have a location, this can be done manually via the Sure website.
