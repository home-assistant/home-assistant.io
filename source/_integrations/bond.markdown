---
title: Bond
description: Instructions on setting up Bond Bridge within Home Assistant.
ha_category:
  - Button
  - Cover
  - Fan
  - Hub
  - Light
  - Switch
ha_iot_class: Local Push
ha_release: 0.113
ha_domain: bond
ha_codeowners:
  - '@bdraco'
  - '@prystupa'
  - '@joshs85'
  - '@marciogranzotto'
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - button
  - cover
  - diagnostics
  - fan
  - light
  - switch
ha_integration_type: integration
---

The **Bond** {% term integration %} allows you to control appliances through your [Bond Bridge](https://bondhome.io/). Duplicates your RF remote control.

Supported devices (see Requirements section below):

- Ceiling fans
- Shades
- Fireplaces

## Tested Bond devices

The following devices have been tested with Home Assistant and confirmed to be working:

- Bond Bridge v1 (snowbird)
- Bond Bridge v2 (zermatt)
- Bond Bridge Pro (zermatt-pro)
- Smart By Bond Fans (breck)

## Prerequisites

To use Bond controlled devices in your installation, add your Bond hub host and access token from the integrations page. Instructions for how to obtain an access token can be found on the [Bond Local API](http://docs-local.appbond.com/#section/Getting-Started/Get-Device-Information) documentation, which includes a section for how to obtain the [IP address of the device](http://docs-local.appbond.com/#section/Getting-Started/Finding-the-Bond-IP) which you will need to obtain the access token.

{% include integrations/config_flow.md %}

## Requirements

This integration supports Bond bridges with firmware v2.10.x and up.
Bond bridges with firmware v2.9.x and lower will **not** work correctly. Please
upgrade your firmware from Bond app before adding this integration.

## BPUP support (Push updates)

Firmware version 2.10.8 or newer is required for push updates. The integration
will fallback to polling for 2.10.x versions lower than .8

### Action `bond.set_fan_speed_tracked_state`

Sets the tracked fan speed for a bond fan.
Calling this action will change the tracked speed of the fan but not transmit any signal to make the device change speed.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings of `entity_id`s.
| `speed` | no | Speed as a percentage.

### Action `bond.set_switch_power_tracked_state`

Sets the tracked power state of a bond switch.
Calling this action will change the tracked power state of any bond switch but not transmit any signal to make the device change its state.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings of `entity_id`s.
| `power_state` | no | Boolean power state.

### Action `bond.set_light_power_tracked_state`

Sets the tracked power state of a bond light.
Calling this {% term action %} will change the tracked power state of any bond light but not transmit any signal to make the device change its state.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings of `entity_id`s.
| `power_state` | no | Boolean power state.

### Action `bond.set_light_brightness_tracked_state`

Sets the tracked brightness state of a bond light
Calling this {% term action %} will change the tracked brightness state of any bond light but not transmit any signal to make the device change its state.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | no | String or list of strings of `entity_id`s.
| `brightness` | no | brightness as an integer between 0 and 255
