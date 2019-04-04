---
layout: page
title: "HomeMatic"
description: "HomeMatic hardware support to turn you Home-Assistant into a CCU."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

Set up a [HomeMatic](https://github.com/eq-3/occu) hardware layer. For learning and handling devices use [Homematic-Manager](https://github.com/hobbyquaker/homematic-manager) > 2.0.

The logic layer will be Home Assistant. There is no ReGa or other logic layer installed. You can't import an existing configuration, you'll need re-learn it into Home Assistant.

Follow devices will be supported and tested:

- [HM-MOD-RPI-PCB](https://www.elv.ch/homematic-funkmodul-fuer-raspberry-pi-bausatz.html)
- [HmIP-RFUSB](https://www.elv.ch/elv-homematic-ip-rf-usb-stick-hmip-rfusb-fuer-alternative-steuerungsplattformen-arr-bausatz.html)

```json
{
  "rf_enable": true,
  "rf": [
    {
      "type": "CCU2",
      "device": "/dev/ttyAMA0"
    }
  ],
  "wired_enable": false,
  "wired": [
    {
      "serial": "xy",
      "key": "abc",
      "ip": "192.168.0.0"
    }
  ],
  "hmip_enable": false,
  "hmip": [
    {
      "type": "HMIP_CCU2",
      "device": "/dev/ttyUSB0"
    }
  ]
}
```

{% configuration %}
rf_enable:
  description: Enable or disable BidCoS-RF.
  required: true
  type: boolean
rf:
  description: RF devices.
  required: true
  type: list
  keys:
    type:
      description: Device type for RFD service. Look into the manual of your device.
      required: true
      type: string
    device:
      description: Device on the host.
      required: true
      type: string
wired_enable:
  description: Enable or disable BidCoS-Wired.
  required: true
  type: boolean
wired:
  description: Wired devices.
  required: true
  type: list
  keys:
    serial:
      description: Serial number of the device.
      required: true
      type: string
    key:
      description: Encrypted key.
      required: true
      type: string
    ip:
      description: IP address of LAN gateway.
      required: true
      type: string
hmip_enable:
  description: Enable or disable hmip.
  required: true
  type: boolean
hmip:
  description: HMIP devices.
  required: true
  type: list
  keys:
    type:
      description: Device type for RFD service. Look into the manual of your device.
      required: true
      type: string
    device:
      description: Device on the host.
      required: true
      type: string
{% endconfiguration %}

## {% linkable_title Home Assistant configuration %}

Use the following configuration in Home Assistant to use it:

```yaml
homematic:
  interfaces:
    rf:
      host: core-homematic
      port: 2001
    wired:
      host: core-homematic
      port: 2000
    hmip:
      host: core-homematic
      port: 2010
```

## {% linkable_title Raspberry Pi3 %}

With HM-MOD-RPI-PCB you need to add follow into your `config.txt` on boot partition:

```text
dtoverlay=pi3-miniuart-bt
```

## {% linkable_title HmIP-RFUSB %}

HassOS > 1.11 support HmIP-RFUSB default and don't need any configuration. If you run a Linux, you need to follow the installation guide from documentation to set up the UART USB interface on your computer.
