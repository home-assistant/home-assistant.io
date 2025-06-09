---
title: Apple iCloud
description: Instructions on how to use iCloud to track devices in Home Assistant.
ha_category:
  - Presence detection
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
ha_integration_type: integration
---

The `icloud` integration allows you to detect presence using the [iCloud](https://www.icloud.com/) service. iCloud allows users to track their location on iOS devices.

There is currently support for the following platforms within Home Assistant:

- [Device tracker](#device-tracker)
- [Sensor](#sensor)

It does require that your devices are registered with the [Find My](https://www.apple.com/icloud/find-my/) service.

{% include integrations/config_flow.md %}

{% warning %}
You may receive recurring emails and notifications from Apple stating that someone has logged into your account if the integration is improperly configured. If this occurs, select `Don't Allow` on your iOS device and reconfigure the Integration Credentials when prompted.

For the notification, press "Allow", then "OK".
{% endwarning %}

To prevent excessive battery drainage, a dynamic interval is used for each individual device instead of a fixed interval for all devices linked to one account. The dynamic interval is based on the current zone of a device, the distance towards home and the battery level of the device.

## Two Factor Authentication

{% important %}
You need to use an [app-specific password](https://support.apple.com/102654) to set up this integration.
{% endimportant %}

## In case of troubleshooting

Delete the integration's configuration (most likely in `/config/.storage/icloud`), then retry.

## Platforms

### Device tracker

The iCloud integration will track available devices on your iCloud account.

### Sensor

The iCloud integration will add a battery sensor for each iCloud devices available on your iCloud account.

## Actions

4 actions are available:

### Action `icloud.update`

This action can be used to ask an update of a certain iDevice or all devices linked to an iCloud account. Request will result in new Home Assistant [state_changed](/docs/configuration/events/#event-state_changed) event describing current iPhone location. It can be used in automations when a manual location update is needed, e.g., to check if anyone is home when a door has been opened.

### Action `icloud.play_sound`

This action will play the Lost iPhone sound on your iDevice. It will still ring if you are on "Mute" or "Do not disturb" mode.

| Data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `account`                 |       no | Email address of the iCloud account                    |
| `device_name`             |       no | Human Friendly device name like Bob's iPhone            |

### Action `icloud.display_message`

This action will display a message on your iDevice. It can also ring your device.

### Action `icloud.lost_device`

This action will put your iDevice on "lost" mode (compatible devices only). You have to provide a phone number with a suffixed [country code](https://en.wikipedia.org/wiki/List_of_country_calling_codes) and a message.
