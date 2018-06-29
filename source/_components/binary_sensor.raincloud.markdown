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
ha_category: Binary Sensor
ha_release: "0.55"
ha_iot_class: "Cloud Polling"
---

To get your [Melnor RainCloud](https://wifiaquatimer.com) binary sensors working within Home Assistant, please follow the instructions for the general [Raincloud component](/components/raincloud).

Once you have enabled the [Raincloud component](/components/raincloud), add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: raincloud
```

Configuration variables:

- **monitored_conditions** array (*Optional*): Conditions to display in the frontend. If not specified, all conditions below will be enabled by default. The following conditions can be monitored.
  - **is_watering**: Return if is currently watering per zone.
  - **status**: Return status from the Melnor RainCloud Controller and Melnor RainCloud Faucet.
