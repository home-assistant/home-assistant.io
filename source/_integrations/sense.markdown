---
title: Sense
description: Instructions on how to integrate Sense within Home Assistant.
ha_category:
  - Binary sensor
  - Energy
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.82
ha_config_flow: true
ha_codeowners:
  - '@kbickar'
ha_domain: sense
ha_dhcp: true
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: integration
---

Integrate your [Sense](https://sense.com) meter information into Home Assistant.

There is currently support for the following device types within Home Assistant:

- Binary sensor
- Sensor

{% include integrations/config_flow.md %}

## Sensors

Sensors are added for both usage and production:

- Active sensors: Updated every 60 seconds.
  - Usage: Current active power usage in Watts.
  - Production: Current active power production in Watts.
- Trend sensors: Data provided for daily, weekly, monthly and yearly scales. Updated every 5 minutes.
  - Usage: Energy usage in kWh.
  - Production: Energy production in kWh.
  - To Grid: Energy exported to the grid in kWh.
  - From Grid: Energy imported from the grid in kWh.
  - Net Production: Measures total solar production against usage.
  - Net Production Percentage: Net production as a percentage value.
  - Solar Powered Percentage: Percentage of power used directly from solar.

Binary sensors are created for each of the devices detected by your Sense monitor to show their power state.

Sensors are created for each of the devices detected by your Sense monitor to show their power usage in Watts.

{% note %}
The [Emulated Kasa](/integrations/emulated_kasa) integration can be used to expose devices in Home Assistant to the Sense Monitor by emulating TP-Link Kasa Smart Plugs.
{% endnote %}
