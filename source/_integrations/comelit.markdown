---
title: Comelit SimpleHome
description: Instructions on how to integrate Comelit SimpleHome home automation devices into Home Assistant.
ha_category:
  - Light
ha_release: '2023.9'
ha_domain: comelit
ha_config_flow: true
ha_codeowners:
  - '@chemelli74'
ha_iot_class: Local Polling
ha_platforms:
  - light
ha_ssdp: false
ha_integration_type: integration
---

The Comelit SimpleHome integration allows you to control your [Comelit home automation devices](https://comelitgroup.it/installatore/offerta/domotica-e-smart-home).

There is support for the following platform types within Home Assistant:

- **Comelit Serial Bridge** - allows local control for climate, light and cover devices.
{% include integrations/config_flow.md %}

## Configuration

The configuration in the UI asks for a a few information: host, alarm_pin.
