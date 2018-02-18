---
layout: page
title: "Whois Sensor"
description: "Instructions on how to integrate WHOIS lookup sensor within Home Assistant."
date: 2017-10-22 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: icann.png
ha_category: Sensor
ha_release: "0.57"
ha_iot_class: "Cloud Polling"
---


`whois` sensor allows you to perform daily WHOIS lookups against your owned domains. This provides you with information such as `expiration_date`, `name_servers`, and `registrar` details.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: whois
    domain: example.net
    name: primary
```

{% configuration %}
  domain:
    description: The domain you want to perform WHOIS lookups against.
    required: true
    type: string
  name:
    description: Name to use in the frontend.
    required: false
    default: Whois
    type: string
{% endconfiguration %}

