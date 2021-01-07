---
title: "RFLink Sensor"
description: "Instructions on how to integrate RFLink sensors into Home Assistant."
logo: rflink.png
ha_category:
  - Sensor
ha_iot_class: Local Push
ha_release: 0.38
ha_domain: rflink
---

The `rflink` integration supports devices that use [RFLink gateway firmware](http://www.nemcon.nl/blog2/), for example the [Nodo RFLink Gateway](https://www.nodo-shop.nl/nl/21-rflink-gateway). RFLink gateway is an Arduino firmware that allows two-way communication with a multitude of RF wireless devices using cheap hardware (Arduino + transceiver).

## Configuration

First, you have to set up your [RFLink hub](/integrations/rflink/).

After configuring the RFLink hub, sensors will be automatically discovered and added.

RFLink sensor ID's are composed of: protocol, id and type (optional). For example: `alectov1_0334_temp`. Some sensors emit multiple types of data. Each will be created as its own.

Once the ID of a sensor is known, it can be used to configure the sensor in Home Assistant, for example to add it to a different group or configure a nice name.

Configuring a device as a sensor:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rflink
    devices:
      alectov1_0334_temp: {}
```

{% configuration %}
automatic_add:
  description: Automatically add new/unconfigured devices to Home Assistant if detected.
  required: false
  default: true
  type: boolean
devices:
  description: A list of sensors.
  required: false
  type: list
  keys:
    rflink_ids:
      description: RFLink ID of the device
      required: true
      type: map
      keys:
        name:
          description: Name for the device.
          required: false
          default: RFLink ID
          type: string
        sensor_type:
          description: Override automatically detected type of sensor. For list of [values](/integrations/sensor.rflink/#sensors-types) see below.
          required: true
          type: string
        unit_of_measurement:
          description: Override automatically detected unit of sensor.
          required: false
          type: string
        aliases:
          description: "Alternative RFLink ID's this device is known by."
          required: false
          type: [list, string]
{% endconfiguration %}

## Sensor types

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
- revision
- noise_level
- temperature
- timestamp
- uv_intensity
- version
- voltage
- watt
- windchill
- winddirection
- windgusts
- windspeed
- windtemp

## Hiding/ignoring sensors

Sensors are added automatically when the RFLink gateway intercepts a wireless command in the ether. To prevent cluttering the frontend use any of these methods:

- Disable automatically adding of unconfigured new sensors (set `automatic_add` to `false`).
- [Ignore devices on a platform level](/integrations/rflink/#ignoring-devices)

## Device support

See [device support](/integrations/rflink/#device-support)

## Additional configuration examples

Multiple sensors with `automatic_add` disabled and `aliases`

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rflink
    automatic_add: false
    devices:
      oregontemp_0d93_temp:
        sensor_type: temperature
      oregontemp_0d93_bat:
        sensor_type: battery
      tunex_c001_temp:
        sensor_type: temperature
        aliases:
          - xiron_4001_temp
      tunex_c001_hum:
        sensor_type: humidity
        aliases:
          - xiron_4001_hum
      tunex_c001_bat:
        sensor_type: battery
        aliases:
          - xiron_4001_bat
```
