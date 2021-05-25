---
title: Apple iCloud
description: Instructions on how to use iCloud to track devices in Home Assistant.
ha_category:
  - Presence Detection
  - Sensor
ha_iot_class: Cloud Polling
ha_release: '0.10'
ha_config_flow: true
ha_codeowners:
  - '@Quentame'
  - '@nzapponi'
ha_domain: icloud
ha_platforms:
  - device_tracker
  - sensor
---

The `icloud` integration allows you to detect presence using the [iCloud](https://www.icloud.com/) service. iCloud allows users to track their location on iOS devices.

There is currently support for the following platforms within Home Assistant:

- [Device Tracker](#device-tracker)
- [Sensor](#sensor)

It does require that your devices are registered with the [Find My](https://www.apple.com/uk/icloud/find-my/) service.

{% include integrations/config_flow.md %}

<div class='note warning'>
Low `max_interval` may cause battery drainage as it wakes up your device to get the current location.
</div>

<div class='note warning'>
You may receive an email and a notification from Apple saying that someone has logged into your account.

For the notification, press "Allow", then "OK".
</div>

If two-step authentication is enabled for your iCloud account, some time after Home Assistant startup the integration will ask to enter the verification code you receive on your device via a notification in the Home Assistant UI. The duration of this authentication is determined by Apple, so you will need to verify your account every now and then.

To prevent excessive battery drainage, a dynamic interval is used for each individual device instead of a fixed interval for all devices linked to one account. The dynamic interval is based on the current zone of a device, the distance towards home and the battery level of the device.

## In case of troubleshooting

Go into your Home Assistant configuration `.storage` folder and delete the "icloud" folder, then retry.

## Platforms

### Device Tracker

The iCloud integration will track available devices on your iCloud account.

### Sensor

The iCloud integration will add a battery sensor for each iCloud devices available on your iCloud account.

## Services

4 services are available:

### Service `icloud.update`

This service can be used to ask an update of a certain iDevice or all devices linked to an iCloud account. Request will result in new Home Assistant [state_changed](/docs/configuration/events/#event-state_changed) event describing current iPhone location. It can be used in automations when a manual location update is needed, e.g., to check if anyone is home when a door has been opened.

### Service `icloud.play_sound`

This service will play the Lost iPhone sound on your iDevice. It will still ring if you are on "Mute" or "Do not disturb" mode.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `account`                 |       no | E-mail address of the iCloud account                    |
| `device_name`             |       no | Human Friendly device name like Bob's iPhone            |

### Service `icloud.display_message`

This service will display a message on your iDevice. It can also ring your device.

### Service `icloud.lost_device`

This service will put your iDevice on "lost" mode (compatible devices only). You have to provide a phone number with a suffixed [country code](https://en.wikipedia.org/wiki/List_of_country_calling_codes) and a message.
