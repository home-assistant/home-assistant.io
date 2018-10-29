---
layout: page
title: "Mill heater"
description: "Instructions on how to integrate Mill heater into Home Assistant."
date: 2018-10-10 15:00 +0200
sidebar: true
comments: false
sharing: true
footer: true
logo: mill.png
ha_category: Climate
ha_release: 0.81
ha_iot_class: "Cloud Polling"
---

Integrates Mill heater into Home Assistant.


To enable this platform, add the following lines to your `configuration.yaml` file:

```yaml
climate:
  - platform: mill
    username: email@gmail.com
    password: pswd
```

{% configuration %}
username:
  description: Your registered Mill email.
  required: true
  type: string
password:
  description: Your Mill password.
  required: true
  type: string 
{% endconfiguration %}
