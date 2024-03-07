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
ha_integration_type: device
---

The JVC Projector integration allows for the automation of [JVC Projectors](https://www.jvc.com/usa/projectors/).

## Supported models

This integration is intended for the automation of any modern JVC Projector with a LAN network port.

{% include integrations/config_flow.md %}

## Remote

The JVC Projector remote platform will create a [Remote](/integrations/remote/) entity for the device. This entity allows you to send the following commands via the [remote.send_command](/integrations/remote/) service.

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

The status reported is:
- **Power on** is **True** when the projector is either in status **on** or **warming**.
