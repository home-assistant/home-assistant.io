---
layout: page
title: "Hive"
description: "Instructions on how to integrate Hive devices with Home Assistant."
date: 2017-09-24 21:00
sidebar: true
comments: false
sharing: true
footer: true
logo: hive.png
ha_category: Hub
ha_release: 0.59
ha_iot_class: "Cloud Polling"
---


This Hive component is the main component to set up and integrate all supported Hive devices. Once configured with the minimum required details it will detect and add all your Hive devices into Home Assistant, including support for multizone heating.

This component uses the unofficial API used in the official Hive website [https://my.hivehome.com](https://my.hivehome.com), and you will need to use the same Username and Password you use on the Hive website to configure this Hive component in Home Assistant.

To add your Hive devices into your Home Assistant installation, using the default scan_interval, add the following to your 'configuration.yaml' file:

```yaml
# Example configuration.yaml entry
hive:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: Your username from [https://my.hivehome.com](https://my.hivehome.com).
  required: true
  type: string
password:
  description: Your password from [https://my.hivehome.com](https://my.hivehome.com).
  required: true
  type: string
scan_interval:
  description: The time in minutes between Hive API calls
  required: false
  type: int
  default: 2
{% endconfiguration %}


The Hive Home Assistant platform currently supports the following Hive devices:

- Hive Active Heating (including hot water and Hive Multizone)
- Hive Active Light Dimmable
- Hive Active Light Cool to Warm White
- Hive Active Light Color Changing
- Hive Active Plug
- Hive Window or Door Sensor
- Hive Motion Sensor
