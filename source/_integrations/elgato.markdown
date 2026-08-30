---
title: Elgato Light
description: Instructions on how to integrate an Elgato Light with Home Assistant.
ha_category:
  - Light
ha_release: 0.104
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_domain: elgato
ha_zeroconf: true
ha_platforms:
  - button
  - diagnostics
  - light
  - number
  - sensor
  - switch
ha_integration_type: device
related:
  - docs: /docs/configuration/troubleshooting/#debug-logs-and-diagnostics
    title: Debug logs and diagnostics
ha_quality_scale: platinum
ha_dhcp: true
---

The **Elgato Light** {% term integration %} lets you control [Elgato](https://www.elgato.com/) LED lighting devices locally over your network. Elgato Lights are designed for streamers, content creators, and home studio setups, and are commonly used on platforms like YouTube and Twitch.

Use cases for this integration include:

- Turning your studio lights on and off automatically when your streaming software starts or stops.
- Adjusting brightness and color temperature based on the time of day.
- Using a light as a visual notification, for example, to flash when a doorbell is pressed or a timer finishes.
- Monitoring the battery level of portable Key Light Mini devices.

## Supported devices

The following Elgato lighting devices are known to be supported:

- [Elgato Key Light](https://www.elgato.com/en/key-light)
- [Elgato Key Light Air](https://www.elgato.com/en/key-light-air)
- [Elgato Key Light Mini](https://www.elgato.com/en/key-light-mini)
- [Elgato Ring Light](https://www.elgato.com/en/ring-light)
- [Elgato Light Strip](https://www.elgato.com/en/light-strip)

## Prerequisites

Your Elgato Light must be powered on and connected to your local network. In most cases, the integration automatically discovers the device on your network.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your Elgato Light device. This is only shown when adding the device manually. Devices discovered automatically through zeroconf are added without any input required."
{% endconfiguration_basic %}

## Supported functionality

### Lights

The integration creates a light entity for each Elgato Light device. You can control:

- On/off state
- Brightness
- Color temperature
- Color (for devices that support color, such as the Light Strip, detected automatically)

### Buttons

- **Identify**
  - **Description**: Briefly flashes the Elgato Light so you can identify which device it is. Also usable as a visual notification.
  - **Entity category**: Configuration

- **Restart**
  - **Description**: Restarts the Elgato Light device.
  - **Entity category**: Configuration

### Numbers

- **Power-on brightness**
  - **Description**: The brightness the light uses when it powers on, as a percentage. Only applied when **Power-on behavior** is set to **Use defaults**.
  - **Entity category**: Configuration

- **Power-on color temperature**
  - **Description**: The color temperature the light uses when it powers on. Only applied when **Power-on behavior** is set to **Use defaults**. Shows as unknown on a light configured to power on to a color instead of a color temperature.
  - **Entity category**: Configuration

### Sensors

- **Battery**
  - **Description**: The current battery level of your Elgato Key Light Mini, as a percentage. Only available on Key Light Mini.

- **Wi-Fi signal strength**
  - **Description**: How good the connection to your Wi-Fi network is, as a percentage. Useful for tracking down a device that keeps becoming unavailable.
  - **Entity category**: Diagnostic

- **Wi-Fi RSSI**
  - **Description**: The same signal in dBm, the unit the device itself reports. Disabled by default.
  - **Entity category**: Diagnostic

### Switches

- **Studio mode**
  - **Description**: Toggles studio mode on the Key Light Mini. When studio mode is enabled, the device bypasses the battery and runs directly from the power adapter. Only available on Key Light Mini.

{% include integrations/actions.md %}

## Examples

### Turn on lights when streaming software starts

Automatically turn on your Elgato Key Light when OBS (or any other streaming software) starts streaming, using an entity exposed by an OBS integration:

```yaml
alias: "Turn on key light when streaming"
triggers:
  - trigger: state
    entity_id: binary_sensor.obs_streaming
    to: "on"
actions:
  - action: light.turn_on
    target:
      entity_id: light.elgato_key_light
    data:
      brightness_pct: 80
      color_temp_kelvin: 5600
```

### Low battery notification for Key Light Mini

Send a mobile notification when the Key Light Mini battery drops below 20%:

```yaml
alias: "Key Light Mini low battery"
triggers:
  - trigger: numeric_state
    entity_id: sensor.elgato_key_light_mini_battery
    below: 20
actions:
  - action: notify.send_message
    target:
      entity_id: notify.my_device
    data:
      title: "Key Light Mini"
      message: "Battery is below 20%."
```

## Data updates

The integration polls the Elgato Light device every 10 seconds over the local network for its current state.

## Known limitations

- The integration communicates with the Elgato Light device over the local network. If the device is not reachable, its entities become unavailable.
- Color control is only available on devices that support it, such as the Light Strip. Color temperature and brightness are available on all supported models.
- The battery level sensor and studio mode switch are only available on the Key Light Mini, as other models do not have a built-in battery.
- The power-on settings are stored on the device itself, so they also apply when the light is switched on at the wall rather than through Home Assistant.

## Troubleshooting

### Cannot connect during setup

If you see a "Cannot connect" error during setup, verify that:

1. The Elgato Light device is powered on and connected to your network.
2. The hostname or IP address you entered in **Host** is correct.
3. Home Assistant can reach the device on the local network.

Most Elgato Lights are discovered automatically via zeroconf, so manual setup is rarely needed. If the device is not discovered, check that zeroconf/mDNS traffic is not blocked on your network.

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
