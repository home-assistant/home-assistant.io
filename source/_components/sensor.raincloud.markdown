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
ha_category: Sensor
ha_release: "0.55"
ha_iot_class: "Cloud Polling"
---

To get your [Melnor RainCloud](https://wifiaquatimer.com) sensors working within Home Assistant, please follow the instructions for the general [Raincloud component](/components/raincloud).

Once you have enabled the [Raincloud component](/components/raincloud), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: raincloud
```

Configuration variables:

- **monitored_conditions** array (*Optional*): Conditions to display in the frontend. If not specified, all conditions below will be enabled by default. The following conditions can be monitored.
  - **battery**: Return the battery level the Melnor RainCloud faucet.
  - **next_cycle**: Return the next schedulle watering cycle per zone.
  - **rain_delay**: Return the number of days the automatic watering will be delayed due to raining per zone.
  - **watering_time**: Return the watering remaining minutes per zone.
