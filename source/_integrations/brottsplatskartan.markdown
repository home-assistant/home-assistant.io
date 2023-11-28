---
title: Brottsplatskartan
description: Instructions on how to integrate brottsplatskartan.se into Home Assistant.
ha_category:
  - Sensor
  - Social
ha_release: 0.85
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@gjohansson-ST'
ha_domain: brottsplatskartan
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `brottsplatskartan` sensor allows one to track reported incidents occurring in a given area. Incidents include anything reported to [Brottsplatskartan](https://brottsplatskartan.se). The sensor only counts incidents from the current day.

{% include integrations/config_flow.md %}

## Notes

### Area

Brottsplatskartan captures all incidents in a region, e.g Stockholms län. If area parameter is defined, any latitude and longitude parameters are ignored.

### Latitude and Longitude

The radius is set to 5 km when using latitude and longitude to monitor an area. It's not possible to explicitly set radius to another value.
