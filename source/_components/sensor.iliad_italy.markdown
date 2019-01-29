---
layout: page
title: "Iliad Italy"
description: "Instructions on how to integrate Iliad Italy's data inside Home Assistant"
date: 2018-12-29 00:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Communication
logo: iliad.png
ha_iot_class: "Cloud Polling"
ha_release: 0.87
---

The `iliad_italy` sensor will give you the data from [Iliad Italy's](https://www.iliad.it/) website inside Home Assistant.

## {% linkable_title Configuration %}

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: iliad_italy
    username: USERNAME
    password: PASSWORD
```

{% configuration %}
username:
  description: The username you use to check Iliad.it.
  required: true
  type: string
password:
  description: The password you use to check Iliad.it.
  required: true
  type: string
{% endconfiguration %}

The data is coming from the [iliad.it](https://www.iliad.it/) website.
