---
layout: page
title: "Tado"
description: "Instructions how to integrate Tado into Home Assistant."
date: 2017-01-17 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: tado.png
ha_category: Presence Detection
ha_release: 0.37
---

The `tado` device tracker is using the [Tado Smart Thermostat](https://www.tado.com/) and its support for person presence detection based on smartphone location by geofencing.

This tracker uses the Tado API to determine if a mobile device is at home. It tracks all devices in your home that Tado knows about.

To use the Tado platform in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry for Tado
device_tracker:
  - platform: tado
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    home_id: YOUR_HOME_ID
```

Configuration variables:

- **username** (*Required*): The username for your Tado account.
- **password** (*Required*): The password for your Tado account.
- **home_id** (*Optional*): The id of your home of which you want to track devices. If provided, the Tado device tracker will tack *all* devices known to Tado associated with this home. See below how to find it.

After configuration, your device has to be at home at least once before showing up as *home* or *away*.
Polling Tado API for presence information will happen at most once every 30 seconds.

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked. Beware that the Tado (v2) API does not provide GPS location of devices, only a bearing, therefore Home Assistant only uses `home`/`not-home` status.

### {% linkable_title Finding your `home_id` %}
Find your `home_id` by browsing to `https://my.tado.com/api/v2/me?username=YOUR_USERNAME&password=YOUR_PASSWORD`. There you'll see something like the following:

```json
{
  "name": "Mark",
  "email": "your@email.tld",
  "username": "your@email.tld",
  "homes": [
    {
      "id": 12345,
      "name": "Home Sweet Home"
    }
  ],
  "locale": "en_US",
  "mobileDevices": []
}
```

In this example `12345` is the `home_id` you'll need to configure.
