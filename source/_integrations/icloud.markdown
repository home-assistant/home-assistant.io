---
title: Apple iCloud
description: Instructions on how to use iCloud to track devices in Home Assistant.
ha_category:
  - Calendar
  - Media source
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
  - calendar
  - device_tracker
  - media_source  
  - sensor
ha_integration_type: hub
---

The **Apple iCloud** {% term integration %} allows you to detect presence using the [iCloud](https://www.icloud.com/) service. iCloud allows users to track their location on iOS devices.

There is currently support for the following platforms within Home Assistant:

- [Calendar](#calendar)
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

### Calendar

The iCloud integration adds a calendar entity for each of your iCloud calendars, showing the event in progress or the next one due. Calendars are read-only, so events cannot be created or edited from Home Assistant.

### Device tracker

The iCloud integration will track available devices on your iCloud account.

### Sensor

The iCloud integration will add a battery sensor for each iCloud devices available on your iCloud account.

{% include integrations/actions.md %}

## Media source

iCloud photo albums and shared streams are displayed in the media browser, "Media" > "iCloud". This will display a list of configured iCloud accounts, selecting the account will give a choice of "Albums" and "Shared Streams". Selection of these will give a list of available photo albums, and selecting these will display the current contents of the album.
