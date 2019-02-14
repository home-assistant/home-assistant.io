---
layout: page
title: "Daikin AC"
description: "Instructions on how to integrate Hive devices with Home Assistant."
date: 2017-12-10 21:00
sidebar: true
comments: false
sharing: true
footer: true
logo: daikin.png
ha_category: Climate
ha_release: 0.59
ha_iot_class: "Local Polling"
---

The `daikin` component integrates Daikin air conditioning systems into Home Assistant.

## {% linkable_title Supported hardware %}

**Only** the European versions of Daikin AC (models BRP069A41, 42, 43, 45).

Some models do not support setting of fan speed or fan swing mode.

Please note that some AC devices may report outside temperature only when they are turned on.

## {% linkable_title Configuration %}

To automatically add all your Daikin devices (ACs and associated sensors) into your Home Assistant installation, add the following to your `configuration.yaml` file:

```yaml
# Full manual example configuration.yaml entry
daikin:
  hosts:
    - 192.168.4.161
```

{% configuration %}
hosts:
  description: List of IP addresses or hostnames.
  required: false
  default: All discovered hosts
  type: list     
{% endconfiguration %}
