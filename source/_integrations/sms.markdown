---
title: SMS notifications via GSM-modem
description: SMS notification via GSM modem.
icon: gammu.png
ha_category:
  - Notifications
ha_release: 0.105
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@ocalvo'
ha_domain: sms
ha_platforms:
  - notify
  - sensor
---

The `sms` integration allows having a local execution SMS notification via [Gammu](https://wammu.eu/gammu/). This is ideal when the internet is offline or when the power goes out.

This integration provides the following platforms:

- Notify

## Configuration

Activate `SMS` via the integrations menu and search for `SMS`.
While activating the integration, it will ask for your serial device. Make sure the device is connected and have a valid SIM activated.

You can also enable `SMS` via your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sms:
  device: /dev/ttyUSB2
```

To configure the notification service, edit your `configuration.yaml` file:

```yaml
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

## Notifications

You can also receive SMS messages that are sent to the SIM card number in your device.
Every time there is a message received, `event: sms.incoming_sms` is fired with date, phone number and text message.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

If the integration is used with the Home Assistant Operating System, then version [3.6](https://github.com/home-assistant/hassos/releases/tag/3.6) or higher is required.

For installations not running on Home Assistant or Home Assistant Core using Docker, you must install `gammu-dev` package:

```bash
sudo apt-get install libgammu-dev
```

Before running for the first time, check that the system recognizes the modem by running:

```bash
ls -l /dev/*USB*
```

Note: When running Home Assistant, you need to install the SSH add-on.

## Required Hardware

You will need a USB GSM stick modem or device like SIM800L v2 connected via USB UART.

### List of modems known to work

- [Huawei E3372-510](https://www.amazon.com/gp/product/B01N6P3HI2/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1)(
Need to unlock it using [this guide](http://blog.asiantuntijakaveri.fi/2015/07/convert-huawei-e3372h-153-from.html))
- [Huawei E3531](https://www.amazon.com/Modem-Huawei-Unlocked-Caribbean-Desbloqueado/dp/B011YZZ6Q2/ref=sr_1_1?keywords=Huawei+E3531&qid=1581447800&sr=8-1)
- [Huawei E3272](https://www.amazon.com/Huawei-E3272s-506-Unlocked-Americas-Europe/dp/B00HBL51OQ)

[List of modems that may work](https://www.asus.com/event/networks_3G4G_support/)

### Huawei modems on Raspberry Pi (and similar) devices

For some unknown reason, the rule that converts these modems from storage devices into serial devices does not run automatically. To work around this problem, follow the procedure to create `udev` rule on a configuration USB stick for the device to switch to serial mode.

0. Try disable virtual cd-rom and change work mode "only modem". After this modem correct work on Raspberry Pi without 'udev' rule.

1. Run `lsusb`, its output looks like this:

```bash
bus 000 device 001: ID 1FFF:342a
bus 001 device 005: ID 12d1:15ca   <-------- Huawei is usually 12d1
bus 000 device 002: ID 2354:5352
bus 000 device 002: ID 1232:15ca
```

Identify the brand for your GSM modem, copy the `brand_Id` and `product_id` (In this case `brand_id = 12d1` and `product_Id = 15ca`)

Set this content in file `udev\10-gsm-modem.rules` in the configuration USB:
(Replace `brand_Id` and `product_id` for the numbers reported by `lsusb`)

```bash
ACTION=="add" \
, ATTRS{idVendor}=="brand_Id" \
, ATTRS{idProduct}=="product_Id" \
, RUN+="/sbin/usb_modeswitch -X -v brand_Id -p product_Id"
```

Here is a sample configuration file:

```bash
ACTION=="add" \
, ATTRS{idVendor}=="12d1" \
, ATTRS{idProduct}=="15ca" \
, RUN+="/sbin/usb_modeswitch -X -v 12d1 -p 15ca"
```

Plug the USB stick, reboot the device, run `lsusb` again.
The resulting product id now should be different and the brand id should be the same.
And `ls -l /dev/*USB*` should now report your device.

If the device is still not recognized, remove the parameter -X from the usb_modeswitch command and reboot again.

## More details:

- [Original thread discussion](https://community.home-assistant.io/t/send-sms-with-usb-gsm-modem-when-alarm-triggered/28942/38)
