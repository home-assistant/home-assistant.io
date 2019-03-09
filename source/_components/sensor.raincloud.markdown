---
layout: page
title: "Melnor Raincloud Sensor"
description: "Instructions on how to integrate your Melnor Raincloud sprinkler system within Home Assistant."
date: 2017-09-04 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: raincloud.jpg
ha_category: Irrigation
ha_release: "0.55"
ha_iot_class: "Cloud Polling"
---

To get your [Melnor RainCloud](https://wifiaquatimer.com) sensors working within Home Assistant, please follow the instructions for the general [Raincloud component](/components/raincloud).

## {% linkable_title Configuration %}

Once you have enabled the [Raincloud component](/components/raincloud), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: raincloud
```

{% configuration %}
monitored_conditions:
  description: Conditions to display in the frontend. The following conditions can be monitored.
  required: false
  default: If not specified, all conditions below will be enabled.
  type: list
  keys:
    battery:
      description: Return the battery level the Melnor RainCloud faucet.
    next_cycle:
      description: Return the next schedulle watering cycle per zone.
    rain_delay:
      description: Return the number of days the automatic watering will be delayed due to raining per zone.
    watering_time:
      description: Return the watering remaining minutes per zone.
{% endconfiguration %}
