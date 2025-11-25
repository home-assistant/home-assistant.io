---
title: ADS
description: Connect Home Assistant to TwinCAT devices via the ADS interface
ha_category:
  - Binary sensor
  - Cover
  - Hub
  - Light
  - Sensor
  - Switch
  - Valve
ha_release: '0.60'
ha_iot_class: Local Push
ha_domain: ads
ha_platforms:
  - binary_sensor
  - cover
  - light
  - select
  - sensor
  - switch
  - valve
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_codeowners:
  - '@mrpasztoradam'
ha_quality_scale: legacy
---

The ADS (automation device specification) describes a device-independent and fieldbus independent interface for communication between [Beckhoff](https://www.beckhoff.com/) automation devices running [TwinCAT](https://www.beckhoff.com/en-en/products/automation/twincat/) and other devices implementing this interface.

There is currently support for the following device types within Home Assistant:

- [Binary sensor](#binary-sensor)
- [Light](#light)
- [Sensor](#sensor)
- [Switch](#switch)
- [Cover](#cover)
- [Select](#select)
- [Valve](#valve)

<!-- omit in toc -->
## Configuration

To enable ADS, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
ads:
  device: "127.0.0.1.1.1"
  port: 801
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

<!-- omit in toc -->
## Action

The ADS integration will register the `write_by_name` action allowing you to write a value to a variable on your ADS device.

```json
{
    "adsvar": ".myvariable",
    "adstype": "int",
    "value": 123
}
```

Action parameters:

- **adsvar**: Name of the variable on the ADS device. To access global variables on *TwinCAT2* use a prepending dot `.myvariable`, for TwinCAT3 use `GBL.myvariable`.
- **adstype**: Specify the type of the variable. Use one of the following: `int`, `byte`, `uint`, `bool`
- **value**: The value that will be written in the variable.

## Binary sensor

The `ads` binary sensor platform can be used to monitor a boolean value on your ADS device.

To use your ADS device, you first have to set up your [ADS hub](#configuration) and then add the following to your {% term "`configuration.yaml`" %}
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
  description: Sets the [class of the device](/integrations/binary_sensor/), changing the device state and icon that is displayed on the frontend.
  required: false
  type: string
{% endconfiguration %}

## Light

The `ads` light platform allows you to control your connected ADS lights.

To use your ADS device, you first have to set up your [ADS hub](#configuration) and then add the following to your {% term "`configuration.yaml`" %}
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
  type: string
name:
  required: false
  description: An identifier for the Light in the frontend
  type: string
{% endconfiguration %}

## Sensor

The `ads` sensor platform allows reading the value of a numeric variable on your ADS device. The variable can be of type *BOOL*, *BYTE*, *INT*, *UINT*, *SINT*, *USINT*, *DINT*, *UDINT*, *WORD*, *DWORD*, *REAL*, or *LREAL*.

To use your ADS device, you first have to set up your [ADS hub](#configuration) and then add the following to your {% term "`configuration.yaml`" %}
file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: ads
    adsvar: GVL.temperature
    unit_of_measurement: "°C"
    adstype: int
```

{% configuration %}
adsvar:
  required: true
  description: The name of the variable which you want to access.
  type: string
adstype:
  required: false
  description: The datatype of the ADS variable, possible values are bool, byte, int, uint, sint, usint, dint, udint, word, dword, real and lreal.
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

## Switch

The `ads` switch platform accesses a boolean variable on the connected ADS device. The variable is identified by its name.

To use your ADS device, you first have to set up your [ADS hub](#configuration) and then add the following to your {% term "`configuration.yaml`" %}
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

## Cover

The `ads` cover platform allows you to control your connected ADS covers.

To use your ADS device, you first have to set up your [ADS hub](#configuration) and then add the following to your {% term "`configuration.yaml`" %}
file:

```yaml
# Example configuration.yaml entry
cover:
  - platform: ads
    name: Curtain master bed room
    adsvar: covers.master_bed_room_is_closed
    adsvar_open: covers.master_bed_room_open
    adsvar_close: covers.master_bed_room_close
    adsvar_stop: covers.master_bed_room_stop
    device_class: curtain
```

{% configuration %}
adsvar:
  required: true
  description: The name of the boolean variable that returns the current status of the cover (`True` = closed)
  type: string
adsvar_position:
  required: false
  description: The name of the variable that returns the current cover position, use a byte variable on the PLC side
  type: string
adsvar_set_position:
  required: false
  description: The name of the variable that sets the new cover position, use a byte variable on the PLC side
  type: string
adsvar_open:
  required: false
  description: The name of the boolean variable that triggers the cover to open
  type: string
adsvar_close:
  required: false
  description: The name of the boolean variable that triggers the cover to close
  type: string
adsvar_stop:
  required: false
  description: The name of the boolean variable that triggers the cover to stop
  type: string
name:
  required: false
  description: An identifier for the Cover in the frontend
  type: string
device_class:
  required: false
  description: Sets the [class of the device](/integrations/cover/), changing the device state and icon that is displayed on the frontend.
  type: device_class
{% endconfiguration %}

## Select

The `ads` select entity accesses an ENUM (int) variable on the connected ADS device. The variable is identified by its name. You have to set up a corresponding ENUM in the TwinCAT PLC. It is recommended to use explicit values starting from `0`.

```yaml
TYPE E_SampleA :
(
    e1 := 0,
    e2 := 1,
    e3 := 2, 
);
END_TYPE
```

## Valve

The `ads` valve entity accesses a boolean variable on the connected ADS device. The variable is identified by its name.

To use your ADS device, you first have to set up your [ADS hub](#configuration) and then add the following to your {% term "`configuration.yaml`" %}
file:

```yaml
# Example configuration.yaml entry
select:
  - platform: ads
    adsvar: MAIN.eMyEnum
    options:
      - "Off"
      - "Setup"
      - "Automatic"
      - "Manual"
      - "Guest"
      - "Error"
valve:
  - platform: ads
    adsvar: MAIN.bValveControl
```

{% configuration %}
adsvar:
  required: true
  description: The name of the variable which you want to access on the ADS device.
  type: string
options:
  required: true
  description: The available options to select from.
  type: string
name:
  required: false
  description: An identifier for the valve in the frontend.
  type: string
{% endconfiguration %}
