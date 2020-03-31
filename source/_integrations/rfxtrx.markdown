---
title: RFXCOM RFXtrx
description: Instructions on how to integrate RFXtrx into Home Assistant.
ha_category:
  - Hub
ha_release: pre 0.7
ha_codeowners:
  - '@danielhiversen'
ha_domain: rfxtrx
---

The `rfxtrx` integration supports RFXtrx devices by [RFXCOM](http://www.rfxcom.com), which communicate in the frequency range of 433.92 MHz.

To enable RFXtrx in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry for local serial device
rfxtrx:
  device: /dev/ttyUSB0
```

OR

```yaml
# Example configuration.yaml entry for TCP connected device using ser2net
rfxtrx:
  host: 192.168.0.2
  port: 50000
```

{% configuration %}
device:
  description: "The path to your device, e.g., `/dev/serial/by-id/usb-RFXCOM_RFXtrx433_A1Y0NJGR-if00-port0` or `/dev/ttyUSB0`. Required if you are using a locally connected USB device."
  required: false
  type: string
host:
  description: "The hostname the remote RFXtrx is available on if connecting via TCP. If this is set, a port is required."
  required: false
  type: string
port:
  description: "The TCP port the remote RFXtrx is available on. If this is set, a host is required."
  required: false
  type: integer
debug:
  description: "If you want to receive debug output."
  required: false
  default: false
  type: boolean
dummy:
  description: "Then you need a connected drive to test your settings. Can be useful for debugging and testing."
  required: false
  default: false
  type: boolean
{% endconfiguration %}

## Supported protocols

Not all protocols as advertised are enabled on the initial setup of your transceiver. Enabling all protocols is not recommended either. Your 433.92 product not showing in the logs? Visit the RFXtrx website to [download RFXmgmr](http://www.rfxcom.com/epages/78165469.sf/en_GB/?ViewObjectPath=%2FShops%2F78165469%2FCategories%2FDownloads) and enable the required protocol.

### ser2net

You can host your device on another computer by setting up ser2net and example configuration for ser2net looks like this and then using host/port in your Home Assistant configuration.

```text
50000:raw:0:/dev/ttyUSB0:38400 8DATABITS NONE 1STOPBIT
```
