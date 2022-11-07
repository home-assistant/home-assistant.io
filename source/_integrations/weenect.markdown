---
title: Weenect
description: Instructions on how to integrate Weenect within Home Assistant.
ha_category:
  - Presence Detection
ha_release: 2022.12
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - "@eifinger"
ha_domain: weenect
ha_platforms:
  - device_tracker
ha_integration_type: device
---

[Weenect](https://www.weenect.com/) develops real-time location trackers for dogs and cats using GPS and GSM technology.

The Weenect integration allows you to monitor locations of your pets from within Home Assistant and set up automations based on the information.

## Prerequisites

To use the integration you must have an active Weenect subscription.

{% include integrations/config_flow.md %}

## Integration Entities

The Weenect integration adds one device tracker per registered pet:

![Weenect device tracker](/images/integrations/weenect/device_tracker.png)
