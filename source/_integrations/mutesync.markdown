---
title: mutesync
description: Instructions on how to integrate the mütesync button with Home Assistant.
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
ha_integration_type: service
---

{% important %}

The **mutesync** desktop app that this integration depends on was [discontinued on 16 November 2024](https://mutesync.com/download). mütesync has since been acquired by MuteMe, and MuteSync devices are now supported through the MuteMe software, which does not expose a compatible API.

Because of this, new setups of this integration are no longer possible. Existing installations that rely on the mütesync desktop app may continue to work for a while, but will stop working once you migrate to the MuteMe software.

{% endimportant %}

The **mutesync** {% term integration %} for Home Assistant connects to the [mütesync virtual button](https://mutesync.com/). The mütesync tray app pairs with popular video conferencing tools such as Zoom, Google Meet, Discord, and Teams.

With this integration, Home Assistant can track when you're in a meeting and whether your microphone is muted.

There is currently support for the following platforms within Home Assistant:

- Binary sensor: microphone muted/unmuted and meeting live/not-live

{% include integrations/config_flow.md %}

When setting up the integration, the UI will ask for the **Host**. This is the hostname or IP address of the machine you run mütesync on, most likely your desktop computer.
