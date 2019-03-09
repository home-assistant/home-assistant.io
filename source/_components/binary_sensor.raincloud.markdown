---
layout: page
title: "Melnor Raincloud Binary Sensor"
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

To get your [Melnor RainCloud](https://wifiaquatimer.com) binary sensors working within Home Assistant, please follow the instructions for the general [Raincloud component](/components/raincloud).

## {% linkable_title Configuration %}

Once you have enabled the [Raincloud component](/components/raincloud), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: raincloud
```

{% configuration %}
monitored_conditions:
  description: Conditions to display in the frontend. The following conditions can be monitored.
  required: false
  type: list
  default: If not specified,, all conditions below will be enabled
  keys:
    is_watering:
      description: Return if is currently watering per zone.
    status:
      description: Return status from the Melnor RainCloud Controller and Melnor RainCloud Faucet.
{% endconfiguration %}
