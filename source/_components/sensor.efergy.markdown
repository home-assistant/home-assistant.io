---
layout: page
title: "Efergy"
description: "Instructions how to integrate Efergy devices within Home Assistant."
date: 2015-07-11 0:15
sidebar: true
comments: false
sharing: true
footer: true
logo: efergy.png
ha_category: Sensor
---


Integrate your [Efergy](https://efergy.com) meter information into Home Assistant. To get an app token, log in to your efergy account, go to the Settings page, click on App tokens, and click "Add token".

```yaml
# Example configuration.yaml entry
sensor:
  platform: efergy
  app_token: APP_TOKEN
  utc_offset: UTC_OFFSET
  monitored_variables:
    - type: instant_readings
    - type: budget
    - type: cost
      period: day
      currency: $
```

Configuration variables:

- **app_token** (*Required*): The App Token for your account.
- **utc_offset** (*Required*): Some variables (currently only the daily_cost) require that the
negative number of minutes your timezone is ahead/behind UTC time.
- **monitored_variables** array (*Required*): Variables to monitor.
  - **type** (*Required*): Name of the variable.
  - **period** (*Optional*): Some variables take a period argument. Valid options are "day", "week", "month", and "year".
  - **currency** (*Optional*): This is used to display the cost/period as the unit when monitoring the cost. It should correspond to the actual currency used in your dashboard.

