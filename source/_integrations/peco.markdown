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
  - binary_sensor
  - sensor
ha_integration_type: integration
---

PECO is a public utility company that provides electricity to the Philadelphia metro.

To learn more about PECO, visit [**their about page**](https://www.peco.com/AboutUs/Pages/Default.aspx).

{% note %}
This integration is only for PECO customers. To see if your county is supported, take a look at [**their outage map**](https://www.peco.com/Outages/CheckOutageStatus/Pages/OutageMap.aspx).

PECO Is a registered trademark of Exelon Business Services Co., LLC
{% endnote %}

{% include integrations/config_flow.md %}


## Available entities

The PECO Outage Counter integration allows you to get the current count of power outages for any county, and the total for the operating region too.

- **Outage Count**: This will return the current number of outages of a county or the entire operating region.
- **Smart Meter**: This can utilize the smart meter functionality of select meters to verify that power is being delivered to your home.

This integration will create the following 6 entities:

- A sensor that shows how many outages are in your county.
- A sensor that shows the total amount of customers with no power.
- A sensor that shows the total amount of customers served in the county.
- A sensor that shows the percentage of customers with no power.
- A sensor that shows the alert that appears when you open the online outage map.
- A binary sensor that returns the state of your meter.

{% include integrations/config_flow.md %}
