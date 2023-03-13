---
title: EZcontrol XS1
description: Instructions on how to integrate an XS1 Gateway within Home Assistant.
ha_category:
  - Climate
  - Hub
  - Sensor
  - Switch
ha_release: 0.88
ha_iot_class: Local Polling
ha_domain: xs1
ha_platforms:
  - climate
  - sensor
  - switch
ha_integration_type: integration
---

The [EZcontrol XS1](http://www.ezcontrol.de/content/view/36/28/) integration for Home Assistant allows you to observe and control devices configured on the XS1 Gateway. Please have a look at the official documentation for using this gateway [Bedienungsanleitung v3.0.0.0](http://www.ezcontrol.de/support/downloads/XS1/xs1manual/Bedienungsanleitung_EZcontrol_XS1_3.0.0.0-2.pdf).

## Configuration

Add the following entry to the `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
xs1:
  host: "192.168.2.100"
```

The integration will automatically detect the configuration of the XS1 Gateway only **on initialization** which currently means when Home Assistant boots. When you change the configuration of the XS1 you (currently) have to restart Home Assistant to see the effects.

{% configuration %}
host:
  description: Host of the XS1 Gateway.
  required: true
  type: string
port:
  description: Custom port if you are running your gateway behind some kind of proxy.
  required: false
  type: integer
  default: 80
ssl:
  description: Defines if `https` should be used for API requests  (only possible via your own proxy).
  required: false
  type: boolean
  default: false
username:
  description: User to access XS1 web API.
  required: false
  type: string
password:
  description: Password to access XS1 web API.
  required: false
  type: string
{% endconfiguration %}

## Supported Device Types

<div class='note warning'>
This integration currently only covers part of the device types supported by the XS1 gateway, unsupported types are simply ignored.
</div>

### Sensors

Any type of sensor is supported.

<div class='note warning'>
If you are using climate devices the "current temp" sensor will be automatically used by the actuator (if named correctly). To make this work have a look at the actuator description below.
</div>

### Actuators

| Type          | Supported | Notes                                            |
|---------------|-----------|--------------------------------------------------|
| `switch`      | Yes       |                                                  |
| `dimmer`      | Partly    | Dimmers are currently handled like switches so actual dimming is not supported :(|
| `temperature` | Yes       |                                                  |

### Climate Actuator/Sensor

Home Assistant can combine temperature sensors and climate actuators into a single device. The XS1 gateway does not allow this, but a sensor and actuator can be configured separately. To make Home Assistant register them in the same climate device just prefix the **sensor** name with the actuator name on the XS1 gateway configuration, f.ex:

- Actuator device name: "Bedroom_Temp"
- Sensor device name: "Bedroom_Temp_Sensor"

## Examples

In this section, you find some real-life examples of how to use this component.

### Full configuration

This example shows how you can use the optional configuration options.

```yaml
# Example configuration.yaml entry
xs1:
  host: "192.168.2.100"
  port: 80
  ssl: false
  username: myuser
  password: 123totallySecure
```
