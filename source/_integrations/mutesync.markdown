---
title: mutesync
description: Instructions on how to integrate Mutesync button with Home Assistant.
ha_category:
  - Presence detection
ha_release: 2021.5
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@currentoor'
ha_domain: mutesync
ha_platforms:
  - binary_sensor
ha_integration_type: integration
---

The mutesync integration for Home Assistant connects to the [mütesync virtual button](https://mutesync.com/). This tray app pairs with popular video conferencing tools such as Zoom, Google Meet, Discord, and Teams.

With this integration, Home Assistant can track when you're in a meeting and whether your mic is muted/unmuted.

There is currently support for the following platforms within Home Assistant:

- Binary sensor - mic muted/unmuted and meeting live/not-live

{% include integrations/config_flow.md %}

Please note, when setting the integration, the UI will ask for "Host". This is
the hostname or IP address of the machine you run MuteSync on (which is most
likely your desktop computer).
