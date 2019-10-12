---
title: PostNL Sensor
description: "Instructions on how to set up PostNL sensors within Home Assistant."
logo: postnl.png
ha_category:
  - Postal Service
ha_release: 0.69
ha_iot_class: Cloud Polling
---

The `postnl` platform allows one to track deliveries, distributions and letters by [PostNL](https://www.postnl.nl) (Dutch Postal Services). To use these sensors, you need a [PostNL Account](https://jouw.postnl.nl). It is possible to add multiple accounts to your Home Assistant configuration.

The sensors value shows the number of packages to be delivered, packages you are distributing and the amount of letters you are receiving.

To be able to see your letters, you have to make sure you enabled letters within your PostNL account configuration.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
sensor:
  - platform: postnl
    username: POSTNL_USERNAME
    password: POSTNL_PASSWORD
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

<div class='note warning'>
This integration is not affiliated with PostNL and retrieves data from the endpoints of the mobile application. Use at your own risk.
</div>
