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

The `usps` platform allows one to track deliveries and inbound mail from the [US Postal Service (USPS)](https://www.usps.com/).
In addition to having a USPS account, you will need to complete the "Opt-In" process by clicking "Get Started Now" on [this page](https://my.usps.com/mobileWeb/pages/intro/start.action). You must also "Opt-In" to [Informed Delivery](https://informeddelivery.usps.com/box/pages/intro/start.action) to see inbound mail.

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: usps
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

You will see two new sensors, one for packages and one for mail.

Configuration options for the USPS Sensor:

- **username** (*Required*): The username to access the MyUSPS service.
- **password** (*Required*): The password for the given username.
- **name** (*Optional*): Prefix for sensor names (defaults to "USPS")

<p class='note warning'>
The USPS sensor logs into the MyUSPS website to scrape package data. It does not use an API.
</p>
