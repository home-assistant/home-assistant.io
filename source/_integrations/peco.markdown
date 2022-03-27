---
title: "PECO Outage Count"
description: "Get how many outages are in your county"
ha_release: 2022.4
ha_category: Sensor
ha_iot_class: "Cloud Polling"
ha_quality_scale: platinum
ha_config_flow: true
ha_codeowners:
  - '@IceBotYT'
ha_domain: peco
---

PECO is a public utility company that provides electricity to the Philadelphia metro.

To learn more about PECO, visit [**their about page**](https://www.peco.com/AboutUs/Pages/Default.aspx).

<div class='note warning'>

This integration is only for PECO customers. To see if your county is supported, take a look at [**their outage map**](https://www.peco.com/Outages/CheckOutageStatus/Pages/OutageMap.aspx).

</div>

---

The PECO Outage Counter integration allows you to get the current count of power outages for any county, and the total for the operating region too.

This integration will create 4 entities:

- `sensor.<county>_outage_count`
- `sensor.<county>_customers_out`
- `sensor.<county>_customers_served`
- `sensor.<county>_percent_customers_out`

{% include integrations/config_flow.md %}
