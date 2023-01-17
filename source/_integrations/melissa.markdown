---
title: Melissa
description: Instructions on how to integrate Melissa Climate into Home Assistant.
ha_category:
  - Climate
  - Hub
ha_release: 0.63
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@kennedyshead'
  - '@bkbilly'
ha_domain: melissa
ha_platforms:
  - climate
ha_integration_type: integration
---

The `melissa` integration is the main integration to connect to a [Melissa Climate](https://seemelissa.com/) A/C control.

There is currently support for the following device types within Home Assistant:

- Climate

The climate platform will be automatically configured if Melissa integration is configured.

{% include integrations/config_flow.md %}
