---
title: Airobot
description: Instructions on how to integrate Airobot smart thermostats for intelligent floor heating control into Home Assistant.
ha_release: 2025.12
ha_iot_class: Local Polling
ha_codeowners:
  - '@mettolen'
ha_domain: airobot
ha_integration_type: device
ha_dhcp: true
ha_config_flow: true
ha_quality_scale: silver
ha_category: []
ha_platforms:
  - climate
  - diagnostics
  - number
  - sensor
---

The **Airobot** {% term integration %} allows you to control and monitor [Airobot](https://airobothome.com/) smart thermostats for intelligent floor heating control via the local REST API. The thermostat uses adaptive learning with a <abbr title="Time Proportional Integral">TPI</abbr> algorithm to maintain stable temperatures and optimize energy efficiency. Optional built-in CO₂ and humidity sensors monitor indoor air quality for a healthier living environment.

## Supported devices

The following devices are supported by the integration:

- Airobot Smart Thermostat TE1 with firmware version 1.8 or later

## Prerequisites

Before setting up the integration, ensure your Airobot thermostat is properly configured:

1. Verify your thermostat has firmware version 1.8 or later. You can check the firmware version in the thermostat settings menu.
2. Connect the thermostat to your local WiFi or Ethernet network.
3. Connect to the internet at least once to register with the Airobot server. During this initial connection, the thermostat receives its Device ID (username) and password.
4. In the thermostat settings menu, navigate to **Connectivity** > **Local API** > **Enable** to enable the local REST API (disabled by default).
5. Note your Device ID and password from the thermostat menu under **Connectivity** > **Mobile app** screen. You will need these during setup. These are the same credentials used to pair the mobile app.

After initial setup, the thermostat does not require internet connectivity to function with Home Assistant.

{% include integrations/config_flow.md %}

The integration can be automatically discovered via DHCP when the thermostat is on the same network. If automatic discovery does not work, you can manually add the integration.

{% configuration_basic %}
Host:
    description: "The hostname or IP address of your Airobot thermostat. You can find it in your router settings, or use the hostname format `airobot-thermostat-t01xxxxxx` (replace `t01xxxxxx` with your Device ID in lowercase)."
Device ID:
    description: "The thermostat Device ID (e.g., T01XXXXXX). You can find this in the thermostat menu under **Connectivity** > **Mobile app** screen. This is the same credential used to pair the mobile app."
Password:
    description: "The thermostat password. You can find this in the thermostat menu under **Connectivity** > **Mobile app** screen. This is the same credential used to pair the mobile app."
{% endconfiguration_basic %}

## Reconfiguration

If you need to update the connection settings for your thermostat (such as changing the IP address, Device ID, or password), you can reconfigure the integration without removing and re-adding it:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. On the **Airobot** integration, select the three-dot menu and choose **Reconfigure**.
3. Update the connection settings as needed.
4. Select **Submit** to save the new settings.

This is useful when:

- Your thermostat's IP address has changed (for example, after a router restart or a DHCP lease renewal).
- You need to update the Device ID or password.
- You want to switch between IP address and hostname.

## Supported functionality

The **Airobot** integration provides climate control functionality with comprehensive temperature management and preset modes, detailed sensor monitoring, and advanced configuration options.

### Climate

The thermostat is represented as a climate entity with the following capabilities:

- **Current temperature**: Displays the measured temperature in the room.
  - If a floor temperature sensor is connected, displays the floor temperature (for floor heating control).
  - Otherwise, displays the air temperature.
- **Current humidity**: Displays the measured relative humidity in the room.
- **Target temperature**: Shows and allows you to set the desired temperature (5-35°C range).
  - In HOME mode: Controls the HOME temperature setpoint.
  - In AWAY mode: Controls the AWAY temperature setpoint.
- **HVAC mode**: Always set to Heat for this heating-only thermostat.
- **HVAC action**: Shows whether the thermostat is actively heating or idle.
- **Preset modes**:
  - **Home**: Use the HOME temperature setpoint
  - **Away**: Use the AWAY temperature setpoint (typically lower for energy savings)
  - **Boost**: Temporarily boost heating for 1 hour, then return to the previous mode

### Sensors

The integration provides the following sensor entities to monitor your thermostat and environment:

#### Environmental sensors

- **Air temperature**: The measured air temperature in the room (in °C).
- **Floor temperature**: The measured floor temperature (in °C). Only available if a floor temperature sensor is connected to the thermostat.
- **Humidity**: The measured relative humidity in the room (in %).
- **Carbon dioxide**: The measured carbon dioxide concentration in the room (in ppm). Only available if the thermostat has the optional carbon dioxide sensor.
- **Air quality index**: The calculated air quality index based on carbon dioxide levels. Only available if the thermostat has the optional carbon dioxide sensor.

#### Diagnostic sensors

The following diagnostic sensors are disabled by default. You can enable them in the entity settings if needed:

- **Device uptime**: The timestamp when the thermostat was last restarted.
- **Heating uptime**: The cumulative time (in hours) the heating has been active since the thermostat was last restarted.

#### System sensors

- **Errors**: The current error count on the thermostat. A value of 0 indicates normal operation.

### Number

The integration provides a configuration entity to adjust advanced thermostat settings:

- **Hysteresis band**: Configure the temperature hysteresis (dead band) for heating control (0.0-0.5°C range). This setting determines how much the temperature must drop below the setpoint before heating activates. A smaller value provides tighter temperature control but may cause more frequent heating cycles. A larger value reduces heating cycles but allows more temperature variation.

## Use cases

The **Airobot** integration enables intelligent floor heating control with practical automation opportunities:

- Presence-based heating: Automatically switch between HOME and AWAY presets when people leave or arrive home, optimizing comfort and energy efficiency.
- Smart scheduling: Use the BOOST preset to quickly warm rooms before arrival or temporarily increase heating for guests without changing permanent setpoints.
- Air quality management: Trigger ventilation or send alerts when CO₂ levels exceed healthy thresholds (requires optional CO₂ sensor).
- Floor protection: Monitor floor temperature to prevent overheating of sensitive materials like wooden floors (requires floor sensor).
- Energy insights: Track heating runtime and device uptime patterns to optimize schedules and identify maintenance needs.

## Data updates

The **Airobot** integration {% term polling polls %} data from the thermostat every 30 seconds. This interval matches the thermostat's internal measurement cycle, ensuring efficient data synchronization without overwhelming the device.

## Known limitations

- **Local API only**: The integration only supports the local REST API. Cloud-based control through the Airobot cloud service is not supported.
- **Manual API enablement**: The local REST API must be manually enabled on the thermostat before the integration can connect. It is disabled by default for security reasons.
- **Firmware requirements**: Only firmware version 1.8 or later is supported. Older firmware versions do not provide the local REST API.
- **Heating only**: The thermostat is designed for floor heating control only and does not support cooling modes.
- **Optional sensors**: carbon dioxide and floor temperature sensors are only available if the corresponding hardware is installed in your thermostat model.

## Troubleshooting

### Cannot connect to thermostat

#### Symptom: "Cannot connect to your Airobot thermostat"

When trying to set up the integration, the configuration flow shows the error "Cannot connect to your Airobot thermostat".

#### Description

This error indicates that Home Assistant cannot establish a connection to the thermostat's local REST API. This can be caused by incorrect network settings, local API being disabled, or network connectivity issues.

#### Resolution

To resolve this issue, try the following steps:

1. **Verify the IP address or hostname**:
   - Make sure you entered the correct IP address or hostname.
   - You can find the IP address in your router settings.
   - The hostname format is `airobot-thermostat-t01xxxxxx` (replace `t01xxxxxx` with your Device ID in lowercase).

2. **Check network connectivity**:
   - Ensure the thermostat is powered on and connected to your network.
   - Verify that Home Assistant and the thermostat are on the same network or can communicate with each other.
   - Try pinging the thermostat from the Home Assistant host: `ping <thermostat-ip>`.

3. **Enable local API**:
   - On the thermostat, navigate to **Connectivity** > **Local API** > **Enable**.
   - Wait a few seconds for the API to become active.

4. **Restart the thermostat** (if needed):
   - If the local API was just enabled, try restarting the thermostat to ensure the API service starts properly.

### Authentication failed

#### Symptom: "Invalid authentication"

The configuration flow shows "Invalid authentication" error when entering credentials.

#### Description

The Device ID (username) or password provided is incorrect or does not match the thermostat's credentials.

#### Resolution

1. **Verify credentials**:
   - On the thermostat, navigate to the **Connectivity** > **Mobile app** screen in the settings menu.
   - Check that the Device ID (e.g., T01XXXXXX) matches exactly what you entered (case-sensitive).
   - Check that the password matches exactly what you entered (case-sensitive).

2. **Re-enter credentials**:
   - Double-check for typing errors.
   - The Device ID should start with "T" followed by numbers.

3. **Ensure initial registration**:
   - The thermostat must have connected to the internet at least once to register and obtain credentials.
   - If you have never connected the thermostat to the internet, do so first, then check the credentials again.

### Thermostat goes unavailable

#### Symptom: The thermostat entity becomes unavailable after some time

#### Description

The integration loses connection to the thermostat, causing the entity to become unavailable. This can happen due to network issues, thermostat power loss, or the device entering sleep mode.

#### Resolution

1. **Check power and network**:
   - Ensure the thermostat is powered on and connected to the network.
   - Check if you can access the thermostat's web interface directly in a browser.

2. **Verify network stability**:
   - Check for WiFi signal strength issues if using wireless connection.
   - Consider using a wired Ethernet connection for more reliable connectivity.

3. **Check local API status**:
   - Ensure the local API is still enabled on the thermostat.
   - Navigate to **Connectivity** > **Local API** and verify it is enabled.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

You can optionally disable the local API on the thermostat after removing the integration by navigating to **Connectivity** > **Local API** > **Disable**.
