---
title: SenseCAP
description: Monitor SenseCAP temperature, humidity, and light sensors over LoRaWAN.
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

The **SenseCAP** {% term integration %} adds [Seeed Studio SenseCAP](https://www.seeedstudio.com/SenseCAP-c-1825.html) sensors from your [LoRaWAN](/integrations/lorawan/) connections. Use their readings to monitor a greenhouse or trigger automations when temperature, humidity, or light levels cross a threshold.

## Supported devices

| Model | Sensors |
| --- | --- |
| S2101 | Temperature (°C), relative humidity (%) |
| S2102 | Illuminance (lx) |

Other SenseCAP models are not supported by this integration.

## Prerequisites

Set up a LoRaWAN connection integration, such as [ChirpStack](/integrations/chirpstack/), and select the applications containing your sensors. Devices must have a recognized SenseCAP manufacturer and model identity in the backend's device catalog.

The connection must be available and expose at least one S2101 or S2102 before you can add SenseCAP.

For ChirpStack, use the global device profile for the S2101 or S2102. A custom profile without the corresponding catalog identity cannot be identified automatically.

{% include integrations/config_flow.md %}

Home Assistant discovers SenseCAP from the available LoRaWAN connections. Confirm the discovered integration, or add SenseCAP manually. One SenseCAP entry handles supported devices across all connections; there are no credentials or connection selections in its setup.

## Data updates

Readings update when a device sends an uplink. Sensors show **Unknown** until their first reading after Home Assistant starts. If a LoRaWAN connection is lost, its sensors become unavailable until the connection recovers.

Devices added to or removed from a connected application are added to or removed from Home Assistant when the connection integration reports the change.

## Troubleshooting

### A sensor does not appear

Check that the device is an S2101 or S2102, belongs to a selected application, and uses a recognized catalog identity. Confirm the SenseCAP integration in **{% my integrations title="Settings > Devices & services" %}**.

### Readings are unknown or unavailable

For **Unknown** readings, check that uplinks appear in your LoRaWAN server and wait for the device's next transmission. For **Unavailable** sensors, check the connection integration and its credentials.

The integration uses the [`sensecap-lorawan`](https://github.com/balloob/sensecap-lorawan) library to decode device payloads.

## Removing the integration

{% include integrations/remove_device_service.md %}

Removing SenseCAP removes its devices and entities from Home Assistant. Your LoRaWAN connections remain configured.
