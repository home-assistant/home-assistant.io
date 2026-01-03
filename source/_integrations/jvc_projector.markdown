---
title: JVC Projector
description: Instructions on how to integrate JVC Projector into Home Assistant.
ha_category:
  - Remote
ha_release: '2023.6'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@SteveEasley'
  - '@msavazzi'
ha_domain: jvc_projector
ha_platforms:
  - binary_sensor
  - remote
  - select
  - sensor
ha_integration_type: device
---

The JVC Projector integration allows for the automation of [JVC Projectors](https://www.jvc.com/usa/projectors/).

## Supported models

This integration is intended for the automation of any modern JVC Projector with a network port.

## Prerequisites

JVC is requiring newer 2024+ models to use a user-generated password to access the network port for security reasons.

To set up these models:

1. Set a password on the projector's network setup page.
2. Use this password when adding the JVC Projector integration in Home Assistant.


{% include integrations/config_flow.md %}

## Remote

The JVC Projector remote platform will create a [Remote](/integrations/remote/) entity for the device. This entity allows you to send the following commands via the [remote.send_command](/integrations/remote/) action.

- `menu`
- `up`
- `down`
- `left`
- `right`
- `ok`
- `back`
- `info`
- `input`
- `hide`
- `mpc`
- `cmd`
- `advanced_menu`
- `picture_mode`
- `color_profile`
- `lens_control`
- `setting_memory`
- `gamma_settings`
- `hdmi_1`
- `hdmi_2`
- `mode_1`
- `mode_2`
- `mode_3`
- `lens_ap`
- `gamma`
- `color_temp`
- `natural`
- `cinema`
- `anamo`
- `3d_format`

### Binary sensor

The following sensor types are supported:

- Power on is True when projector is in status "on", "warming"

### Sensor

Introduces two sensors to detect Power Status and HDMI Input.

Detailed Power Status values:

- `standby`
- `on`
- `warming`
- `cooling`
- `error`

Please note that if the projector is off, it will not respond to remote polling and will show as *unavailable*.

Detailed HDMI Input values:

- `hdmi1`
- `hdmi2`

### Selects

The following Select entities are added. They allow changing the device state from a list of options.

- `input`
