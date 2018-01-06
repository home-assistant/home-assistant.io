---
layout: page
title: "Mercedes me"
description: "Instructions on how to integrate Mercedes car with Mercedes me into Home Assistant."
date: 2018-01-06 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mercedesme.png
ha_category: Hub
ha_release: 0.61
ha_iot_class: "Cloud Polling"
---


The `Mercedes me` component offers integration with the [Mercedes me](https://www.mercedes-benz.com/de/mercedes-me/) cloud service and provides presence detection as well as sensors such as doors, tires, windows and service interval.

This component provides the following platforms:
 - Sensors - such as windows, tires, fuelStatus, service interval.
 - Device tracker - to track location of your car

To use Mercedes me in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
mercedesme:
  username: email
  password: password
```

Configuration variables:

- **username** (*Required*): The email address associated with your Mercedes me account.
- **password** (*Required*): The password for your given Mercedes me account.
- **scan_interval** (*Optional*): API polling interval. Minimal value can't be less then 300. (Defaults 300)
