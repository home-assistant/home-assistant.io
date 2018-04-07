---
layout: page
title: "Sigfox Sensor"
description: "Display messages from Sigfox devices in Home Assistant."
date: 2018-04-07 12:10
sidebar: true
comments: false
sharing: true
footer: true
logo: file.png
ha_category: Sensor
ha_iot_class: "Local Polling"
ha_release: 0.68
---


[SigFox](https://www.sigfox.com/en) component adding a sensor for each Sigfox device registered with your account. The name of sensors is `sigfox_{DEVICE_ID}` where `DEVICE_ID` is the devices Sigfox ID. The state of an added Sigfox sensor is the payload of the last message published by that device. Additionally there are attributes for the latitude and longitude coordinates of the device, as well as the signal-to-noise ratio ( [snr](https://en.wikipedia.org/wiki/Signal-to-noise_ratio)).

```yaml
# Example configuration.yaml entry
sensor:
  - platform: sigfox
    api_login: your_api_login
    api_password: your_api_password
```

Configuration variables:

- **api_login** (*Required*): Your Sigfox API login.
- **api_password** (*Required*): Your Sigfox API password.

Note that `your_api_login` and `your_api_password` are your **API access credentials** which can be accessed by following:

1. Log into [Sigfox backend](https://backend.sigfox.com)
2. Select `GROUP`
4. Select `API ACCESS`
5. Click on `new` and create new access entry
