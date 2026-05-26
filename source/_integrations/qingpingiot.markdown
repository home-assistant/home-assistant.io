---
title: Qingping
description: Instructions on how to integrate Qingping environmental monitoring devices with Home Assistant via MQTT.
ha_category:
  - Sensor
ha_iot_class: Local Push
ha_release: 2025.7
ha_codeowners:
  - '@qingping'
ha_domain: qingpingiot
ha_config_flow: true
ha_platforms:
  - button
  - number
  - select
  - sensor
  - switch
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Qingping** {% term integration %} allows you to monitor environmental data from [Qingping](https://www.qingping.co/) smart devices in Home Assistant. It communicates with Qingping devices over MQTT to receive real-time sensor readings and send configuration commands.

## Supported devices

| Model | Description | Protocol |
|-------|-------------|----------|
| CGR1W / CGR1PW | Indoor Environment Monitor | TLV |
| CGF2W | Multi-Role Monitor Pro | TLV |
| CGS2 | Air Monitor | JSON |
| CGDN1 | Air Monitor Lite | JSON |

{% note %}
This integration communicates with Qingping devices exclusively via MQTT. Devices that have not been configured with MQTT cannot be used.
{% endnote %}

## Prerequisites

1. Set up the [MQTT integration](/integrations/mqtt/) in Home Assistant.
2. Configure MQTT on your Qingping device. You can set up MQTT private deployment through the [Qingping Developer Platform](https://developer.qingping.co) or via the **Advanced** settings in the Qingping IoT app to push the MQTT configuration to your device.
3. Make sure the device is actively sending data to the MQTT broker before proceeding with setup.

{% include integrations/config_flow.md %}

## Supported functionality

### Sensors

The integration creates sensor entities based on the capabilities of each device model.

| Sensor | Description | Available for models |
|--------|-------------|---------------------|
| Temperature | Current temperature (°C / °F) | All models |
| Humidity | Current relative humidity (%) | All models |
| CO₂ | Carbon dioxide concentration (ppm) | CGR1W, CGS2, CGDN1 |
| PM2.5 | Fine particulate matter (µg/m³) | CGR1W, CGS2, CGDN1 |
| PM10 | Coarse particulate matter (µg/m³) | CGR1W, CGS2, CGDN1 |
| eTVOC | Volatile organic compounds | CGS2 |
| Noise | Ambient noise level (dB) | CGR1W, CGS2 |
| Light | Ambient illuminance (lx) | CGR1W |
| Signal strength | Wi-Fi signal strength (dBm) | CGR1W, CGF2W |
| Battery | Battery level (%) | CGS2, CGDN1 |

### Diagnostic sensors

The following diagnostic entities are created for all devices:

| Sensor | Description |
|--------|-------------|
| Status | Device online/offline status |
| Firmware | Current firmware version |
| MAC address | Device MAC address |
| Battery state | Battery charging state (only for models with battery) |

### Numbers

| Entity | Description | Available for models |
|--------|-------------|---------------------|
| Report interval | How often the device sends data | All models |
| Temperature offset | Temperature sensor calibration offset (-10 to 10 °C) | All models |
| Humidity offset | Humidity sensor calibration offset (-20 to 20 %) | All models |
| CO₂ offset | CO₂ sensor calibration offset (-500 to 500 ppm) | CGR1W, CGS2, CGDN1 |

### Selects

| Entity | Description | Options | Available for models |
|--------|-------------|---------|---------------------|
| eTVOC unit | Unit of measurement for eTVOC sensor | VOC index, ppb, mg/m³ | CGS2 |
| Temperature unit | Temperature display unit on device | Celsius, Fahrenheit | All models |

### Switches

| Entity | Description | Available for models |
|--------|-------------|---------------------|
| CO₂ auto-calibration | Enable or disable automatic CO₂ baseline calibration | CGR1W, CGDN1 |
| LED indicator | Enable or disable the device LED indicator | CGR1W |

### Buttons

| Entity | Description | Available for models |
|--------|-------------|---------------------|
| CO₂ calibration | Trigger a manual CO₂ calibration | CGR1W, CGDN1 |

## Data updates

The integration receives data via MQTT push. Devices publish sensor readings to the `qingping/{mac}/up` topic, and Home Assistant sends configuration commands to `qingping/{mac}/down`.

- **Online status check**: The integration checks device online status every 60 seconds. A device is marked offline after 15 minutes of inactivity.
- **Report interval**: Configurable per device via the report interval number entity. Changes are sent to the device immediately via MQTT.

## Known limitations

- Bluetooth-only Qingping devices are not supported. Only devices with MQTT enabled can be used.
- The integration does not support firmware updates. Use the Qingping app for firmware management.

## Troubleshooting

### Device not discovered during setup

Make sure your Qingping device is actively sending MQTT data before starting the setup process. Check that the MQTT broker receives messages on the `qingping/#` topic.

### Device shows as offline

- Check that the device is powered on and connected to your network.
- Verify the MQTT broker is running and accessible.
- Check the Home Assistant logs for MQTT connection errors.

## Removing the integration

This integration follows standard integration removal. No additional steps are required on the device side.

{% include integrations/remove_device_service.md %}
