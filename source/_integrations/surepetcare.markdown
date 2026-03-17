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
ha_integration_type: hub
---

The **Sure Petcare** {% term integration %} allows you to get information on your Sure Petcare Connect Pet or Cat Flap.

{% include integrations/config_flow.md %}

## Supported functionality

These are the entities available in the Sure Petcare integration.

### Pets

#### Binary sensors

- **Presence**: Whether the pet is inside (presence).

#### Sensors

- **Last seen flap device ID**: Last flap device ID used by the pet (useful for the [pet select location blueprint](#pet-select-location-template-entity)). `unknown` if the last status is not from a flap update. This sensor is disabled by default.
- **Last seen user ID**: Last user ID that manually changed the pet location (useful for the [pet select location blueprint](#pet-select-location-template-entity)). `unknown` if the last status is not from a manual update. This sensor is disabled by default.

### Pet and cat flaps

#### Binary sensors

- **Connectivity**: Device connectivity (online); shows device RSSI when available.

#### Locks

- **Locked in**: Lock state: flap locked to allow entry only.
- **Locked out**: Lock state: flap locked to allow exit only.
- **Locked all**: Lock state: flap locked both ways.

#### Sensors

- **Battery level**: Battery level percentage (derived from battery voltage).

### Feeders

#### Binary sensors

- **Connectivity**: Feeder connectivity (online); shows device RSSI when available.

#### Sensors

- **Battery level**: Battery level percentage (derived from battery voltage).

### Felaqua

#### Binary sensors

- **Connectivity**: Felaqua connectivity (online); shows device RSSI when available.

#### Sensors

- **Felaqua**: Water remaining in the bowl.
- **Battery level**: Battery level percentage (derived from battery voltage).

### Hub

#### Binary sensors

- **Connectivity**: Hub connectivity (online); attributes include `led_mode` and `pairing_mode`.

## Actions

### Action: Set lock state

The `surepetcare.set_lock_state` action changes the locking state of a flap.

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

### Action: Set pet location

The `surepetcare.set_pet_location` action sets the pet location.

| Data attribute | Required | Type | Description |
| ---------------------- | -------- | -------- | ----------- |
| `name` | yes | string | Pet name
| `location` | yes | string | Pet location

`location` should be one of:

- `Inside` - Pet is inside.
- `Outside` - Pet is outside.

## Blueprints

### Pet select location (template entity)

<!-- markdownlint-disable MD034 -->
{% my blueprint_import badge blueprint_url="https://gist.github.com/Zhephyr54/846f369dce673a989e141e9c2555e4d2" %}
<!-- markdownlint-enable MD034 -->

Create a select entity for a pet representing its current location.
This is especially useful if you have multiple flaps that do not directly lead outside and the existing binary sensors can't accurately reflect your pets' locations.

Supports up to 10 flaps.

The sync is one-way only. While the pet select location is synced from the pet binary sensor, manually changing the select entity state won't impact the pet binary sensor (thus no impact in Sure Petcare).
