---
title: Victron GX Communication Center Integration
description: Instructions for connecting Victron Energy GX devices to Home Assistant using MQTT
ha_category:
  - Select
  - Sensor
ha_release: '2026.5'
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@tomer-w'
ha_domain: victron_gx
ha_platforms:
  - select
  - sensor
ha_integration_type: hub
related:
  - url: https://www.victronenergy.com/communication-centres/cerbo-gx
    title: Cerbo GX communication centre
  - url: https://github.com/tomer-w/victron_mqtt
    title: Victron MQTT Python library
  - url: https://tomer-w.github.io/victron_mqtt/
    title: Supported entities documentation
ha_quality_scale: bronze
---

The **Victron GX Integration** integration connects to [Victron Energy](https://www.victronenergy.com/) GX devices using MQTT, providing real-time monitoring and control of your Victron system, including inverters, solar chargers, battery systems, grid meters, and <abbr title="electric vehicle">EV</abbr> chargers.

## Supported devices

This integration supports Victron Energy devices that run Venus OS and have MQTT enabled, including:

- Cerbo GX
- Venus GX
- Color Control GX
- MultiPlus inverters
- Quattro inverters
- Solar charge controllers
- Battery monitors
- <abbr title="electric vehicle">EV</abbr> charging stations

## Prerequisites

- A Victron Energy GX device running Venus OS with MQTT enabled.
- Network connectivity between your Home Assistant instance and the Victron device.
- For secured installations: The MQTT password configured on your Victron device.

{% include integrations/config_flow.md %}

When setting up the integration manually, you need to provide connection details based on your Victron device's security profile.

On the Victron device, go to **Settings** > **General** and check the **Local Network Security Profile** setting. This can be **Unsecured**, **Weak**, or **Secured**. If set to **Weak** or **Secured**, you must have specified a password when configuring this option.

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your Victron device. The default is `venus.local`."
Port:
  description: "The MQTT port number. Use `1883` for unsecured connections or `8883` for secured connections."
Username:
  description: "Leave blank for unsecured and weak/secured profiles. Only use `root` if Venus OS is rooted with SSH access enabled."
Password:
  description: "Leave blank for unsecured profile. Enter the password you defined when setting the security profile to **Weak** or **Secured**."
SSL:
  description: "Enable for secured connections (port 8883). Disable for unsecured connections (port 1883)."
{% endconfiguration_basic %}

## Data updates

Entities are updated only when new values are received from the device, but no more frequently than every 30 seconds.

## Supported functionality

The integration automatically discovers and creates entities for all supported Victron devices on your system. The exact entities available depend on your specific Victron hardware configuration.

### Entities

The **Victron GX** integration provides the following types of entities:

#### Sensors

Read-only sensors for monitoring system metrics, such as:

- Battery voltage, current, power, temperature, and state of charge
- Solar panel voltage, current, power, and daily yield
- Grid voltage, current, power, and energy consumption
- Inverter input and output power, frequency, and state
- <abbr title="electric vehicle">EV</abbr> charger status, power, and session energy

#### Selects

Configurable options for controlling device behavior, such as:

- Inverter mode (on, off, charger only, inverter only)
- Solar charger mode
- Relay function configuration
- <abbr title="electric vehicle">EV</abbr> charger charge mode (auto, manual, or scheduled charge)
- <abbr title="Energy Storage System">ESS</abbr> mode (optimized with or without phase compensation, or external control)
- <abbr title="Dynamic Energy Storage System">DESS</abbr> mode (auto/VRM, buy, sell, off, or Node-RED)
- <abbr title="Energy Storage System">ESS</abbr> schedule charge slot days
## Troubleshooting

### Cannot connect

#### Symptom: Connection fails during setup

#### Description

The integration cannot establish a connection to your Victron device.

#### Resolution

To resolve this issue, try the following steps:

1. Verify your Victron device is powered on and connected to your network.
2. Check that the hostname or IP address is correct.
3. Ensure that MQTT is enabled on your Victron device.
4. Test connectivity from Home Assistant by opening a terminal and running:

   ```bash
   nc -zv <VICTRON_IP> <MQTT_PORT>
   ```

   Replace `<VICTRON_IP>` with your device's IP address and `<MQTT_PORT>` with the MQTT port (usually `1883` or `8883`). If you get a timeout or error, there is a network connectivity issue.

5. If Venus OS is rooted (SSH access enabled):
   - Use port `8883`
   - Enable SSL
   - Use username `root`
   - Use the password you defined to protect the instance

### Authentication failed

#### Symptom: Authentication error during setup

#### Description

The credentials provided are incorrect.

#### Resolution

1. Double-check the username and password if authentication is enabled.
2. These are device credentials configured on the Victron device, not <abbr title="Victron Remote Monitoring">VRM</abbr> portal credentials.
3. Verify the security profile setting on your Victron device under **Settings** > **General** > **Local Network Security Profile**.

### No sensors appear

#### Symptom: Integration sets up but no entities are created

#### Description

The integration cannot discover or create entities from MQTT topics.

#### Resolution

1. Verify that MQTT topics are being published by your Victron device.
2. Check the Home Assistant logs under **Settings** > **System** > **Logs** for any error messages.
3. Ensure the MQTT service on the Victron device is running and configured correctly.
4. Try increasing the **Elevated tracing** option in the integration settings for more detailed logging.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
