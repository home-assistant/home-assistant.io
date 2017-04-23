---
layout: page
title: "Hydro-Québec"
description: "Instructions how to integrate Hydro-Québec consumption profile within Home Assistant."
date: 2016-12-10 0:15
sidebar: true
comments: false
sharing: true
footer: true
logo: hydroquebec.svg
ha_category: Energy
ha_release: 0.35
ha_iot_class: "Cloud Polling"
---


Integrate your [Hydro-Québec](https://www.hydroquebec.com/portail/) consumption profile information into Home Assistant.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: hydroquebec
    username: MYUSERNAME
    password: MYPASSWORD
    monitored_variables:
     - period_total_bill
     - period_length
     - period_total_days
     - period_mean_daily_bill
     - period_mean_daily_consumption
     - period_total_consumption
     - period_lower_price_consumption
     - period_higher_price_consumption
     - yesterday_total_consumption
     - yesterday_lower_price_consumption
     - yesterday_higher_price_consumption
```

Configuration variables:

- **username** (*Required*): The App Token for your account.
- **password** (*Required*): The App Token for your account.
- **monitored_variables** array (*Required*): Variables to monitor.
  - **period_total_bill** : Current period bill
  - **period_length**: Current period length
  - **period_total_days**: Total number of days in this period
  - **period_mean_daily_bill**: Period daily average bill
  - **period_mean_daily_consumption**: Period daily average consumption
  - **period_total_consumption**: Total Consumption
  - **period_lower_price_consumption**: Period Lower price consumption
  - **period_higher_price_consumption**: Period Higher price consumption
  - **yesterday_total_consumption**: Yesterday total consumption
  - **yesterday_lower_price_consumption**: Yesterday lower price consumption
  - **yesterday_higher_price_consumption**: Yesterday higher price consumption
