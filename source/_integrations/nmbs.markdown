---
title: NMBS
description: Instructions on how to integrate timetable data for traveling on the NMBS/SNCB Belgian Railway within Home Assistant.
ha_category:
  - Transport
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_release: 0.85
ha_domain: nmbs
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `nmbs` {% term integration %} will create sensors for monitoring travel time and information between 2 stations.

{% include integrations/config_flow.md %}

<p class='img'>
  <img src='/images/screenshots/nmbs-card-example.png' />
  <p>Example using the <a href="https://github.com/custom-cards/entity-attributes-card">Entity Attributes custom card</a> </p>
</p>
