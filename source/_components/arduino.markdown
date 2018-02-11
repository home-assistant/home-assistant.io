---
layout: page
title: "Arduino"
description: "Instructions how to setup an Arduino boards within Home Assistant."
date: 2015-06-27 10:28
sidebar: true
comments: false
sharing: true
footer: true
logo: arduino.png
ha_category: DIY
featured: true
ha_release: pre 0.7
ha_iot_class: "Local Polling"
---

The [Arduino](https://www.arduino.cc/) device family are microcontroller boards that are often based on the ATmega328 chip. They come with digital input/output pins (some can be used as PWM outputs), analog inputs, and a USB connection. The equipment depends on the [type](https://www.arduino.cc/en/Main/Products) of the board. The most common ones are the Arduino Uno and the Arduino Leonardo with 14 digital input/output pins and 6 analog input pins.

There are a lot of extensions (so-called [shields](https://www.arduino.cc/en/Main/ArduinoShields)) available. Those shields can be plugged-in into the existing connectors and stacked on top of each other. This makes it possible to expand the capabilities of the Arduino boards. 

The `arduino` component is designed to let you use a directly attached board to your Home Assistant host over USB.

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
$ ls /dev/ttyACM*
```

If that's not working, check your `dmesg` or `journalctl -f` output. Keep in mind that Arduino clones are often using a different name for the port (e.g. `/dev/ttyUSB*`).

<p class='note warning'>
A word of caution: The Arduino boards are not storing states. This means that with every initialization the pins are set to off/low.
</p>

Add the user who is used to run Home Assistant to the groups to allow access to the serial port.

```bash
$ sudo usermod -a -G dialout,lock $USER
```

