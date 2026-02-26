---
title: Eufy RoboVac
description: Instructions on how to integrate Eufy RoboVac devices into Home Assistant.
ha_category:
  - Sensor
  - Vacuum
ha_iot_class: Local Polling
ha_release: 2026.3
ha_config_flow: true
ha_domain: eufy_robovac
ha_platforms:
  - sensor
  - vacuum
ha_integration_type: device
---

The **Eufy RoboVac** {% term integration %} allows you to connect supported Eufy RoboVac models to Home Assistant using local control.

The integration uses Eufy account credentials during setup to discover available RoboVacs and retrieve local connection details, then controls the vacuum locally on your network.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
  description: The email address used for your Eufy account.
Password:
  description: The password used for your Eufy account.
RoboVac:
  description: The discovered RoboVac to add.
Host:
  description: The local IP address of the RoboVac. If auto-discovery does not populate it, enter it manually.
Protocol version:
  description: Tuya protocol version used for local communication. Start with `3.3` for G30 Hybrid (`T2253`).
{% endconfiguration_basic %}

## Prerequisites

- Your Home Assistant instance must be able to reach the vacuum over the local network.
- For reliability, assign a DHCP reservation/static IP to your RoboVac.

## Supported functionality

### Vacuum

The vacuum entity supports common controls, including:

- Start cleaning
- Pause cleaning
- Return to base
- Fan speed selection

### Sensor

A battery sensor entity is created for supported RoboVac models.
