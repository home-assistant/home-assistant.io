---
layout: page
title: USPS Sensor
description: "Instructions on how to set up USPS sensors within Home Assistant."
date: 2017-01-06 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: usps.png
ha_category: Sensor
ha_release: 0.36
---

The `usps` platform allows one to track deliveries by the [US Postal Service (USPS)](https://www.usps.com/).
In addition to having a USPS account, you will need to complete the "Opt-In" process by clicking "Get Started Now" on [this page](https://my.usps.com/mobileWeb/pages/intro/start.action). Currently, you also will need to have a package listed in the "Package Dashboard" in order for the component to complete set-up.

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: usps
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

Configuration options for the USPS Sensor:

- **username** (*Required*): The username to access the MyUSPS service.
- **password** (*Required*): The password for the given username.
- **name** (*Optional*): Name the sensor (default: your mailing address).
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
The USPS sensor logs into the MyUSPS website to scrape package data. It does not use an API.
</p>
