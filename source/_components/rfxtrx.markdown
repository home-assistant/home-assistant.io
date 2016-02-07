---
layout: page
title: "RFXtrx"
description: "Instructions how to integrate RFXtrx into Home Assistant."
date: 2015-10-08 10:15
sidebar: true
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
- **debug** (*Optional*): If you want to receive debug output.

### How to find the packet_id for your devices

Make sure you have enabled all RFXtrx related platforms. Push your remote and the device will be added automatically. After that you can see you device packetid in the state developer tools in the app.

Example for X10 and Chacon DI.O signals, if you see in state developer tools the following entities:

```
light.123efab1__1b2200000890efab1213f60
light.a8__0123454041230170
```

You must add the following to your `configuration.yaml`:

```YAML
light:
  platform: rfxtrx
  automatic_add: True
  devices:
    123efab1:
      name: My DI.0 light device
      packetid: 1b2200000890efab1213f60
    a8:
      name: My X10 light device
      packetid: 0123454041230170
```
