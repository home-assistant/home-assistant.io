---
title: Sigfox
description: Display messages from Sigfox devices in Home Assistant.
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.68
ha_domain: sigfox
ha_platforms:
  - sensor
---

[SigFox](https://www.sigfox.com/en) integration adding a sensor for each Sigfox device registered with your account. The default name of sensors is `sigfox_{DEVICE_ID}` where `DEVICE_ID` is the devices Sigfox ID. The state of an added Sigfox sensor is the payload of the last message published by that device. Additionally, there are attributes for the latitude and longitude coordinates of the device, as well as the signal-to-noise ratio ([snr](https://en.wikipedia.org/wiki/Signal-to-noise_ratio)).

## Setup

Note that `your_api_login` and `your_api_password` are your **API access credentials** which can be accessed by following:

1. Log into [Sigfox backend](https://backend.sigfox.com)
1. Select `GROUP`
1. Select `API ACCESS`
1. Click on `new` and create new access entry

## Configuration

To use this sensor, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: sigfox
    api_login: your_api_login
    api_password: your_api_password
```

{% configuration %}
api_login:
  description: Your Sigfox API login.
  required: true
  type: string
api_password:
  description: Your Sigfox API password.
  required: true
  type: string
name:
  description: The name to prepend to the device ID.
  required: false
  default: "sigfox"
  type: string
{% endconfiguration %}
