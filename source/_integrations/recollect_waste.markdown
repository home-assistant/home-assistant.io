---
title: ReCollect Waste
description: Instructions on how to set up ReCollect Waste sensor within Home Assistant.
ha_category:
  - Sensor
ha_release: 0.87
ha_iot_class: Cloud Polling
ha_domain: recollect_waste
ha_codeowners:
  - '@bachya'
ha_config_flow: true
ha_platforms:
  - calendar
  - diagnostics
  - sensor
ha_integration_type: service
---

The `recollect_waste` integration allows you to track the next scheduled waste pickup and what type of waste from [ReCollect Waste](https://recollect.net/waste-haulers/).

To use this integration, you must know both your ReCollect Place and Service IDs. In general, cities/municipalities that utilize ReCollect will give you a way to subscribe to a calendar with pickup dates. If you examine the iCal URL for this calendar, the Place and Service IDs are embedded in it:

```text
webcal://recollect.a.ssl.fastly.net/api/places/PLACE_ID/services/SERVICE_ID/events.en-US.ics
```

The default frequency for pulling data from ReCollect Waste is once a day (86400 seconds).

{% warning %}
The ReCollect Waste sensor uses the ReCollect API <strong>URL</strong> to obtain data and not an official API from ReCollect. Use at your own risk.
{% endwarning %}

{% include integrations/config_flow.md %}
