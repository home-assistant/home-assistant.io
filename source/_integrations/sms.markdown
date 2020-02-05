---
title: SMS notifications via GSM-modem
description: SMS notification via GSM modem.
icon: gammu.png
ha_category:
  - Notifications
ha_release: 0.105
ha_iot_class: Local Polling
ha_codeowners:
  - '@ocalvo'
---

The `sms` integration allows having a local execution SMS notification via [Gammu](https://wammu.eu/gammu/). This is ideal when the internet is offline or when the power goes out.

This integration provides the following platforms:
- Notify

## Configuration

To enable those notifications in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sms:
  device: /dev/ttyUSB2

notify:
  - platform: sms
    name: sms_person1
    recipient: PHONE_NUMBER
  - platform: sms
    name: sms_person2
    recipient: PHONE_NUMBER
```
{% configuration %}
device:
  description: The gsm modem device.
  required: true
  type: string
{% endconfiguration %}

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

If the ingegration is used in HassOS then version [3.6](https://github.com/home-assistant/hassos/releases/tag/3.6) or higher is required.

For installations not running on Hass.io or Docker, you must install `gammu-dev` package:

```bash
sudo apt-get install libgammu-dev
```

Before running for the first time, check that the modem is recognized by the system by running:

```bash
ls -l /dev/*USB*
```

Note: In Hass.io you need to install the SSH add-on.

## Required Hardware

You will need a USB GSM stick modem.

### List of modems known to work

- [Huawei E3372-510](https://www.amazon.com/gp/product/B01N6P3HI2/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1)(
Need to unlock it using [this guide](http://blog.asiantuntijakaveri.fi/2015/07/convert-huawei-e3372h-153-from.html))

[List of modems that may work](https://www.asus.com/event/networks_3G4G_support/)

### Note about Raspberry PI 4

On Raspberry PI 4, you need a udev rule in the config USB stick, for the [Huawei E3372-510 stick](https://www.amazon.com/gp/product/B01N6P3HI2/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1) for it to be recognized.

Set this content in file `udev\10-gsm-modem.rules` in the configuration USB:

```txt
ACTION=="add" \
, ATTRS{idVendor}=="12d1" \
, ATTRS{idProduct}=="14fe" \
, RUN+="/sbin/usb_modeswitch -X -v 12d1 -p 14fe"
```

## More details:

- [Original thread discussion](https://community.home-assistant.io/t/send-sms-with-usb-gsm-modem-when-alarm-triggered/28942/38)
