---
title: Last.fm
description: Instructions on how to integrate Last.fm sensors into Home Assistant.
ha_category:
  - Social
ha_iot_class: Cloud Polling
ha_release: '0.20'
ha_domain: lastfm
ha_platforms:
  - sensor
ha_integration_type: integration
ha_config_flow: true
ha_codeowners:
  - '@joostlek'
---

The `lastfm` sensor platform will allow you to see whenever a user starts scrobbling, their play count, last song played, and top song played on [Last.fm](https://www.last.fm/).

## Prerequisites

To get an API key you need to create an [API account](https://www.last.fm/api/account/create).

{% include integrations/config_flow.md %}
