---
title: Tibber
description: Instructions on how to integrate Tibber within Home Assistant.
ha_category:
  - Energy
  - Notifications
  - Sensor
ha_release: 0.8
ha_iot_class: Cloud Polling
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
If you have a [Tibber Pulse](https://tibber.com/no/store/produkt/pulse) or [Watty](https://tibber.com/se/store/produkt/watty-smart-energimatare) it will also show the electricity consumption in real-time. You get a sensor for monthly consumption, monthly cost, and monthly peak hour. If you do have a real-time meter it is updated once every hour, otherwise it is updated once per day. Statistics with hourly consumption and cost data is generated that can be used in the [Energy Dashboard](/docs/energy/) (the ids are `tibber:energy_consumption_HOMEID` and `tibber:energy_totalcost_HOMEID`). If you produce energy there are also statistics with hourly production and profit data generated which can also be used there (the ids are `tibber:energy_production_HOMEID` and `tibber:energy_profit_HOMEID`).

There is currently support for the following device types within Home Assistant:

- [Notifications](#notifications)
- [Sensor](#sensor)

## Setup

Go to [developer.tibber.com/settings/accesstoken](https://developer.tibber.com/settings/accesstoken) to get your API token.

{% include integrations/config_flow.md %}

## Notifications

Tibber can send a notification by calling the [`notify.send_message` action](/integrations/notify/). It will send a notification to all devices registered in the Tibber account.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

### Send message

```yaml
actions:
  - action: notify.send_message
    data:
      entity_id: notify.tibber
      title: "Your title"
      message: "This is a message for you!"
```

## Sensor

The `tibber` sensor provides the current electricity price if you are a [Tibber](https://tibber.com/) customer.
You also get sensors for monthly consumption, monthly cost, and monthly peak hour
If you have a Tibber Pulse it will also show the electricity consumption in real time.

## Available sensors

- Accumulated cost since midnight (requires active Tibber power deal)
- kWh consumed since midnight
- net kWh produced since midnight
- net kWh produced since last hour shift
- Current on L1, L2 and L3
- Estimate of kWh consumption current hour
- kWh consumed since since last hour shift
- Average consumption since midnight (Watt)
- Last meter active import register state (kWh)
- Last meter active export register state (kWh)
- Peak consumption since midnight (Watt)
- Min consumption since midnight (Watt)
- Consumption at the moment (Watt)
- Consumption at the moment (Watt)
- Net production (A-) at the moment (Watt)
- The total price (energy + taxes)
- Device signal strength (Pulse - dB; Watty - percent)
- Voltage on phase 1, 2 and 3
- Monthly cost
- Monthly net consumption
- Monthly peak hour
- Time of max hour consumption

</div>

## Actions

The hourly prices are exposed using [actions](/docs/scripts/perform-actions/). The actions populate [response data](/docs/scripts/perform-actions#use-templates-to-handle-response-data) with price data.

### Action `tibber.get_prices`

Fetches hourly energy prices including price level.

| Data attribute | Optional | Description                                           | Example             |
| -------------- | -------- | ----------------------------------------------------- | ------------------- |
| `start`        | yes      | Start time to get prices. Defaults to today 00:00:00  | 2024-01-01 00:00:00 |
| `end`          | yes      | End time to get prices. Defaults to tomorrow 00:00:00 | 2024-01-01 00:00:00 |

#### Response data

The response data is a dictionary with the energy prices for each Home. `start_time` is returned in local time from the API.

```json
{
  "prices": {
    "Nickname_Home":[
      {
        "start_time": "2023-12-09 03:00:00+02:00",
        "price": 0.46914,
        "level": "VERY_EXPENSIVE"
      },
      {
        "start_time": "2023-12-09 04:00:00+02:00",
        "price": 0.46914,
        "level": "VERY_EXPENSIVE"
      }
    ],
    "Nickname_Home_2":[
      {
        "start_time": "2023-12-09 03:00:00+02:00",
        "price": 0.46914,
        "level": "VERY_EXPENSIVE"
      },
      {
        "start_time": "2023-12-09 04:00:00+02:00",
        "price": 0.46914,
        "level": "VERY_EXPENSIVE"
      }
    ]
  }
}
```

## Examples

In this section, you will find some real-life examples of how to use this sensor.

### Electricity price

The electricity price can be used to make automations. The sensor has a `max_price` and `min_price` attribute, with max and min price for the current day. Here is an example to get a notification when the price is above 90% of the maximum price for the day:

{% raw %}

```yaml
- alias: "Electricity price"
  triggers:
    - trigger: time_pattern
      # Matches every hour at 1 minutes past whole
      minutes: 1
  conditions:
    - condition: template
      value_template: '{{ float(states('sensor.electricity_price_hamretunet_10')) > 0.9 * float(state_attr('sensor.electricity_price_hamretunet_10', 'max_price')) }}'
  actions:
   - action: notify.pushbullet
     data:
       title: "Electricity price"
       target: "device/daniel_telefon_cat"
       message: "The electricity price is now {{ states('sensor.electricity_price_hamretunet_10') }}"
```

{% endraw %}
