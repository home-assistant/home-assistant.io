---
layout: page
title: "HDMI CEC"
description: "Instructions how to interact with HDMI CEC via Home Assistant."
date: 2016-06-24 19:59
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Automation
featured: false
ha_release: 0.23
ha_iot_class: "Local Push"
---

The CEC component provides services that allow selecting the active device, powering on all devices, and setting all devices to standby. Devices are defined in the configuration file by associating HDMI port number and a device name. Connected devices that provide further HDMI ports, such as Soundbars and AVRs are also supported. Devices are listed from the perspective of the CEC-enabled Home Assistant device. Any connected device can be listed, regardless of whether it supports CEC. Ideally the HDMI port number on your device will map correctly the CEC physical address. If it does not, use `cec-client` (part of the `libcec` package) to listen to traffic on the CEC bus and discover the correct numbers.

## {% linkable_title CEC Setup %}

### {% linkable_title Adapter %}

The computer running Home Assistant must support CEC, and of course be connected via HDMI to a device also supporting CEC. You can purchase a [USB CEC adapter](https://www.pulse-eight.com/p/104/usb-hdmi-cec-adapter) to add support if necessary. Note that all Raspberry Pi models support CEC natively.

### {% linkable_title libcec %}

[libcec](https://github.com/Pulse-Eight/libcec) must be installed for this component to work. Follow the installation instructions for your environment, provided at the link. `libcec` installs Python 3 bindings, by default as a system Python module. If you are running Home Assistant in a Python virtual environment, make sure it can access the system module, by either symlinking it or using the `--system-site-packages` flag.

## {% linkable_title Configuration Example %}

In the following example, a Pi Zero running Home Assistant is on a TV's HDMI port 1. HDMI port 2 is attached to a AV receiver. Three devices are attached to the AV receiver on HDMI ports 1 through 3.

```yaml
hdmi_cec:
  devices:
    1: Pi Zero
    2:
      1: Fire TV Stick
      2: Chromecast
      3: Another Device
```

## {% linkable_title Services %}

### {% linkable_title Select Device %}

Call the `hdmi_cec/select_device` service with the name of the device to select, for example:

```json
{
  "device": "Chromecast"
}
```

### {% linkable_title Power On %}

Call the `hdmi_cec/power_on` service (no arguments) to power on any devices that support this function.

### {% linkable_title Standby %}

Call the `hdmi_cec/standby` service (no arguments) to place in standby any devices that support this function.

## {% linkable_title Useful References %}

* [CEC overview](http://wiki.kwikwai.com/index.php?title=The_HDMI-CEC_bus)
* [CEC-o-matic](http://www.cec-o-matic.com/)
