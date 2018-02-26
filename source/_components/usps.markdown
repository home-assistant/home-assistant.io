---
layout: page
title: USPS
description: "Interface USPS mail and package information to Home Assistant."
date: 2017-07-28 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: usps.png
ha_category: Hub
ha_release: 0.52
ha_iot_class: "Cloud Polling"
---

The `usps` platform allows one to track deliveries and inbound mail from the [US Postal Service (USPS)](https://www.usps.com/).
In addition to having a USPS account, you will need to complete the "Opt-In" process for packages by clicking "Get Started Now" on [this page](https://my.usps.com/mobileWeb/pages/intro/start.action). You must also "Opt-In" to [Informed Delivery](https://informeddelivery.usps.com/box/pages/intro/start.action) to see inbound mail.

To enable this component, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
usps:
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

You will see two new sensors, one for packages and one for mail and a camera to rotate through images of incoming mail for the current day.

Configuration options for the USPS component:

- **username** (*Required*): The username to access the MyUSPS service.
- **password** (*Required*): The password for the given username.
- **name** (*Optional*): Prefix for sensor names (defaults to "USPS")

<p class='note warning'>
The USPS sensor logs into the MyUSPS website to scrape package data. It does not use an API.
</p>
