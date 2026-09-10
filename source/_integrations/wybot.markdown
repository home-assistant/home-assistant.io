---
title: WyBot
description: Instructions on how to integrate WyBot pool robots with Home Assistant.
ha_category:
  - Vacuum
ha_release: 2026.8
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@bassrock'
ha_domain: wybot
ha_platforms:
  - vacuum
ha_integration_type: hub
ha_quality_scale: silver
---

The **WyBot** {% term integration %} lets you control [WyBot pool robots](https://www.wybotpool.com/) from Home Assistant. Your pool robot is exposed as a [vacuum](/integrations/vacuum/) entity with start, stop, and return-to-dock control, and cleaning-mode selection.

The integration talks to the robot over Bluetooth when the dock is in range, and falls back to WyBot's cloud service when it is not.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
  description: The email address for your WyBot account.
Password:
  description: The password for your WyBot account.
{% endconfiguration_basic %}

Only one configuration entry per WyBot account is supported. A single account manages all of its docks and robots.

## Supported devices

The following devices are known to work with this integration:

- WyBot S2 Pro (with a DS20 solar dock)
- WyBot C1

Other WyBot models that use the same account and dock protocol are expected to work.

## Supported functionality

Each robot is represented as a Home Assistant device with a [vacuum](/integrations/vacuum/) entity.

### Vacuum

- **Vacuum**: Start, stop, and return-to-dock control, and cleaning-mode selection (Floor, Wall, Wall Then Floor, Advanced Full Pool, Water Line, Turbo Floor, Eco Floor).

## Examples

The `entity_id` values below are examples. Replace them with the ones created for your device, which you can find under {% my integrations title="Settings > Devices & services" %} or in **Developer Tools** > **States**.

Start cleaning every day at 8:00 AM:

{% raw %}

```yaml
alias: "WyBot - Start cleaning at 8 AM"
triggers:
  - trigger: time
    at: "08:00:00"
actions:
  - action: vacuum.start
    target:
      entity_id: vacuum.wybot_s2_pro
```

{% endraw %}

## Data updates

The integration polls for status every 30 seconds. It prefers a local Bluetooth connection to the dock and falls back to WyBot's cloud service (MQTT) when the dock is out of Bluetooth range. Commands (start, stop, return to dock) are also sent over Bluetooth first, falling back to the cloud.

## Known limitations

- **The robot goes offline underwater.** WyBot robots disconnect from Wi-Fi when submerged. The dock stays online and relays commands to the robot over Bluetooth, so control while the robot is in the water depends on the dock being powered and within Bluetooth range.
- **Cloud dependency for remote control.** When the dock is out of Bluetooth range of your Home Assistant host, the integration falls back to WyBot's cloud service. Remote control and status updates then depend on that service being reachable.

## Troubleshooting

### A device shows as unavailable

- Check that the dock is powered on and within Bluetooth range of your Home Assistant host or a Bluetooth proxy.
- If relying on the cloud fallback, confirm your Home Assistant host has internet access and WyBot's cloud service is reachable.

### Commands do not work

- Commands are sent over Bluetooth first, then the cloud. If the dock is at the edge of Bluetooth range, a write can fail transiently; the next attempt often succeeds.
- Confirm the dock is online and that the robot is docked, or in the water within range of the dock.

## Removing the integration

Removing this integration follows the standard removal process; no extra steps are required.

{% include integrations/remove_device_service.md %}
