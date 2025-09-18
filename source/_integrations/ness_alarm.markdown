---
title: Ness Alarm
description: Instructions on how to integrate a Ness alarm system with Home Assistant.
ha_category:
  - Alarm
  - Binary sensor
ha_release: 0.85
ha_iot_class: Local Push
ha_codeowners:
  - '@nickw444'
  - '@Poshy163'
ha_domain: ness_alarm
ha_platforms:
  - alarm_control_panel
  - binary_sensor
ha_integration_type: integration
ha_config_flow: true
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `ness_alarm` {% term integration %} will allow Home Assistant users who own a Ness alarm system to leverage their alarm system and its sensors to provide Home Assistant with information about their homes. Connectivity between Home Assistant and the alarm is accomplished through a IP232 module that must be connected to the alarm.

There is currently support for the following device types within Home Assistant:

- Binary sensor: Reports on zone statuses with configurable device classes
- Alarm control panel: Reports on alarm status, and can be used to arm/disarm the system

The module communicates via the [Ness D8x/D16x ASCII protocol](https://github.com/nickw444/nessclient/blob/master/D8-32X%20Serial%20Protocol%20Public.pdf).

{% include integrations/config_flow.md %}

During setup, you'll need to provide:
- **Host**: The hostname or IP address of your IP232 module
- **Port**: The port on which the IP232 module listens (default: 2401)
- **Scan Interval**: Time between updates in seconds (default: 60)
- **Infer Arming State**: Enable workaround for panels with firmware < v5.8

### Automatic Zone Detection

The integration automatically detects your panel model and creates the appropriate number of zone entities:
- **D8X/DPLUS8**: 8 zones (zones 9-32 disabled)
- **D16X**: 16 zones (zones 17-32 disabled)
- **D24X**: 24 zones (zones 25-32 disabled)
- **D32X**: All 32 zones enabled

All panels have 32 zone entities created, with appropriate zones automatically disabled based on the detected model. You can manually enable additional zones if you have expanders or a non-standard configuration.

### Options

After setup, you can modify settings through the integration options:

1. Go to **Settings** → **Devices & Services**
2. Find your Ness Alarm integration
3. Click **Configure**

Available options:
- **Scan interval**: 1-3600 seconds
- **Infer arming state**: Infer the disarmed arming state only via system status events. This works around a bug with some panels (<v5.8) which emit update.status = [] when they are armed.
- **Support home arm**: Enable ARM_HOME functionality
- **Number of Active Zones**: Manual override (8, 16, 24, or 32 zones)

The zone count option allows you to override the auto-detected panel capacity if you have zone expanders or if detection was incorrect.

## YAML Configuration (Deprecated)

{% warning %}
YAML configuration for Ness Alarm is deprecated. Your existing YAML configuration will be automatically imported on upgrade. After import, you'll receive a persistent notification with instructions to remove the `ness_alarm` section from your configuration.yaml file.
{% endwarning %}

If you have existing YAML configuration, it will be automatically imported when Home Assistant starts:

```yaml
# Example configuration.yaml entry (DEPRECATED - will be auto-imported)
ness_alarm:
  host: alarm.local
  port: 2401
  zones:
    - name: Garage
      id: 1
    - name: Storeroom
      id: 2
    - name: Kitchen
      id: 3
    - name: Front Entrance
      id: 4
    - name: Front Door
      id: 5
      type: door
```

### Zone Configuration

When importing from YAML, zone configurations are preserved including:
- **Zone ID**: The zone number on your alarm panel (1-32)
- **Zone Name**: Custom name for the zone
- **Zone Type**: Device class for the binary sensor

### Migration Process

1. On startup, Home Assistant detects your YAML configuration
2. The configuration is automatically imported to a config entry
3. A persistent notification appears with instructions
4. Remove the `ness_alarm` section from configuration.yaml
5. Restart Home Assistant to clear the warning

After import, zones that weren't explicitly configured in YAML will be created with default names (e.g., "Zone 6") and motion sensor type.

If import fails, check the logs for connection errors.

## Alarm System Configuration

1. Setting up the IP232 module with the correct baud rate (9600).
2. Ensuring connectivity of the device on either a DHCP assigned or Static IP address.
3. Setting the alarm panel up to allow for serial control. On D8x/D16x panels this is enabled by setting `P 199 E` `1E` to `6E` to be `ON` (6E available on v6 panels and later only).

If the settings in steps 1 and 2 are not set correctly, the integration will not be able to communicate properly with the device. If the `P 199 E` from step 3 is not configured properly, data will not be sent to the integration when events occur.

{% important %}
Incorrect configuration of these settings will prevent the integration from functioning properly.
{% endimportant %}

## Actions

### Action `aux`

Trigger an aux output. This requires PCB version 7.8 or higher.

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `output_id`    | No       | The aux output you wish to change. A number from 1-8. |
| `state`        | Yes      | The On/Off State, represented as true/false. Default is true. If P14xE 8E is enabled then a value of true will pulse output x for the time specified in P14(x+4)E. |

### Action `panic`

Trigger a panic

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `code`         | Yes      | The user code to use to trigger the panic. |

## Troubleshooting

### Connection Issues

If the integration fails to connect:
1. Verify the IP232 module is accessible on your network
2. Check that the port number is correct (default 2401)
3. Ensure no firewall is blocking the connection
4. Confirm the alarm panel settings are configured correctly (P 199 E)

### Zone Management

The integration creates all 32 zones automatically:
- Zones beyond your panel's capacity are disabled by default
- You can manually enable/disable zones in **Settings** → **Devices & Services** → **Ness Alarm** → **Entities**
- Use the zone count option in Configure to bulk enable/disable zones

### After YAML Import

If you still see YAML configuration warnings after import:
1. Check the persistent notification for specific instructions
2. Remove the entire `ness_alarm:` section from configuration.yaml
3. Restart Home Assistant to clear warnings
4. If issues persist, remove and re-add the integration through the UI

### Panel Model Detection

The integration automatically detects your panel model. If detection is incorrect:
1. Go to integration options (Configure button)
2. Set "Number of Active Zones" to match your panel:
   - 8 zones for D8X/DPLUS8
   - 16 zones for D16X
   - 24 zones for D24X
   - 32 zones for D32X
3. The integration will reload with the correct zones enabled
