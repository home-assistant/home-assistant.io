---
title: devolo Home Control
description: Instructions on how to integrate devolo Home Control with Home Assistant.
ha_category:
  - Switch
ha_release: 0.110
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@2Fake'
  - '@Shutgun'
ha_domain: devolo_home_control
ha_quality_scale: silver
---

devolo Home Control is a Z-Wave eco system with a Z-Wave to IP gateway in the center. The integration allows you to control devices connected to the gateway.

## Configuration via the frontend

Menu: **Configuration** -> **Integrations**.

Click on the `+` sign to add an integration and click on **devolo Home Control**. You will be asked for your [mydevolo](https://www.mydevolo.com) credentials. After entering them, the devolo Home Control integration will be available.

## Switches

The integration provides support for the following Z-Wave devices:

- devolo Metering Plug v1
- devolo Metering Plug v2
- devolo Switch FM
- Qubino Flush 1 Relay
- Qubino Flush 1D Relay
- Fibaro Wall Plug
- Fibaro Double Relay Switch
