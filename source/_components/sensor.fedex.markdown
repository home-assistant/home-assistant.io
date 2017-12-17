---
layout: page
title: Fedex Sensor
description: "Instructions on how to set up FedEx sensors within Home Assistant."
date: 2017-02-14 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: fedex.png
ha_category: Sensor
ha_release: 0.39
ha_iot_class: "Cloud Polling"
---

The `fedex` platform allows one to track deliveries by [FedEx](http://www.fedex.com/). To use this sensor, you need a [FedEx Delivery Manager](https://www.fedex.com/us/delivery/) account.

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: fedex
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

Configuration options for the FedEx Sensor:

- **username** (*Required*): The username to access the FedEx Delivery Manager service.
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
The FedEx sensor logs into the FedEx Delivery Manager website to scrape package data. It does not use an API. Use at your own risk.
</p>
