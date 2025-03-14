---
title: TellStick
description: Instructions on how to integrate your TellStick into Home Assistant.
ha_release: pre 0.7
ha_category:
  - Cover
  - Hub
  - Light
  - Sensor
  - Switch
ha_iot_class: Assumed State
ha_domain: tellstick
ha_platforms:
  - cover
  - light
  - sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `tellstick` {% term integration %} integrates [TellStick][tellstick-gateway] devices into Home Assistant. This integration allows users to add switches, lights, and sensors which are communicating with 433 MHz. There are a number of vendors (Capidi Elro, Intertechno, Nexa, Proove, Sartano, and Viking) who are selling products that work with TellStick. For more details, please check the TellStick [protocol list](http://developer.telldus.com/wiki/TellStick_conf).

There is currently support for the following device types within Home Assistant:

- [Configuration](#configuration)
- [Cover](#cover)
- [Light](#light)
- [Sensor](#sensor)
- [Examples](#examples)
  - [Full configuration](#full-configuration)
- [Switch](#switch)

## Configuration

To get started, add the {% term integration %} to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
tellstick:
```

There is a [TellStick add-on](/addons/tellstick/) available in the Home Assistant add-on store.

```yaml
# Example configuration.yaml entry with the TellStick add-on
tellstick:
  host: core-tellstick
  port: [50800, 50801]
```

{% configuration %}
signal_repetitions:
  description: Because the TellStick sends its actions via radio and from most receivers it's impossible to know if the signal was received or not. Therefore you can configure the switch and light to try to send each signal repeatedly.
  required: false
  type: integer
  default: 1
host:
  description: If you run TellStick on another server or with the Home Assistant add-on.
  required: inclusive
  type: string
port:
  description: Needed with the `host` configuration variable. Must be port pair, for example `[50800, 50801]`.
  required: inclusive
  type: list
{% endconfiguration %}

## Cover

This `tellstick` cover platform allows you to control your [TellStick][tellstick-gateway] covers.

To use your TellStick device, you first have to set up your [Tellstick hub](#configuration) and then add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
cover:
  - platform: tellstick
```

## Light

This `tellstick` light platform allows you to control your [TellStick][tellstick-gateway] dimmers.

To use your TellStick device, you first have to set up your [Tellstick hub](#configuration) and then add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
light:
  platform: tellstick
```

## Sensor

The `tellstick` sensor platform allows you to get current meteorological data from a [TellStick][tellstick-gateway] device.

To use your TellStick device, you first have to set up your [Tellstick hub](#configuration) and then add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: tellstick
```

{% configuration %}
sensor:
  description: "Entry for a sensor with the ID and its name, e.g., ID: Name."
  required: false
  type: string
only_named:
  description: Only add and include specified sensors. If this is not specified all sensors will be imported and the names will be based on each sensor's ID number.
  required: false
  default: false
  type: list
  keys:
    id:
      description: The ID-number of the sensor to include.
      required: true
      type: integer
    name:
      description: Specify the name of the selected sensor.
      required: true
      type: string
    protocol:
      description: The protocol that the sensor uses. Can be used if id isn't unique enough.
      required: false
      type: string
    model:
      description: The model that the sensor uses. Can be used if id and protocol isn't unique enough.
      required: false
      type: string
temperature_scale:
  description: The scale of the temperature value.
  required: false
  default: °C
  type: string
datatype_mask:
  description: Mask to determine which sensor values to show based on. Please check the [TellCore tellcore.constants documentation](https://tellcore-py.readthedocs.org/en/v1.1.2/constants.html#module-tellcore.constants) for details.
  required: false
  default: 127
  type: integer
{% endconfiguration %}

## Examples

In this section you find some real-life examples of how to use this sensor.

### Full configuration

```yaml
# Example configuration.yaml entry
sensor:
  - platform: tellstick
    temperature_scale: "°C"
    datatype_mask: 1
    only_named:
      - id: 135
        name: Outside
      - id: 21
        name: Inside
        protocol: mandolyn
      - id: 44
        name: In between
        protocol: fineoffset
        model: temperaturehumidity
```

## Switch

This `tellstick` switch platform allows you to control [TellStick][tellstick-gateway] devices.

To use your TellStick device, you first have to set up your [Tellstick hub](#configuration) and then add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: tellstick
```

[tellstick-gateway]: https://telldus.com
