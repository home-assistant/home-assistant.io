---
title: Shelly
description: Instructions on how to integrate Shelly modules with Home Assistant.
ha_category:
  - Switch
ha_release: "0.113"
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - "@OnFreund"
ha_domain: shelly
---

This integration connects with Shelly devices (e.g., Shelly 1 switch) over MQTT.

## Requirements

- MQTT server and the [MQTT integration](/integrations/mqtt/) set up in Home Assistant.
- Your Shelly modules configured to work over MQTT (`Internet & Security` -> `Advanced - Developer Settings` -> `Enable action execution via MQTT`. See Shelly documentation for more info)

## Configuration

This integration can be configured using the integrations panel in the
Home Assistant frontend.

Menu: **Configuration** -> **Integrations**.

Click on the `+` sign to add an integration and click on **Shelly**.
The configuration flow will discover devices that are currently connected
to your MQTT server, and will guide you through configuring them.

Currently supported models:
- Shelly 1
- Shelly 2

Currently supported plaforms:
- [Switch](/integrations/switch/)
