---
title: Arduino
description: Instructions on how to setup an Arduino boards within Home Assistant.
ha_category:
  - DIY
  - Sensor
  - Switch
ha_release: pre 0.7
ha_iot_class: Local Polling
ha_codeowners:
  - '@fabaff'
ha_domain: arduino
ha_platforms:
  - sensor
  - switch
---

<div class='note warning'>

This integration is deprecated. Please move to the [Firmata integration](/integrations/firmata).

</div>

The [Arduino](https://www.arduino.cc/) device family are microcontroller boards that are often based on the ATmega328 chip. They come with digital input/output pins (some can be used as PWM outputs), analog inputs, and a USB connection.
The equipment depends on the [type](https://www.arduino.cc/en/Main/Products) of the board. The most common ones are the Arduino Uno and the Arduino Leonardo with 14 digital input/output pins and 6 analog input pins.

There are a lot of extensions (so-called [shields](https://www.arduino.cc/en/Main/ArduinoShields)) available. Those shields can be plugged-in into the existing connectors and stacked on top of each other. This makes it possible to expand the capabilities of the Arduino boards.

The `arduino` integration is designed to let you use a directly attached board to your Home Assistant host over USB.

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensor)
- [Switch](#switch)

## Configuration

You need to have the [Firmata firmware](https://github.com/firmata/) on your board. Please upload the `StandardFirmata` sketch to your board; please refer to the [Arduino documentation](https://www.arduino.cc/en/Main/Howto) for further information.

To integrate an Arduino boards with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
arduino:
  port: /dev/ttyACM0
```

{% configuration %}
port:
  description: The port where your board is connected to your Home Assistant host. If you are using an original Arduino, the port will be named `ttyACM*` otherwise `ttyUSB*`.
  required: true
  type: string
{% endconfiguration %}

The exact number can be determined with the command shown below.

```bash
ls /dev/ttyACM*
```

If that's not working, check your `dmesg` or `journalctl -f` output. Keep in mind that Arduino clones are often using a different name for the port (e.g., `/dev/ttyUSB*`).

<div class='note warning'>
A word of caution: The Arduino boards are not storing states. This means that with every initialization the pins are set to off/low.
</div>

Add the user who is used to run Home Assistant to the groups to allow access to the serial port.

```bash
sudo usermod -a -G dialout,lock $USER
```

## Sensor

The `arduino` sensor platform allows you to get numerical values from an analog input pin of an [Arduino](https://www.arduino.cc/) board. Usually the value is between 0 and 1024.

To enable an Arduino sensor with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: arduino
  pins:
    1:
      name: Door switch
    0:
      name: Brightness
```

{% configuration %}
pins:
  description: List of pins to use.
  required: true
  type: map
  keys:
    pin_number:
      description: The pin number that corresponds with the pin numbering schema of your board.
      required: true
      type: map
      keys:
        name:
          description: Name that will be used in the frontend for the pin.
          type: string
{% endconfiguration %}

The 6 analog pins of an Arduino UNO are numbered from A0 to A5.

## Switch

The `arduino` switch platform allows you to control the digital pins of your [Arduino](https://www.arduino.cc/) board. Support for switching pins is limited to high/on and low/off of the digital pins. PWM (pin 3, 5, 6, 9, 10, and 11 on an Arduino Uno) is not supported yet.

To enable the Arduino pins with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  platform: arduino
  pins:
    11:
      name: Fan Office
    12:
      name: Light Desk
      initial: true
      negate: true
```

{% configuration %}
pins:
  description: List of of pins to use.
  required: true
  type: map
  keys:
    pin_number:
      description: The pin number that corresponds with the pin numbering schema of your board.
      required: true
      type: map
      keys:
        name:
          description: Name that will be used in the frontend for the pin.
          type: string
          required: false
        initial:
          description: The initial value for this port.
          type: boolean
          required: false
          default: false
        negate:
          description: If this pin should be inverted.
          type: boolean
          required: false
          default: false
{% endconfiguration %}

The digital pins are numbered from 0 to 13 on a Arduino UNO. The available pins are 2 till 13. For testing purposes you can use pin 13 because with that pin you can control the internal LED.
