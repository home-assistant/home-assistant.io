---
title: RDW
description: Instructions on how to integrate RDW vehicle information with Home Assistant.
ha_category:
  - Binary sensor
  - Car
  - Sensor
ha_release: 2021.12
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@frenck'
  - '@joostlek'
ha_domain: rdw
ha_platforms:
  - binary_sensor
  - diagnostics
  - sensor
ha_integration_type: service
---

[RDW](https://www.rdw.nl) is the Netherlands Vehicle Authority. Their tasks
are the licensing of vehicles and vehicle parts, supervision and enforcement,
registration, information provision, and issuing documents.

The RDW data is open data, available for public use. This integration looks
up any dutch registered vehicle by its license plate and keeps that
information in Home Assistant.

This information, and the sensors provided, can be helpful, for example,
by sending alerts when it is time to get your car checked for the
required general periodic inspection (APK).

{% include integrations/config_flow.md %}
