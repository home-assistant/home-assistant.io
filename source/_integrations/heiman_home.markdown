---
title: Heiman Home
description: Instructions on how to integrate your Heiman smart home devices with Home Assistant.
ha_release: 2026.3
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: heiman_home
ha_platforms:
  - binary_sensor
  - button
  - select
  - sensor
  - switch
ha_integration_type: hub
ha_codeowners:
  - '@joostlek'
ha_quality_scale: bronze
---

The **Heiman Home** {% term integration %} allows you to connect your Heiman smart home devices to Home Assistant. This integration uses OAuth2 authentication to securely access your Heiman Home account and provides real-time monitoring and control of your devices through MQTT updates.

## Prerequisites

- You need a Heiman Home account with registered devices.
- The Heiman Home app must be installed and configured on your mobile device.
- Your devices must be properly connected to your Heiman Home account.

{% include integrations/config_flow.md %}

During setup, you will be redirected to the Heiman Home authorization page where you need to log in with your credentials and grant permissions to Home Assistant. If you have multiple homes configured in your Heiman Home account, you can select which homes to import devices from.

You can also choose how room names should be synchronized to Home Assistant areas:

{% configuration_basic %}
Area synchronization mode:
  description: "Choose how device areas should be synchronized: **Do not sync** (keep existing area assignments), **Room name** (use Heiman room names), **Home name** (use Heiman home names), or **Home name and Room name** (combine both)."
{% endconfiguration_basic %}

## Supported functionality

Heiman Home represents devices as various sensor types and control capabilities. The integration maps these capabilities to entities in Home Assistant.

- [Binary sensor](#binary-sensor)
- [Button](#button)
- [Select](#select)
- [Sensor](#sensor)
- [Switch](#switch)

### Binary sensor

In Home Assistant, a binary sensor entity will be created for each of the following Heiman device capabilities:

| Heiman capability            | Description                          |
|------------------------------|--------------------------------------|
| Smoke detection              | Smoke alarm status                   |
| CO alarm                     | Carbon monoxide alarm status         |
| Water leak                   | Water leak detection                 |
| Door/Window status           | Open/closed state                    |
| Motion detection             | Motion detected status               |
| Tamper alert                 | Device tampering detection           |
| Low battery                  | Battery level warning                |

### Button

The Heiman Home Button platform provides the following buttons:

| Button          | Description                        |
|-----------------|------------------------------------|
| Remote locate   | Trigger device location sound      |
| Remote check    | Perform remote device check        |
| Mute alarm      | Silence active alarms              |

### Select

The Heiman Home Select platform lets you configure device options:

| Select               | Description                        | Options                              |
|----------------------|------------------------------------|--------------------------------------|
| Alarm sound option   | Configure alarm sound pattern      | Fast Beep, Medium Beep, Slow Beep    |

### Sensor

The Heiman Home Sensor platform lets you view devices that have sensor-related capabilities. A Sensor entity is created for each attribute supported by the device.

| Heiman capability            | Related entities in Home Assistant       | Unit    |
|------------------------------|------------------------------------------|---------|
| Temperature                  | Current temperature readings             | °C      |
| Humidity                     | Current humidity levels                  | %       |
| Battery level                | Device battery percentage                | %       |
| Signal strength              | WiFi signal strength                     | dBm     |
| Power consumption            | Real-time power usage                    | W       |
| Energy usage                 | Total energy consumed                    | kWh     |
| CO concentration             | Carbon monoxide levels                   | PPM     |

### Switch

The Heiman Home Switch platform lets you control devices that have switch-related capabilities:

| Switch                       | Description                            |
|------------------------------|----------------------------------------|
| Light control                | Turn lights on/off                     |
| Freezing point protection    | Enable/disable freeze protection       |
| Buzzer control               | Enable/disable device buzzer           |

## Services

The integration provides the following services.

### Action: Read device properties

The `heiman_home.read_device_properties` action is used to manually read properties from a specific Heiman device. This service is useful for troubleshooting or forcing a refresh of device properties when automatic updates are not working as expected.

- **Data attribute**: `device_id`
  - **Description**: The ID of the device to read properties from.
  - **Optional**: No
  - **Example**: `"1234567890abcdef"`

```yaml
service: heiman_home.read_device_properties
data:
  device_id: "1234567890abcdef"
```

## Real-time updates

The **Heiman Home** integration uses MQTT for real-time device status updates, ensuring that device states are synchronized immediately when changes occur. This provides instant feedback when devices change state, such as when a smoke detector triggers or a door sensor detects movement.

## Area synchronization

Device areas in Home Assistant can be automatically synchronized with your Heiman Home room structure based on your chosen synchronization mode during setup. This helps maintain consistent organization between your Heiman Home app and Home Assistant.

## Troubleshooting

### Authentication issues

If you experience authentication problems:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Find the Heiman Home integration.
3. Select **Configure** to re-authenticate.
4. Follow the OAuth2 flow again.

### Devices not appearing

If your devices are not showing up:

1. Verify devices are online in the Heiman Home app.
2. Check that you selected the correct home during setup.
3. Review device filter settings if configured.
4. Try using the [`read_device_properties`](#action-read-device-properties) action to force a refresh.

### Connection issues

For connectivity problems:

1. Ensure your Heiman devices have a stable internet connection.
2. Check your Home Assistant instance has internet access.
3. Verify the Heiman Home cloud service is operational.
4. Review Home Assistant logs for error messages.

To enable debug logs, follow the [steps to enable debug logs](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics).

## Multi-home support

If you have multiple homes configured in your Heiman Home account, you can select which homes to import devices from. The integration supports importing devices from multiple homes simultaneously, allowing you to manage all your properties from a single Home Assistant instance.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

After deleting the integration, you may want to revoke the OAuth2 permissions in your Heiman Home account settings for security purposes.
