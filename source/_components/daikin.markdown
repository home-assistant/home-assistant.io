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
  - Switch
ha_release: 0.59
ha_iot_class: Local Polling
ha_qa_scale: platinum
redirect_from:
  - /components/climate.daikin/
  - /components/sensor.daikin/
---

The `daikin` component integrates Daikin air conditioning systems into Home Assistant.

There is currently support for the following device types within Home Assistant:

- [Climate](#climate)
- [Sensor](#sensor)
- [Switch](#switch)

## {% linkable_title Supported hardware %}

This component supports the European versions of Daikin AC (BRP069A[41,42,43,45]) and AU AirBase units (BRP15B61).
Some models do not support setting of fan speed or fan swing mode althogh it might show up in Home Assistant.
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

## {% linkable_title Switch %}

Daikin AirBase units exposes zones (typically rooms) that can be switched on/off individually.
