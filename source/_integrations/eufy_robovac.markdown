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

- RoboVac 30C (`T2118`)
- RoboVac 15C Max (`T2128`)
- RoboVac G20 (`T2181`)
- RoboVac LR30 Hybrid (`T2193`)
- RoboVac L35 Hybrid (`T2194`)
- RoboVac G30 Edge (`T2251`)
- RoboVac G30 Verge (`T2252`)
- G30 Hybrid (`T2253`)
- RoboVac G20 Hybrid (`T2254`)
- RoboVac G35+ (`T2255`)
- RoboVac G40+ (`T2259`)
- RoboVac X8 (`T2261`)
- RoboVac X8 Hybrid (`T2262`)
- RoboVac LR30 Hybrid+ (`T2268`)

Not currently supported:

- RoboVac models not listed above

## Prerequisites

- The vacuum must already be added to your Eufy account in the Eufy app.
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
  description: "Tuya protocol version used for local communication. Start with `3.3`; if the device does not respond, try `3.4` or `3.5`."
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

## Known limitations

- Some models may not return their local IP address during account discovery. If that happens, enter the host manually during setup.
- Some models require a different Tuya protocol version. Start with `3.3`, then try `3.4` or `3.5` if the device does not respond.

## Remove the integration

To remove the **Eufy RoboVac** integration from Home Assistant:

1. Go to **Settings** > **Devices & services**.
2. Select the **Eufy RoboVac** integration.
3. Select the three-dot menu, then select **Delete**.

Removing the integration from Home Assistant does not remove the vacuum from your Eufy account and does not factory-reset the device.
