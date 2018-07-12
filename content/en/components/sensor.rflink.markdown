---
layout: page
title: "RFLink Sensor"
description: "Instructions on how to integrate RFLink sensors into Home Assistant."
date: 2016-01-04
sidebar: true
comments: false
sharing: true
footer: true
logo: rflink.png
ha_category: Sensor
ha_release: 0.38
ha_iot_class: "Local Polling"
---

The `rflink` component support devices that use [RFLink gateway firmware](http://www.nemcon.nl/blog2/), for example the [Nodo RFLink Gateway](https://www.nodo-shop.nl/nl/21-rflink-gateway). RFLink gateway is an Arduino firmware that allows two-way communication with a multitude of RF wireless devices using cheap hardware (Arduino + transceiver).

First you have to set up your [rflink hub](/components/rflink/).

After configuring the RFLink hub sensors will be automatically discovered and added.

RFLink sensor ID's are composed of: protocol, id and type (optional). For example: `alectov1_0334_temp`. Some sensors emit multiple types of data. Each will be created as its own

Once the ID of a sensor is known it can be used to configure the sensor in HA, for example to add it to a different group, hide it or configure a nice name.

Assigning name to a sensor:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rflink
    devices:
      alectov1_0334_temp:
        name: Temperature Outside
```

Configuration variables:

- **automatic_add** (*Optional*): Automatically add new/unconfigured devices to HA if detected (default: True).
- **devices**  (*Optional*): A list of devices with their name to use in the frontend.

Device configuration variables:

- **name** (*Optional*): Name for the device, defaults to RFLink ID.
- **sensor_type** (*Required*): Override automatically detected type of sensor. For list of values see below.
- **unit_of_measurement** (*Optional*): Override automatically detected unit of sensor.
- **aliases** (*Optional*): Alternative RFLink ID's this device is known by.

Sensor type values:

- average_windspeed
- barometric_pressure
- battery
- weather_forecast
- doorbell_melody
- command
- co2_air_quality
- current_phase_1
- current_phase_2
- current_phase_3
- distance
- firmware
- humidity_status
- humidity
- hardware
- kilowatt
- light_intensity
- meter_value
- total_rain
- rain_rate
- total_rain
- revision
- noise_level
- temperature
- uv_intensity
- version
- voltage
- watt
- windchill
- winddirection
- windgusts
- windspeed
- windtemp

### {% linkable_title Hiding/ignoring sensors %}

Sensors are added automatically when the RFLink gateway intercepts a wireless command in the ether. To prevent cluttering the frontend use any of these methods:

- Disable automatically adding of unconfigured new sensors (set `automatic_add` to `false`).
- Hide unwanted devices using [customizations](/getting-started/customizing-devices/)
- [Ignore devices on a platform level](/components/rflink/#ignoring-devices)

### {% linkable_title Device support %}

See [device support](/components/rflink/#device-support)

