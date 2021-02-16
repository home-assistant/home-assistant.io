---
title: Sense
description: Instructions on how to integrate Sense within Home Assistant.
ha_category:
  - Energy
  - Binary Sensor
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
---

Integrate your [Sense](https://sense.com) meter information into Home Assistant.

There is currently support for the following device types within Home Assistant:

- Binary Sensor
- Sensor

{% include integrations/config_flow.md %}

## Sensors

Sensors are added for both usage and production with the following names:

- **Active Usage/Production**: Current active power usage/production in Watts. Updated every 60 seconds.
- **Daily/Weekly/Monthly Usage/Production**: Daily/Weekly/Monthly power usage/production in kWh. Updated every 5 minutes.

Binary sensors are created for each of the devices detected by your Sense monitor to show their power state.

Sensors are created for each of the devices detected by your Sense monitor to show their power usage in Watts.

<div class='note'>

The [Emulated Kasa](/integrations/emulated_kasa) integration can be used to expose devices in Home Assistant to the Sense Monitor by emulating TP-Link Kasa Smart Plugs.

</div>
