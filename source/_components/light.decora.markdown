---
layout: page
title: "Decora"
description: "Instructions on how to setup Leviton Decora Bluetooth dimmers within Home Assistant."
date: 2017-01-18 22:45
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Light
ha_iot_class: "Local Polling"
featured: false
ha_release: 0.37
---

Support for the Decora Bluetooth dimmer switch [Leviton](http://www.leviton.com/OA_HTML/SectionDisplay.jsp?section=76697&minisite=10251). To enable these lights, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: decora
    devices:
      00:21:4D:00:00:01:
        name: Light 1
        api_key: 0x12345678
      00:21:3D:20:00:a1:
        name: Bulb 2
        api_key: 0x54321876
```

Configuration variables:

- **devices**: A list of devices with their bluetooth address, a custom name to use in the frontend and the API key. The API key can be obtained by downloading [this git repository](https://github.com/mjg59/python-decora) and running the read_key.py script with the Bluetooth address of the switch as the first argument. Hold the switch in the off position until the green status LED starts flashing before running the script. The output is the API key.