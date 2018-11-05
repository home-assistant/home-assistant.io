---
layout: page
title: "W800rf32 Switch"
description: "Instructions on how to integrate W800rf32 switches into Home Assistant."
date: 2018-10-16 12:45
sidebar: true
comments: false
sharing: true
footer: true
logo: w800rf32.png
ha_category: Switch
ha_release: 0.79
ha_iot_class: "Local Push"
---

The `w800rf32` platform supports X10 RF devices such as Palm Pad remotes, key chain remotes 
and many, many other X10 RF devices.
Some that have specifically been used with this are the KR19A keychain and the RSS18 four 
button wall mount keypad.

# Setting up your devices

Once you have set up your [w800rf32 hub](/components/w800rf32/), add the 
switches to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry

switch:
  - platform: w800rf32
    devices:
      c1:
        name: keypad_1
      c2:
        name: wallpad_1
```

W800rf32 switches have only two states - "on" and "off". Most if not all keypads
are not true switches but have an on and an off button.
