---
layout: page
title: "Homematic Binary Sensor"
description: "Instructions how to integrate Homematic binary sensors within Home Assistant."
date: 2016-06-25 19:43
sidebar: true
comments: false
sharing: true
footer: true
logo: homematic.png
ha_category: Binary Sensors
ha_release: 0.23
---


The `homematic` binary_sensor platform lets you observe the state changes of binary [Homematic](http://www.homematic.com/) sensors through Home Assistant.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
binary_sensor:
  platform: homematic
  address: DEV1234567
  name: Window
```

Configuration variables:

- **platform** (*Required*: Needed to let Home Assistant know this is a Homematic rollershutter.
- **address** (*Required*): The serial number of the device, eg. LEQ1234567
- **name** (*Optional*): Name to identify the device.
- **button** (*Optional*): Channel of the device to monitor (default: 1)
- **param** (*Optional*): For devices with multiple channels and possible events, you may define which event type you want to attatch to this entity. If none is specified all events will turn the state to on.
- **hidden** (*Optional*): Hide device from UI. Makes sense for buttons that will only trigger automations etc. (default: False)

Currently the following devices are supported:

- Motion detectors (param: MOTION)
- Remotes (wall-mounted buttons, handheld devices) (param: PRESS_SHORT, PRESS_LONG)
- Smoke detectors (no parameters needed)
- Shutter contacts for doors, windows etc. (no parameters needed)
- Gong / Doorbell buttons (no parameters needed)

Beware, that binary sensors might be included in devices that also have other functions. For example: The HM-Sen-MDIR-WM55 motion detector does not only detect motion (no motion == False, motion == True), it also detects the surrounding brightness (configure as sensor to monitor brightness from 0 to 255) and has buttons which can be pressed in different ways. Since buttons can only be pressed or not pressed, we consider them as binary sensors.
The way buttons work is, that the entity for the specified parameter will be set to on and off again. So if you press the button shortly, it will flip on and off instantly, which could trigger some automation. If you hold down the button, the entity configured for the long press will be flipped on and off and can trigger another automation. As of now, we don't support the release of the long press and the continuation events that happen inbewteen.
You may leave out the parameter, which will result in a single entity turning on and off on any supported event.

As an example for a complete configuration of the HM-Sen-MDIR-WM55 device:

```yaml
sensor:
  - platform: homematic
    address: DEV1234567
    name: Entrance PIR Brightness
    param: BRIGHTNESS

binary_sensor:
  - platform: homematic
    address: DEV1234567
    name: Entrance PIR Motion
    param: MOTION
  - platform: homematic
    address: DEV1234567
    name: Entrance PIR 1 Short
    button: 1
    param: PRESS_SHORT
    hidden: True
  - platform: homematic
    address: DEV1234567
    name: Entrance PIR 1 Long
    button: 1
    param: PRESS_LONG
    hidden: True
  - platform: homematic
    address: DEV1234567
    name: Entrance PIR 2 Short
    button: 2
    param: PRESS_SHORT
    hidden: True
  - platform: homematic
    address: DEV1234567
    name: Entrance PIR 2 Long
    button: 2
    param: PRESS_LONG
    hidden: True
```
