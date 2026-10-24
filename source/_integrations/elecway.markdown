---
title: Elecway
description: Monitor Elecway energy storage devices over your local network.
ha_category:
  - Energy
  - Sensor
ha_release: '2026.11'
ha_iot_class: Local Push
ha_config_flow: true
ha_zeroconf: true
ha_codeowners:
  - '@Elecway001'
ha_domain: elecway
ha_platforms:
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
related:
  - url: https://www.elecway.com
    title: Elecway website
---

The Elecway {% term integration %} monitors [Elecway](https://www.elecway.com) energy storage devices. It receives power, battery state of charge, and energy measurements directly from the device over your local network. An Elecway cloud account is not required.

## Supported devices

The following energy storage series are supported with network module firmware v1.0 or later:

- S2 and S3 series.
- S-A and S-B series.
- L-A and L-B series.

The device must provide local WebSocket telemetry and advertise itself using mDNS. Available measurements depend on the model and connected components.

## Prerequisites

- Connect the storage device to your local network according to its product instructions.
- Connect Home Assistant to the same local network as the device. Allow mDNS discovery and local WebSocket communication between them. Guest network or access point isolation can prevent communication.

{% include integrations/config_flow.md %}

When adding the integration manually, select your device from the list of discovered storage devices, then confirm its serial number. Home Assistant checks the connection before completing setup.

{% configuration_basic %}
Device:
  description: "The storage device to add. Devices are listed by serial number and network address. Already configured devices are excluded from this list."
{% endconfiguration_basic %}

To add another storage device, repeat these steps for that device.

## Sensors

Each storage device provides the following sensors:

| Sensor | Unit | Measurement |
| --- | --- | --- |
| Output power | W | Power reported at the device output. |
| PV power | W | Photovoltaic input power. |
| Battery power | W | Battery power, retaining the sign reported by the device. |
| Battery | % | Battery state of charge. |
| PV daily generation | kWh | Daily photovoltaic energy generation reported by the device. |
| PV total generation | kWh | Total photovoltaic energy generation reported by the device. |
| Battery daily charge | kWh | Daily energy charged into the battery. |
| Battery total charge | kWh | Total energy charged into the battery. |
| Battery daily discharge | kWh | Daily energy discharged from the battery. |
| Battery total discharge | kWh | Total energy discharged from the battery. |

Home Assistant updates these sensors when the device sends new measurements. A measurement that the device does not provide is shown as unknown. When the connection is lost or valid measurements stop arriving, the sensors become unavailable and the integration automatically attempts to reconnect.

## Known limitations

This integration provides monitoring only. It does not change the device's output power, operating mode, or other settings.

## Troubleshooting

### No devices found

Check that the storage device is powered on, and is connected to the same local network as Home Assistant. Check that your network allows mDNS and does not isolate the device from Home Assistant. Then try adding the integration again.

Devices that have already been configured are omitted from the device selection list. Check **Settings** > **Devices & services** before adding the same device again.

### Cannot connect or sensors are unavailable

Check the device's power and network connection. The device must send local WebSocket telemetry for setup to complete and for measurements to remain available. After restoring the connection, allow the integration to reconnect and receive new measurements.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
