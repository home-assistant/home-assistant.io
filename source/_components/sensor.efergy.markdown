---
layout: page
title: "Efergy"
description: "Instructions on how to integrate Efergy devices within Home Assistant."
date: 2015-07-11 0:15
sidebar: true
comments: false
sharing: true
footer: true
logo: efergy.png
ha_category: Energy
ha_release: pre 0.7
ha_iot_class: "Cloud Polling"
---


Integrate your [Efergy](https://efergy.com) meter information into Home Assistant. To get an app token:

1. Log in to your efergy account

2. Go to the Settings page

3. Click on App tokens

4. Click "Add token"

```yaml
# Example configuration.yaml entry
sensor:
  - platform: efergy
    app_token: APP_TOKEN
    utc_offset: UTC_OFFSET
    monitored_variables:
      - type: instant_readings
      - type: budget
      - type: cost
        period: day
        currency: $
      - type: amount
        period: day
      - type: current_values
```

Configuration variables:

- **app_token** (*Required*): The App Token for your account.
- **utc_offset** (*Required*): Some variables (currently only the daily_cost) require that the
negative number of minutes your timezone is ahead/behind UTC time.
- **monitored_variables** array (*Required*): Variables to monitor.
  - **type** (*Required*): Name of the variable.
      - **instant_readings**: Instant energy consumption.
      - **budget**: Monthly budget.
      - **cost**: The cost for energy consumption (with the tariff that has been set in Efergy) over a given period.
      - **amount**: The amount of energy consumed over a given period.
      - **current_values**: This returns the current energy usage of each device on your account, as efergy_\<sid of device\>.  If you only have one device in your account, this is effectively the same as instant_readings.
  - **period** (*Optional*): Some variables take a period argument. Valid options are "day", "week", "month", and "year".
  - **currency** (*Optional*): This is used to display the cost/period as the unit when monitoring the cost. It should correspond to the actual currency used in your dashboard.

