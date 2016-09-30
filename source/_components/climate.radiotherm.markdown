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
ha_category: Climate
---


The `radiotherm` climate platform let you control a thermostat from [Radio Thermostat](http://www.radiothermostat.com/).

The underlaying library supports:

- CT50 V1.09
- CT50 V1.88
- CT50 V1.94 (also known as Filtrete 3M50)
- CT80 Rev B2 V1.03

To set it up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
climate:
  platform: radiotherm
```

Configuration variables:

- **host** (*Optional*): List of your Radiotherm thermostats. If not provided the thermostats will be auto-detected.
- **hold_temp** (*Optional*): Boolean to control if Home Assistant temperature adjustments hold (`True`) or are temporary (`False`). Defaults to `False`.

Temperature settings from Home Assistant will be sent to thermostat and then hold at that temperature. Set to `False` if you set a thermostat schedule on the thermostat itself and just want Home Assistant to send temporary temperature changes.

Multiple thermostats could be assigned by using `host:` if auto-detetion is not used.

```yaml
climate:
  platform: radiotherm
  host:
    - 192.168.99.137
    - 192.168.99.202
```
