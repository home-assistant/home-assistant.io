---
title: Hisense Air Conditioner
description: Instructions on how to integrate Hisense air conditioners, water heaters, and dehumidifiers into Home Assistant.
ha_category:
  - Climate
  - Water Heater
  - Sensor
  - Switch
  - Number
  - Humidifier
ha_release: 2024.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Connectlife-LLC'
ha_domain: hisense_ac_plugin
ha_platforms:
  - climate
  - sensor
  - switch
  - water_heater
  - number
  - humidifier
ha_integration_type: hub
---

The Hisense Air Conditioner integration allows you to control and monitor Hisense air conditioners, water heaters, dehumidifiers, and other connected devices through the ConnectLife cloud platform.

## Supported Devices

This integration supports the following Hisense device types:

- **Split Air Conditioners** (009-199): Full-featured climate control with cooling, heating, dehumidification, and fan modes
- **Window Air Conditioners** (008-399): Basic air conditioning functionality
- **Portable Air Conditioners** (006-299): Mobile cooling units
- **Dehumidifiers** (007-xxx): Humidity control and dehumidification
- **Water Heaters** (035-699): Heat pump water heater systems with multi-zone control
- **Humidifiers** (016-xxx): Humidity regulation devices

## Features

- **Real-time Control**: Temperature, mode, fan speed, swing control
- **Status Monitoring**: Indoor temperature, humidity, energy consumption
- **Fault Diagnostics**: Device self-check and fault reporting
- **Energy Statistics**: Hourly power consumption data
- **Real-time Updates**: WebSocket connection for live status updates
- **Application Credentials**: Secure OAuth2 authentication

## Configuration

### Prerequisites

- Home Assistant 2023.1 or later
- Hisense ConnectLife account
- Devices connected to the ConnectLife platform

### Setup

1. In Home Assistant, go to **Settings** → **Devices & Services** → **Add Integration**
2. Search for "Hisense Air Conditioner"
3. Click **Configure**
4. Complete the OAuth2 authorization process using your Hisense ConnectLife account
5. Authorize the application to access your devices
6. Return to Home Assistant to complete the setup

The integration will automatically discover and add your connected devices.

## Application Credentials

This integration supports Home Assistant's Application Credentials system for enhanced security:

1. Go to **Settings** → **Devices & Services** → **Application Credentials**
2. Click **Create Credential**
3. Select "Hisense Air Conditioner"
4. Complete the OAuth2 authorization process
5. Use the created credential when configuring the integration

## Entities

### Climate Entities
- **Main Control**: Power, mode, temperature, fan speed
- **Attributes**: Indoor temperature, indoor humidity, energy consumption

### Sensor Entities
- **Temperature Sensors**: Indoor temperature, inlet water temperature, outlet water temperature
- **Humidity Sensors**: Indoor humidity
- **Energy Sensors**: Power consumption statistics
- **Fault Sensors**: Device fault status

### Switch Entities
- **Feature Switches**: Quiet mode, rapid mode, 8-degree heating
- **Status Switches**: Device online status

### Number Entities
- **Temperature Settings**: Target temperature adjustment
- **Humidity Settings**: Target humidity adjustment

## Troubleshooting

### Common Issues

#### Devices Not Appearing
- Verify OAuth2 authorization was successful
- Check that devices are connected to ConnectLife platform
- Ensure network connectivity
- Check Home Assistant logs for error messages

#### Controls Not Responding
- Verify device online status
- Check network connection
- Restart Home Assistant
- Re-authorize OAuth2 if needed

#### Delayed Status Updates
- Check WebSocket connection status
- Verify network connectivity
- Restart the integration

### Logs

Enable debug logging to troubleshoot issues:

```yaml
logger:
  logs:
    custom_components.hisense_ac_plugin: debug
```

### Diagnostics

Export diagnostic information:

1. Go to **Settings** → **System** → **Logs**
2. Click **Download Diagnostics**
3. Select "Hisense AC Plugin" integration
4. Download the diagnostic file

## Automation Examples

### Temperature Control
```yaml
automation:
  - alias: "Auto AC Control"
    trigger:
      - platform: numeric_state
        entity_id: sensor.living_room_temperature
        above: 26
    action:
      - service: climate.set_temperature
        target:
          entity_id: climate.living_room_ac
        data:
          temperature: 24
          hvac_mode: cool
```

### Energy Monitoring
{% raw %}
```yaml
automation:
  - alias: "High Energy Alert"
    trigger:
      - platform: numeric_state
        entity_id: sensor.ac_power_consumption
        above: 2.0
    action:
      - service: notify.mobile_app
        data:
          message: "AC energy consumption high: {{ states('sensor.ac_power_consumption') }}kWh"
```
{% endraw %}

### Fault Notification
{% raw %}
```yaml
automation:
  - alias: "Device Fault Alert"
    trigger:
      - platform: state
        entity_id: sensor.ac_fault_status
        to: "fault"
    action:
      - service: notify.mobile_app
        data:
          message: "AC device fault: {{ state_attr('sensor.ac_fault_status', 'fault_details') }}"
```
{% endraw %}

## Support

For support and bug reports:
- [GitHub Issues](https://github.com/Connectlife-LLC/HomeAssistantPlugin/issues)
- [Home Assistant Community](https://community.home-assistant.io/)

## License

This integration is licensed under the MIT License.
