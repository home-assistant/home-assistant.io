---
title: Ridwell
description: Instructions on how to set up the Ridwell
ha_category:
  - Sensor
ha_release: 2021.11.0
ha_iot_class: Cloud Polling
ha_domain: ridwell
ha_codeowners:
  - '@bachya'
ha_config_flow: true
ha_platforms:
  - sensor
---

The `ridwell` integration allows users to track waste recycling pickups scheduled with [Ridwell](https://www.ridwell.com).

{% include integrations/config_flow.md %}

## Sensors

<div class='note info'>
The sensors available to you will depend on the type of WattTime subscription you have. You can reach out to WattTime to upgrade your subscription via [their website](https://www.watttime.org/contact/).
</div>

| Name                                  | Subscription Level | Meaning                                                                                                     |
|---------------------------------------|--------------------|-------------------------------------------------------------------------------------------------------------|
| Marginal Operating Emissions Rate     | Pro                | The currently measured amount of lbs of CO2 per MWh                                                         |
| Relative Marginal Emissions Intensity | All                | A percentage between the lowest (cleanest) and highest (highest) MOER values observed in the past two weeks |

You can learn more about the data that WattTime collects by viewing these articles:

* https://www.watttime.org/aer/what-is-aer/
* https://www.watttime.org/aer/how-aer-works/
