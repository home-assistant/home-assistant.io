---
title: Simplepush
description: Instructions on how to add Simplepush notifications to Home Assistant.
ha_category:
  - Notifications
ha_iot_class: Cloud Polling
ha_release: 0.29
ha_config_flow: true
ha_domain: simplepush
ha_platforms:
  - notify
ha_integration_type: integration
ha_codeowners:
  - '@engrbm87'
---

The `simplepush` platform uses [Simplepush](https://simplepush.io/) to deliver notifications from Home Assistant to your Android device. Unlike similar apps the Simplepush app requires no registration.

{% include integrations/config_flow.md %}

To test if the service works, just send a message with `curl` from the command-line.

```bash
curl 'https://api.simplepush.io/send/device_key/title/message'
```
## Notifications

Simplepush can send a notification by calling the [`notify` service](/integrations/notify/). You can specify the `event` under the `data` key. This will override the event configured in YAML when imported.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
