---
layout: page
title: "Radio Thermostat (3M Filtrete) Thermostat"
description: "Instructions on how to integrate Radio Thermostat (3M Filtrete) thermostats within Home Assistant."
date: 2015-10-18 17:15
sidebar: true
comments: false
sharing: true
footer: true
logo: radiotherm.png
ha_category: Climate
ha_iot_class: "Local Polling"
---


The `radiotherm` climate platform let you control a thermostat from [Radio Thermostat](http://www.radiothermostat.com/) or [3M Filtrete](http://www.radiothermostat.com/filtrete/products/). Your thermostat must have the Wi-Fi module installed and connected to your network.

The underlying library supports:

- CT50 V1.09
- CT50 V1.88
- CT50 V1.94 (also known as Filtrete 3M50)
- CT80 Rev B2 V1.03

To set it up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
climate:
  - platform: radiotherm
```

Configuration variables:

- **host** (*Optional*): List of your Radiotherm thermostats. If not provided the thermostats will be auto-detected.
- **away_temperature_heat** (*Optional*): Target heating temperature in Fahrenheit for away mode. This is separate from away mode in the app. Defaults to '60'.
- **away_temperature_cool** (*Optional*): Target cooling temperature in Fahrenheit for away mode. This is separate from away mode in the app. Defaults to '85'.
- **hold_temp** (*Optional*): Boolean to control if Home Assistant temperature adjustments hold (`true`) or are temporary (`false`). Defaults to `false`.

Set `hold_temp: true` if you want temperature settings from Home Assistant to override a thermostat schedule on the thermostat itself. Otherwise Home Assistant will perform temporary temperature changes.

The away mode functions similarly to the away mode feature of the website and apps, but cannot detect if you set away mode outside of Home Assistant.

Multiple thermostats can be assigned by using `host:` if auto-detection is not used.

```yaml
climate:
  platform: radiotherm
  host:
    - 192.168.99.137
    - 192.168.99.202
```
