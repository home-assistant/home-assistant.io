---
layout: page
title: "Hydro-Québec"
description: "Instructions on how to integrate Hydro-Québec consumption profile within Home Assistant."
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

<p class='note warning'>
Breaking change: Since Home Assistant v0.40,
**contract** attribute is required.
</p>

```yaml
# Example configuration.yaml entry
sensor:
  - platform: hydroquebec
    username: MYUSERNAME
    password: MYPASSWORD
    contract: '123456789'
    monitored_variables:
     - period_total_bill
     - period_length
     - period_total_days
```

Configuration variables:

- **username** (*Required*): Username used to log into the Hydro-Québec site.
- **password** (*Required*): Password used to log into the Hydro-Québec site.
- **contract** (required since HA 4.0) Your contract number with Hydro-Québec
- **monitored_variables** array (*Required*): Variables to monitor.
  - **balance** : Current balance
  - **period_total_bill** : Current period bill
  - **period_length**: Current period length
  - **period_total_days**: Total number of days in this period
  - **period_mean_daily_bill**: Period daily average bill
  - **period_mean_daily_consumption**: Period daily average consumption
  - **period_total_consumption**: Total Consumption
  - **period_lower_price_consumption**: Period Lower price consumption
  - **period_higher_price_consumption**: Period Higher price consumption
  - **period_average_temperature**: Period Average temperature
  - **yesterday_total_consumption**: Yesterday total consumption
  - **yesterday_lower_price_consumption**: Yesterday lower price consumption
  - **yesterday_higher_price_consumption**: Yesterday higher price consumption
  - **yesterday_average_temperature**: Yesterday Average temperature

To find your contract id, go to the [Hydro-Québec website](https://www.hydroquebec.com/portail/)
and connect to your account.
On the main page your can see your contract IDs.
It should be something like: "Contract 1234 56789".
You just have to keep numbers and remove the space.

<p class='note warning'>
Multi contracts accounts are supported only from Home Assistant v0.40.
</p>
