---
title: Tesla Wall Connector
description: Instructions on how to integrate Tesla Wall Connector (Gen 3) into Home Assistant.
ha_category:
  - Binary sensor
  - Energy
  - Sensor
ha_release: 2021.12
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@einarhauks'
ha_domain: tesla_wall_connector
ha_dhcp: true
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: integration
---

The Tesla Wall Connector integration allows you to integrate your Gen 3 [Tesla Wall Connector](https://www.tesla.com/support/home-charging-installation/wall-connector) with Wi-Fi into Home Assistant.

{% include integrations/config_flow.md %}

## Entities

These are the entities available in the Tesla Wall Connector integration.

| Domain        | Name               | Enabled |
| ------------- | ------------------ | ------- |
| Sensor        | Energy             | Yes     |
| Sensor        | Session energy     | Yes     |
| Sensor        | Status             | Yes     |
| Binary sensor | Contactor closed   | Yes     |
| Sensor        | Grid frequency     | Yes     |
| Sensor        | Grid voltage       | Yes     |
| Sensor        | Handle temperature | Yes     |
| Sensor        | MCU temperature    | Yes     |
| Sensor        | PCB temperature    | Yes     |
| Sensor        | Phase A current    | Yes     |
| Sensor        | Phase A voltage    | Yes     |
| Sensor        | Phase B current    | Yes     |
| Sensor        | Phase B voltage    | Yes     |
| Sensor        | Phase C current    | Yes     |
| Sensor        | Phase C voltage    | Yes     |
| Binary sensor | Vehicle connected  | Yes     |
| Sensor        | Status code        | No      |

## Energy dashboard

Energy usage can be easily added to the built-in Energy dashboard using the Energy sensor.