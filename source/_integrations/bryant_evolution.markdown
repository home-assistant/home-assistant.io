---
title: Bryant Evolution
description: Instructions for how to integrate a Bryant Evolution HVAC system using a System Access Module.
ha_category:
  - Climate
featured: false
ha_release: 2024.???
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

It requires that a System Access Module be connected to the HVAC system (e.g., a Bryant SYSTXBBRCT01).

To install:

1. Connect the System Access Module to a computer using an RS-485-to-USB adapter.
1. Download https://github.com/danielsmyers/evolutionhttp. Build and run the server binary, passing --device=/dev/ttyUSB0 (or whatever device your adapter is connected to).
1. Install the bryant_evolution integration in Home Assistant, passing the IP or hostname of the computer to which the System Access Module is connected.
