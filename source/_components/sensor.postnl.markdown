---
layout: page
title: PostNL Sensor
description: "Instructions on how to set up PostNL sensors within Home Assistant."
date: 2017-04-22 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: postnl.png
ha_category: Sensor
ha_release: 0.68
ha_iot_class: "Cloud Polling"
---

The `postnl` platform allows one to track deliveries by [PostNL](https://www.postnl.nl) (Dutch Postal Services). To use this sensor, you need a [PostNL Account](https://jouw.postnl.nl). It is possible to add multiple accounts to your Home Assistant configuration.

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
{% raw %}
sensors:
  - platform: postnl
    name: SENSOR_NAME
    username: POSTNL_USERNAME
    password: POSTNL_PASSWORD
{% endraw %}
```

{% configuration %}
name:
  description: Sensor name
  required: false
  default: "postnl"
  type: string
username:
  description: Account username of jouw.postnl.nl
  required: true
  type: string
password:
  description: Account password of jouw.postnl.nl
  required: true
  type: string
{% endconfiguration %}

<p class='note warning'>
This component is not affiliated with PostNL and retrieves date from the endpoints of the mobile application. Use at your own risk.
</p>
