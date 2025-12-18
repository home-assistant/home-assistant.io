---
title: Lytiva
description: Instructions on how to integrate Lytiva devices with Home Assistant.
ha_category:
  - Light
ha_release: 2025.2
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@convasys'
ha_domain: lytiva
ha_platforms:
  - light
---

The **Lytiva** integration allows you to control Lytiva smart home devices through Home Assistant via MQTT.

- Currently, this integration supports **light** devices. Additional platforms (switch, cover, climate, fan, sensor, binary sensor, and scene) will be added in future updates.

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
   - **Username**: MQTT username
   - **Password**: MQTT password
5. Click **Submit**

Home Assistant will automatically discover your Lytiva light devices via MQTT discovery.

## Supported Devices

### Lights

The Lytiva integration currently supports light devices with the following features:

- On/Off control
- Brightness adjustment
- RGB color control (if supported by device)
- Color temperature control (if supported by device)

- Additional device types (switches, covers, climate controls, fans, sensors, and scenes) will be added in future releases.

## MQTT Topics

Lytiva uses the following MQTT topic structure:

- **Discovery**: `LYT/homeassistant/{device_type}/{unique_id}/config`
- **Integration Status**: `LYT/homeassistant/status`

## Protocol Details

The integration uses the [lytiva-connect](https://pypi.org/project/lytiva-connect/) library. 

- **Commands**: Payloads are sent as JSON with this fields : `dimming` (0-100), `r`, `g`, `b`, or `color_temperature`.
- **Status**: Devices return status in a nested JSON format, for example: `{"type": "cct", "cct": {"dimming": 40, "color_temperature": 50}}`.

## Options

After adding the integration, you can configure additional options:

1. Go to **Settings** → **Devices & Services**
2. Find the **Lytiva** integration
3. Click **Configure**

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

### Set light color based on time of day

{% raw %}
```yaml
automation:
  - alias: "Warm light in evening"
    trigger:
      - platform: time
        at: "18:00:00"
    action:
      - service: light.turn_on
        target:
          entity_id: light.lytiva_bedroom
        data:
          brightness: 180
          color_temp: 370
```
{% endraw %}

### Turn off all Lytiva lights at bedtime

{% raw %}
```yaml
automation:
  - alias: "Bedtime - turn off all lights"
    trigger:
      - platform: time
        at: "23:00:00"
    action:
      - service: light.turn_off
        target:
          entity_id: all
        data:
          entity_id: "light.lytiva_*"
```
{% endraw %}

## Troubleshooting

### Devices not discovered

1. Verify your MQTT broker is running and accessible
2. Check that Lytiva devices are publishing

### Devices not responding to commands

1. Verify MQTT broker connectivity
2. Check that devices are subscribed to command topics
3. Verify username/password if authentication is enabled on your MQTT broker

## Removing the integration

1. Go to **Settings** → **Devices & Services**
2. Find the **Lytiva** integration
3. Click the three dots menu
4. Select **Delete**
5. Confirm deletion

All Lytiva devices and entities will be removed from Home Assistant.

## Future Updates

The following platforms are planned for future releases:

- Switch
- Cover
- Climate
- Fan
- Sensor
- Binary Sensor
- Scene

## Support

For issues, feature requests, or questions:

- [GitHub Issues](https://github.com/home-assistant/core/issues)
- [Home Assistant Community Forum](https://community.home-assistant.io/)
