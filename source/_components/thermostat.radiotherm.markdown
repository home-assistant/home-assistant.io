---
layout: page
title: "Radiotherm Thermostat"
description: "Instructions how to integrate Radiotherm thermostats within Home Assistant."
date: 2015-10-18 17:15
sidebar: true
comments: false
sharing: true
footer: true
logo: radiotherm.png
ha_category: Thermostat
---


The `radiotherm` thermostat platform let you control a thermostat from [Radio Thermostat](http://www.radiothermostat.com/).

The underlaying library supports:
- CT50 V1.09
- CT50 V1.88
- CT50 V1.94 (also known as Filtrete 3M50)
- CT80 Rev B2 V1.03

To set it up, add the following information to your `configuration.yaml` file:

```yaml
thermostat:
  platform: radiotherm
  host:
    - 192.168.99.137
    - 192.168.99.202
  hold_temp: True
```

Configuration variables:

- **host** (*Required*): List of your Radiotherm thermostats
- **hold_temp** (*Required*): Boolean to control if hass temp adjustments hold(True) or are temporary(False)

Temperature settings from Home Assistant will be sent to thermostat and then hold at that temperature. Set to `False` if you set a thermostat schedule on the thermostat itself and just want Home Assistant to send temporary temperature changes.

