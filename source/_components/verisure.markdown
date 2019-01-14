---
layout: page
title: "Verisure"
description: "Instructions on how to setup Verisure devices within Home Assistant."
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

## {% linkable_title Configuration %}

To integrate Verisure with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
verisure:
  username: USERNAME
  password: PASSWORD
```

{% configuration %}
username:
  description: The username to Verisure mypages.
  required: true
  type: string
password:
  description: The password to Verisure mypages.
  required: true
  type: string
alarm:
  description: Set to `true` to show alarm, `false` to disable.
  required: false
  type: boolean
  default: true
hygrometers:
  description: Set to `true` to show hygrometers, `false` to disable.
  required: false
  type: boolean
  default: true
smartplugs:
  description: Set to `true` to show smartplugs, `false` to disable.
  required: false
  type: boolean
  default: true
locks:
  description: Set to `true` to show locks, `false` to disable.
  required: false
  type: boolean
  default: true
default_lock_code:
  description: Code that will be used to lock or unlock, if none is supplied.
  required: false
  type: string
thermometers:
  description: Set to `true` to show thermometers, `false` to disable.
  required: false
  type: boolean
  default: true
mouse:
  description: Set to `true` to show mouse detectors, `false` to disable.
  required: false
  type: boolean
  default: true
door_window:
  description: Set to `true` to show mouse detectors, `false` to disable.
  required: false
  type: boolean
  default: true
code_digits:
  description: Number of digits in PIN code.
  required: false
  type: integer
  default: 4
giid:
  description: The GIID of your installation (If you have more then one alarm system). To find the GIID for your systems run 'python verisure.py EMAIL PASSWORD installations'.
  required: false
  type: string
{% endconfiguration %}
