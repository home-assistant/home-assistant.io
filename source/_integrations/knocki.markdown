---
title: Knocki
description: Instructions on how to setup Knocki devices in Home Assistant.
ha_category:
  - Event
ha_config_flow: true
ha_release: 2024.7
ha_iot_class: Cloud Push
ha_codeowners:
  - '@joostlek'
  - '@jgatto1'
  - '@JakeBosh'
ha_domain: knocki
ha_platforms:
  - event
ha_integration_type: device
---

The **Knocki** {% term integration %} can receive events for the triggers set up from your [Knocki devices](https://knocki.com/).

## Prerequisites

To use the Knocki integration, you need a Knocki account.

Once you set a trigger in the app, it will show up in Home Assistant to use.

{% include integrations/config_flow.md %}
