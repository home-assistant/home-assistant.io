---
title: "iCloud"
description: "Instructions on how to use iCloud to track devices in Home Assistant."
logo: icloud.png
ha_category:
  - Presence Detection
ha_release: "0.10"
---


The `icloud` integration allows you to detect presence using the [iCloud](https://www.icloud.com/) service. iCloud allows users to track their location on iOS devices.

It does require that your device is registered with "Find My iPhone".

## Setup the integration

There is two ways to integrate iCloud in Home Assistant

### Via the frontend

Menu: *Configuration* -> *Integrations*

Search for "iCloud", add your credentials, click submit.

If you add the integration for the first time for an account:
Choose a trusted device from the list and submit.
It will sends you a text message on your trusted device, add the received code to the next form and submit (if you missed the right code, you will be back to the previous step, and retry).
You are done !

If you already added the integration before, you are done !

### Via the configuration file

Add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
icloud:
  - username: USERNAME
    password: PASSWORD
```

### In case of troubleshooting

Go into you Home Assistant configuration folder and delete the "icloud" folder, then retry.

{% configuration %}
username:
  description: Your iCloud account email.
  required: true
  type: string
password:
  description: Your iCloud account password.
  required: true
  type: string
account_name:
  description: A friendly name for your iCloud account. If this isn't given, it will use the part before the `@` of the username.
  required: false
  type: string
max_interval:
  description: Maximum interval in minutes between subsequent location upates. This tracker uses dynamic intervals for requesting location updates. When iphone is stationary, interval will eventually be set to `max_interval` to save battery. When iphone starts moving again interval will be dynamically updated to 1 min. Note that updating interval to 1 min might be delayed by maximum `max_interval` minutes. Minimum value is 1 min.
  required: false
  default: 30
  type: integer
gps_accuracy_threshold:
  description: iCloud location updates come with some gps_accuracy varying from 10 to 5000 meters. This setting defines the accuracy threshold in meters for a location update. Less accurate updates will be discarded by this tracker. This allows more precise location monitoring and fewer false positive zone changes.
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

To disable the drainage of the battery, a dynamic interval is being used for each individual device instead of a fixed interval for all devices linked to one account. The dynamic interval is based on the current zone of a device, the distance towards home and the battery level of the device.

If 2 Step Authentication is enabled for your iCloud account. The integration will ask which device you want to use as trusted device. The integration will send a prompt to that device with the code which you have to enter in Home Assistant. The duration of this authentication is determined by Apple.
2 Factor Authentication is the improved version of 2 Step Authentication, this is still not supported by the pyicloud library. Therefore it's not possible to use it yet.

4 services are available:
- **update**: This service can be used to ask an update of a certain iDevice or all devices linked to an iCloud account. Request will result in new Home Assistant [state_changed](/docs/configuration/events/#event-state_changed) event describing current iPhone location. Can be used in automations when manual location update is needed, e.g., to check if anyone is home when door's been opened.
- **play_sound**: This service will play the Lost iPhone sound on your iDevice. It will still ring if your are on "Mute" or "Do not disturb" mode.
- **display_message**: This service will display a message on your iDevice. It can also ring your device.
- **lost_device**: This service will put your iDevice on "lost" mode (compatible devices only). You have to provide a phone number with a suffixed [country code](https://en.wikipedia.org/wiki/List_of_country_calling_codes) and a message.

