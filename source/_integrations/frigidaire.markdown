---
title: Frigidaire
description: Instructions on how to integrate Frigidaire smart AC within Home Assistant.
ha_category:
  - Presence Climate
ha_release: 2021.06
ha_iot_class: Cloud Polling
ha_quality_scale: silver
ha_config_flow: true
ha_codeowners:
  - "@bm1549"
ha_domain: frigidaire
---

[Frigidaire](https://www.frigidaire.com/) is a company that creates air conditioners with an app to control them.

The Frigidaire integration allows you to turn on/off, change mode, change fan speed, and change temperature of the air conditioners.

## Prerequisites

To use the integration you must own at least one Frigidaire Smart AC and have credentials to login to the app.

{% include integrations/config_flow.md %}

## Integration Entities

The Frigidaire integration adds one climate per air conditioner:

![Frigidaire Air Conditioners](/images/integrations/frigidaire/example.png)
