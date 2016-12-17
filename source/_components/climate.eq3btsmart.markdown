---
layout: page
title: "EQ3 Bluetooth Smart Thermostats"
description: "Instructions how to integrate EQ3 Bluetooth Smart Thermostats into Home Assistant."
date: 2016-04-18 22:00
sidebar: true
comments: false
sharing: true
footer: true
logo: eq3.gif
ha_category: Climate
ha_iot_class: "Local Poll"
---


The `eq3btsmart` climate platform allows you to integrate EQ3 Bluetooth Smart Thermostats.

The current functionality allows setting the temperature as well as controlling the supported modes with help of [bluepy_devices](https://github.com/bimbar/bluepy_devices) library.
As the device doesn't contain a temperature sensor ([read more](https://forum.fhem.de/index.php/topic,39308.15.html)),
we report target temperature also as current one.

### Initial setup ###
Setup is a bit more cumbersome than for most other thermostats. It has to be paired first:

```bash
bluetoothctl
scan on
<Wait for the thermostat to be found, which looks like this: [NEW] Device 00:11:22:33:44:55 CC-RT-BLE>
scan off
<Set the thermostat to pairing mode.>
pair <MAC>
trust <MAC>
disconnect <MAC>
exit
```

### Testing the connectivity ###
Connectivity can be tested with eq3cli tool:.

```bash
eq3cli --mac 00:11:22:33:44:55

MAC: 00:11:22:33:44:55 Mode: 2 = auto dst T: 21.0
Locked: False
Batter low: False
Window open: False
Boost: False
Current target temp: 21.0
Current mode: auto dst
Valve: 0
``` 
Important: The thermostat can only be connected by one device at a time, so it needs to be connected from bluetoothd.

```bash
/usr/bin/bt-device -d CC-RT-BLE
```

### Configuration ###

```yaml
# Example configuration.yaml entry
climate:
  - platform: eq3btsmart
    devices:
      room1:
        mac: '00:11:22:33:44:55'
```

Configuration variables:

- **devices** array (*Required*): List of thermostats.
  - **[device-name]** (*Required*): The name to use for the thermostat.
    - **mac** (*Required*): MAC address of the thermostat.

