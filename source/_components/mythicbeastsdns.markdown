---
layout: page
title: "Mythic Beasts DNS"
description: "Keep your mythic beasts DNS updated"
date: 2018-11-09 14:57
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Network
ha_release: 0.85
ha_iot_class: "Cloud Push"
logo: mythic_beasts.png
---

With the `mythicbeastsdns` component you can automatically update your dynamic DNS entry at [Mythic Beasts](https://www.mythic-beasts.com/).

## {% linkable_title Configuration %}

To use the component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
mythicbeastsdns:
  host: YOUR_HOST
  domain: YOUR_DOMAIN
  password: YOUR_API_KEY
```

{% configuration %}
  host:
    description: The first part, or subdomain that you want to be dynamic.
    required: true
    type: string
  domain:
    description: Your domain, e.g., `example.com`.
    required: true
    type: string
  password:
    description: The password for your domain. You can set this by clicking "DNS API" on the domain page.
    required: true
    type: string
{% endconfiguration %}
