---
layout: component
title: "Eliqonline sensor"
description: "Instructions how to integrate Eliqonline devices within Home Assistant."
date: 2015-07-11 0:15
sidebar: true
comments: false
sharing: true
footer: true
logo: eliq.png
ha_category: Sensor
---


Integrate your [Eliqonline](http://eliq.se) smart meter information into Home Assistant. To get an app token, log in to your [Eliqonline](https://my.eliq.se/user/settings/api) account.

To enable this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: eliqonline
  access_token: ACCESS_TOKEN
  name: Power consumption 
  channel_id: CHANNEL_ID
```

Configuration variables:

- **access_token** (*Required*): The Access Token for your account.
- **channel_id** (*Required*): Channel ID of your device.
- **name** (*Optional*): The name of the sensor, eg. the city.

For details please check the [API documentation](https://my.eliq.se/knowledge/sv-SE/49-eliq-online/299-eliq-online-api).

