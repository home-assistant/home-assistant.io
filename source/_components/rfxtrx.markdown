---
layout: page
title: "RFXtrx support"
description: "Instructions how to integrate RFXtrx into Home Assistant."
date: 2015-10-08 10:15
sidebar: false
comments: false
sharing: true
footer: true
ha_category: Hub
---
The rfxtrx component supports RFXtrx devices by [RFXCOM](http://www.rfxcom.com) which communicate in the frequency range of 433.92 MHz.

To enable RFXtrx in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
rfxtrx:
  device: PATH_TO_DEVICE
  debug: True
```

Configuration variables:

- **device** (*Required*): The path to your device, e.g. `/dev/serial/by-id/usb-RFXCOM_RFXtrx433_A1Y0NJGR-if00-port0`
- **debug** (*Optional*): If you want to recieve debug output.


## {% linkable_title Building on top of RFXtrx %}

 - [RFXtrx Sensor](/components/sensor.rfxtrx.html)
 - [RFXtrx Switch](/components/switch.rfxtrx.html)
 - [RFXtrx Light](/components/light.rfxtrx.html)




