---
title: "HomeMatic"
description: "HomeMatic hardware support to turn Home Assistant into a CCU."
---

You can't import an existing configuration, you'll need re-learn it into Home Assistant. There is an experimental WebUI alias Regahss support since 9.0. Before it was required to use a third-party tool.

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
  default: false
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
  default: false
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
      description: The encrypted key.
      required: true
      type: string
    ip:
      description: The IP address of LAN gateway.
      required: true
      type: string
hmip_enable:
  description: Enable or disable hmip.
  required: true
  type: boolean
  default: false
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

## Home Assistant configuration

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

## Raspberry Pi3

With HM-MOD-RPI-PCB you need to add follow into your `config.txt` on boot partition:

```text
dtoverlay=pi3-miniuart-bt
```

## HmIP-RFUSB

HassOS > 1.11 support HmIP-RFUSB by default and don't need any configuration. If you run a Linux installation, you need to follow the installation guide from the documentation to set up the UART USB interface on your computer.

## Web UI

To enable the experimental WebUI for built-in CCU specify a port number for "Regahss Webinterface" on the addon configuration page under the network section. After saving the changes, click on the "Open Web UI" button and proceed with the [Homematic WebUI](https://www.eq-3.de/downloads/download/handbuecher/WebUI_Handbuch_eQ-3.pdf) configuration.
