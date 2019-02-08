---
layout: page
title: Sense
description: "Instructions on how to integrate Sense within Home Assistant."
date: 2018-10-22 22:50
sidebar: true
comments: false
sharing: true
footer: true
logo: sense.png
ha_category: Energy
ha_iot_class: "Cloud Polling"
ha_release: 0.82
redirect_from: /components/sensor.sense/
---

Integrate your [Sense](https://sense.com) meter information into Home Assistant. 

## {% linkable_title Configuration %}

To enable this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sense:
  email: CLIENT_ID
  password: CLIENT_SECRET
```

{% configuration %}
email:
  description: The email associated with your Sense account/application.
  required: true
  type: string
password:
  description: The password for your Sense account/application.
  required: true
  type: string
timeout:
  description: Seconds for timeout of API requests.
  required: false
  type: positive_int
{% endconfiguration %}

Sensors are added for both usage and production with the following names:

- **Active Usage/Production**: Current active power usage/production in Watts. Updated every 60 seconds.
- **Daily/Weekly/Monthly Usage/Production**: Daily/Weekly/Monthly power usage/production in kWh. Updated every 5 minutes.

Binary sensors are created for each of the devices detected by your Sense monitor to show their power state.
