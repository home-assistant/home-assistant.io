---
title: Airobot
description: Instructions on how to integrate Airobot smart thermostats and ventilation units into Home Assistant.
ha_release: 2025.12
ha_iot_class: Local Polling
ha_codeowners:
  - '@mettolen'
  - '@dmednis'
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
ha_category:
  - Climate
ha_platforms:
  - button
  - climate
  - diagnostics
  - number
  - sensor
  - switch
---

The **Airobot** {% term integration %} allows you to control and monitor [Airobot](https://airobothome.com/) smart thermostats for intelligent floor heating control via the local REST API. The thermostat uses adaptive learning with a <abbr title="Time Proportional Integral">TPI</abbr> algorithm to maintain stable temperatures and optimize energy efficiency. Optional built-in carbon dioxide and humidity sensors monitor indoor air quality for a healthier living environment.

The integration also supports Airobot ventilation units (heat recovery ventilators) through their local Modbus TCP interface. It reports the unit's temperatures, humidity, air quality, fan speeds, and heat recovery efficiency.

Use case: Create presence-based heating automations, use BOOST to quickly warm rooms before arrival, monitor air quality to trigger ventilation alerts, track heating runtime patterns for energy optimization, and follow indoor air quality and heat recovery on your ventilation unit.

## Supported devices

The following devices are supported by the integration:

- Airobot Smart Thermostat TE1 with firmware version 1.8 or later
- Airobot ventilation units with Modbus TCP: models L, L5, S1, S2, V3, V4, V6, and V8

## Prerequisites

### Thermostat

Before setting up the integration, ensure your Airobot thermostat is properly configured:

1. Verify your thermostat has firmware version 1.8 or later. You can check the firmware version in the thermostat settings menu.
2. Connect the thermostat to your local Wi-Fi or Ethernet network.
3. Connect to the internet at least once to register with the Airobot server. During this initial connection, the thermostat receives its Device ID (username) and password.
4. In the thermostat settings menu, navigate to **Connectivity** > **Local API** > **Enable** to enable the local REST API (disabled by default).
5. Note your Device ID and password from the thermostat menu under **Connectivity** > **Mobile app** screen. You will need these during setup. These are the same credentials used to pair the mobile app.

After initial setup, the thermostat does not require internet connectivity to function with Home Assistant.

### Ventilation unit

1. Connect the unit to your local network over Wi-Fi or Ethernet. For a wired connection, connect an Ethernet cable to the RJ45 port on the unit's enclosure, typically near the power cable input. If there is no RJ45 port on the enclosure, connect the cable to the **LAN** socket on the controller board.
2. On the unit's controller, go to **Menu** > **Settings** > **Other** > **Modbus TCP** and set it to **ON**. Modbus TCP is disabled by default. The unit reboots and saves the IP address it received from your router as a static address.
3. Note the unit's IP address. You can find it in your router's list of connected devices.

If you don't have a controller, Airobot customer support can activate Modbus TCP remotely while the unit is connected to the internet.

{% include integrations/config_flow.md %}

When you add the integration manually, choose **Thermostat** or **Ventilation unit**.

Both device types can be automatically discovered via DHCP when they are on the same network. If automatic discovery does not work, you can manually add the integration.

Thermostat:

{% configuration_basic %}
Host:
    description: "The hostname or IP address of your Airobot thermostat. You can find it in your router settings, or use the hostname format `airobot-thermostat-t01xxxxxx` (replace `t01xxxxxx` with your Device ID in lowercase)."
Device ID:
    description: "The thermostat Device ID (e.g., T01XXXXXX). You can find this in the thermostat menu under **Connectivity** > **Mobile app** screen. This is the same credential used to pair the mobile app."
Password:
    description: "The thermostat password. You can find this in the thermostat menu under **Connectivity** > **Mobile app** screen. This is the same credential used to pair the mobile app."
{% endconfiguration_basic %}

Ventilation unit:

{% configuration_basic %}
Host:
    description: "The hostname or IP address of your Airobot ventilation unit. Modbus TCP must be enabled on the unit."
{% endconfiguration_basic %}

## Reconfiguration

If you need to update the connection settings for your thermostat (such as changing the IP address, Device ID, or password) or your ventilation unit (its IP address), you can reconfigure the integration without removing and re-adding it:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. On the **Airobot** integration, select the three-dot menu and choose **Reconfigure**.
3. Update the connection settings as needed.
4. Select **Submit** to save the new settings.

This is useful when:

- Your thermostat's IP address has changed (for example, after a router restart or a DHCP lease renewal).
- You need to update the Device ID or password.
- You want to switch between IP address and hostname.

For a ventilation unit, reconfiguration is stopped if a different ventilation unit answers at the new address, or if the unit there does not report its identity.

## Supported functionality

The **Airobot** integration provides the following entities. The thermostat entities are described first, followed by the [ventilation unit](#ventilation-unit-sensors) entities.

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

### Ventilation unit sensors

The integration provides the following sensor entities for a ventilation unit.

#### Temperature and humidity

- **Extract air temperature** and **Extract air humidity**
  - **Description**: The air extracted from the rooms, before the heat exchanger.
  - **Unit**: °C and %

- **Supply air temperature** and **Supply air humidity**
  - **Description**: The fresh air supplied to the rooms, after the heat exchanger.
  - **Unit**: °C and %

- **Outside air temperature** and **Outside air humidity**
  - **Description**: The outdoor air taken in by the unit.
  - **Unit**: °C and %

- **Exhaust air temperature** and **Exhaust air humidity**
  - **Description**: The air blown outside, after the heat exchanger.
  - **Unit**: °C and %

- **Extra temperature** and **Extra humidity**
  - **Description**: An optional extra sensor, required when the unit drives an external humidifier.
  - **Unit**: °C and %
  - **Remarks**: Only created if the extra sensor is installed.

#### Air quality

- **CO2 level**
  - **Description**: The carbon dioxide concentration measured by the unit.
  - **Unit**: ppm

- **VOC index**
  - **Description**: The volatile organic compounds index (0-500).

- **PM2.5**
  - **Description**: The fine particulate matter concentration.
  - **Unit**: µg/m³
  - **Remarks**: Requires the optional PM2.5 sensor.

#### Fans and heat recovery

- **Supply fan level** and **Extract fan level**
  - **Description**: The level each fan is currently running at (0-10).

- **Supply fan speed** and **Extract fan speed**
  - **Description**: The rotation speed of each fan.
  - **Unit**: RPM

- **Supply airflow** and **Extract airflow**
  - **Description**: The measured airflow of each fan.
  - **Unit**: m³/h
  - **Remarks**: Only constant-flow models measure airflow. These entities are disabled by default; enable them if your unit is a constant-flow model.

- **Heat recovery efficiency**
  - **Description**: How much of the extracted air's heat is recovered into the supply air.
  - **Unit**: %

- **Working time**
  - **Description**: The unit's operating time since its last reset.
  - **Unit**: hours
  - **Remarks**: Diagnostic sensor, disabled by default.

## Examples

Examples of automations you can create using the Airobot integration.

### Air quality alert

Send a notification when the air quality exceeds a specified threshold.

<!-- markdownlint-disable MD034 -->
{% my blueprint_import badge blueprint_url="https://community.home-assistant.io/t/air-quality-alert-notification-airobot/994072" %}
<!-- markdownlint-enable MD034 -->

{% details "Example YAML configuration" %}


```yaml
alias: "Airobot Air Quality Alert"
description: >-
  Sends a notification when the Airobot air quality sensor exceeds
  a threshold.

triggers:
  - trigger: numeric_state
    entity_id: sensor.airobot_air_quality
    above: 1000

conditions:
  - >-
    {{
      trigger.from_state.state | float(0)
      < trigger.to_state.state | float(0)
    }}

actions:
  - action: notify.send_message
    target:
      entity_id: notify.my_device
    data:
      title: "Poor Air Quality"
      message: >-
        Air quality in {{ area_name(trigger.entity_id) }} is
        {{ trigger.to_state.state }} (threshold: {{ trigger.above | int }})

```


{% enddetails %}

## Data updates

The **Airobot** integration {% term polling polls %} data from the thermostat every 30 seconds. This interval matches the thermostat's internal measurement cycle, ensuring efficient data synchronization without overwhelming the device.

Ventilation units are also polled every 30 seconds, over Modbus TCP. The connection is shared through the [Modbus](/integrations/modbus/) integration, so other integrations that talk to the same unit use the same connection.

## Known limitations

- **Local API only**: The integration only supports the local REST API. Cloud-based control through the Airobot cloud service is not supported.
- **Manual API enablement**: The local REST API must be manually enabled on the thermostat before the integration can connect. It is disabled by default for security reasons.
- **Firmware requirements**: Only firmware version 1.8 or later is supported. Older firmware versions do not provide the local REST API.
- **Heating only**: The thermostat is designed for floor heating control only and does not support cooling modes.
- **Optional sensors**: Carbon dioxide and floor temperature sensors are only available if the corresponding hardware is installed in your thermostat model.
- **Ventilation unit: Modbus TCP only**: Ventilation units are supported over Modbus TCP. Modbus RTU (serial) is not supported.
- **Ventilation unit: one Modbus client**: The unit handles one active Modbus TCP connection at a time. While Home Assistant is connected, other Modbus clients, such as a building management system or a diagnostic tool, may get no response.
- **Ventilation unit identification**: The integration identifies a ventilation unit by its MAC address, which it reads from registers that are not part of Airobot's published Modbus specification. If your unit's firmware does not provide them, a manually added unit is identified by its IP address until DHCP discovery finds it.

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

{% details "Cannot connect to ventilation unit" %}

**Symptom:** "Failed to connect" when adding a ventilation unit

Home Assistant cannot reach the unit's Modbus TCP interface on port 502.

1. **Check that Modbus TCP is enabled**:
   - On the unit's controller, go to **Menu** > **Settings** > **Other** > **Modbus TCP** and make sure it is **ON**.

2. **Check the network connection**:
   - Make sure the unit is connected to your network. If it uses Wi-Fi, check the signal strength at the unit; a wired Ethernet connection is more reliable.

3. **Check the IP address**:
   - The unit saves its IP address as static when Modbus TCP is first enabled. If your router has been reset or reconfigured since then, the address may have changed. Check your router's list of connected devices.

4. **Check port 502**:
   - From the Home Assistant host, check that the port is open, for example with `nc -zv <unit-ip> 502`.

5. **Disconnect other Modbus clients**:
   - The unit answers one Modbus TCP client at a time. Disconnect any other Modbus client, such as a building management system or a diagnostic tool.

{% enddetails %}

{% details "Ventilation unit stops responding" %}

**Symptom:** The ventilation unit's entities become unavailable and stay unavailable

The unit can run out of network connections if other clients keep opening new Modbus connections without closing them.

1. **Restart the unit** to clear its open connections.
2. **Check other Modbus clients** on your network and configure them to keep a single connection open, or to close their connection after each poll.
3. **Check the address**: If a different ventilation unit now answers at the configured address, the integration stops showing data instead of showing the other unit's readings. Reconfigure the integration with the unit's current address.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

You can optionally disable the local API on the thermostat after removing the integration by navigating to **Connectivity** > **Local API** > **Disable**. On a ventilation unit, you can disable Modbus TCP under **Menu** > **Settings** > **Other** > **Modbus TCP**.
