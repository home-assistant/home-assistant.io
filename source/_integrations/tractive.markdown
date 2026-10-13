---
title: Tractive
description: Instructions on how to integrate Tractive within Home Assistant.
ha_category:
  - Presence detection
ha_release: 2021.9
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@Danielhiversen'
  - '@zhulik'
  - '@bieniu'
ha_domain: tractive
ha_platforms:
  - binary_sensor
  - device_tracker
  - diagnostics
  - sensor
  - switch
ha_integration_type: device
---

[Tractive](https://tractive.com/en/) is an Austrian company that develops real-time location trackers for pets and other animals using GPS and GSM technology.

The Tractive integration allows you to monitor locations of your pets from within Home Assistant and set up automations based on the information.

{% include integrations/config_flow.md %}

## Integration entities

The Tractive integration adds one device tracker and several sensors and switches per registered pet:

![Tractive device tracker](/images/integrations/tractive/device_tracker.png)

## Known limitations

- The integration requires a Tractive Premium subscription.
- Your Tractive account must allow signing in with an email address and password. Accounts that can only sign in with a Google or Apple account are not supported.
- Trackers (pets) that are shared from another account to your account are not visible in Home Assistant. You need to set up each Tractive account that owns a tracker (pet) as a separate integration entry.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
