---
title: NextBus
description: Instructions on how to use public transit data from Nextbus in Home Assistant.
ha_category:
  - Sensor
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.93
ha_config_flow: true
ha_codeowners:
  - '@vividboarder'
ha_domain: nextbus
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `nextbus` sensor will give you the next departure time and associated data from your public transit station/stop. The data comes from [NextBus](https://www.nextbus.com), which provides real time transit data for a number of transit authorities.

{% include integrations/config_flow.md %}
