---
layout: page
title: "VeSync Switch"
description: "Instructions on how to set up Etekcity VeSync switches and outlets within Home Assistant."
date: 2018-03-09 02:11
sidebar: true
comments: false
sharing: true
footer: true
logo: vesync.png
ha_category:
  - Switch
ha_release: 0.66
redirect_from:
 - /components/switch.vesync/
---

The `vesync` switch platform enables integration with Etekcity VeSync smart wall switches and outlets.

VeSync outlets are low-cost wifi smart plugs that offer energy monitoring and work with popular voice assistants.

Supports both the 7A round outlets and 15A rectangular outlets, as well as the in wall switches.

## {% linkable_title Configuration %}

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

## {% linkable_title Exposed Attributes %}

VeSync switches will expose the following details for only the smart outlets. Energy monitoring not available for in-wall switches.

| Attribute           | Description                                                         | Example         |
| ------------------- | ------------------------------------------------------------------- | --------------- |
| `current_power_w`   | The present power consumption of the switch in watts.               | 100             |
| `today_energy_kwh`  | The kilowatt hours used by the switch during the previous 24 hours. | 0.12            |
