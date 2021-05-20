---
title: Efergy
description: Instructions on how to integrate Efergy devices within Home Assistant.
ha_category:
  - Energy
ha_release: pre 0.7
ha_iot_class: Cloud Polling
ha_domain: efergy
ha_platforms:
  - sensor
---

Integrate your [Efergy](https://efergy.com) meter information into Home Assistant.

## Setup

To get an app token:

1. Log in to your Efergy account
2. Go to the Settings page
3. Click on App tokens
4. Click "Add token"

## Configuration

To enable the sensor, add the following lines to your `configuration.yaml`:

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

{% configuration %}
app_token:
  description: The App Token for your account.
  required: true
  type: string
utc_offset:
  description: Some variables (currently only the daily_cost) require that the negative number of minutes your timezone is ahead/behind UTC time.
  required: false
  default: 0
  type: string
monitored_variables:
  description: Variables to monitor.
  required: true
  type: list
  keys:
    type:
      description: Name of the variable.
      required: true
      type: list
      keys:
        instant_readings:
          description: Instant energy consumption.
        budget:
          description: Monthly budget.
        cost:
          description: The cost for energy consumption (with the tariff that has been set in Efergy) over a given period.
        amount:
          description: The amount of energy consumed over a given period.
        current_values:
          description: This returns the current energy usage of each device on your account. If you only have one device in your account, this is effectively the same as `instant_readings`.
    period:
      description: Some variables take a period argument. Valid options are "day", "week", "month", and "year".
      required: false
      default: year
      type: string
    currency:
      description: This is used to display the cost/period as the unit when monitoring the cost. It should correspond to the actual currency used in your dashboard.
      required: false
      type: string
{% endconfiguration %}
