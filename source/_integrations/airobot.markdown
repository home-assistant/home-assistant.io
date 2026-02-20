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
ha_quality_scale: platinum
related:
  - url: https://airobothome.com/
    title: Airobot
  - url: https://airobothome.com/heat-control-products/
    title: Airobot Heat Control Products
ha_category: []
ha_platforms:
  - button
  - climate
  - diagnostics
  - number
  - sensor
  - switch
---

The **Airobot** {% term integration %} allows you to control and monitor [Airobot](https://airobothome.com/) smart thermostats for intelligent floor heating control via the local REST API. The thermostat uses adaptive learning with a <abbr title="Time Proportional Integral">TPI</abbr> algorithm to maintain stable temperatures and optimize energy efficiency. Optional built-in carbon dioxide and humidity sensors monitor indoor air quality for a healthier living environment.

## Supported devices

The following devices are supported by the integration:

- Airobot Smart Thermostat TE1 with firmware version 1.8 or later

## Prerequisites

Before setting up the integration, ensure your Airobot thermostat is properly configured:

1. Verify your thermostat has firmware version 1.8 or later. You can check the firmware version in the thermostat settings menu.
2. Connect the thermostat to your local Wi-Fi or Ethernet network.
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

The **Airobot** integration provides the following entities.

### Climate

The thermostat is represented as a climate {% term entity %} with the following capabilities.

- **Current temperature**
  - **Description**: Displays the measured temperature in the room.
  - **Remarks**: If a floor temperature sensor is connected, displays the floor temperature (for floor heating control). Otherwise, displays the air temperature.

- **Current humidity**
  - **Description**: Displays the measured relative humidity in the room.

- **Target temperature**
  - **Description**: Shows and allows you to set the desired temperature (5°C to 35°C range).
  - **Remarks**: In HOME mode, controls the HOME temperature setpoint. In AWAY mode, controls the AWAY temperature setpoint.

- **HVAC mode**
  - **Description**: Always set to Heat for this heating-only thermostat.

- **HVAC action**
  - **Description**: Shows whether the thermostat is actively heating or idle.

- **Preset modes**
  - **Description**: Select the operating mode for the thermostat.
  - **Options**: Home (use the HOME temperature setpoint), Away (use the AWAY temperature setpoint, typically lower for energy savings), Boost (temporarily boost heating for 1 hour, then return to the previous mode).

### Sensors

The integration provides the following sensor entities to monitor your thermostat and environment.

#### Environmental sensors

- **Air temperature**
  - **Description**: The measured air temperature in the room.
  - **Unit**: °C

- **Floor temperature**
  - **Description**: The measured floor temperature.
  - **Unit**: °C
  - **Remarks**: Only available if a floor temperature sensor is connected to the thermostat.

- **Humidity**
  - **Description**: The measured relative humidity in the room.
  - **Unit**: %

- **Carbon dioxide**
  - **Description**: The measured carbon dioxide concentration in the room.
  - **Unit**: ppm
  - **Remarks**: Only available if the thermostat has the optional carbon dioxide sensor.

- **Air quality index**
  - **Description**: The calculated air quality index based on carbon dioxide levels.
  - **Remarks**: Only available if the thermostat has the optional carbon dioxide sensor.

#### Diagnostic sensors

The following diagnostic sensors are disabled by default. You can enable them in the entity settings if needed.

- **Device uptime**
  - **Description**: The timestamp when the thermostat was last restarted.

- **Heating uptime**
  - **Description**: The cumulative time the heating has been active since the thermostat was last restarted.
  - **Unit**: hours

#### System sensors

- **Errors**
  - **Description**: The current error count on the thermostat. A value of 0 indicates normal operation.

### Number

The integration provides a configuration entity to adjust advanced thermostat settings:

- **Hysteresis band**: Configure the temperature hysteresis (dead band) for heating control (0.0-0.5°C range). This setting determines how much the temperature must drop below the setpoint before heating activates. A smaller value provides tighter temperature control but may cause more frequent heating cycles. A larger value reduces heating cycles but allows more temperature variation.

### Button

The integration provides button entities for device management:

- **Restart**: Restart the thermostat device. This performs a soft restart of the thermostat, which can be useful for troubleshooting connectivity issues or applying configuration changes. The thermostat will be temporarily unavailable during the restart process (typically 5-10 seconds).
- **Recalibrate CO₂**: Initiates manual carbon dioxide sensor calibration by setting the current air as the new 400 ppm reference value. Only available if the thermostat has the optional carbon dioxide sensor. Not recommended for typical use as the carbon dioxide sensor has an auto-calibration algorithm enabled by default. Only activate this if the air is clean (fresh outdoor air) and auto-calibration needs to be manually overridden.

### Switch

The integration provides switch entities for controlling thermostat features:

- **Child lock**: Enable or disable the child lock feature on the thermostat. When enabled, the physical buttons on the thermostat are locked to prevent accidental or unauthorized changes to settings.
- **Actuator exercise disabled**: Enable or disable the actuator exercise function. To prevent valve sticking, the actuator exercise periodically switches off the valve for 8 minutes at least every 96 hours. This entity is disabled by default.

## Use cases

The **Airobot** integration enables intelligent floor heating control with practical automation opportunities. You can create presence-based heating automations that switch between HOME and AWAY presets based on occupancy, use BOOST to quickly warm rooms before arrival, monitor air quality to trigger ventilation alerts (with the optional carbon dioxide sensor), and track heating runtime patterns for energy optimization.

## Automations

Examples of automations you can create using the Airobot integration.

### Air quality alert

Send a notification when the air quality exceeds a specified threshold.

<!-- markdownlint-disable MD034 -->
{% my blueprint_import badge blueprint_url="https://gist.github.com/mettolen/9711306e401c027edbdca4c287c2f65f" %}
<!-- markdownlint-enable MD034 -->

{% details "Example YAML configuration" %}

{% raw %}

```yaml
blueprint:
  name: Airobot Air Quality Alert
  description: Send notification when air quality exceeds threshold
  domain: automation
  input:
    air_quality_sensor:
      name: Air Quality Sensor
      selector:
        entity:
          filter:
            - domain: sensor
    threshold:
      name: Threshold
      description: Alert when value goes above this number
      default: 1000
      selector:
        number:
          min: 0
          max: 2000
    notify_device:
      name: Mobile Device
      description: Device to send notification to
      selector:
        device:
          filter:
            - integration: mobile_app
    notification_title:
      name: Notification Title
      description: Title of the notification
      default: "Poor Air Quality"
      selector:
        text:
    notification_message:
      name: Notification Message
      description: Message body (use {{ trigger.to_state.state }} for current value and {{ trigger.above }} for threshold)
      default: "Air quality in {{ area_name(trigger.entity_id) }} is {{ trigger.to_state.state }} (threshold: {{ trigger.above | int }})"
      selector:
        text:
          multiline: true

trigger:
  - platform: numeric_state
    entity_id: !input air_quality_sensor
    above: !input threshold

condition:
  - condition: template
    value_template: "{{ trigger.from_state.state | float(0) < trigger.to_state.state | float(0) }}"

action:
  - device_id: !input notify_device
    domain: mobile_app
    type: notify
    title: !input notification_title
    message: !input notification_message
```

{% endraw %}

{% enddetails %}

## Data updates

The **Airobot** integration {% term polling polls %} data from the thermostat every 30 seconds. This interval matches the thermostat's internal measurement cycle, ensuring efficient data synchronization without overwhelming the device.

## Known limitations

- **Local API only**: The integration only supports the local REST API. Cloud-based control through the Airobot cloud service is not supported.
- **Manual API enablement**: The local REST API must be manually enabled on the thermostat before the integration can connect. It is disabled by default for security reasons.
- **Firmware requirements**: Only firmware version 1.8 or later is supported. Older firmware versions do not provide the local REST API.
- **Heating only**: The thermostat is designed for floor heating control only and does not support cooling modes.
- **Optional sensors**: Carbon dioxide and floor temperature sensors are only available if the corresponding hardware is installed in your thermostat model.

## Troubleshooting

{% details "Cannot connect to thermostat" %}

**Symptom:** Cannot connect to your Airobot thermostat

When trying to set up the integration, the configuration flow shows the error "Cannot connect to your Airobot thermostat".

This error indicates that Home Assistant cannot establish a connection to the thermostat's local REST API. This can be caused by incorrect network settings, local API being disabled, or network connectivity issues.

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

{% enddetails %}

{% details "Authentication failed" %}

**Symptom:** "Invalid authentication"

The configuration flow shows "Invalid authentication" error when entering credentials.

The Device ID (username) or password provided is incorrect or does not match the thermostat's credentials.

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

{% enddetails %}

{% details "Thermostat goes unavailable" %}

**Symptom:** The thermostat entity becomes unavailable after some time

The integration loses connection to the thermostat, causing the entity to become unavailable. This can happen due to network issues, thermostat power loss, or the device entering sleep mode.

1. **Check power and network**:
   - Ensure the thermostat is powered on and connected to the network.
   - Check if you can access the thermostat's web interface directly in a browser.

2. **Verify network stability**:
   - Check for Wi-Fi signal strength issues if using wireless connection.
   - Consider using a wired Ethernet connection for more reliable connectivity.

3. **Check local API status**:
   - Ensure the local API is still enabled on the thermostat.
   - Navigate to **Connectivity** > **Local API** and verify it is enabled.

4. **Reset Wi-Fi setting**:
   - On the thermostat, navigate to **Connectivity** > **WiFi**.
   - Reset the Wi-Fi settings and reconnect to your local network.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

You can optionally disable the local API on the thermostat after removing the integration by navigating to **Connectivity** > **Local API** > **Disable**.
