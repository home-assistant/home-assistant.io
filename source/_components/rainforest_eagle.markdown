---
layout: page
title: "Rainforest Eagle-200"
description: "Instructions on how to setup the Rainforest Eagle-200 with Home Assistant."
date: 2019-07-02 18:00
logo: rainforest_automation_logo.png
sidebar: true
comments: false
sharing: true
footer: true
ha_category:
  - Energy
  - Sensor
ha_release: 0.96
ha_iot_class: Local Polling
---

A `sensor` platform for the [Rainforest Eagle-200](https://rainforestautomation.com/rfa-z114-eagle-200/) energy gateway.

## {% linkable_title Configuration %}

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rainforest_eagle
    ip_address: IP_FOR_EAGLE
    cloud_id: CLOUD_ID_FROM_EAGLE
    install_code: INSTALL_CODE_FROM_EAGLE
```

{% configuration %}
ip_address:
  description: The local IP address of your Eagle-200 device.
  required: true
  type: string
cloud_id:
  description: The Cloud ID that is printed on the bottom of the Eagle-200
  required: true
  type: string
install_code:
  description: The Install Code that is printed on the bottom of the Eagle-200
  required: true
  type: string
{% endconfiguration %}
<<<<<<< HEAD
=======

## {% linkable_title Examples %}

In this section you find some real-life examples of how to use this sensor.

### {% linkable_title Limit monitored metrics to demand %}

This example shows how to collect only energy power readings.

```yaml
sensor:
  - platform: rainforest_eagle
    ip_address: IP_FOR_EAGLE
    cloud_id: CLOUD_ID_FROM_EAGLE
    install_code: INSTALL_CODE_FROM_EAGLE
    monitored_conditions:
      - instantanous_demand
```

### {% linkable_title Limit monitored metrics to Demand and Net Power Readings %}                                                          

This example shows how to collect only energy power readings and net power usage.

```yaml
sensor:
  - platform: rainforest_eagle
    ip_address: IP_FOR_EAGLE
    cloud_id: CLOUD_ID_FROM_EAGLE
    install_code: INSTALL_CODE_FROM_EAGLE
    monitored_conditions:
      - instantanous_demand
      - summation_total
```
>>>>>>> a9f4522857afbdbdace6c3d8f652644d8d822c64
