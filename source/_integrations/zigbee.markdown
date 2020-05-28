---
title: Zigbee
description: Instructions on how to integrate a Zigbee network with Home Assistant.
ha_category:
  - Binary Sensor
  - Light
  - Sensor
  - Switch
ha_release: 0.12
ha_iot_class: Local Polling
ha_domain: zigbee
---

[Zigbee](https://zigbee.org/what-is-zigbee/) integration for Home Assistant allows you to utilize modules such as the [XBee](https://www.digi.com/xbee) as wireless General Purpose Input/Output (GPIO) devices. The integration requires a local Zigbee device to be connected to a serial port. Through this, it will send and receive commands to and from other devices on the Zigbee mesh network.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#binary-sensor) - Digital input pins
- [Sensor](#sensor) - Analog input pins and temperature sensor
- [Light](#light) - Digital output pins
- [Switch](#switch) - Digital output pins

## Configuration

The local Zigbee device (assuming XBee) must have an up to date Router or Coordinator API firmware installed.

A `zigbee` section must be present in the `configuration.yaml` file and contain the following options as required:

```yaml
# Example configuration.yaml entry
zigbee:
```

{% configuration %}
device:
  description: The serial port to which the local Zigbee device is connected.
  required: false
  type: string
  default: "`/dev/ttyUSB0`"
baud:
  description: The baud rate at which to communicate with the local Zigbee device.
  required: false
  type: integer
  default: 9600
{% endconfiguration %}

To find the possible serial port names of your device, run:

```bash
ls /dev/ttyUSB*
```

<div class='note'>
The port may also appear as /dev/ttyACM* if you're communicating with the Zigbee device through an Arduino.
</div>

### Example

```yaml
# Example configuration.yaml entry
zigbee:
  device: /dev/ttyACM1
  baud: 115200
```

## Binary Sensor

A `zigbee` binary sensor in this context is a device connected to one of the digital input pins on a [Zigbee](https://zigbee.org/) module. The states reported by such a device are limited to `on` or `off`. By default, a binary sensor is considered `on` when the Zigbee device's digital input pin is held 'high' and considered `off` when it is held `low`. This behavior can be inverted by setting the `on_state` configuration variable to `low`.

### Configuration

To enable a digital input pin as binary sensor in your installation, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: zigbee
    name: Hallway PIR Sensor
    pin: 0
```

{% configuration %}
name:
  description: The name you would like to give the binary sensor in Home Assistant.
  required: true
  type: string
pin:
  description: The number identifying which pin to use.
  required: true
  type: integer
address:
  description: The long 64-bit address of the remote Zigbee device whose digital input pin you'd like to sample. Do not include this variable if you want to sample the local Zigbee device's pins.
  required: false
  type: string
on_state:
  description: Either `high` or `low`, depicting whether the binary sensor is considered `on` when the pin is `high` or `low`.
  required: false
  default: high
  type: string
{% endconfiguration %}

## Light

A Zigbee light in this context is a light connected to one of the digital output pins on a Zigbee module. It can simply be switched on and off. By default, a light is considered `on` when the Zigbee device's digital output is held `high` and considered `off` when it is held `low`. This behavior can be inverted by setting the `on_state` configuration variable to `low`.

To configure a digital output pin as light, add the following to your `configuration.yaml` file:

```yaml
light:
  - name: Desk Lamp
    platform: zigbee
    pin: 0
```

{% configuration %}
name:
  description: The name you would like to give the light in Home Assistant.
  required: true
  type: string
pin:
  description: The number identifying which pin to use.
  required: true
  type: integer
address:
  description: The long 64-bit address of the remote Zigbee device whose digital output pin you would like to switch. Do not include this variable if you want to switch the local Zigbee device's pins.
  required: false
  type: string
on_state:
  description: Either `high` or `low`, depicting whether the digital output pin is pulled `high` or `low` when the light is turned on.
  required: false
  default: high
  type: string
{% endconfiguration %}

## Sensor

There are two types of [Zigbee](https://zigbee.org/) sensor available to Home Assistant:

- [Analog input pin](#analog-input-pin)
- [Temperature sensor](#temperature-sensor) (XBee Pro)

To configure an analog input pin sensor, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: zigbee
    name: My Analog Zigbee Input
    type: analog
    pin: 0
    address: 0013A2004233D138
```

{% configuration %}
name:
  description: The name you would like to give the sensor in Home Assistant.
  required: true
  type: string
type:
  description: Set to `analog` or `temperature`.
  required: true
  type: string
pin:
  description: The number identifying which pin to sample.
  required: false
  type: integer
address:
  description: The long 64-bit address of the remote Zigbee device whose pin you would like to sample. Do not include this variable if you want to sample the local Zigbee device's pins.
  required: false
  type: string
max_volts:
  description: The maximum voltage which the input pin is able to read.
  required: false
  default: 1.2
  type: float
{% endconfiguration %}

### Examples

#### Analog Input Pin

The analog input pins on an XBee (non-Pro) will read 0V to 1.2 V. This is translated by the [xbee-helper](https://github.com/flyte/xbee-helper) library into a percentage. The maximum voltage your Zigbee device will read is configurable using the `max_volts` configuration variable.

To configure an analog input pin sensor, add the following to your `configuration.yaml` file:

```yaml
## Example configuration.yaml entry
sensor:
  - platform: zigbee
    name: My Analog Zigbee Input
    type: analog
    pin: 0
    address: 0013A2004233D138
```

See the [Digi knowledge base](http://knowledge.digi.com/articles/Knowledge_Base_Article/Digital-and-analog-sampling-using-XBee-radios) for more XBee sampling details.

#### Temperature Sensor

The XBee Pro (and perhaps other third party modules) contains a thermometer device which can be read by using the `TP` AT command.

To configure a temperature sensor device, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: zigbee
    name: Living Room Temperature Zigbee
    type: temperature
    address: 0013A20050E752C5
```

## Switch

A Zigbee switch in this context is a device connected to one of the digital output pins on a Zigbee module. It can simply be switched on and off. By default, a switch is considered `on` when the Zigbee device's digital output is held `high` and considered `off` when it is held `low`. This behavior can be inverted by setting the `on_state` configuration variable to `low`.

To configure a digital output pin as switch, add the following to your `configuration.yaml` file:

```yaml
switch:
  - name: Pond Fountain
    platform: zigbee
    pin: 0
    address: 0013A20040791FA2
    on_state: low
```

{% configuration %}
name:
  description: The name you would like to give the switch in Home Assistant.
  required: true
  type: string
pin:
  description: The number identifying which pin to use.
  required: true
  type: integer
address:
  description: The long 64-bit address of the remote Zigbee device whose digital output pin you would like to switch. Do not include this variable if you want to switch the local Zigbee device's pins.
  required: false
  type: string
on_state:
  description: Either `high` or `low`, depicting whether the digital output pin is pulled `high` or `low` when the switch is turned on.
  required: false
  default: high
  type: string
{% endconfiguration %}
