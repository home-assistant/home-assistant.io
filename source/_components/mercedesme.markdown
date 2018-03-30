---
layout: page
title: "Mercedes me"
description: "Instructions on how to integrate Mercedes car with Mercedes me into Home Assistant."
date: 2018-01-27 17:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mercedesme.png
ha_category: Hub
ha_release: 0.63
ha_iot_class: "Cloud Polling"
---


The `mercedesme` component offers integration with the [Mercedes me](https://www.mercedes-benz.com/de/mercedes-me/) cloud service and provides presence detection as well as sensors such as doors, tires, windows, and service interval.

This component provides the following platforms:

 - Binary Sensors: Windows, tires, doors and lock.
 - Sensors:Fuel status, service interval, remaining km, etc.
 - Device tracker: To track location of your car.

<p class='note warning'>
  The component can integrate cars from European and African markets only.
</p>

To use Mercedes me in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
mercedesme:
  username: YOUR_E_MAIL_ADDRESS
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: The email address associated with your Mercedes me account.
  required: true
  type: string
password:
  description: The password for your given Mercedes me account.
  required: true
  type: string
{% endconfiguration %}

<p class='note'>
The requirement `lxml` has to be [installed](http://lxml.de/installation.html) manually `pip install lxml` on some devices.
</p>
