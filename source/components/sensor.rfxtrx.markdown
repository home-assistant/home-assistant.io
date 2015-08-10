---
layout: page
title: "RFXtrx sensors support"
description: "Instructions how to integrate RFXtrx sensors into Home Assistant."
date: 2015-08-06 17:15
sidebar: false
comments: false
sharing: true
footer: true
---
The rfxtrx platform support sensors that communicate in the frequency range of 433.92 MHz.

To enable the RFXtrx sensors in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: rfxtrx
    device: PATH_TO_DEVICE
```

The path to your device, e.g. `/dev/serial/by-id/usb-RFXCOM_RFXtrx433_A1Y0NJGR-if00-port0`

