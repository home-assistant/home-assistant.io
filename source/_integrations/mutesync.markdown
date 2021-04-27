---
title: Mutesync
description: Instructions on how to integrate Mutesync button with Home Assistant.
ha_category:
  - Presence Detection
ha_release: 2021.5
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@currentoor'
ha_domain: mutesync
ha_platforms:
  - binary_sensor
---

The Muteysnc button integration for Home Assistant allows you to observe [Mutesync buttons](https://mutesync.com/).

There is currently support for the following platforms within Home Assistant:

- Binary sensor - mic muted/unmuted and meeting live/not-live

{% include integrations/config_flow.md %}
