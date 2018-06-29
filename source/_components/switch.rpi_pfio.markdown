---
layout: page
title: "PiFace Digital I/O Switch"
description: "Instructions on how to integrate the PiFace Digital I/O module into Home Assistant as a switch."
date: 2016-05-08 15:00
sidebar: true
comments: false
sharing: true
footer: true
logo: raspberry-pi.png
ha_category: Switch
ha_release: 0.45
ha_iot_class: "Local Polling"
---

The `rpi_pfio` switch platform allows you to control the [PiFace Digital I/O](http://www.piface.org.uk/products/piface_digital/) module.

To use your PiFace Digital I/O module in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: rpi_pfio
    ports:
      0:
        name: Doorlock
        invert_logic: true
      1:
        name: Light Desk
```

Configuration variables:

- **ports** array (*Required*): Array of used ports.
  - **num** (*Required*): Port number.
    - **name** (*Required*): Port name.
    - **invert_logic** (*Optional*): If true, inverts the output logic to ACTIVE LOW. Default is false (ACTIVE HIGH).

