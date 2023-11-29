---
title: Efergy
description: Instructions on how to integrate Efergy devices within Home Assistant.
ha_category:
  - Energy
ha_release: pre 0.7
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_domain: efergy
ha_platforms:
  - sensor
ha_codeowners:
  - '@tkdrob'
ha_integration_type: hub
---

Integrate your [Efergy](https://efergy.com) meter information into Home Assistant.

{% include integrations/config_flow.md %}

## Setup

To get an app token:

1. Log in to your Efergy account
2. Go to the Settings page
3. Click on App tokens
4. Click "Add token"

## Integration entities

The following sensors will be created:

- **Power Usage**: Shows the aggregate instant value of power consumption. An entity will also be created for each sensor attached to the household. If only one sensor is detected, it will be disabled by default.
- **Daily Consumption**: Shows the current day's energy consumption. (disabled by default)
- **Weekly Consumption**: Shows the current week's energy consumption. (disabled by default)
- **Monthly Consumption**: Shows the current month's energy consumption.
- **Yearly Consumption**: Shows the current year's energy consumption. (disabled by default)
- **Energy Budget**: Shows the current status of the budget set for the month.
- **Daily Cost**: Shows the current day's cost of consumption. (disabled by default)
- **Weekly Cost**: Shows the current week's cost of consumption. (disabled by default)
- **Monthly Cost**: Shows the current month's cost of consumption.
- **Yearly Cost**: Shows the current year's cost of consumption. (disabled by default)
