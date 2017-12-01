---
layout: page
title: "Plum Lightpad Light Switch"
description: "Instructions how to integrate Plum Lightpads into Home Assistant."
date: 2017-11-20 00:45
sidebar: true
comments: false
sharing: true
footer: true
logo: plum-lightpad.png
ha_category: Light
ha_iot_class: "Local Push"
ha_release: 0.59
---

The `plum_lightpad` platform allows you to control your [Plum Lightpad](https://plumlife.com/product/plum-lightpad/) light switches from within Home Assistant.

To add a light switch, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml
light:
  - platform: plum_lightpad
    username: YOUR PLUM USERNAME
    password: YOUR PLUM PASSWORD
```

{% configuration %}
username: 
  description: The user name used to login to the Plum app
  required: true
  type: string
password:
  description: The password used to login to the Plum app
  required: true
  type: string
{% endconfiguration %}