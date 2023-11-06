---
title: Open Voice OS
description: Support for OVOS devices using the message bus.
ha_category:
  - Voice
  - Notifications
ha_release: 0.114
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@atd'
ha_domain: ovos
ha_platforms:
  - notify
ha_integration_type: device
works_with:
  - local
---

This integration allows [OVOS](https://openvoiceos.org/) and [NeonAI](http://neon.ai/) devices to connect directly to Home Assistant with the [Message Bus](https://mycroft-ai.gitbook.io/docs/mycroft-technologies/mycroft-core/message-bus).

There is currently support for the following device types within Home Assistant:

- **Notifications** - Allows to deliver notifications from Home Assistant to OVOS devices

## Configuration

To add an OVOS device to Home Assistant, you need to provide with the following variables

{% configuration_basic %}
host:
  description: The IP address or hostname of your OVOS device.
  required: true
  type: string
port:
  description: The port of your OVOS device.
  required: false
  type: integer

{% endconfiguration_basic %}


