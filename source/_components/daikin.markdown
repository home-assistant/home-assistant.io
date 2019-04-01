---
layout: page
title: "Daikin AC"
description: "Instructions on how to integrate Hive devices with Home Assistant."
date: 2017-12-10 21:00
sidebar: true
comments: false
sharing: true
footer: true
logo: daikin.png
ha_category:
  - Climate
  - Sensor
ha_release: 0.59
ha_iot_class: Local Polling
redirect_from:
  - /components/climate.daikin/
  - /components/sensor.daikin/
---

The `daikin` component integrates Daikin air conditioning systems into Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Climate](#climate)
- [Sensor](#sensor)

## {% linkable_title Supported hardware %}

The European versions of Daikin AC (models BRP069A41, 42, 43, 45).

The Australian version of the Daikin Wifi Controller Unit BRP072A42. Confirmed working on a Daikin Cora Series Reverse Cycle Split System Air Conditioner 2.5kW Cooling FTXM25QVMA with operation mode, temp, fan swing (3d, horizontal, vertical) which is powered by the [DAIKIN Mobile Controller](https://itunes.apple.com/au/app/daikin-mobile-controller/id917168708?mt=8)

Some models do not support setting of fan speed or fan swing mode.

Please note that some AC devices may report outside temperature only when they are turned on.

## {% linkable_title Configuration %}

To automatically add all your Daikin devices (ACs and associated sensors) into your Home Assistant installation, add the following to your `configuration.yaml` file:

```yaml
# Full manual example configuration.yaml entry
daikin:
  hosts:
    - 192.168.4.161
```

{% configuration %}
hosts:
  description: List of IP addresses or hostnames.
  required: false
  default: All discovered hosts
  type: list
{% endconfiguration %}

## {% linkable_title Climate %}

The `daikin` climate platform integrates Daikin air conditioning systems into Home Assistant, enabling control of setting the following parameters:

- **mode** (cool, heat, dry, fan only or auto)
- **fan speed** (on supported models)
- **target temperature**
- **swing mode** (on supported models)

Current temperature is displayed.

## {% linkable_title Sensor %}

The `daikin` sensor platform integrates Daikin air conditioning systems into Home Assistant, enabling displaying the following parameters:

- Inside temperature
- Outside temperature
