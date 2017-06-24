---
layout: page
title: "PiFace Digital I/O Binary Sensor"
description: "Instructions how to integrate the PiFace Digital I/O module into Home Assistant as a binary sensor."
date: 2016-05-08 15:00
sidebar: true
comments: false
sharing: true
footer: true
logo: raspberry-pi.png
ha_category: Binary Sensor
ha_release: 0.45
ha_iot_class: "Local Push"
---

The `rpi_pfio` binary sensor platform allows you to read sensor values of the [PiFace Digital I/O](http://www.piface.org.uk/products/piface_digital/) .

To use your PiFace Digital I/O module in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: rpi_pfio
    ports:
      0:
        name: PIR Office
        invert_logic: true
      1:
        name: Doorbell
        settle_time: 50
```

Configuration variables:

- **ports** array (*Required*): Array of used ports.
  - **num** (*Required*): Port number.
    - **name** (*Required*): Port name.
    - **settle_time** (*Optional*): The time in milliseconds for port debouncing. Default is 2 0ms.
    - **invert_logic** (*Optional*): If true, inverts the output logic to ACTIVE LOW. Default is false (ACTIVE HIGH).

