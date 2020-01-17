---
title: PostNL
description: Instructions on how to set up PostNL sensors within Home Assistant.
logo: postnl.png
ha_category:
  - Postal Service
ha_release: 0.69
ha_iot_class: Cloud Polling
---

The `postnl` platform allows one to track deliveries by [PostNL](https://www.postnl.nl) (Dutch Postal Services). To use this sensor, you need a [PostNL Account](https://jouw.postnl.nl). It is possible to add multiple accounts to your Home Assistant configuration.

The sensor value shows the number of packages to be delivered. The packages are available in the shipments attribute.

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
