---
title: PECO Outage Counter
description: Get how many outages are in your county
ha_release: 2022.4
ha_category:
  - Sensor
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@IceBotYT'
ha_domain: peco
ha_platforms:
  - sensor
ha_integration_type: integration
---

PECO is a public utility company that provides electricity to the Philadelphia metro.

To learn more about PECO, visit [**their about page**](https://www.peco.com/AboutUs/Pages/Default.aspx).

<div class='note'>

This integration is only for PECO customers. To see if your county is supported, take a look at [**their outage map**](https://www.peco.com/Outages/CheckOutageStatus/Pages/OutageMap.aspx).

</div>

{% include integrations/config_flow.md %}


## Available entities

The PECO Outage Counter integration allows you to get the current count of power outages for any county, and the total for the operating region too.

This integration will create 5 entities.

- A sensor that shows how many outages are in your county.
- A sensor that shows the total amount of customers with no power.
- A sensor that shows the total amount of customers served in the county.
- A sensor that shows the percentage of customers with no power.
- A sensor that shows the alert that appears when you open the online outage map.
