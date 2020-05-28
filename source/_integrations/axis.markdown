---
title: Axis
description: Integration between network devices from Axis Communications with Home Assistant.
ha_category:
  - Camera
  - Binary Sensor
  - Switch
ha_config_flow: true
ha_release: 0.45
ha_iot_class: Local Push
ha_codeowners:
  - '@Kane610'
ha_domain: axis
---

[Axis Communications](https://www.axis.com/) devices are surveillance cameras, speakers, access control and other security-related network connected hardware. Event API works with firmware 5.50 and newer.

Home Assistant will automatically discover their presence on your network.

## Configuration

For configuration go to the `Integrations pane` on your Home Assistant instance.

<div class='note'>
  It is recommended that you create a user on your Axis device specifically for Home Assistant. For all current functionality, it is enough to create a user belonging to user group viewer.
</div>

## Troubleshooting discovery

If your device is not discovered. On your camera, go to **System Options** -> **Advanced** -> **Plain Configuration**. Change the drop-down box to `network` and click `Select Group`. If `Network Interface I0 ZeroConf` contains the `169.x.x.x` IP address, unchecked the box next to `Enabled` for this section and click `Save`.

## Binary Sensor

The following sensor types are supported:

- Motion detection (VMD3/VMD4)
- Passive IR motion detection
- Sound detection
- Day/night mode
- Inputs and Supervised Inputs

## Switch

The following controllable port types are supported:

- Output
- Relay
