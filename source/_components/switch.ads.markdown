---
layout: page
title: "ADS Switch"
description: "Instructions on how to set up ADS switches within Home Assistant."
date: 2017-10-25 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: beckhoff.png
ha_category: Switch
ha_release: "0.60"
ha_iot_class: "Local Push"
---

The `ads` switch platform accesses a boolean variable on the connected ADS device. The variable is identified by its name.

To use your ADS device, you first have to set up your [ADS hub](/components/ads/) and then add the following to your `configuration.yaml`
file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: ads
    adsvar: .global_bool
```

{% configuration %}
  adsvar:
    required: true
    description: The name of the variable which you want to access on the ADS device.
    type: string
  name: 
    required: false
    description: An identifier for the switch in the frontend.
    type: string
{% endconfiguration %}
