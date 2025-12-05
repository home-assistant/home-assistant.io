---
title: Lytiva
description: Instructions on how to integrate Lytiva devices with Home Assistant.
ha_category:
  - Light
  - Switch
  - Cover
  - Climate
  - Fan
  - Sensor
  - Binary Sensor
  - Scene
ha_release: 2025.2
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@lytiva'
ha_domain: lytiva
ha_platforms:
  - binary_sensor
  - climate
  - cover
  - fan
  - light
  - scene
  - sensor
  - switch
---

The **Lytiva** integration allows you to control Lytiva smart home devices through Home Assistant via MQTT.

## Prerequisites

- A running MQTT broker (e.g., Mosquitto)
- Lytiva devices configured and connected to your network
- Network connectivity between Home Assistant and your MQTT broker

## Configuration

The Lytiva integration is configured via the Home Assistant user interface.

### Adding Lytiva to Home Assistant

1. Go to **Settings** → **Devices & Services**
2. Click the **+ Add Integration** button
3. Search for and select **Lytiva**
4. Enter your MQTT broker details:
   - **MQTT Broker**: IP address or hostname of your MQTT broker
   - **Port**: MQTT broker port (default: 1883)
   - **Username**: MQTT username (if you have !)
   - **Password**: MQTT password (if you have !)
5. Click **Submit**

Home Assistant will automatically discover your Lytiva devices via MQTT discovery.

## Supported Devices

The Lytiva integration supports the following device types:

### Lights
- On/Off control
- Brightness adjustment
- Color temperature control (if supported by device)
- RGB color control (if supported by device)
- State monitoring

### Switches
- On/Off control
- State monitoring

### Covers
- Open/Close/Stop control
- Position control
- State monitoring

### Climate
- Temperature control
- HVAC mode selection
- On/Off control
- State monitoring

### Fans
- On/Off control
- Speed control
- State monitoring

### Sensors
- Temperature & humidity sensors
- CO2 sensors
- lux sensors

### Binary Sensors
- Human presence sensors
- In-Out sensors
- Parking sensors

### Scenes
- Scene activation

## MQTT Topics

Lytiva uses the following MQTT topic structure:

- **Discovery**: `homeassistant/{platform}/{device_id}/config`
- **Status**: `LYT/{address}/NODE/E/STATUS` or `LYT/{address}/GROUP/E/STATUS` or `LYT/{address}/SCENE/E/STATUS`
- **Command**: `LYT/{address}/NODE/CONTROL` or `LYT/{address}/GROUP/CONTROL` or `LYT/{address}/SCENE/CONTROL`

## Options

After adding the integration, you can configure additional options:

1. Go to **Settings** → **Devices & Services**
2. Find the **Lytiva** integration
3. Click **Configure**
4. Adjust the **Discovery Prefix** if needed (default: `homeassistant`)

## Automation Examples

### Turn on a Lytiva light at sunset

{% raw %}
```yaml
automation:
  - alias: "Turn on Lytiva light at sunset"
    trigger:
      - platform: sun
        event: sunset
    action:
      - service: light.turn_on
        target:
          entity_id: light.lytiva_living_room
        data:
          brightness: 200
```
{% endraw %}

### Control Lytiva cover based on temperature

{% raw %}
```yaml
automation:
  - alias: "Close covers when hot"
    trigger:
      - platform: numeric_state
        entity_id: sensor.lytiva_temperature
        above: 30
    action:
      - service: cover.close_cover
        target:
          entity_id: cover.lytiva_bedroom_curtain
```
{% endraw %}

### Activate a Lytiva scene

{% raw %}
```yaml
automation:
  - alias: "Movie time scene"
    trigger:
      - platform: state
        entity_id: media_player.living_room_tv
        to: "playing"
    action:
      - service: scene.turn_on
        target:
          entity_id: scene.lytiva_movie_mode
```
{% endraw %}

## Troubleshooting

### Devices not discovered

1. Verify your MQTT broker is running and accessible
2. Check that Lytiva devices are publishing discovery messages
3. Verify the discovery prefix matches (default: `homeassistant`)

### Devices not responding to commands

1. Verify MQTT broker connectivity
2. Check that devices are subscribed to command topics
3. Verify username/password if authentication is enabled
4. Check device-specific logs for errors

## Removing the integration

1. Go to **Settings** → **Devices & Services**
2. Find the **Lytiva** integration
3. Click the three dots menu
4. Select **Delete**
5. Confirm deletion

All Lytiva devices and entities will be removed from Home Assistant.

## Support

For issues, feature requests, or questions:

- [GitHub Issues](https://github.com/home-assistant/core/issues)
- [Home Assistant Community Forum](https://community.home-assistant.io/)
