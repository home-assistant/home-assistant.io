---
layout: page
title: "LLAP Sensor"
description: "Instructions how to integrate Ciseco / Wireless Things sensors into Home Assistant."
date: 2017-02-15 19:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
ha_release: 0.39
ha_iot_class: "Local Push"
logo: wirelessthings.png
---

The `llap` platform supports wireless sensors which were produced by now defunct Ciseco / Wireless
Things company.

To communicate with the sensors you need a hardware transceiver module, like [SRF Stick][] or
[Slice of Radio][]. This module provides a serial interface through which you can communicate with
the sensors. There are two ways of communication: by using a simple [LLAP protocol][LLAP] directly
through the serial interface, or by installing a [Wireless Thing Message Bridge][Message Bridge]
on the device with hardware transciever and listening for UDP datagrams from it.

The `llap` platform supports communication only through the Message Bridge. If you configured your
Message Bridge to use a different port from the default 50140, you need to specify this port in the
configuration. Same goes for the network name (default is 'Serial').

To use LLAP sensors in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: llap
    sensors:
      - name: "Room Temperature"
        id: RT
        prefix: "TEMP"
        unit_of_measurement: "°C"
```

Configuration variables:

- **port** (*Optional*): Port on which to listen for UDP datagrams from the MessageBridge. Default
  is 50140.
- **network** (*Optional*): Network name used by MessageBridge. Default id 'Serial'.
- **sensors** array (*Required*): List of your sensors.
  - **name** (*Optional*): Name to use in the Frontend.
  - **id** (*Required*): ID of the sensor (must be 2 characters).
  - **prefix** (*Optional*): Prefix of the value, reported by the sensor. Value displayed in the
    Frontend will be without this prefix.
  - **unit_of_measurement** (*Optional*): Units of measurement of the sensor.


## {% linkable_title Example %}

Let's assume you have two sensors. One, named 'LR', reports two values: temperature and humidity.
And another one, named 'BT', reports only temperature. Temperature is reported in `TEMPXXXXX`
format, and humidity in `RHUMXXXXX`.

Here's how your `configuration.yaml` should look like:

```yaml
sensor:
  - platform: llap
    network: "Serial"
    sensors:
      - name: "Living Room Temperature"
        id: LR
        prefix: "TEMP"
        unit_of_measurement: "°C"
      - name: "Living Room Humidity"
        id: LR
        prefix: "RHUM"
        unit_of_measurement: "%"
      - name: "Bedroom Temperature"
        id: BT
        prefix: "TEMP"
        unit_of_measurement: "°C"
```


[SRF Stick]: http://web.archive.org/web/20160403083914/https://www.wirelessthings.net/srf-stick-868-915-mhz-easy-to-use-usb-radio
[Slice of Radio]: http://web.archive.org/web/20160629210631/https://www.wirelessthings.net/slice-of-radio-wireless-rf-transciever-for-the-raspberry-pi
[LLAP]: http://web.archive.org/web/20160526220042/http://openmicros.org/index.php/articles/85-llap-lightweight-local-automation-protocol/297-llap-reference
[Message Bridge]: https://github.com/WirelessThings/WirelessThings-LaunchPad/tree/master/MessageBridge
