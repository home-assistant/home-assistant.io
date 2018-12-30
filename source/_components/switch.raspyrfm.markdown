---
layout: page
title: "RaspyRFM Switch"
description: "Instructions on how to integrate RaspyRFM switches into Home Assistant."
date: 2018-12-08
sidebar: true
comments: false
sharing: true
footer: true
logo: seegelsysteme.png
ha_category: Switch
ha_release: 0.85
ha_iot_class: "Assumed State"
---

The `raspyrfm` component adds support for cheap RC 433 MHz outlets via one of the supported gateways.

Initially, this component was created to support the Simple Solutions `ConnAir` gateway which has been discontinued. There are custom alternatives that reimplemented the protocol used by the ConnAir though like this [ConnAir emulator](https://github.com/Phunkafizer/RaspyRFM/blob/master/connair.py) which can be used in conjunction with the [RaspyRFM-II](https://www.seegel-systeme.de/produkt/raspyrfm-ii) RC module for a Raspberry Pi.

Other vendors of 433 MHz RC outlets have also created gateways that use a very similar protocol and can also be used with this component like the Intertechno [ITGW-433 LAN Gateway](https://www.intertechno24.de/LAN-Gateway/Gateway-ITGW-433.html) 
 

```yaml
# Example configuration.yaml entry
switch:
  platform: raspyrfm
  switches:
    - controlunit_manufacturer: Intertechno
      controlunit_model: CMR 1000
      channel_config:  # Note that keys used here vary between control units
        master: A
        slave: 1
```

{% configuration %}
gateway_manufacturer:
  description: Manufacturer of the gateway.
  required: false
  default: Seegel Systeme
  type: string
gateway_model:
  description: Model of the gateway.
  required: false
  default: RaspyRFM
  type: string
host:
  description: Host of the gateway.
  required: false
  default: 127.0.0.1
  type: string
host:
  description: Port of the gateway.
  required: false
  default: depends on the gateway model
  type: integer
switches:
  description: List of switches that can be controlled with this gateway.
  required: true
  type: list
  keys:
    name:
      description: Name for the device.
      required: false
      default: Unnamed Device
      type: string
    controlunit_manufacturer:
      description: Manufacturer of the control unit.
      required: true
      type: string
    controlunit_model:
      description: Model of the control unit.
      required: true
      type: string
    channel_config:
      description: Channel configuration of the control unit. The exact keys needed depend on the control unit manufacturer and model.
      required: true
      type: dict
{% endconfiguration %}

### {% linkable_title Device support %}

Have a look at the underlying library [raspyrfm-client](https://github.com/markusressel/raspyrfm-client) to check what gateways and control units (outlets) are supported.

### {% linkable_title Channel configuration %}

Depending on the control unit the channel config can have varying formats. Have a look at the underlying library [raspyrfm-client](https://github.com/markusressel/raspyrfm-client) to find out about a specific model.

### {% linkable_title Switch state %}

Initially, the state of a switch is unknown. When the switch is turned on or off (via frontend) the state is known and will be shown in the frontend.

<p class='note warning'>
Note that due to the way those cheap RC units work it is **not possible to query their current state**. Therefore the only way to preserve a consistent state within Home Assistant is to only use Home Assistant as the controller.
</p>

### {% linkable_title Full example %}

```yaml
switch:
  platform: raspyrfm
  gateway_manufacturer: Seegel Systeme
  gateway_model: RaspyRFM
  host: 127.0.0.1              # Optional
  port: 49880                  # Optional
  switches:
    - name: My Switch
      controlunit_manufacturer: Intertechno
      controlunit_model: CMR 1000
      channel_config:
        master: A
        slave: 1
    - name: My other Switch
      controlunit_manufacturer: Brennenstuhl
      controlunit_model: RCS 1000 N Comfort
      channel_config:
        1: 1
        2: 1
        3: 1
        4: 1
        5: 1
        CH: A
```
