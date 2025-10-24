---
title: Hisense ConnectLife
description: Instructions on how to integrate Hisense air conditioners into Home Assistant through the ConnectLife cloud platform.
ha_category:
  - Climate
ha_release: 2024.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Connectlife-LLC'
ha_domain: hisense_connectlife
ha_platforms:
  - climate
ha_integration_type: hub
ha_quality_scale: platinum
---

The Hisense ConnectLife integration allows you to control and monitor Hisense air conditioners through the ConnectLife cloud platform.

## Supported Devices

This integration supports the following Hisense air conditioner types:

- **Split Air Conditioners** (009-199): Full-featured climate control with cooling, heating, dehumidification, and fan modes
- **Window Air Conditioners** (008-399): Basic air conditioning functionality  
- **Portable Air Conditioners** (006-299): Mobile cooling units

## Features

- **Real-time Control**: Temperature, mode, fan speed, swing control
- **Status Monitoring**: Indoor temperature, humidity, energy consumption
- **Fault Diagnostics**: Device self-check and fault reporting
- **Energy Statistics**: Hourly power consumption data
- **Real-time Updates**: WebSocket connection for live status updates
- **Application Credentials**: Secure OAuth2 authentication

## Entities

### Climate Entities

| Entity | Domain | Description |
|--------|--------|-------------|
| Air Conditioner | `climate` | Main entity that represents an air conditioner unit with full climate control functionality |

The climate entity provides the following features:

- **Temperature Control**: Set target temperature for cooling/heating
- **Mode Control**: Switch between cooling, heating, dehumidification, fan-only, and auto modes
- **Fan Speed Control**: Adjust fan speed (low, medium, high, auto)
- **Swing Control**: Enable/disable air swing functionality
- **Power Control**: Turn device on/off
- **Status Monitoring**: Real-time indoor temperature and humidity readings

## Prerequisites

Before using this integration, you'll need a Hisense ConnectLife account and air conditioners connected to the ConnectLife platform. You can set this up via the Hisense ConnectLife mobile app.

{% include integrations/config_flow.md %}

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
    homeassistant.components.hisense_connectlife: debug
```

### Diagnostics

Export diagnostic information:

1. Go to **Settings** → **System** → **Logs**
2. Click **Download Diagnostics**
3. Select "Hisense ConnectLife" integration
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

### Temperature Monitoring
{% raw %}
```yaml
automation:
  - alias: "AC Temperature Alert"
    trigger:
      - platform: numeric_state
        entity_id: climate.living_room_ac
        attribute: current_temperature
        above: 30
    action:
      - service: notify.mobile_app
        data:
          message: "Room temperature high: {{ state_attr('climate.living_room_ac', 'current_temperature') }}°C"
```
{% endraw %}

 
