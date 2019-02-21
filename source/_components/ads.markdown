---
layout: page
title: "ADS"
description: Connect Home Assistant to TwinCAT devices via the ADS interface
date: 2017-12-05 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: beckhoff.png
ha_category:
  - Hub
  - Binary Sensor
  - Light
  - Sensor
  - Switch
ha_release: "0.60"
ha_iot_class: "Local Push"
redirect_from:
  - /components/binary_sensor.ads/
  - /components/light.ads/
  - /components/sensor.ads/
  - /components/switch.ads/
---

The ADS (automation device specification) describes a device-independent and fieldbus independent interface for communication between [Beckhoff](https://www.beckhoff.com/) automation devices running [TwinCAT](http://www.beckhoff.hu/english.asp?twincat/default.htm) and other devices implementing this interface.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#binary-sensor)
- [Light](#light)
- [Sensor](#sensor)
- [Switch](#switch)

## {% linkable_title Configuration %}

To enable ADS, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
ads:
  device: '127.0.0.1.1.1'
  port: 48898
```

{% configuration %}
device:
  description: The AMS NetId that identifies the device.
  required: true
  type: string
port:
  description: The port that runs the AMS server on the device, typically this would be 801 or 851.  
  required: true
  type: integer
ip_address:
  description: The IP address of the ADS device, if not set the first 4 bytes of the device id will be used.
  required: false
  type: string
{% endconfiguration %}

## {% linkable_title Service %}

The ADS component will register the service `write_by_name` allowing you to write a value to a variable on your ADS device.

```json
{
    "adsvar": ".myvariable",
    "adstype": "int",
    "value": 123
}
```

Service parameters:

- **adsvar**: Name of the variable on the ADS device. To access global variables on *TwinCAT2* use a prepending dot `.myvariable`, for TwinCAT3 use `GBL.myvariable`.
- **adstype**: Specify the type of the variable. Use one of the following: `int`, `byte`, `uint`, `bool`
- **value**: The value that will be written in the variable.

## {% linkable_title Binary Sensor %}

The `ads` binary sensor platform can be used to monitor a boolean value on your ADS device.

To use your ADS device, you first have to set up your [ADS hub](/components/ads/) and then add the following to your `configuration.yaml`
file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: ads
    adsvar: .boolean1
```

{% configuration %}
adsvar:
  description: The name of the variable which you want to access on the ADS device.
  required: true
  type: string
name:
  description: An identifier for the light in the frontend.
  required: false
  type: string
device_class:
  description: The [type/class](/components/binary_sensor/) of the sensor to set the icon in the frontend.
  required: false
  type: string
{% endconfiguration %}

## {% linkable_title Light %}

The `ads` light platform allows you to control your connecte ADS lights.

To use your ADS device, you first have to set up your [ADS hub](/components/ads/) and then add the following to your `configuration.yaml`
file:

```yaml
# Example configuration.yaml entry
light:
  - platform: ads
    adsvar: GVL.enable_light
    adsvar_brightness: GVL.brightness
```

{% configuration %}
adsvar:
  required: true
  description: The name of the boolean variable that switches the light on
  type: string
adsvar_brightness:
  required: false
  description: The name of the variable that controls the brightness, use an unsigned integer on the PLC side
  type: integer
name:
  required: false
  description: An identifier for the Light in the frontend
  type: string
{% endconfiguration %}

## {% linkable_title Sensor %}

The `ads` sensor platform allows reading the value of a numeric variable on your ADS device. The variable can be of type *INT*, *UINT* or *BYTE*.

To use your ADS device, you first have to set up your [ADS hub](/components/ads/) and then add the following to your `configuration.yaml`
file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: ads
    adsvar: GVL.temperature
    unit_of_measurement: '°C'
    adstype: integer
```

{% configuration %}
adsvar:
  required: true
  description: The name of the variable which you want to access.
  type: string
adstype:
  required: false
  description: The datatype of the ADS variable, possible values are int, uint, byte.
  default: int
  type: string
name:
  required: false
  description: An identifier for the sensor.
  type: string
factor:
  required: false
  description: A factor that divides the stored value before displaying in Home Assistant.
  default: 1
  type: integer
{% endconfiguration %}

The *factor* can be used to implement fixed decimals. E.g., set *factor* to 100 if you want to display a fixed decimal value with two decimals. A variable value of `123` will be displayed as `1.23`.

## {% linkable_title Switch %}

The `ads` switch platform accesses a boolean variable on the connected ADS device. The variable is identified by its name.

To use your ADS device, you first have to set up your [ADS hub](/components/ads/) and then add the following to your `configuration.yaml`
file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: ads
    adsvar: .global_bool
```

{% configuration %}
adsvar:
  required: true
  description: The name of the variable which you want to access on the ADS device.
  type: string
name:
  required: false
  description: An identifier for the switch in the frontend.
  type: string
{% endconfiguration %}