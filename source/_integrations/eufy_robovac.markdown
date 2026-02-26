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

## Supported devices

Currently supported:

- Eufy RoboVac G30 Hybrid (`T2253`)

Not currently supported:

- RoboVac models other than `T2253`

## Prerequisites

- Your Home Assistant instance must be able to reach the vacuum over your local network.
- For reliability, assign a Dynamic Host Configuration Protocol (DHCP) reservation or static IP address to your RoboVac.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email address:
  description: "The email address used to sign in to your Eufy account during setup."
Password:
  description: "The password used to sign in to your Eufy account during setup."
RoboVac:
  description: "The RoboVac discovered from your Eufy account that you want to add."
Host:
  description: "The local IP address of the selected RoboVac. If auto-discovery does not populate it, enter it manually."
Protocol version:
  description: "Tuya protocol version used for local communication. Start with `3.3` for G30 Hybrid (`T2253`)."
{% endconfiguration_basic %}

## Supported functionality

### Vacuum

The vacuum entity supports common controls, including:

- Start cleaning
- Pause cleaning
- Return to base
- Fan speed selection

### Sensor

A battery sensor entity is created for supported RoboVac models.
