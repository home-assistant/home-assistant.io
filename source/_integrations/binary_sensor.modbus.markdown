---
title: "Modbus Binary Sensor"
description: "Instructions on how to set up Modbus binary sensors within Home Assistant."
ha_category:
  - Binary Sensor
ha_release: 0.28
ha_iot_class: Local Push
ha_domain: modbus
---

The `modbus` binary sensor allows you to gather data from [Modbus](http://www.modbus.org/) coils.

## Configuration

To use your Modbus binary sensors in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: modbus
    inputs:
      - name: Sensor1
        hub: hub1
        slave: 1
        address: 100
      - name: Sensor2
        hub: hub1
        slave: 1
        address: 110
        input_type: discrete_input
```

{% configuration %}
inputs:
  description: The array contains a list of coils and discrete inputs to read from.
  required: true
  type: [map, list]
  keys:
    name:
      description: Name of the sensor.
      required: true
      type: string
    hub:
      description: The name of the hub.
      required: false
      default: modbus_hub
      type: string
    slave:
      description: The number of the slave (Optional for TCP and UDP Modbus).
      required: true
      type: integer
    address:
      description: Coil or discrete input Modbus address.
      required: true
      type: integer
    input_type:
      description: Modbus input type (coil, discrete_input), default coil.
      required: false
      type: string
    device_class:
      description: The [type/class](/integrations/binary_sensor/#device-class) of the binary sensor to set the icon in the frontend.
      required: false
      type: device_class
      default: None
{% endconfiguration %}

It's possible to change the default 30 seconds scan interval for the sensor updates as shown in the [Platform options](/docs/configuration/platform_options/#scan-interval) documentation.

## Full example

Example a sensor with a 10 seconds scan interval:

```yaml
binary_sensor:
  - platform: modbus
    scan_interval: 10
    inputs:
      - name: Sensor1
        hub: hub1
        slave: 1
        address: 100
      - name: Sensor2
        hub: hub1
        slave: 1
        address: 110
        input_type: discrete_input
```
