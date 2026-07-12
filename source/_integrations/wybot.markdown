---
title: WyBot
description: Instructions on how to integrate WyBot pool robots with Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Sensor
  - Vacuum
ha_release: 2026.8
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bassrock'
ha_domain: wybot
ha_platforms:
  - binary_sensor
  - button
  - diagnostics
  - sensor
  - vacuum
ha_integration_type: hub
ha_bluetooth: true
ha_quality_scale: platinum
---

The **WyBot** {% term integration %} lets you control [WyBot pool robots](https://www.wybotpool.com/) from Home Assistant. Your pool robot is exposed as a {% term vacuum %} entity with start, stop, and return-to-dock control, cleaning-mode selection, battery monitoring, and (on solar docks) solar-charging status.

The integration talks to the robot over Bluetooth when the dock is in range, and falls back to WyBot's cloud service when it is not.

{% include integrations/config_flow.md %}

{% include integrations/option_flow.md %}

The WiFi network name and password are optional. They are only used for manually re-sending WiFi credentials to the dock over Bluetooth using the **Send WiFi credentials** button, which is disabled by default.

{% configuration_basic %}
Email:
  description: The email address for your WyBot account.
Password:
  description: The password for your WyBot account.
WiFi network name:
  description: The name (SSID) of the WiFi network the dock should join. Only used for manual WiFi provisioning through the diagnostic button. If set, the WiFi password is required.
WiFi password:
  description: The password for the WiFi network above.
{% endconfiguration_basic %}

Only one configuration entry per WyBot account is supported. A single account manages all of its docks and robots.

## Discovery

If a WyBot DS20 dock is within Bluetooth range of your Home Assistant host or a Bluetooth proxy, it is discovered automatically and Home Assistant prompts you to set up the integration. You still need to enter your WyBot account credentials to complete setup.

## Supported devices

The following devices are known to work with this integration:

- WyBot S2 Pro (with a DS20 solar dock)
- WyBot C1

Other WyBot models that use the same account and dock protocol are expected to work.

## Supported functionality

Each robot, and its dock when present, is represented as a Home Assistant device with the following entities.

### Vacuum

| Entity | Description |
| ------ | ----------- |
| Vacuum | Start, stop, and return-to-dock control, and cleaning-mode selection (Floor, Wall, Wall Then Floor, Advanced Full Pool, Water Line, Turbo Floor, Eco Floor). |

### Sensors

| Entity | Description |
| ------ | ----------- |
| Robot battery | The robot's battery level, as a percentage. |
| Dock battery | The solar dock's battery level, as a percentage. |
| Solar energy harvested | The total energy harvested by the solar dock. |
| Dock type | Whether the dock is a standard or solar dock. |
| Data source | Whether the robot is currently reached over Bluetooth or the cloud. |
| Last BLE communication | Timestamp of the last successful Bluetooth poll. |
| Last MQTT communication | Timestamp of the last cloud message received. |

### Binary sensors

| Entity | Description |
| ------ | ----------- |
| Robot charging | Whether the robot is charging. |
| Dock charging | Whether the solar dock is actively charging. |

### Buttons

| Entity | Description |
| ------ | ----------- |
| Send WiFi credentials | Sends the configured WiFi credentials to the dock over Bluetooth. Diagnostic, and disabled by default. |

## Examples

The `entity_id` values below are examples. Replace them with the ones created for your device, which you can find under **{% my integrations title="Settings > Devices & services" %}** or in **Developer Tools > States**.

Start cleaning every day at 8:00:

{% raw %}

```yaml
alias: "WyBot - Start cleaning at 8am"
triggers:
  - trigger: time
    at: "08:00:00"
actions:
  - action: vacuum.start
    target:
      entity_id: vacuum.wybot_s2_pro
mode: single
```

{% endraw %}

Notify when the robot battery is fully charged:

{% raw %}

```yaml
alias: "WyBot - Notify when battery full"
triggers:
  - trigger: numeric_state
    entity_id: sensor.wybot_s2_pro_robot_battery
    above: 99
actions:
  - action: notify.notify
    data:
      title: WyBot
      message: "The pool robot is fully charged and ready to clean."
mode: single
```

{% endraw %}

## Data updates

The integration polls for status every 30 seconds. It prefers a local Bluetooth connection to the dock and falls back to WyBot's cloud service (MQTT) when the dock is out of Bluetooth range. Commands (start, stop, return to dock) are also sent over Bluetooth first, falling back to the cloud.

## Known limitations

- **The robot goes offline underwater.** WyBot robots disconnect from WiFi when submerged. The dock stays online and relays commands to the robot over Bluetooth, so control while the robot is in the water depends on the dock being powered and within Bluetooth range.
- **Cloud dependency for remote control.** When the dock is out of Bluetooth range of your Home Assistant host, the integration falls back to WyBot's cloud service. Remote control and status updates then depend on that service being reachable.
- **The dock must be set up before the robot.** WiFi provisioning happens on the dock before the robot is paired. There is no way to change the dock's WiFi after the robot has been paired.

## Troubleshooting

### A device shows as unavailable

- Check that the dock is powered on and within Bluetooth range of your Home Assistant host or a Bluetooth proxy.
- If relying on the cloud fallback, confirm your Home Assistant host has internet access and WyBot's cloud service is reachable.
- Check the **Data source** and **Last BLE communication** / **Last MQTT communication** diagnostic sensors to see how, and when, the device was last reached.

### Commands do not work

- Commands are sent over Bluetooth first, then the cloud. If the dock is at the edge of Bluetooth range, a write can fail transiently; the next attempt often succeeds.
- Confirm the dock is online and that the robot is docked, or in the water within range of the dock.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
