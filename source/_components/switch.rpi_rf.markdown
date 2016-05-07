---
layout: page
title: "Raspberry PI GPIO Switch"
description: "Instructions how to integrate the GPIO of a Raspberry PI into Home Assistant as a switch."
date: 2016-05-07 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: raspberry-pi.png
ha_category: Switch
ha_release: 0.19
---


The `rpi_rf` switch platform allows you to control devices over 433/315MHz LPD/SRD signals with generic low-cost GPIO RF modules on a [Raspberry Pi](https://www.raspberrypi.org/).

To use your Raspberry Pi with a 433MHz adaptor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  platform: rpi_rf
  gpio: 17
  switches:
    bedroom_light:
      code_on: 1234567
      code_off: 1234568
    ambilight:
      pulselength: 200
      code_on: 987654
      code_off: 133742
```

Configuration variables:

- **gpio** array (*Required*): Array of used ports.
- **switches:** (*Required*): Array of switches.
  - **[name]** (*Requireld*): If true, inverts the output logic to ACTIVE LOW. Default is false (ACTIVE HIGH).
    - **code_on** (*Requireld*): Code to switch the device on, eg. `987654`.
    - **code_off** (*Requireld*):  Code to switch the device off, eg. `133742`.
    - **pulselength** (*Optional*):  Length of the pulse

