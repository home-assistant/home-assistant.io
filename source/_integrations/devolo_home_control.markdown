---
title: devolo Home Control
description: Instructions on how to integrate devolo Home Control with Home Assistant.
ha_category:
  - Binary Sensor
  - Climate
  - Cover
  - Light
  - Sensor
  - Switch
ha_release: '0.110'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@2Fake'
  - '@Shutgun'
ha_domain: devolo_home_control
ha_quality_scale: silver
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - light
  - sensor
  - switch
ha_zeroconf: true
---

devolo Home Control is a Z-Wave ecosystem with a Z-Wave to IP gateway in the center. The integration allows you to control devices connected to the gateway.

{% include integrations/config_flow.md %}

Please do not change the URL provided in the advanced mode unless you know what you are doing.

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
- devolo Key-Fob Switch
- devolo Motion Sensor
- devolo Smoke Detector
- devolo Wall Switch
- Fibaro Floor Sensor
- Fibaro Motion Sensor
- Fibaro Smoke Sensor

The integration provides support for the following features:

- Overload alarm sensor of various switches
- Sensors I2 and I3 of devolo and Qubino flush mounted relays

## Cover

The integration provides support for the following Z-Wave devices:

- devolo Shutter FM
- Qubino Flush Shutter

## Climate

The integration provides support for the following Z-Wave devices:

- devolo Radiator Thermostat
- Danfoss Living Connect Z Radiator Thermostat

## Lights

The integration provides support for the following Z-Wave devices:

- devolo Dimmer FM
- Qubino Flush Dimmer

## Sensor

The integration provides support for the following features:

- Temperature and brightness of devolo Sensors, that support it
- Consumptions of devolo and Qubino devices, that support it
- Voltage of devolo Metering Plug v2
