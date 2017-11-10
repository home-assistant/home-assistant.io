---
layout: page
title: "Verisure"
description: "Instructions how to setup Verisure devices within Home Assistant."
date: 2015-08-17 20:28
sidebar: true
comments: false
sharing: true
footer: true
logo: verisure.png
ha_category: Hub
ha_release: pre 0.7
ha_iot_class: "Cloud Polling"
---

Home Assistant has support to integrate your [Verisure](https://www.verisure.com/) devices.

We support:

 * [Alarm](/components/alarm_control_panel.verisure/)
 * [Smartplugs](/components/switch.verisure/)
 * Reading from thermometers and hygrometers integrated in various [devices](/components/sensor.verisure/)
 * Mouse Detector
 * [Locks](/components/lock.verisure/)
 * [Door & Window](/components/binary_sensor.verisure/)

To integrate Verisure with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
verisure:
  username: USERNAME
  password: PASSWORD
```

Configuration variables:

- **username** (*Required*): The username to Verisure mypages.
- **password** (*Required*): The password to Verisure mypages.
- **alarm** (*Optional*): Set to 1 to show alarm, 0 to disable. Default 1.
- **hygrometers** (*Optional*): Set to 1 to show hygrometers, 0 to disable. Default 1.
- **smartplugs** (*Optional*): Set to 1 to show smartplugs, 0 to disable. Default 1.
- **locks** (*Optional*): Set to 1 to show locks, 0 to disable. Default 1.
- **thermometers** (*Optional*): Set to 1 to show thermometers, 0 to disable. Default 1.
- **mouse** (*Optional*): Set to 1 to show mouse detectors, 0 to disable. Default 1.
- **door_window** (*Optional*): Set to 1 to show door and window sensors, 0 to disable. Default 1.
- **code_digits** (*Optional*): Number of digits in PIN code. Default 4.
- **giid** (*Optional*): The GIID of your installation (If you have more then one alarm system).
