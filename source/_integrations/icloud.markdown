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
ha_domain: icloud
---

The `icloud` integration allows you to detect presence using the [iCloud](https://www.icloud.com/) service. iCloud allows users to track their location on iOS devices.

There is currently support for the following platforms within Home Assistant:

- [Device Tracker](#device-tracker)
- [Sensor](#sensor)

It does require that your devices are registered with the [Find My](https://www.apple.com/uk/icloud/find-my/) service.

## Setup the integration

There is two ways to integrate iCloud in Home Assistant

### Via the frontend

Menu: *Configuration* -> *Integrations*. Search for "iCloud", add your credentials, click submit.

If you add the integration for the first time for an account:
1. Choose a trusted device from the list and submit.
2. It will send you a text message on your trusted device, add the received code to the next form and submit (if you missed the right code, you will be back to the previous step, and retry).
3. You are done!

If you already added the integration before, you are done!

### Via the configuration file

Add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
icloud:
  - username: USERNAME
    password: PASSWORD
```

{% configuration %}
username:
  description: Your iCloud account email.
  required: true
  type: string
password:
  description: Your iCloud account password.
  required: true
  type: string
with_family:
  description: If you want to fetch your family devices.
  required: false
  default: false
  type: boolean
max_interval:
  description: Maximum interval in minutes between subsequent location updates. This tracker uses dynamic intervals for requesting location updates. When the iPhone is stationary, the interval will eventually be set to `max_interval` to save battery. When the iPhone starts moving again, the interval will be dynamically updated to 1 min. Note that updating interval to 1 min might be delayed by maximum `max_interval` minutes. Minimum value is 1 min.
  required: false
  default: 30
  type: integer
gps_accuracy_threshold:
  description: iCloud location updates come with some gps_accuracy varying from 10 to 5000 meters. This setting defines the accuracy threshold in meters for a location update. Less accurate updates will be discarded by this tracker. This allows for more precise location monitoring and fewer false-positive zone changes.
  required: false
  default: 500
  type: integer
{% endconfiguration %}

<div class='note warning'>
Low `max_interval` may cause battery drainage as it wakes up your device to get the current location.
</div>

<div class='note warning'>
You may receive an email and a notification from Apple saying that someone has logged into your account.

For the notification, press "Allow", then "OK".
</div>

If two-step authentication is enabled for your iCloud account, some time after Home Assistant startup the integration will ask which device you want to use as the Trusted Device via a notification in the Home Assistant UI. The integration will send an SMS prompt to that device with the auth code to enter in Home Assistant. The duration of this authentication is determined by Apple, but is currently 2 months, so you will only need to verify your account every two months.

2 Factor Authentication is the improved version of two-step authentication and is still not supported by the pyicloud library. Therefore it's not possible to use it with the device_tracker yet.

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

This service can be used to ask an update of a certain iDevice or all devices linked to an iCloud account. Request will result in new Home Assistant [state_changed](/docs/configuration/events/#event-state_changed) event describing current iPhone location. It can be used in automations when a manual location update is needed, e.g., to check if anyone is home when a door been opened.

### Service `icloud.play_sound`

This service will play the Lost iPhone sound on your iDevice. It will still ring if you are on "Mute" or "Do not disturb" mode.

### Service `icloud.display_message`

This service will display a message on your iDevice. It can also ring your device.

### Service `icloud.lost_device`

This service will put your iDevice on "lost" mode (compatible devices only). You have to provide a phone number with a suffixed [country code](https://en.wikipedia.org/wiki/List_of_country_calling_codes) and a message.
