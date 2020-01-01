---
title: "Ezviz Camera"
description: "Integrate Ezviz camera within Home Assistant."
logo: ezviz.png
ha_release: 0.103.0
ha_category:
  - Camera
ha_iot_class: Cloud Polling
---

The `ezviz` sensor platform uses the EzvizLife API to interact with the devices.
It also exposes an RTSP stream, by using the local camera IPs (so the device hosting home assistant has to be able to access the local IP of the cameras).

As there is no official documentation for the API, the component retrieves data from the API used in the Ezviz mobile app, [hosted here](https://apiieu.ezvizlife.com).

## Configuration

The configuration (see below) needs your Ezviz username & password you use within the Ezviz mobile application.

Next, add the Ezviz camera to your `configuration.yaml` file like below:

```yaml
# Example configuration.yaml entry
camera:
  - platform: ezviz
    username: 'user@mail.com'
    password: 'your_password_here'
    cameras:
      D12345678:
        username: admin
        password: ABCDEF
      D87654321:
        username: admin
        password: ABCDEF
```

As you see, here is the way to describe the camera credentials.
The password for each camera is usually written underneath the device, near the QR code. It is also code "verification code".

{% configuration %}
username:
  description: The Ezviz account username.
  required: true
  type: string
password:
  description: The Ezviz account password.
  required: true
  type: string
cameras:
  description: A list of cameras
  required: false
  type: string
  serial:
    description: The Ezviz camera Serial, usually a letter followed by 8 digits.
    required: true
    type: string
    username:
      description: The Ezviz camera RTSP username.
      required: true
      type: string
    password:
      description: The Ezviz verification code.
      required: true
      type: string
{% endconfiguration %}
