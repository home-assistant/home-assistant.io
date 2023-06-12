---
title: OpenVoiceOS (OVOS)
description: Instructions on how to integrate OVOS with Home Assistant.
ha_category:
  - Notifications
  - Voice
ha_release: 2023.6.2
ha_iot_class: Assumed State
ha_config_flow: true
ha_codeowners:
  - "@mikejgray"
ha_domain: ovos
ha_platforms:
  - notify
ha_integration_type: integration
---

The `ovos` integration allows you to send notify messages to your
[OVOS](https://openvoiceos.com) voice assistant in Home Assistant.
This integration also works with [Neon.AI](https://neon.ai/).

There is currently support for the following device types within Home Assistant:

- **Notifications** - Allows delivery of notifications from Home Assistant to OVOS/Neon.

{% include integrations/config_flow.md %}

## Examples

Send a message to OVOS/Neon by calling the `notify.ovos` service:

```yaml
message: "Tell me a joke."
```
