---
title: Bryant Evolution
description: Instructions for how to integrate a Bryant Evolution HVAC system using a System Access Module.
ha_category:
  - Climate
featured: false
ha_release: 2024.8
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: bryant_evolution
ha_platforms:
  - climate
ha_zeroconf: false
ha_homekit: true
ha_integration_type: integration
---

The **Bryant Evolution** {% term integration %} lets you control Bryant Evolution HVAC systems.

## Prerequisites

- It requires that a System Access Module be connected to the HVAC system (for example, a Bryant SYSTXBBRCT01).

To install:

1. Connect the System Access Module to the device running Home Assistant, e.g., using an RS-232-to-USB adapter.
2. Install the bryant_evolution integration in Home Assistant, passing the name of the serial port to which the device is connected (e.g., `/dev/ttyUSB0`)
