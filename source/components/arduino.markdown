---
layout: page
title: "Arduino"
description: "Instructions how to setup an Arduino boards within Home Assistant."
date: 2015-06-27 10:28
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/arduino.png' class='brand pull-right' />

The [Arduino](https://www.arduino.cc/) device family are microcontroller boards that are often based on the ATmega328 chip. They come with digital input/output pins (some can be used as PWM outputs), analog inputs, and a USB connection. The equipment depends on the [type](https://www.arduino.cc/en/Main/Products) of board. The most common ones are the Arduino Uno and the Arduino Leonardo with 14 digital input/output pins and 6 analog input pins.

There are a lot of extensions (so called [shields](https://www.arduino.cc/en/Main/ArduinoShields)) available. Those shields can be plugged-in into the existing connectors and stacked on top of each other. This makes it possible to expand the capabilities of the Arduino boards. 

## Basic Configuration

The arduino component is designed to let you use a directly attached board to your Home Assistant host over USB.

To integrate an Arduino boards with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
arduino:
  port: /dev/ttyACM0
```
The port where is your board connected to your Home Assistant host. If you are using an original Arduino the port will be named `ttyACM*`. The exact
number can be determined with `ls /dev/ttyACM*`.

```bash
ls /dev/ttyACM*
```

If that is not working, check your `dmesg` or `journalctl -f` output. Keep in mind that Arduino clones are often using a different name for the port (e.g. `/dev/ttyUSB*`).

<p class='note warning'>
A word of caution: The Arduino boards are not storing states. This means that with every initialization the pins are set to off/low.
</p>

## Switch Configuration

Support for switching pins is limited to high/on and low/off of the digital pins. PWM (pin 3,5,6,9,10, and 11 on a Arduino Uno) is not supported yet.

To enable the Arduino switch pins with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  platform: arduino
  pins:
    11:
      name: Fan Office
      type: digital
    12:
      name: Light Desk
      type: digital
```

The digital pins are numbered from 0 to 13. The available pins are 2 till 13. For testing purposes you can use pin 13 because with that pin you can control the internal LED.

The name field of the pins array will be used in the frontend.

## Sensor Configuration

The sensor platform allow you to get an numerical values from an analog input pin. Usually between 0 and 1024. 

To enable an Arduino sensor with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: arduino
  pins:
    1:
      name: Door switch
      type: analog
    0:
      name: Brightness
      type: analog
```

The 6 analog pins are numbered from A0 to A5.

The name field of the pins array will be used in the frontend.

