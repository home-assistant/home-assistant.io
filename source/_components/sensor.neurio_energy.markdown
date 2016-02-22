---
layout: page
title: "Neurio"
description: "Instructions how to integrate Neurio within Home Assistant."
date: 2016-02-15 21:50
sidebar: true
comments: false
sharing: true
footer: true
logo: neurio.png
ha_category: Sensor
ha_iot_class: "Cloud Polling"
---


Integrate your [Neurio](http://neur.io/) meter information into Home Assistant. To get an API key and secret, login to your Neurio account at https://my.neur.io/#settings/applications/register and register an application. Note the Homepage URL and Callback URL are optional.

To enable this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: neurio_energy
  api_key: API_KEY
  api_secret: API_SECRET
  sensor_id: "SENSOR_ID"
```

Configuration variables:

- **api_key** (*Required*): The API key for your account/application.
- **api_secret** (*Required*): The API secret for your account/application.
- **sensor_id** (*Optional*): The sensor ID will be auto-detected but can be set if you have more then one sensor.

