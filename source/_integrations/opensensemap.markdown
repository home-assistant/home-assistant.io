---
title: openSenseMap
description: Instructions on how to setup openSenseMap sensors in Home Assistant.
ha_category:
  - Health
ha_release: 0.85
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: opensensemap
ha_platforms:
  - air_quality
ha_integration_type: service
ha_quality_scale: legacy
---

The **openSenseMap** {% term integration %} queries the open data API of [openSenseMap.org](https://opensensemap.org/) to monitor an air quality sensor station.

## Setup

To find the ID of a station, open it on [openSenseMap](https://opensensemap.org/) and copy the last segment of the URL — for example, `5b450e565dc1ec001bf7cd1d` in [https://opensensemap.org/explore/5b450e565dc1ec001bf7cd1d](https://opensensemap.org/explore/5b450e565dc1ec001bf7cd1d).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Station ID:
  description: The ID of the openSenseMap station to monitor.
{% endconfiguration_basic %}
