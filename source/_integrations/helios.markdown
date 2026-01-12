---
title: Helios
description: Instructions on how to integrate Helios ventilation units into Home Assistant.
ha_category:
  - Fan
  - Sensor
  - Switch
ha_config_flow: true
ha_release: 2026.2
ha_iot_class: Local Polling
ha_domain: helios
ha_platforms:
  - binary_sensor
  - date
  - fan
  - number
  - sensor
  - switch
ha_codeowners:
  - '@helios-ventilatoren-com'
ha_integration_type: integration
---

The **Helios** {% term integration %} lets you control any Helios ventilation unit that is supported by the [helios_websocket_api](https://github.com/helios-ventilatoren-com/helios_websocket_api) (follow the link for a list of supported units). Detailed Product information [here](https://www.heliosventilatoren.de/en/products/ventilation-with-heat-recovery/domestic-units-for-wall-ceiling-installation).

{% include integrations/config_flow.md %}

## Supported functionality

### Fan

The fan platform of this integration allows you to control the entire unit. You can turn the unit on/off using the toggle switch, adjust the fan speed, and select a ventilation profile.

### Sensor

The sensor platform allows you to monitor various metrics such as fan speeds, air temperatures, humidity, remaining filter life, cell state, and more.

### Binary sensor

The binary sensor platform allows you to monitor the status of the post heater.

### Switch

The switch platform allows you to lock the heat recovery bypass.

### Number

The number platform gives you control over the supply air temperatures.

### Date

The date platform allows you to set the filter change date.


## Profile switching

For convenient switching of ventilation profiles in the GUI, select the `Helios` fan {% term entity %} to get a drop-down menu to select from. Alternatively, the action `fan/set_preset_mode` can be used.

The four standard Vallox profiles are supported:

- `Home`
- `Away`
- `Boost`
- `Fireplace`

## Fan actions

### Action: Set profile fan speed home `

The `helios.set_profile_fan_speed_home` action sets the fan speed of the `Home` profile.

- **Data attribute**: `set_profile_fan_speed_home`
    - **Description**: Fan speed in %. `Integer`, between 0 and 100.
    - **Optional**: No

### Action: Set profile fan speed away 

The `helios.set_profile_fan_speed_away` sets the fan speed of the `Away` profile.

- **Data attribute**: `set_profile_fan_speed_away`
    - **Description**: Fan speed in %. `Integer`, between 0 and 100.
    - **Optional**: No

### Action: Set profile fan speed boost 

The `helios.set_profile_fan_speed_boost` action sets the fan speed of the `Boost` profile.

- **Data attribute**: `set_profile_fan_speed_boost`
    - **Description**: Fan speed in %. `Integer`, between 0 and 100.
    - **Optional**: No

### Action: Set profile

The `helios.set_profile` sets the profile and, optionally, the duration for which the profile is active. 

- **Data attribute**: `profile`
    - **Description**: Profile to set, one of `home`, `away`, `boost`, `fireplace`, or `extra`.
      - **Optional**: No
- **Data attribute**: `duration`
    - **Description**: Duration to activate the profile for; in minutes. `Integer` between 1 and 65535. Only applies to  `boost`, `fireplace`, or `extra` profiles. 65535 sets the profile without a timeout.
        - **Optional**: Yes

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
