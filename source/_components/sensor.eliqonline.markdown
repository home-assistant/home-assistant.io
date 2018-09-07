---
layout: page
title: "Eliqonline"
description: "Instructions on how to integrate Eliqonline devices within Home Assistant."
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


Integrate your [ELIQ Online](http://eliq.io) smart meter information into Home Assistant. To get an [access token](https://my.eliq.io/user/settings/api) and the [Channel ID](https://my.eliq.io/user/settings/locations), log in to your account.

To enable this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: eliqonline
    access_token: ACCESS_TOKEN
    channel_id: CHANNEL_ID
```

Configuration variables:

- **access_token** (*Required*): The Access Token for your account.
- **channel_id** (*Required*): Channel ID (as integer) of your device.
- **name** (*Optional*): The name of the sensor, eg. the city.

For details please check the [API documentation](https://eliq.zendesk.com/hc/en-us/articles/115002708449-API-Eliq-Online).

