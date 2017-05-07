---
layout: page
title: "Modbus Switch"
description: "Instructions how to integrate Modbus switches into Home Assistant."
date: 2015-08-30 23:38
sidebar: true
comments: false
sharing: true
footer: true
logo: modbus.png
ha_category: Switch
ha_release: pre 0.7
---


The `modbus` switch platform allows you to control [Modbus](http://www.modbus.org/) coils.

To use your Modbus switches in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yml entry
switch:
  platform: modbus
  slave: 1
  coils:
    - name: Switch1
      slave: 1
      coil: 13
    - name: Switch2
      slave: 2
      coil: 14
```

Configuration variables:

- **coils** (*Optional*): A list of relevant coils to read from/write to
  - **slave** (*Required*): The number of the slave (can be omitted for tcp and udp Modbus).
  - **name** (*Required*): Name of the sensor
  - **coil** (*Required*): Coil number
