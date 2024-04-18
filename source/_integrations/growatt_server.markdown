---
title: Growatt
description: Instructions on how to integrate your Growatt server solar inverter within Home Assistant.
ha_category:
  - Energy
  - Sensor
ha_release: 0.99
ha_iot_class: Cloud Polling
ha_domain: growatt_server
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: integration
---

This sensor is designed to gather data from Growatt inverters, offering users a choice of various alternative endpoint servers during setup. Available options include:

- For users in China, the Chinese server at https://openapi-cn.growatt.com/.
- For users in North America, the North American server at https://openapi-us.growatt.com/.
- For users in other regions, a general server at https://openapi.growatt.com/.
- Additionally, the SMTEN server at http://server.smten.com/ serves as another alternative.

Users keen to explore all current supported servers and configuration possibilities can do so by integrating this feature in Home Assistant. This integration ensures global users can select the optimal server for their Growatt inverters, boosting both the efficiency and dependability of data collection.

Once integrated, the sensor logs into the user's Growatt account and accesses the first "Plant." It then retrieves the inverters associated with this plant and generates sensors for these inverters, as well as overall plant sensors.

{% include integrations/config_flow.md %}
