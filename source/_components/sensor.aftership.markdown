---
layout: page
title: AfterShip Sensor
description: "Instructions on how to set up AfterShip sensors within Home Assistant."
date: 2018-11-24 01:00
sidebar: true
comments: false
sharing: true
footer: true
logo: aftership.png
ha_category: Postal Service
ha_release: 0.85
ha_iot_class: "Cloud Polling"
---

The `aftership` platform allows one to track deliveries by [AfterShip](https://www.aftership.com), a service that supports 490+ couriers worldwide. It is free to use up to 100 tracked packages per month, after that there is a fee.

The sensor value shows the number of packages that are not in `Delivered` state. As attributes are the number of packages per status.

## {% linkable_title Setup %}

To use this sensor, you need an [AfterShip Account](https://accounts.aftership.com/register) and set up an API Key. To set up an API Key go to [AfterShip API](https://secure.aftership.com/#/settings/api) page, and copy existing key or generate a new one.

<p class='note info'>
AfterShip recently started requiring having a credit card on file even if you are only using the free plan. That does not change the functionality of the platform, just something to be aware of.
</p>

## {% linkable_title Configuration %}

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
sensor:
  - platform: aftership
    api_key: AFTERSHIP_APIKEY
```

{% configuration %}
name:
  description: The sensor name to use in the frontend.
  required: false
  default: "aftership"
  type: string
api_key:
  description: The API key for AfterShip.
  required: true
  type: string
{% endconfiguration %}

<p class='note info'>
This component retrieves data from AfterShip public REST API, but the component is not affiliated with AfterShip.
</p>
