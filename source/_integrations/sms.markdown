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
ha_integration_type: integration
---

The `sms` integration allows having a local execution SMS notification via [Gammu](https://wammu.eu/gammu/). This is ideal when the internet is offline or when the power goes out.

This integration provides the following platforms:

- Notify

{% include integrations/config_flow.md %}

## Notifications

An SMS message can be sent by calling the `notify.sms`. It will send the message to all phone numbers specified in the `target` parameter.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

### Send message

```yaml
actions:
  - action: notify.sms
    data:
      message: "This is a message for you!"
      target: "+5068081-8181"
```

### Sending SMS using GSM alphabet

Some devices (receiving or sending) do not support Unicode (the default encoding). For these you can disable Unicode:

```yaml
actions:
  - action: notify.sms
    data:
      message: "This is a message for you in ANSI"
      target: "+5068081-8181"
      data:
        unicode: False
```

### Getting SMS messages

You can also receive SMS messages that are sent to the SIM card number in your device.
Every time there is a message received, `event: sms.incoming_sms` is fired with date, phone number and text message.
Sample automation that forward all SMS to `user1`:

#### Define a sensor in `configuration.yaml` to protect user phone number

```yaml
template:
  - sensor:
    - name: "User1 Phone Number"
      state: !secret user1_phone_number
```

#### Define a script in `scripts.yaml` to use the sensor

{% raw %}

```yaml
notify_sms_user1:
  alias: "Notify via SMS to User1"
  fields:
    message:
      description: "The message content"
      example: "The light is on!"
  sequence:
  - action: notify.sms
    data:
      message: "{{ message }}"
      target: "{{ states('sensor.user1_phone_number') }}"
  icon: mdi:chat-alert
```

{% endraw %}

#### Putting it all together in `automations.yaml`

{% raw %}

```yaml
- alias: "Forward SMS"
  triggers:
  - trigger: event
    event_type: sms.incoming_sms
  actions:
  - action: script.notify_sms_user1
    data:
      message: |
        From: {{trigger.event.data.phone}}
        {{trigger.event.data.text}}
```

{% endraw %}

## Required hardware

You will need a USB GSM stick modem or device like SIM800L v2 connected via USB UART.

### List of modems known to work
- [SIM800C HAT form factor](https://www.amazon.com/gp/product/B07PQLRCNR/ref=ppx_yo_dt_b_search_asin_title?ie=UTF8&psc=1) Make sure to `enable_uart=1` on your `config.txt` boot file.
- [SIM800C](https://www.amazon.com/gp/product/B087Z6F953/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1)
- [Huawei E3372](https://www.amazon.com/gp/product/B01N6P3HI2/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1)(
Note: E3372h-153 and E3372h-510 need to be unlocked [this guide](http://blog.asiantuntijakaveri.fi/2015/07/convert-huawei-e3372h-153-from.html), The Huawei E3372h-320 won't work at all, since it is locked down too much)
- [Huawei E3531](https://www.amazon.com/Modem-Huawei-Unlocked-Caribbean-Desbloqueado/dp/B011YZZ6Q2/ref=sr_1_1?keywords=Huawei+E3531&qid=1581447800&sr=8-1) (note: Devices with firmware versions 22.XX need to be unlocked using [this guide](https://community.home-assistant.io/t/trouble-setting-up-huawei-e3531s-2-with-sms-notifications-via-gsm-modem-integration/462737/9?u=alexschmitz222))
- [Huawei E3272](https://www.amazon.com/Huawei-E3272s-506-Unlocked-Americas-Europe/dp/B00HBL51OQ)
- ZTE K3565-Z
- Lenovo F5521gw (mPCI-E)

### List of modems known to NOT work

- Huawei E3372h-320

### List of modems that may work

Search in the [Gammu database](https://wammu.eu/phones/) for modems with AT connection.

### Huawei/ZTE modems (and similar) devices - NOT applicable for users of Home Assistant OS, Container or Supervised.

For some unknown reason, the rule that converts these modems from storage devices into serial devices may not run automatically. To work around this problem, follow the procedure below to change the modem mode and (optionally) create `udev` rule on a configuration USB stick for the device to switch to serial mode persistently.

1. Install the `usb_modeswitch` software to switch the modem operational mode (for Debian/Ubuntu distros):

```bash
sudo apt update && sudo apt install usb-modeswitch -y
```

2. Run `lsusb`, its output should be similar to this:

```bash
bus 000 device 001: ID 1FFF:342a
bus 001 device 005: ID 12d1:15ca   <-------- Huawei is usually 12d1
bus 000 device 002: ID 2354:5352
bus 000 device 002: ID 1232:15ca
```

Identify the brand for your GSM modem, copy the `brand_Id` and `product_id` (In this case `brand_id = 12d1` and `product_Id = 15ca`)

3. Try disabling virtual cd-rom and change work mode to "only modem": 

```bash
sudo /sbin/usb_modeswitch -X -v 12d1 -p 15ca
```
Re-plug the device. After this the modem correct should work without the following 'udev' rule.

4. (Optional) Configure the udev rule to persist the correct modem configuration even after disconnecting it:

Set this content in file `udev\10-gsm-modem.rules` in the [configuration USB](https://github.com/home-assistant/operating-system/blob/master/Documentation/configuration.md#automatic):
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

Re-plug the USB stick, reboot the device, run `lsusb` again.
The resulting product id now should be different and the brand id should be the same.
And `ls -l /dev/*USB*` should now report your device.

Note: if you have multiple USB devices, USB number order can change on boot. For this reason, it's preferable to use your device ID and look in `/dev/serial/by-id/*`. For example,  `/dev/serial/by-id/usb-HUAWEI_MOBILE_HUAWEI_MOBILE-if00-port0`.

If the device is still not recognized, remove the parameter -X from the usb_modeswitch command and reboot again.

## More details:

- [Original thread discussion](https://community.home-assistant.io/t/send-sms-with-usb-gsm-modem-when-alarm-triggered/28942/38)
