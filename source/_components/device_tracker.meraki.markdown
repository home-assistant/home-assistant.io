---
layout: page
title: "Meraki"
description: "Instructions how to integrate Meraki-based presence detection into Home Assistant."
date: 2017-11-22 08:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Presence Detection
ha_release: 0.59
---
Use your `Meraki AP` as device tracker. Note that meraki will see all devices, not only connected to the network.
Follow instructions [here](https://meraki.cisco.com/technologies/location-analytics-api) how to enable Location Analytics. 

After you configure access to the Meraki CMX API, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: meraki
    secret: your_secert
    validator: meraki_validator
    track_new_devices: False
```


Configuration variables:

- **secret** (*Required*): Secret code added in Meraki
- **validator** (*Required*): Validation string from Meraki
- **track_new_devices** (*Optional*): If new discovered devices are tracked by default 