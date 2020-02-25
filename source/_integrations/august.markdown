---
title: August
description: Instructions on how to integrate your August devices into Home Assistant.
logo: august.png
ha_category:
  - Doorbell
  - Binary Sensor
  - Camera
  - Lock
ha_release: 0.64
ha_iot_class: Cloud Polling
---

The `august` integration allows you to integrate your [August](https://august.com/) devices in Home Assistant.

There is currently support for the following device types within Home Assistant:

- Doorbell
- Binary Sensor
- Camera
- Lock

<div class='note'>
August Lock 2nd Gen will need either August Connect or Doorbell to connect to Home Assistant.
</div>

## Configuration

You will need your August login information (username (either phone# or email), and password) to use this module.

To set it up, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
august:
  login_method: phone
  username: "+16041234567"
  password: YOUR_PASSWORD
```

{% configuration %}
login_method:
  description: Method to login to your August account, either "email" or "phone". A verification code will be sent to your email or phone during setup.
  required: true
  type: string
username:
  description: The username for accessing your August account. This depends on your login_method, if login_method is email, this will be your email of the account. Otherwise, this will be your phone number.
  required: true
  type: string
password:
  description: The password for accessing your August account.
  required: true
  type: string
timeout:
  description: Timeout to wait for connections.
  required: false
  type: integer
  default: 10
{% endconfiguration %}

Once Home Assistant is started, a configurator will pop up asking you to enter verification code that is sent to your phone number or email.

### Binary Sensor

If you have August Doorbell, once you have enabled the August component, you should see following sensors:

- Doorbell ding sensor
- Doorbell motion sensor
- Doorbell online sensor

If you have August Smart Lock with DoorSense, once you have enabled the August component, you should see the following sensors:

- Door sensor

### Camera

The `august` camera platform allows you to view the latest camera image (triggered by motion) by your [August](https://august.com/) device in Home Assistant.
