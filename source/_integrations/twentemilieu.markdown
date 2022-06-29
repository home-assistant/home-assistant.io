---
title: Twente Milieu
description: Instructions on how to integrate Twente Milieu with Home Assistant.
ha_category:
  - Calendar
  - Environment
  - Sensor
ha_release: 0.97
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_domain: twentemilieu
ha_platforms:
  - calendar
  - diagnostics
  - sensor
ha_quality_scale: platinum
ha_integration_type: integration
---

The Twente Milieu integration allows you to track the next scheduled waste
pickups by Twente Milieu for each of the different waste types.

{% include integrations/config_flow.md %}

## Calendar

The integration provides a calendar to Home Assistant. You can view
all upcoming waste pickups in the calender dashboard.

## Sensors

This integration provides sensors for the following waste pickup dates from Twente Milieu:

- Next plastic waste pickup date.
- Next organic waste pickup date.
- Next paper waste pickup date.
- Next non-recyclable waste pickup date.
- Next Christmas Tree pickup date.
