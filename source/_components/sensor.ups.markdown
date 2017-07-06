---
layout: page
title: UPS Sensor
description: "Instructions on how to set up UPS sensors within Home Assistant."
date: 2017-02-14 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ups.png
ha_category: Sensor
ha_release: 0.39
ha_iot_class: "Cloud Polling"
---

The `ups` platform allows one to track deliveries by the [UPS](https://www.ups.com/). To use this sensor, you need a [My UPS Account](https://www.ups.com/mychoice).

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: ups
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

Configuration options for the UPS Sensor:

- **username** (*Required*): The username to access the UPS My Choice service.
- **password** (*Required*): The password for the given username.
- **name** (*Optional*): Name the sensor.
- **update_inverval** (*Optional*): Minimum time interval between updates. Default is 1 hour. Supported formats:
  - `update_interval: 'HH:MM:SS'`
  - `update_interval: 'HH:MM'`
  - Time period dictionary, e.g.:
    <pre>update_interval:
        # At least one of these must be specified:
        days: 0
        hours: 0
        minutes: 3
        seconds: 30
        milliseconds: 0
    </pre>

<p class='note warning'>
The UPS sensor logs into the UPS My Choice website to scrape package data. It does not use an API. Use at your own risk.
</p>
