---
layout: page
title: "Zigbee Home Automation"
description: "Instructions how to integrate your Zigbee Home Automation within Home Assistant."
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

[ZigBee Home Automation](http://www.zigbee.org/zigbee-for-developers/applicationstandards/zigbeehomeautomation/)
integration for Home Assistant allows you to connect many off-the-shelf ZigBee devices to Home Assistant, using a compatible ZigBee radio.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](../binary_sensor.zha) (e.g. motion and door sensors)
- [Sensor](../sensor.zha) (e.g. temperature sensors)
- [Light](../light.zha)
- [Switch](../switch.zha)

Known working ZigBee radios:

- Nortek/GoControl Z-Wave & Zigbee USB Adaptor - Model HUSBZB-1
- XBee Series 2C

To configure the component, a `zha` section must be present in the `configuration.yaml`,
and the path to the serial device for the radio and path to the database which will persist your network data is required.

```yaml
# Example configuration.yaml entry
zha:
  usb_path: /dev/ttyUSB2
  database_path: zigbee.db
```

Configuration variables:

 - **radio_type** (*Optional*): One of `ezsp` (default) or `xbee`
 - **usb_path** (*Required*): Path to the serial device for the radio.
 - **baud_rate** (*Optional*): Baud rate of the serial device.
 - **database_path** (*Required*): Path to the database which will keep persistent network data.

To add new devices to the network, call the `permit` service on the `zha` domain, and then follow the device instructions for doing a scan or factory reset. In case you want to add Philips Hue bulbs that have previously been added to another bridge, have a look at: [https://github.com/vanviegen/hue-thief/](https://github.com/vanviegen/hue-thief/)
