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
---



Home Assistant has support to integrate your [Verisure](https://www.verisure.com/) devices.

We support:

 * Alarm
 * Smartplugs
 * Reading from thermometers and hygrometers integrated in various devices
 * Mouse Detector
 * Locks 

To integrate Verisure with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
verisure:
  username: USERNAME
  password: PASSWORD
  alarm: 1
  hygrometers: 0
  smartplugs: 1
  thermometers: 0
  locks: 0
  mouse: 1
  code_digits: 4
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
- **code_digits** (*Optional*): Number of digits in PIN code. Default 4.

