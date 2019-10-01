---
title: "iCloud"
description: "Instructions on how to use iCloud to track devices in Home Assistant."
logo: icloud.png
ha_category:
  - Presence Detection
ha_release: "0.10"
---


The `icloud` platform allows you to detect presence using the [iCloud](https://www.icloud.com/) service. iCloud allows users to track their location on iOS devices.

It does require that your device is registered with "Find My iPhone".

To integrate iCloud in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: icloud
    username: USERNAME
    password: PASSWORD
    account_name: accountname
```

{% configuration %}
username:
  description: The username for the iCloud account.
  required: true
  type: string
password:
  description: The password for your given username.
  required: true
  type: string
account_name:
  description: The friendly name for the account_name. If this isn't given, it will use the account_name of the username (so the part before the `@` in the email address).
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
  default: 1000
  type: integer
{% endconfiguration %}

<div class='note warning'>

Low `max_interval` may cause battery drainage as it wakes up your device to get the current location.

</div>

<div class='note warning'>
You may receive an email from Apple stating that someone has logged into your account.
</div>

To disable the drainage of the battery, a dynamic interval is being used for each individual device instead of a fixed interval for all devices linked to one account. The dynamic interval is based on the current zone of a device, the distance towards home and the battery level of the device.

If 2 Step Authentication is enabled for your iCloud account. The integration will ask which device you want to use as Trusted Device and integration will send a prompt to that device with the code which you can enter in Home Assistant. The duration of this authentication is determined by Apple, but is now at 2 months, so you will only need to verify your account each two months.
2 Factor Authentication is the improved version of 2 Step Authentication, this is still not supported by the pyicloud library. Therefore it's not possible to use it with the device_tracker yet.

4 services are available for this component:
- **icloud_update**: This service can be used to ask for an update of a certain iDevice. The `account_name` and `device_name` are optional. Request will result in new Home Assistant [state_changed](/docs/configuration/events/#event-state_changed) event describing current iphone location. Can be used in automations when manual location update is needed, e.g., to check if anyone is home when door's been opened.
- **icloud_lost_iphone**: This service will play the Lost iPhone sound on a certain iDevice. The `account_name` and `device_name` are optional.
- **icloud_set_interval**: This service will change the dynamic interval of an iDevice. The `account_name` and `device_name` are optional. If `interval` is used in the service_data, the iDevice will be updated with that new interval. That interval will be fixed until the iDevice changes zone or if this service is called again. If `interval` isn't used in the service_data, the interval for that iDevice will revert back to its default dynamic interval based on its current zone, its distance towards home and its battery level.
- **icloud_reset_account**: This service can be used to reset an iCloud account. This is helpful when not all devices are found by the integration or if you have added a new iDevice to your account. The `account_name` is optional.
