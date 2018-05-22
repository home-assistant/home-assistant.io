---
layout: page
title: "FPL"
description: "Instructions for how to add FPL sensors to Home Assistant."
date: 2018-05-19 15:02
sidebar: true
comments: false
sharing: true
footer: true
logo: fpl.png
ha_category: Energy
ha_release: 0.70
ha_iot_class: "Cloud Polling"
---


The `fpl` component gets electricity usage data (both daily and monthly/next-bill) in kWh and USD from  [fpl.com](https://fpl.com).

To set it up, add the following information to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
fpl:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: Your FPL account username (normally your email).
  required: true
  type: string
password:
  description: Your FPL account password.
  required: true
  type: string
is_tou:
description: Set to `True` if you are using a "Time-Of-Use" rate plan. Most people aren't.
  required: false
  type: boolean
  default: false
scan_interval:
description: How frequently to check the API for updated information. The API can only get Yesterday's data, so don't set this much higher than a few hours.
  required: false
  type: interval
  default: 6 hours
{% endconfiguration %}

<p class='note warning'>
The FPL sensors use reverse-engineered not-intended-for-public-use APIs from fpl.com. Please do not abuse the service by setting `scan_interval` too low.
</p>
