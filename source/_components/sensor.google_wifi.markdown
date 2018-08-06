---
layout: page
title: "Google Wifi"
description: "Instructions on how to integrate Google Wifi/OnHub routers into Home Assistant."
date: 2017-07-15 21:22
sidebar: true
comments: false
sharing: true
footer: true
ha_category: System Monitor
logo: google_wifi.png
ha_iot_class: "Local Polling"
ha_release: "0.50"
---


The `google_wifi` sensor platform is displaying the exposed status of a [Google Wifi](https://madeby.google.com/wifi/) (or OnHub) router.

The sensor is able to report network status, up-time, current IP address, and firmware versions.

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: google_wifi
```

Configuration variables:

- **host** (*Optional*): The address to retrieve status from the router. Defaults to `testwifi.here` (other options include `onhub.here` and your router's IP such as `192.168.86.1`).
- **name** (*Optional*): Name to give the Google Wifi sensor. Defaults to `google_wifi`.
- **monitored_conditions** array (*Optional*): Defines the data to monitor as sensors. Defaults to all of the listed options below.
  - **current_version**: Current firmware version of the router.
  - **new_version**: Latest available firmware version. If router is up-to-date, this value defaults to `Latest`.
  - **uptime**: Days since router has been turned on.
  - **last_restart**: Date of last restart. Format is `YYYY-MM-DD HH:mm:SS`.
  - **local_ip**: Local public IP address.
  - **status**: Reports whether the router is or is not connected to the internet.

