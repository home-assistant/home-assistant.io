---
title: Israel Railways
description: Instructions on how to integrate timetable data for traveling in Israel rail within Home Assistant.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 2024.8
ha_config_flow: true
ha_codeowners:
  - '@shaiu'
ha_domain: israel_rail
ha_platforms:
  - sensor
ha_integration_type: integration
---

The Israel rail integration will give you the next three departure times from a given location to another one in Israel rail.

{% include integrations/config_flow.md %}

The public timetables are coming from [Israel rail](https://www.rail.co.il).

### Defining a custom polling interval

{% include common-tasks/define_custom_polling.md %}
