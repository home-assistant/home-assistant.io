---
title: GIOŚ
description: Instructions on how to integrate GIOŚ (Polish Chief Inspectorate Of Environmental Protection) air quality service into Home Assistant.
ha_category:
  - Health
ha_release: 0.104
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bieniu'
ha_domain: gios
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: service
---

The `gios` integration uses the [GIOŚ](http://powietrze.gios.gov.pl/pjp/current) web service as a source for air quality data for your location.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Measuring station:
  description: "Select a measuring station from the list."
Name:
  description: "Service name in Home Assistant, by default, this is the name of your Home Assistant instance. For example `Home`."
{% endconfiguration_basic %}
