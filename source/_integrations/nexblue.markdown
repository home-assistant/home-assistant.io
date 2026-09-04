---
title: NexBlue
description: Instructions for integrating NexBlue EV chargers with Home Assistant.
ha_category:
  - Car
  - Energy
  - Sensor
  - Switch
ha_release: 2026.9
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@nexblue-maintainer'
ha_domain: nexblue
ha_platforms:
  - sensor
  - switch
ha_integration_type: hub
ha_quality_scale: bronze
---

The **NexBlue** {% term integration %} connects NexBlue EV chargers to Home Assistant through the NexBlue cloud service. It provides charger status, charging measurements, energy consumption, and diagnostic information.

## Supported devices

The integration supports NexBlue EV chargers that are associated with your NexBlue account.

## Prerequisites

To use the NexBlue integration, you need:

- A NexBlue account.
- At least one NexBlue EV charger added to your NexBlue account.
- An online charger to receive current charger data.

{% include integrations/config_flow.md %}

### Configuration parameters

{% configuration_basic %}
Username:
  description: The email address or username used to sign in to your NexBlue account.
Password:
  description: The password for your NexBlue account.
{% endconfiguration_basic %}

## Supported functionality

The NexBlue integration provides sensor entities and a charging switch for each charger in your account.

### Sensors

The integration provides the following charger information:

- **Charging state**: The current charger status, such as ready to charge, charging, charging complete, or waiting for available power.
- **Charging power**: The current charging power in kilowatts (kW).
- **Session energy**: The energy used during the current charging session in kilowatt-hours (kWh).
- **Lifetime energy**: The total energy delivered by the charger in kilowatt-hours (kWh). This sensor can be used in the [Home Assistant energy dashboard](/home-energy-management/).
- **Current and voltage**: Measurements for L1, L2, and L3 when reported by the charger.
- **Current limit**: The configured charging current limit.
- **Cable rating** and **circuit fuse**: Electrical limits reported by the charger.
- **Charger diagnostics**: Cable lock state and mode, access level, charging phase, network status, and LED brightness.

### Charging control

The integration provides a charging switch for each charger:

- Turn the switch on to start charging.
- Turn the switch off to stop charging.

If the charger is offline or rejects a command, Home Assistant reports the command failure.

## NexBlue and automations

NexBlue does not provide integration-specific triggers, conditions, or actions in this initial version. You can still use its sensor entities with standard Home Assistant automations, such as sending a notification when charging completes.

## Data updates

The NexBlue integration uses cloud {% term polling %} and updates charger data every minute.

## Known limitations

- The integration requires an internet connection between Home Assistant and the NexBlue cloud service.
- A charger that is offline remains visible, but its entities become unavailable until the charger can be reached again.

## Troubleshooting

### No chargers are shown

Make sure the charger is visible in the NexBlue app and is assigned to the same NexBlue account used to configure the integration.

### Charger entities are unavailable

Check that the charger is online in the NexBlue app. If it is online, verify that Home Assistant can reach the internet and try reloading the NexBlue integration.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
