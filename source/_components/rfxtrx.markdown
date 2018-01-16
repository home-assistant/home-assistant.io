---
layout: page
title: "RFXtrx"
description: "Instructions how to integrate RFXtrx into Home Assistant."
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
  recv_modes:
  - oregon
  - ac
  - x10
```

Configuration variables:

- **device** (*Required*): The path to your device, e.g. `/dev/serial/by-id/usb-RFXCOM_RFXtrx433_A1Y0NJGR-if00-port0`
- **recv_modes** (*Optional*): If you want to set the list of protocols to be enabled in your device for receiving and decoding. The list must contain at least one entry.
- **debug** (*Optional*): If you want to receive debug output.
- **dummy** (*Optional*): Simulate a device. Useful for debugging and testing.

Supported protocols

The RFXtrx transceiver has a predefined list of protocols enabled for receiving. Not all protocols are enabled by default and enabling all of them is not recommended: some protocols can interfere with others. See your transceiver manual for more information.

The ``recv_modes`` configuration variable can be used for enabling the protocols you want to decode when they differ of your device default. The list is set during Home Assistant startup. It _is not stored_ in your device non-volatile memory.

Choose the protocols, to be enabled, from the following values (_make sure to keep the values in lower case_):
- `ac`
- `adlightwave`
- `aeblyss`
- `arc`
- `ati`
- `blindst0`
- `blindst1234`
- `byronsx`
- `fineoffset`
- `fs20`
- `hideki`
- `homeconfort`
- `homeeasy`
- `imagintronix`
- `keeloq`
- `lacrosse`
- `lighting4`
- `meiantech`
- `mertik`
- `oregon`
- `proguard`
- `rsl`
- `rubicson`
- `undecoded`
- `visonic`
- `x10`

Your 433.92 product not showing in the logs? Visit the RFXtrx website to [download RFXmgmr](http://www.rfxcom.com/epages/78165469.sf/en_GB/?ObjectPath=/Shops/78165469/Categories/Downloads) to see what protocol should be used. Then enable the relevant protocol in your home-assistant configuration.
