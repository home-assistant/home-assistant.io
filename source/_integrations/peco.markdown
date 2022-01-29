---
title: "PECO Outage Count"
description: "Get how many outages are in your county"
ha_release: "2022.2.0"
ha_category: Sensor
ha_iot_class: "Cloud Polling"
ha_quality_scale: silver
ha_config_flow: true
ha_codeowners:
  - '@IceBotYT'
ha_domain: peco
---

The PECO Outage Counter integration allows you to get the current count of power outages for the county, and total for the operating region too.

{% include integrations/config_flow.md %}

<div class='note'>

When you are configuring the skill, the county named `TOTAL` creates a sensor which gets the total of all of the counties in the region.

</div>
