---
layout: page
title: "Zigbee Home Automation"
description: "Instructions on how to integrate your Zigbee Home Automation (ZHA) devices within Home Assistant."
date: 2017-02-22 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: zigbee.png
ha_category: Hub
ha_release: 0.44
ha_iot_class: "Local Polling"
---

[Zigbee Home Automation](http://www.zigbee.org/zigbee-for-developers/applicationstandards/zigbeehomeautomation/)
integration for Home Assistant allows you to connect many off-the-shelf Zigbee based devices to Home Assistant, using one of the available Zigbee radio modules compatible with [zigpy](https://github.com/zigpy/zigpy) (an open source Python library implementing a Zigbee stack, which in turn relies on seperate libraries which can each interface a with Zigbee radio module a different manufacturer).

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](../binary_sensor.zha) (e.g., motion and door sensors)
- [Sensor](../sensor.zha) (e.g., temperature sensors)
- [Light](../light.zha)
- [Switch](../switch.zha)
- [Fan](../fan.zha)

Known working Zigbee radio modules:

- EmberZNet based radios using the EZSP protocol (via the [bellows](https://github.com/zigpy/bellows) library for zigpy)
  - [Nortek GoControl QuickStick Combo Model HUSBZB-1 (Z-Wave & Zigbee USB Adapter)](https://www.nortekcontrol.com/products/2gig/husbzb-1-gocontrol-quickstick-combo/)
  - [Elelabs Zigbee USB Adapter](https://elelabs.com/products/elelabs_usb_adapter.html)
  - [Elelabs Zigbee Raspberry Pi Shield](https://elelabs.com/products/elelabs_zigbee_shield.html)
- XBee Zigbee based radios (via the [zigpy-xbee](https://github.com/zigpy/zigpy-xbee) library for zigpy)
  - Digi XBee Series 2C (S2C) modules

## {% linkable_title Configuration %}

To configure the component, a `zha` section must be present in the `configuration.yaml`,
and the path to the serial device for the radio and path to the database which will persist your network data is required.

```yaml
# Example configuration.yaml entry
zha:
  usb_path: /dev/ttyUSB2
  database_path: /home/homeassistant/.homeassistant/zigbee.db
```

{% configuration %}
radio_type:
  description: One of `ezsp` or `xbee`.
  required: false
  type: string
  default: ezsp
usb_path:
  description: Path to the serial device for the radio.
  required: true
  type: string
baudrate:
  description: Baud rate of the serial device.
  required: false
  type: integer
  default: 57600
database_path:
  description: _Full_ path to the database which will keep persistent network data.
  required: true
  type: string
enable_quirks:
  description: Enable quirks mode for devices where manufacturers didn't follow specs.
  required: false
  type: boolean
  default: true
{% endconfiguration %}

To add new devices to the network, call the `permit` service on the `zha` domain. Do this by clicking the Service icon in Developer tools and typing `zha.permit` in the **Service** dropdown box. Next, follow the device instructions for adding, scanning or factory reset. 

In case you want to add Philips Hue bulbs that have previously been added to another bridge, have a look at: [https://github.com/vanviegen/hue-thief/](https://github.com/vanviegen/hue-thief/)


