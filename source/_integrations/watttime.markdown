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

WattTime account registration is accomplished [via the REST API itself](https://www.watttime.org/api-documentation/#register-new-user). The simplest way to do this is by using cURL on the command line:

```bash
curl -X "POST" "https://api2.watttime.org/v2/register" \
     -H 'Content-Type: application/json' \
     -d '{
       "username": "<USERNAME>",
       "password": "<PASSWORD>",
       "email": "<EMAIL>",
       "org": "<ORG>"
     }'
```

Note that the `org` value can be anything you like – it doesn't need to represent a real entity.

{% include integrations/config_flow.md %}

## Sensors

{% note %}
The sensors available to you will depend on the type of WattTime subscription you have. You can reach out to WattTime to upgrade your subscription via [their website](https://www.watttime.org/contact/).
{% endnote %}

| Name                                  | Subscription Level | Meaning                                                                                                     |
| ------------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------- |
| Marginal Operating Emissions Rate     | Pro                | The currently measured amount of lbs of CO2 per MWh                                                         |
| Relative Marginal Emissions Intensity | All                | A percentage between the lowest (cleanest) and highest (highest) MOER values observed in the past two weeks |

You can learn more about the data that WattTime collects by viewing these articles:

- https://www.watttime.org/aer/what-is-aer/
- https://www.watttime.org/aer/how-aer-works/
