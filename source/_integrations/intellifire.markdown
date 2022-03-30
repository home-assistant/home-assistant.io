---
title: IntelliFire
description: Instructions on the IntelliFire Fireplace integration for Home Assistant.
ha_category:
  - Binary Sensor
ha_iot_class: Local Polling
ha_release: 2022.2
ha_codeowners:
  - '@jeeftor'
ha_domain: intellifire
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - sensor
ha_dhcp: true
ha_integration_type: integration
---

IntelliFire Wi-Fi fireplace modules provide app-based and Alexa control to various fireplaces. The modules do expose an unencrypted HTTP endpoint on the network that provides status information. This integration will read that URL and create a set of sensors displaying the current fireplace state.

{% include integrations/config_flow.md %}


### Sensor Types


The following sensors are available as either a **Binary Sensor** when dealing with on/off.

### Binary Sensors

- **Flame Sensor**: Whether the fire is on.
- **Pilot Light Sensor**: Whether the pilot light is turned on.
- **Timer Sensor**: Whether the sleep timer is turned on.
- **Thermostat Sensor**: Whether the thermostat is turned on.

### Sensor

- **Flame Height**: Numerical indicator of flame height, where `0` is the lowest setting.
- **Temperature**: Current ambient temperature as read by the fireplace remote.
- **Target Temperature**: If the thermostat is engaged this is the target temperature the fireplace will try to reach, as measured by the remote.
- **Fan Speed**: Numerical indicator of fan speed.
- **Timer End Time**: If the sleep timer is enabled, this is time it will finish.

### Diagnostic Sensors

- **Connection Quality** - Local network connection quality _(disabled by default)_.
- **Downtime** - Unit downtime. Will read `Unknown` if there is currently no downtime.
- **ECM Latency** - Electronic Control Module Latency value _(disabled by default)_.
- **IP** - IP Address of the unit.
- **Uptime** - Unit uptime.
- **Errors** - Error status (see below)

#### Binary Error Sensors

The following is a description of the various diagnostic error sensors and what they mean:

*The following details the various error states and the descriptions associated with them in the IntelliFire Android application.*

 - **Accessory** - Your appliance has detected that an AUX port or accessory is not functional. Please contact your dealer and report this issue.
 - **Disabled** - Appliance Safely Disabled: Your appliance has been disabled. Please contact your dealer and report this issue.
 - **ECM Offline** - ECM is offline.
 - **Fan** - Fan Error. Your appliance has detected that an accessory is not functional. Please contact your dealer and report this issue.
 - **Fan Delay** - Fan Information: Fan will turn on within 3 minutes. Your appliance has a built-in delay that prevents the fan from operating within the first 3 minutes of turning on the appliance. This allows the air to be heated prior to circulation.
 - **Flame** - Pilot Flame Error. Your appliance has been safely disabled. Please contact your dealer and report this issue.
 - **Lights** - Lights Error. Your appliance has detected that an accessory is not functional. Please contact your dealer and report this issue.
 - **Maintenance** - Maintenance: Your appliance is due for a routine maintenance check. Please contact your dealer to ensure your appliance is operating at peak performance.
 - **Offline** - Your appliance is currently offline.
 - **Pilot Flame** - Pilot Flame Error: Your appliance has been safely disabled. Please contact your dealer and report this issue.
 - **Soft Lock Out** - Sorry your appliance did not start. Try again by pressing Flame ON.
