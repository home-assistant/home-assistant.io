---
layout: page
title: "Meraki"
description: "Instructions on how to integrate Meraki-based presence detection into Home Assistant."
date: 2017-11-22 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: meraki.png
ha_category: Presence Detection
ha_release: "0.60"
---
Use your `Meraki AP` as device tracker. Note that Meraki will see all devices, not only connected to the network.
Follow instructions [here](https://meraki.cisco.com/technologies/location-analytics-api) how to enable Location Analytics. 

After you configure access to the Meraki CMX API, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: meraki
    secret: your_secert
    validator: meraki_validator
```


{% configuration %}
  secret:
    description: Secret code added in Meraki
    required: true
    type: string
  validator:
    description: Validation string from Meraki
    required: true
    type: string
{% endconfiguration %}
