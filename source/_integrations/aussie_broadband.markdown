---
title: Aussie Broadband
description: Instructions on how to integrate Aussie Broadband within Home Assistant.
ha_category:
- Network
ha_release: 2021.9
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
- '@nickw444'
ha_domain: aussie_broadband
ha_platforms:
- sensor
- camera
---

The `aussie_broadband` integration uses the [Aussie Broadband API](https://myaussie-api.aussiebroadband.com.au) as a source for internet usage data.

## Setup

{% include integrations/config_flow.md %}
