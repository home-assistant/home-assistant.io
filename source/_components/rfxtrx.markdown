---
layout: page
title: "RFXtrx"
description: "Instructions on how to integrate RFXtrx into Home Assistant."
date: 2015-10-08 10:15
sidebar: true
comments: false
sharing: true
footer: true
logo: rfxtrx.png
ha_category: Hub
ha_release: pre 0.7
---

The `rfxtrx` component supports RFXtrx devices by [RFXCOM](http://www.rfxcom.com) which communicate in the frequency range of 433.92 MHz.

To enable RFXtrx in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
rfxtrx:
  device: PATH_TO_DEVICE
```

Configuration variables:

- **device** (*Required*): The path to your device, e.g., `/dev/serial/by-id/usb-RFXCOM_RFXtrx433_A1Y0NJGR-if00-port0`
- **debug** (*Optional*): If you want to receive debug output.
- **dummy** (*Optional*): Then you have need a connected drive to test your settings. Can be useful for debugging and testing.

Supported protocols

Not all protocols as advertised are enabled on initial setup of your transceiver. Enabling all protocols is not recommended either. Your 433.92 product not showing in the logs? Visit the RFXtrx website to [download RFXmgmr](http://www.rfxcom.com/epages/78165469.sf/nl_NL/?ObjectPath=/Shops/78165469/Categories/Downloads) and enable the required protocol.
