---
title: "RFXtrx"
description: "Instructions on how to integrate RFXtrx into Home Assistant."
logo: rfxtrx.png
ha_category:
  - Hub
ha_release: pre 0.7
---

The `rfxtrx` integration supports RFXtrx devices by [RFXCOM](http://www.rfxcom.com) which communicate in the frequency range of 433.92 MHz.

To enable RFXtrx in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
rfxtrx:
  device: PATH_TO_DEVICE
```

{% configuration %}
device:
  description: "The path to your device, e.g., `/dev/serial/by-id/usb-RFXCOM_RFXtrx433_A1Y0NJGR-if00-port0` or `/dev/ttyUSB0`."
  required: true
  type: string
debug:
  description: If you want to receive debug output.
  required: false
  default: false
  type: boolean
dummy:
  description: Then you have need a connected drive to test your settings. Can be useful for debugging and testing.
  required: false
  default: false
  type: boolean
{% endconfiguration %}

Supported protocols

Not all protocols as advertised are enabled on initial setup of your transceiver. Enabling all protocols is not recommended either. Your 433.92 product not showing in the logs? Visit the RFXtrx website to [download RFXmgmr](http://www.rfxcom.com/epages/78165469.sf/nl_NL/?ObjectPath=/Shops/78165469/Categories/Downloads) and enable the required protocol.
