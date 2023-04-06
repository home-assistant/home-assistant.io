---
title: KAT Bulgaria
description: Gets the current user obligations/fines from the official government website of KAT Bulgaria.
ha_category:
  - Binary Sensor
ha_release: 2023.5
ha_iot_class: Cloud Polling
ha_quality_scale: No score
ha_codeowners:
  - '@Nedevski'
ha_config_flow: true
ha_domain: kat_bulgaria
ha_platforms:
  - binary_sensor
ha_integration_type: integration
---

The KAT Bulgaria integration allows users to check if they have any new fines from the Bulgarian Traffic Police (KAT).
The integration is a wrapper around the official government website.
([e-uslugi.mvr.bg](https://e-uslugi.mvr.bg/services/kat-obligations)).

For each configured user this integration will create a single [binary_sensor](/integrations/binary_sensor) indicating if you have a fine or not. You can add as many entries as you need. Entries are updated once every 20 minutes.

{% include integrations/config_flow.md %}

{% configuration %}
Person Name:
  description: The person's name.
  required: true
  type: string
Unified Civil Number (EGN):
  description: The person's EGN.
  required: true
  type: string
Driver License Number:
  description: The person's driving license number.
  required: true
  type: string
{% endconfiguration %}
