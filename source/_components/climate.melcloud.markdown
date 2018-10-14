---
layout: page
title: "MelCloud"
description: "Instructions on how to integrate MelCloud supported Mitsubishi AC with Home Assistant."
date: 2018-10-14 15:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mitsubishi.png
ha_category: Climate
ha_release: 0.81
ha_iot_class: "Local Polling"
---

The `MelCloud` climate platform integrates Mitsubishi air conditioning systems into Home Assistant, enabling control of setting the following parameters:

- **mode** (cool, heat, dry, fan only or auto)
- **fan speed** (on supported models)
- **target temperature**
- **swing mode**

Current temperature is displayed.

## {% linkable_title Configuration %}

To enable the platform, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
climate:
  - platform: melcloud
    login: YOUR@EMAIL.COM
    password: YOUR_PASSWORD
```

{% configuration %}
login:
  description: Login used on https://app.melcloud.com/ website
  required: true
  type: string
password:
  description: Password used on https://app.melcloud.com/ website
  required: true
  type: string
{% endconfiguration %}

