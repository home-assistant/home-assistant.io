---
title: devolo Home Control
description: Instructions on how to integrate devolo Home Control with Home Assistant.
ha_category:
  - Binary Sensor
  - Switch
ha_release: '0.110'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@2Fake'
  - '@Shutgun'
ha_domain: devolo_home_control
ha_quality_scale: silver
---

devolo Home Control is a Z-Wave ecosystem with a Z-Wave to IP gateway in the center. The integration allows you to control devices connected to the gateway.

## Configuration

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


## Binary Sensors

The integration provides support for the following Z-Wave devices:

- devolo Door/Window Contact
- devolo Flood Sensor
- devolo Motion Sensor
- devolo Smoke Detector
- Fibaro Floor Sensor
- Fibaro Motion Sensor
- Fibaro Smoke Sensor

The integration provides support for the following features:

- Overload alarm sensor of various switches
- Sensors I2 and I3 of devolo and Qubino flush mounted relays
