---
layout: page
title: "Eliqonline"
description: "Instructions how to integrate Eliqonline devices within Home Assistant."
date: 2015-07-11 0:15
sidebar: true
comments: false
sharing: true
footer: true
logo: eliq.png
ha_category: Energy
ha_release: "0.10"
ha_iot_class: "Cloud Polling"
---


Integrate your [ELIQ Online](http://eliq.se) smart meter information into Home Assistant. To get an [access token](https://my.eliq.se/user/settings/api) and the [Channel ID](https://my.eliq.se/user/settings/data), log in to your account.

To enable this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: eliqonline
    access_token: ACCESS_TOKEN
```

Configuration variables:

- **access_token** (*Required*): The Access Token for your account.
- **channel_id** (*Required*): Channel ID (as integer) of your device.
- **name** (*Optional*): The name of the sensor, eg. the city.

For details please check the [API documentation](https://my.eliq.se/knowledge/sv-SE/49-eliq-online/299-eliq-online-api).

