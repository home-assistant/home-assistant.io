---
title: SenseCAP
description: Monitor SenseCAP sensors over LoRaWAN.
ha_category:
  - Environment
  - Sensor
ha_release: 2026.11
ha_iot_class: Local Push
ha_quality_scale: bronze
ha_config_flow: true
ha_codeowners:
  - '@balloob'
ha_domain: sensecap
ha_platforms:
  - sensor
ha_integration_type: hub
---

The **SenseCAP** {% term integration %} adds [Seeed Studio SenseCAP](https://www.seeedstudio.com/SenseCAP-c-1825.html) sensors from your [LoRaWAN](/integrations/lorawan/) connections.

## Supported devices

| Model | Measurements |
| --- | --- |
| S2101 | Temperature, relative humidity |
| S2102 | Illuminance |
| S2103 | Temperature, relative humidity, carbon dioxide |
| S2104 | Soil temperature, soil moisture |
| S2105 | Soil temperature, soil moisture, electrical conductivity |
| S2106 | Temperature, pH |
| S2107 | Temperature from three probes |
| S2120 | Temperature, relative humidity, illuminance, UV index, atmospheric pressure, wind speed, wind direction, wind gust, rainfall intensity, accumulated rainfall |

All supported models also expose battery percentage. S2106 and S2107 require ChirpStack catalog identities.

## Prerequisites

Set up a LoRaWAN connection integration, such as [ChirpStack](/integrations/chirpstack/), and select the applications containing your sensors. The connection must be available and include at least one supported sensor before you can add SenseCAP.

Devices need a recognized SenseCAP manufacturer and model in the server's device catalog. For ChirpStack, use a device profile linked to the matching model in the global device catalog.

{% include integrations/config_flow.md %}

Confirm the discovered SenseCAP integration, or add it manually. One entry includes SenseCAP devices from all your LoRaWAN connections.

## Data updates

Readings update when a device sends an uplink. Sensors show **Unknown** until their first reading after Home Assistant starts. If a LoRaWAN connection is lost, its sensors become unavailable until the connection recovers.

The **Battery** sensor appears under **Diagnostic**. It uses the LoRaWAN device-status battery percentage when available, otherwise the battery percentage in SenseCAP uplinks. It shows **Unknown** until a battery report arrives.

Home Assistant updates its device list when a connection integration reports additions or removals.

## Troubleshooting

### A sensor does not appear

Check that the device is listed under [Supported devices](#supported-devices), belongs to a selected application, and uses a recognized catalog identity. Confirm the SenseCAP integration in {% my integrations title="**Settings** > **Devices & services**" %}.

### Readings are unknown or unavailable

For **Unknown** readings, check that uplinks appear in your LoRaWAN server and wait for the device's next transmission. For **Unavailable** sensors, check the connection integration and its credentials.

## Removing the integration

{% include integrations/remove_device_service.md %}

Removing SenseCAP removes its devices and entities from Home Assistant. Your LoRaWAN connections remain configured.
