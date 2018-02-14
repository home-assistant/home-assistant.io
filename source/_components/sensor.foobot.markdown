---
layout: page
title: "Foobot Air Quality Monitor"
description: "Instructions how to setup Foobot Air Quality sensor in Home Assistant."
date: 2018-02-14 06:00
sidebar: true
comments: false
sharing: true
footer: true
logo: foobot.png
ha_category: Health
ha_release: 0.64
ha_iot_class: "Cloud Polling"
---

The `foobot` sensor platform will fetch air quality data from your or yours [Foobot device(s)](https://foobot.io/features/).

This sensor requires an API token. Please obtain one at [Foobot API site](https://api.foobot.io/apidoc/index.html).

To enable this sensor, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: foobot
    token: FOOBOT_SECRET_KEY
    username: FOOBOT_USERNAME
```

Configuration variables:

- **token** (*Required*): The token for the Foobot API.
- **username** (*Required*): Your username, used to fetch devices associated with an account.

Data:

Every ten minutes, it'll fetch the last ten minutes average of the following measurements:

  * Temperature
  * Humidity
  * Co2
  * VOC
  * PM2.5
  * [Index](https://help.foobot.io/hc/en-us/articles/204814371-What-does-central-number-mean-)
