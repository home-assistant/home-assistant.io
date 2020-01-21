# Local SMS notifications integration via GSM Modem
This integration allows to have a local execution SMS notification. This is ideal when the internet is offline or when the power goes out.

# Required Hardware
You will need a USB GSM stick modem.
## List of modems known to work:
- [Huawei E3372-510](https://www.amazon.com/gp/product/B01N6P3HI2/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1)(
Need to unlock it using [this guide](http://blog.asiantuntijakaveri.fi/2015/07/convert-huawei-e3372h-153-from.html))
## [List of modems that may work](https://www.asus.com/event/networks_3G4G_support/)

# Configuration
It requires hassos version [3.6](https://github.com/home-assistant/hassos/releases/tag/3.6) or higher.
Check that the modem is recognized by running:
```
ls -l /dev/*USB*
```

## Home Assistant config
In home assistant you need to configure your yaml notification as:
```
notify:
  - platform: command_line
    name: sms_person1
    command: !secret notify_sms_person1
  - platform: command_line
    name: sms_person2
    command: !secret notify_sms_person2
```
And the screts yaml:
```
notify_sms_person1: "/config/custom_components/sms/send_sms.sh +1NNNNNNNNNN /dev/ttyUSB2"
notify_sms_person2: "/config/custom_components/sms/send_sms.sh +1NNNNNNNNNN /dev/ttyUSB2"
```
Replace the NNN for the actual phone numbers

## Note about Raspberry
On Raspberry PI 4, you need a udev rule in the config USB stick, for the [Huawei E3372-510 stick](https://www.amazon.com/gp/product/B01N6P3HI2/ref=ppx_yo_dt_b_asin_title_o00_s00?ie=UTF8&psc=1) for it to be recognized.
This config is:
```
udev\10-gsm-modem.rules
```
```
ACTION=="add" \
, ATTRS{idVendor}=="12d1" \
, ATTRS{idProduct}=="14fe" \
, RUN+="/sbin/usb_modeswitch -X -v 12d1 -p 14fe"
```

## More details:
- [Original thread discussion](https://community.home-assistant.io/t/send-sms-with-usb-gsm-modem-when-alarm-triggered/28942/38)
