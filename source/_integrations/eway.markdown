---
title: Eway
description: Integrate Eway micro inverters via MQTT protocol
ha_category:
  - Energy
  - Sensor
ha_release: 2023.1
ha_codeowners:
  - '@PuuuTao'
ha_iot_class: Local Push
ha_domain: eway
featured: false
ha_config_flow: true
ha_zeroconf: false
ha_platforms:
  - diagnostics
  - sensor
ha_integration_type: device
ha_quality_scale: bronze
---

Integrate Eway micro inverters into Home Assistant via MQTT protocol.

{% include integrations/config_flow.md %}

{% configuration_basic %}
MQTT Host:
    description: "The hostname or IP address of your MQTT broker."
MQTT Port:
    description: "The port of your MQTT broker (default: 1883)."
MQTT Username:
    description: "Username for MQTT authentication (optional)."
MQTT Password:
    description: "Password for MQTT authentication (optional)."
Device ID:
    description: "Your Eway device identifier."
Device Serial Number:
    description: "Your device's serial number."
Device Model:
    description: "Your device's model code (optional, default: Unknown)."
Scan Interval:
    description: "Data update interval in seconds (default: 30)."
{% endconfiguration_basic %}

## Overview

This is a Home Assistant integration for Eway
micro inverters that communicates with devices
via MQTT protocol.

## Features

- Real-time inverter data monitoring
- Support for multiple sensor types:
  - Power (W)
  - Voltage (V)
  - Current (A)
  - Frequency (Hz)
  - Temperature (°C)
  - Today's energy generation (kWh)
  - Total energy generation (kWh)

## Sensors

The integration provides the following sensors:

- **Generation Power**: Current power output (W)
- **Grid Voltage**: Grid voltage (V)
- **Input Voltage**: Input voltage from solar panels (V)
- **Input Current**: Input current from solar panels (A)
- **Grid Frequency**: Grid frequency (Hz)
- **Temperature**: Device temperature (°C)
- **Energy Today**: Today's energy production (kWh)
- **Energy Total**: Total energy production (kWh)
- **Error Code**: Device error code (if any)
- **Working Duration**: Total working time (seconds)

## Requirements

- Home Assistant 2023.1+
- aioeway library (automatically installed)
- MQTT broker

## Installation

No manual installation is required; this integration is included with Home Assistant.

## Configuration

After installation, you need to configure the integration:

1. Go to **Settings** > **Devices & Services**
2. Click **Add Integration**
3. Search for "Eway"
4. Enter your MQTT configuration:
    - **MQTT Host**: Your MQTT broker address
    - **MQTT Port**: MQTT broker port (default: 1883)
    - **MQTT Username**: Username for MQTT authentication
    - **MQTT Password**: Password for MQTT authentication
    - **Device ID**: Your Eway device identifier
    - **Device Serial Number**: Your device's serial number
    - **Device Model**: Your device's model code
    - **Scan Interval**: Data update interval in seconds (default: 30)

### Example MQTT Configuration

```yaml
# Example configuration.yaml (if using YAML configuration)
eway:
  mqtt_host: "your-mqtt-broker.com"
  mqtt_port: 1883
  mqtt_username: "your_username"
  mqtt_password: "your_password"
  device_id: "your_device_id"
  device_sn: "your_device_serial"
  device_model: "your_device_model"
  scan_interval: 30
```

## MQTT Topics
The integration uses the following MQTT topic structure:

- {device_id}/{device_sn}/data/post - Device data updates
- {device_id}/{device_sn}/info/post - Device information updates
- {device_id}/{device_sn}/data/request - Request device data
- {device_id}/{device_sn}/info/request - Request device information

### Data Format
Device data is published as JSON array:

```json
[
  {
    "sort": 0,
    "inputVoltage": 35.2,
    "inputCurrent": 7.1,
    "gridVoltage": 230.2,
    "gridFreq": 50.0,
    "genPower": 250.5,
    "genPowerToDay": 12500,
    "genPowerTotal": 1250,
    "temperature": 45.2,
    "errCode": 0,
    "duration": 25200
  }
]
```

### Device Information Format

```json
{
  "netFirmVer": 1.2,
  "appFirmVer": 2.1,
  "wifiSsid": "MyWiFi",
  "ip": "192.168.1.100",
  "wifiIsNormal": 0,
  "isLock": 0,
  "board": []
}
```

## Troubleshooting

1. Ensure MQTT broker is running and accessible
2. Check if device ID is correct
3. Verify MQTT topics and data format
4. Check Home Assistant logs for detailed error information

## Support
For issues, please visit: https://github.com/PuuuTao/aioeway
