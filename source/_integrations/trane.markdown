---
title: Trane Local
description: Locally control Trane and American Standard thermostats over the local network.
ha_category:
  - Switch
ha_iot_class: Local Push
ha_quality_scale: bronze
ha_release: 2026.3
ha_codeowners:
  - '@bdraco'
ha_domain: trane
ha_integration_type: hub
ha_config_flow: true
ha_platforms:
  - switch
related:
  - docs: /integrations/nexia/
    title: Nexia (Cloud)
---

The **Trane Local** {% term integration %} allows you to locally control [Trane](https://www.trane.com/) and [American Standard](https://www.americanstandardair.com/) thermostats over your local network using a direct <abbr title="mutual TLS">mTLS</abbr> connection. No cloud connection is required.

This is the local counterpart to the [Nexia](/integrations/nexia/) cloud integration. If your thermostat supports local control, this integration provides faster response times and does not depend on internet connectivity.

## Prerequisites

Before setting up this integration, you must:

1. Assign a **static IP address** to your thermostat on your network.
2. Put the thermostat in _pairing mode_: 
   - In the UI of your thermostat, go to **Menu** > **Settings** > **Network** > **Advanced Setup** > **Remote Connection** > **Pair**.

## Supported devices

- Trane XL1050 Smart Thermostat (firmware v5.9 or later)
- American Standard Platinum 1050 Smart Thermostat (firmware v5.9 or later)

{% include integrations/config_flow.md %}

## Switches

The integration provides a **Hold** switch for each zone. When enabled, the thermostat maintains its current setpoints indefinitely (permanent hold). When disabled, the thermostat follows its programmed schedule.

## Data updates

The integration maintains a persistent local TCP connection to the thermostat. State changes are pushed from the thermostat to Home Assistant in real time, so there is no polling interval.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
