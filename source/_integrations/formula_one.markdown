---
title: Formula 1
description: Instructions for how to integrate Formula 1 into Home Assistant.
ha_category: Sensor
ha_release: "2022.11"
ha_iot_class: Cloud Polling
ha_domain: formula_one
ha_platforms:
  - sensor
ha_codeowners:
  - '@y34hbuddy'
ha_integration_type: integration
ha_config_flow: true
---

The Formula 1 integration offers integration with the [Ergast](https://ergast.com/mrd/) Formula 1 API to provide details about the current season's Drivers Championship, Constructors Championship, and Race schedule.

{% include integrations/config_flow.md %}

## Available resources

The list of currently available resources:

- Sensors representing each position in the Drivers Championship
- Sensors representing each driver in the Drivers Championship
- Sensors representing each position in the Constructors Championship
- Sensors representing each constructor in the Constructors Championship
- Sensors representing each race of the season
- Sensor representing the next race of the season
