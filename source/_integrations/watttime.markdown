---
title: WattTime
description: Instructions on how to set up the WattTime integration within Home Assistant.
ha_category:
  - Energy
  - Environment
  - Sensor
ha_release: '2021.10'
ha_iot_class: Cloud Polling
ha_domain: watttime
ha_codeowners:
  - '@bachya'
ha_config_flow: true
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
---

The **WattTime** {% term integration %} allows users to get real-time emissions data for a latitude/longitude from [WattTime](https://www.watttime.org).

## Registering an account

You need a WattTime account before you can set up this integration. Registration is done [via the WattTime API](https://docs.watttime.org/). The simplest way to register is by using cURL on the command line:

```bash
curl -X "POST" "https://api.watttime.org/register" \
     -H 'Content-Type: application/json' \
     -d '{
       "username": "<USERNAME>",
       "password": "<PASSWORD>",
       "email": "<EMAIL>",
       "org": "<ORG>"
     }'
```

The `org` value can be anything you like. It does not need to represent a real organization.

{% include integrations/config_flow.md %}

## Sensors

{% note %}
The sensors available to you will depend on the type of WattTime subscription you have. You can reach out to WattTime to upgrade your subscription via [their website](https://www.watttime.org/contact/).
{% endnote %}

| Name                                  | Subscription Level | Meaning                                                                                                     |
| ------------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------- |
| Marginal Operating Emissions Rate     | Pro                | The currently measured amount of lbs of CO2 per MWh                                                         |
| Relative Marginal Emissions Intensity | All                | A percentage between the lowest (cleanest) and highest (highest) MOER values observed in the past two weeks |

You can learn more about the data that WattTime collects in the [WattTime API documentation](https://docs.watttime.org/) and on the [WattTime solutions page](https://watttime.org/solutions/load-shifting/).
