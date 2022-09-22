---
title: Tibber
description: Instructions on how to integrate Tibber within Home Assistant.
ha_category:
  - Energy
  - Notifications
  - Sensor
ha_release: 0.8
ha_iot_class: Cloud Polling
ha_quality_scale: silver
ha_codeowners:
  - '@danielhiversen'
ha_domain: tibber
ha_config_flow: true
ha_platforms:
  - diagnostics
  - notify
  - sensor
ha_integration_type: integration
---

The `tibber` integration provides a sensor with the current electricity price if you are a [Tibber](https://tibber.com/) customer.
If you have a [Tibber Pulse](https://norge.tibber.com/products/pulse/) or [Watty](https://tibber.com/se/store/produkt/watty-smart-energimatare) it will also show the electricity consumption in real-time. You get a sensor for monthly consumption, monthly cost, and monthly peak hour. If you do have a real-time meter it is updated once every hour, otherwise it is updated once per day. Statistics with hourly consumption and cost data is generated that can be used in the [Energy Dashboard](/docs/energy/) (the ids are `tibber:energy_consumption_HOMEID` and `tibber:energy_totalcost_HOMEID`). If you produce energy there are also statistics with hourly production and profit data generated which can also be used there (the ids are `tibber:energy_production_HOMEID` and `tibber:energy_profit_HOMEID`).

There is currently support for the following device types within Home Assistant:

- [Notifications](#notifications)
- [Sensor](#sensor)

## Setup

Go to [developer.tibber.com/settings/accesstoken](https://developer.tibber.com/settings/accesstoken) to get your API token.

{% include integrations/config_flow.md %}

## Notifications

Tibber can send a notification by calling the [`notify` service](/integrations/notify/). It will send a notification to all devices registered in the Tibber account.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

### Send message

```yaml
action:
  service: notify.tibber
  data:
    title: Your title
    message: This is a message for you!
```

## Sensor

The `tibber` sensor provides the current electricity price if you are a [Tibber](https://tibber.com/) customer.
You also get sensors for monthly consumption, monthly cost, and monthly peak hour
If you have a Tibber Pulse it will also show the electricity consumption in real time.


## Available Sensors

|Sensor Name:|Value:|Comment:|
| --------------- | --------------- | --------------- |
|sensor.accumulated_cost_HOMEID|Accumulated cost since midnight (requires active Tibber power deal)|
|sensor.accumulated_consumption_HOMEID|kWh consumed since midnight|
|sensor.accumulated_production_HOMEID|net kWh produced since midnight|
|sensor.accumulated_production_current_hour_HOMEID|net kWh produced since last hour shift|
|sensor.current_l1_HOMEID|Current on L1; on Kaifa and Aidon meters the value is not part of every HAN data frame therefore the value is null at timestamps with second value other than 0, 10, 20, 30, 40, 50. There can be other deviations based on concrete meter firmware.|
|sensor.current_l2_HOMEID|Current on L2; on Kaifa and Aidon meters the value is not part of every HAN data frame therefore the value is null at timestamps with second value other than 0, 10, 20, 30, 40, 50. There can be other deviations based on concrete meter firmware.|
|sensor.current_l3_HOMEID|Current on L3; on Kaifa and Aidon meters the value is not part of every HAN data frame therefore the value is null at timestamps with second value other than 0, 10, 20, 30, 40, 50. There can be other deviations based on concrete meter firmware.|
|sensor.estimated_consumption_current_hour_HOMEID|Estimate of kWh consumption current hour|
|sensor.accumulated_consumption_current_hour_HOMEID|kWh consumed since since last hour shift|
|sensor.average_power_HOMEID|Average consumption since midnight (Watt)|
|sensor.last_meter_consumption_HOMEID|Last meter active import register state (kWh)|
|sensor.last_meter_production_HOMEID|Last meter active export register state (kWh)|
|sensor.max_power_HOMEID|Peak consumption since midnight (Watt)|
|sensor.min_power_HOMEID|Min consumption since midnight (Watt)|
|sensor.monthly_cost_HOMEID||Deprecated?|
|sensor.monthly_net_consumption_HOMEID||Deprecated?|
|sensor.monthly_peak_hour_consumption_HOMEID||Deprecated?|
|sensor.power_HOMEID|Consumption at the moment (Watt)|
|sensor.power_factor_HOMEID|Consumption at the moment (Watt)|
|sensor.power_production_HOMEID|Net production (A-) at the moment (Watt)|
|sensor.electricity_price_HOMEID|The total price (energy + taxes)|
|sensor.signal_strength_HOMEID|Device signal strength (Pulse - dB; Watty - percent)|
|sensor.time_of_max_hour_consumption_HOMEID||Deprecated?|
|sensor.voltage_phase1_HOMEID|Voltage on phase 1; on Kaifa and Aidon meters the value is not part of every HAN data frame therefore the value is null at timestamps with second value other than 0, 10, 20, 30, 40, 50. There can be other deviations based on concrete meter firmware.|
|sensor.voltage_phase2_HOMEID|Voltage on phase 2; on Kaifa and Aidon meters the value is not part of every HAN data frame therefore the value is null at timestamps with second value other than 0, 10, 20, 30, 40, 50. There can be other deviations based on concrete meter firmware.|
|sensor.voltage_phase3_HOMEID|Voltage on phase 3; on Kaifa and Aidon meters the value is not part of every HAN data frame therefore the value is null at timestamps with second value other than 0, 10, 20, 30, 40, 50. There can be other deviations based on concrete meter firmware.|

Tibber API Reference: https://developer.tibber.com/docs/reference

## Examples

In this section, you will find some real-life examples of how to use this sensor.

### Electricity price

The electricity price can be used to make automations. The sensor has a `max_price` and `min_price` attribute, with max and min price for the current day. Here is an example to get a notification when the price is above 90% of the maximum price for the day:

{% raw %}

```yaml
- alias: "Electricity price"
  trigger:
    platform: time_pattern
  # Matches every hour at 1 minutes past whole
    minutes: 1
  condition:
    condition: template
    value_template: '{{ float(states('sensor.electricity_price_hamretunet_10')) > 0.9 * float(state_attr('sensor.electricity_price_hamretunet_10', 'max_price')) }}'
  action:
   - service: notify.pushbullet
     data:
       title: "Electricity price"
       target: "device/daniel_telefon_cat"
       message: "The electricity price is now {{ states('sensor.electricity_price_hamretunet_10') }}"
```

### URL

https://www.home-assistant.io/integrations/tibber/



{% endraw %}
