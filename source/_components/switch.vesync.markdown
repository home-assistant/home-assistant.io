---
layout: page
title: "VeSync Switch"
description: "Instructions on how to set up Etekcity VeSync switches within Home Assistant."
date: 2018-03-09 02:11
sidebar: true
comments: false
sharing: true
footer: true
logo: vesync.png
ha_category: Switch
ha_release: 0.66
---

The `vesync` switch platform enables integration with Etekcity VeSync smart switches.

VeSync switches are low-cost wifi smart plugs that offer energy monitoring and work with popular voice assistants.

To use your VeSync switches, you must first register your switches with the VeSync app. Once registration is complete you must add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: vesync
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: Username needed to log in to VeSync.
  required: true
  type: string
password:
  description: Password needed to log in to VeSync.
  required: true
  type: string
{% endconfiguration %}

### {% linkable_title Exposed Attributes %}

VeSync switches will expose the following details.

| Attribute           | Description                                                         | Example         |
| ------------------- | ------------------------------------------------------------------- | --------------- |
| `current_power_w`   | The present power consumption of the switch in watts.               | 100             |
| `today_energy_kwh`  | The kilowatt hours used by the switch during the previous 24 hours. | 0.12            |
| `connection_status` | The connection status of the switch.                                | online          |
| `connection_type`   | The connection type of the switch.                                  | wifi            |
| `device_type`       | The device type of the switch.                                      | wifi-switch-1.3 |
| `model`             | The model of the switch.                                            | wifi-switch     |
