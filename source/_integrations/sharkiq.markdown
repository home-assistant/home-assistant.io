---
title: Shark IQ
description: Integrate your Shark IQ robot vacuum with Home Assistant.
ha_category:
  - Vacuum
ha_iot_class: Cloud Polling
ha_release: 0.115
ha_config_flow: true
ha_codeowners:
  - '@JeffResc'
  - '@funkybunch'
ha_domain: sharkiq
ha_platforms:
  - vacuum
ha_integration_type: integration
---

The `sharkiq` integration allows you to control your [Shark IQ](https://www.sharkclean.com/vacuums/robot-vacuums/) vacuum.

{% include integrations/config_flow.md %}

## Services

Currently supported services are:

- `start`
- `pause`
- `stop`
- `return_to_base`
- `locate`
- `set_fan_speed`

If `pause` does not work for you, then it is not supported by your vacuum. The `stop` service will provide similar functionality.
