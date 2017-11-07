---
layout: page
title: "Melnor Raincloud"
description: "Instructions on how to integrate your Melnor Raincloud sprinkler system within Home Assistant."
date: 2017-09-04 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: raincloud.jpg
ha_category: Hub
ha_release: 0.55
---

The `raincloud` component allows you to integrate your [Melnor RainCloud](https://wifiaquatimer.com) sprinkler system in Home Assistant.

To enable it, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry

raincloud:
  username: you@example.com
  password: secret
```

Configuration variables:

- **username** (*Required*): The username for accessing your Melnor RainCloud account.
- **password** (*Required*): The password for accessing your Melnor RainCloud account.
- **scan_interval** (*Optional*): Defines the update interval of the sensor in seconds. Defaults to 20seconds.

Finish its configuration by visiting the [Raincloud binary sensor](/components/binary_sensor.raincloud/), [Raincloud sensor](/components/sensor.raincloud/) and [Raincloud switch](/components/switch.raincloud/) documentation.
