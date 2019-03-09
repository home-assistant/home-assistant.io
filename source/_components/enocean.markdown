---
layout: page
title: "EnOcean"
description: "Connect EnOcean devices to Home Assistant"
date: 2016-05-25 23:39
sidebar: true
comments: false
sharing: true
footer: true
logo: enocean.png
ha_category:
  - Hub
  - Binary Sensor
  - Sensor
  - Light
  - Switch
ha_release: 0.21
ha_iot_class: "Local Push"
redirect_from:
  - /components/binary_sensor.enocean/
  - /components/sensor.enocean/
  - /components/light.enocean/
  - /components/switch.enocean/
---

The [EnOcean](https://en.wikipedia.org/wiki/EnOcean) standard is supported by many different vendors. There are switches and sensors of many different kinds, and typically they employ energy harvesting to get power such that no batteries are necessary.

The `enocean` component adds support for some of these devices. You will need a controller like the [USB300](https://www.enocean.com/en/enocean_modules/usb-300-oem/) in order for it to work.

There is currently support for the following device types within Home Assistant:

- Binary Sensor (wall switches)
- Sensor (power meters)
- Light (dimmers)
- Switch

However, only a few devices have been confirmed to work. These are:

- Eltako FUD61 dimmer
- Eltako FT55 battery-less wall switch
- Jung ENOA590WW battery-less wall switch
- Permundo PSC234 (switch and power monitor)

Other devices will most likely need some changes in the Home Assistant code in order to work. Support for teaching of devices is also missing at this time.

To integrate an EnOcean controller with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
enocean:
  device: /dev/ttyUSB0
```

{% configuration %}
device:
  description: The port where your device is connected to your Home Assistant host.
  required: true
  type: string
{% endconfiguration %}

## {% linkable_title Binary Sensor %}

This can typically be one of those batteryless wall switches.
Tested with:

- Eltako FT55 which uses the EnOcean PTM 215 module
- [TRIO2SYS Wall switches](http://www.trio2sys.fr/index.php/fr/produits-enocean-sans-fil-sans-pile-interoperable/emetteur-sans-fils-sans-pile-interoperable-enocean) which uses the EnOcean PTM210 DB module

All switches using theses modules are expected to work. Other devices will most likely not work without changing the Home Assistant code.

## {% linkable_title Configuration %}

To use your EnOcean device, you first have to set up your [EnOcean hub](/components/enocean/) and then add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: enocean
    id: [0x01,0x90,0x84,0x3C]
```

{% configuration %}
id:
  description: The ID of the device. This is the 4 bytes long number written on the dimmer.
  required: true
  type: list
name:
  description: An identifier for the switch in the frontend.
  required: false
  type: string
  default: EnOcean binary sensor
device_class:
  description: The [type/class](/components/binary_sensor/) of the sensor to set the icon in the frontend.
  required: false
  type: device_class
{% endconfiguration %}

EnOcean binary sensors only generate 'button_pressed' events. The event data has following four fields:

- **id**: The ID of the device (see configuration).
- **pushed**: `1` for a button press, `0` for a button release.
- **which**: Always `0` when using the single rocket.  `0` or `1` when using the dual rocket switch.
- **onoff**: `0` or `1` for either side of the rocket.

## {% linkable_title Automation example %}

Sample automation to switch lights on and off:

```yaml
# Example automation to turn lights on/off on button release
automation:
  - alias: hall light switches
    trigger:
      platform: event
      event_type: button_pressed
      event_data:
        id: [0xYY, 0xYY, 0xYY, 0xYY]
        pushed: 0
    action:
      service_template: "{% raw %}{% if trigger.event.data.onoff %} light.turn_on {% else %} light.turn_off {%endif %}{% endraw %}"
      data_template:
        entity_id: "{% raw %}{% if trigger.event.data.which == 1 %} light.hall_left {% else %} light.hall_right {%endif %}{% endraw %}"
```

## {% linkable_title Light %}

An EnOcean light can take many forms. Currently only one type has been tested: Eltako FUD61 dimmer.

To use your EnOcean device, you first have to set up your [EnOcean hub](/components/enocean/) and then add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
light:
  - platform: enocean
    id: [0x01,0x90,0x84,0x3C]
    sender_id: [0xFF,0xC6,0xEA,0x04]
```

{% configuration %}
id:
  description: The ID of the device. This is the 4 bytes long number written on the dimmer.
  required: true
  type: list
sender_id:
  description: The Sender ID of the device. This is a 4 bytes long number.
  required: true
  type: list
name:
  description: An identifier for the Ligh in the frontend.
  required: false
  default: EnOcean Light
  type: string
{% endconfiguration %}

## {% linkable_title Sensor %}

The `enocean` sensor platform currently only allows reading out the power measured in a Permundo PSC234 switch.

To use your EnOcean device, you first have to set up your [EnOcean hub](../enocean) and then add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: enocean
    name: Television
    id: [0x01,0x90,0x84,0x3C]
```

{% configuration %}
id:
  description: The ID of the device. This is a 4 bytes long number.
  required: true
  type: list
name:
  description: An identifier for the switch
  required: true
  default: EnOcean sensor
  type: string
{% endconfiguration %}

## {% linkable_title Switch %}

An EnOcean switch can take many forms. Currently, only a few types have been tested: Permundo PSC234 and Nod On SIN-2-1-01.

To use your EnOcean device, you first have to set up your [EnOcean hub](/components/enocean/) and then add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: enocean
    id: [0x01,0x90,0x84,0x3C]
```

{% configuration %}
id:
  description: The ID of the device. This is a 4 bytes long number.
  required: true
  type: list
name:
  description: An identifier for the switch.
  required: false
  default: EnOcean Switch
  type: string
channel:
  description: The number of the channel (typically 0 or 1) for the output channel to switch.
  required: false
  default: 0
  type: integer
{% endconfiguration %}

```yaml
# Example entries for a switch with 2 outputs (channels), e.g., the Nod On SIN-2-1-01
switch nodon01_0:
  - platform: enocean
    id: [0x05,0x04,0x03,0x02]
    name: enocean_nodon01_0
    channel: 0

switch nodon01_1:
  - platform: enocean
    id: [0x05,0x04,0x03,0x02]
    name: enocean_nodon01_1
    channel: 1
```
