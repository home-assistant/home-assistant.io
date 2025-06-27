---
title: Olarm
description: Instructions on how to integrate Olarm devices into Home Assistant.
ha_release: 2025.1
ha_iot_class: Cloud Push
ha_category:
  - Alarm
  - Binary sensor
  - Button
ha_codeowners:
  - '@olarmtech'
ha_config_flow: true
ha_domain: olarm
ha_integration_type: integration
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - button
---

The **Olarm** {% term integration %} connects Home Assistant with Olarm's range of smart alarm communicators. It allows you to monitor, control, and automate your alarm system directly from Home Assistant—enhancing security through smart home automation.

Olarm upgrades traditional alarm panels with remote access, real-time notifications, and seamless smart home integration.

Learn more and view supported alarm systems: [Olarm](https://www.olarm.com)

## Supported devices

The following devices are known to be supported by the {% term integration %}:

- Olarm GEN1 – Paradox
- Olarm GEN1 – Universal
- Olarm PRO
- Olarm PRO 4G  
- Olarm MAX

## Prerequisites

- An active Olarm account
- A compatible Olarm {% term device %} connected to a supported alarm panel
- An active subscription for the device
- The device has public API access enabled

## Before Configuration

Before adding the integration to Home Assistant:

1. In the Olarm App: Go to **Profile** > **Device List** > **[Select Device]** > **Developer Settings**, then enable **API Access**
2. Ensure your Olarm device is online and has an active subscription

{% include integrations/config_flow.md %}

## Entities

The **Olarm** {% term integration %} provides the following {% term entities %}.

### Alarm control panel

Creates one alarm control panel per area configured in your alarm system:

- `alarm_control_panel.area_XX_<area_name>`: Controls your alarm system areas with the following states:
  - `disarmed`: The alarm is disarmed (off)
  - `armed_home`: The alarm is armed in home/stay mode
  - `armed_away`: The alarm is armed in away mode
  - `armed_night`: The alarm is armed in night/sleep mode
  - `triggered`: The alarm has been triggered
  - `pending`: The alarm is in a transitional state

### Binary sensors

The integration creates various binary sensors depending on your alarm system configuration:

#### Zone sensors
- `binary_sensor.zone_XXX_<zone_name>`: Individual zone status for each configured zone
  - Device class automatically set based on zone type (door, window, motion)
  - Extra attribute: `bypassed` indicates if the zone is currently bypassed

#### Zone bypass sensors (optional)
- `binary_sensor.zone_XXX_bypass_<zone_name>`: Shows bypass status for each zone (only if bypass {% term entities %} are enabled during setup)

#### System sensors
- `binary_sensor.ac_power`: Indicates if AC power is available to the alarm panel

#### LINK module sensors (if LINK modules are connected)
- `binary_sensor.<link_name>_link_input_XX_<input_name>`: LINK input status
- `binary_sensor.<link_name>_link_output_XX_<output_name>`: LINK output status (for outputs in latch mode)
- `binary_sensor.<link_name>_link_relay_XX_<relay_name>`: LINK relay status (for relays in latch mode)

#### MAX module sensors (if have an Olarm MAX)
- `binary_sensor.max_input_XX_<input_name>`: MAX input status
- `binary_sensor.max_output_XX_<output_name>`: MAX output status (for outputs in latch mode)

### Buttons

The integration creates button {% term entities %} for controlling various alarm system functions:

#### Zone control buttons (optional)
- `button.zone_bypass_XXX_<zone_name>`: Bypass a specific zone
- `button.zone_unbypass_XXX_<zone_name>`: Remove bypass from a specific zone

#### PGM (Programmable Output) buttons
- `button.pgm_open_XX_<pgm_name>`: Open/activate a PGM output
- `button.pgm_close_XX_<pgm_name>`: Close/deactivate a PGM output  
- `button.pgm_pulse_XX_<pgm_name>`: Pulse a PGM output

#### Utility key buttons
- `button.utility_key_XX_<key_name>`: Trigger utility key functions

#### LINK module control buttons (if LINK modules are connected)
- `button.<link_name>_link_output_open_XX_<output_name>`: Open LINK output
- `button.<link_name>_link_output_close_XX_<output_name>`: Close LINK output
- `button.<link_name>_link_output_pulse_XX_<output_name>`: Pulse LINK output
- `button.<link_name>_link_relay_latch_XX_<relay_name>`: Latch LINK relay
- `button.<link_name>_link_relay_unlatch_XX_<relay_name>`: Unlatch LINK relay
- `button.<link_name>_link_relay_pulse_XX_<relay_name>`: Pulse LINK relay

#### MAX module control buttons (if MAX module is connected)
- `button.max_output_open_XX_<output_name>`: Open MAX output
- `button.max_output_close_XX_<output_name>`: Close MAX output
- `button.max_output_pulse_XX_<output_name>`: Pulse MAX output

## Actions

The {% term integration %} provides the following {% term actions %}:

### Standard alarm actions
- `alarm_control_panel.alarm_arm_home`: Arm the alarm in home mode
- `alarm_control_panel.alarm_arm_away`: Arm the alarm in away mode  
- `alarm_control_panel.alarm_arm_night`: Arm the alarm in night mode
- `alarm_control_panel.alarm_disarm`: Disarm the alarm

### Olarm-specific actions

#### Zone control actions

##### Action `olarm.zone_bypass`

Bypass a specific zone in your alarm system.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `config_entry_id` | No | The configuration entry ID for your Olarm device |
| `zone_index` | No | The zone number to bypass (0-based index) |

##### Action `olarm.zone_unbypass`

Remove bypass from a specific zone in your alarm system.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `config_entry_id` | No | The configuration entry ID for your Olarm device |
| `zone_index` | No | The zone number to unbypass (0-based index) |

#### PGM control actions

##### Action `olarm.pgm_command`

Control PGM (Programmable Output) functions.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `config_entry_id` | No | The configuration entry ID for your Olarm device |
| `pgm_index` | No | The PGM number to control (0-based index) |
| `pgm_action` | No | The action to perform: `open`, `close`, or `pulse` |

##### Action `olarm.utility_key`

Trigger utility key functions.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `config_entry_id` | No | The configuration entry ID for your Olarm device |
| `ukey_index` | No | The utility key number to trigger (0-based index) |

#### LINK module actions

##### Action `olarm.link_output_command`

Control LINK module outputs.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `config_entry_id` | No | The configuration entry ID for your Olarm device |
| `link_id` | No | The LINK module identifier |
| `output_index` | No | The output number to control (0-based index) |
| `output_action` | No | The action to perform: `open`, `close`, or `pulse` |

##### Action `olarm.link_relay_command`

Control LINK module relays.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `config_entry_id` | No | The configuration entry ID for your Olarm device |
| `link_id` | No | The LINK module identifier |
| `relay_index` | No | The relay number to control (0-based index) |
| `relay_action` | No | The action to perform: `latch`, `unlatch`, or `pulse` |

#### Olarm MAX actions

##### Action `olarm.max_output_command`

Control MAX outputs.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `config_entry_id` | No | The configuration entry ID for your Olarm device |
| `output_index` | No | The output number to control (0-based index) |
| `output_action` | No | The action to perform: `open`, `close`, or `pulse` |

## Examples

### Automation examples

#### Notify on alarm trigger

```yaml
alias: "Notify on Alarm Trigger"
triggers:
  - trigger: state
    entity_id: alarm_control_panel.area_01_main
    to: "triggered"
actions:
  - action: notify.mobile_app
    data:
      message: "🚨 Alarm has been triggered!"
```

#### Auto arm at night

```yaml
alias: "Auto Arm at 10 PM"
triggers:
  - trigger: time
    at: "22:00:00"
actions:
  - action: alarm_control_panel.alarm_arm_home
    target:
      entity_id: alarm_control_panel.area_01_main
```

#### Zone monitoring

```yaml
alias: "Front Door Opened"
triggers:
  - trigger: state
    entity_id: binary_sensor.zone_001_front_door
    to: "on"
conditions:
  - condition: template
    value_template: "{% raw %}{{ is_state('binary_sensor.zone_001_front_door', 'on') }}{% endraw %}"
actions:
  - action: notify.mobile_app
    data:
      message: "Front door has been opened"
```

#### Using Olarm services

```yaml
alias: "Bypass Front Door Zone"
triggers:
  - trigger: state
    entity_id: input_boolean.maintenance_mode
    to: "on"
actions:
  - action: olarm.zone_bypass
    data:
      config_entry_id: "your_config_entry_id"
      zone_index: 0
```

```yaml
alias: "Activate Gate PGM"
triggers:
  - trigger: state
    entity_id: binary_sensor.car_presence
    to: "on"
actions:
  - action: olarm.pgm_command
    data:
      config_entry_id: "your_config_entry_id"
      pgm_index: 0
      pgm_action: "pulse"
```

## Troubleshooting

### Common issues

- **No updates or control issues**: Ensure the {% term device %} is online and the subscription is active
- **Missing {% term entities %}**: Reload the {% term integration %} or restart Home Assistant
- **Login issues**: Double-check your Olarm account credentials and ensure API access is enabled in the Olarm app
- **Button entities not working**: Verify that the corresponding PGM, utility key, or output is properly configured in your alarm panel
- **LINK entities missing**: Ensure the modules are properly connected and configured in the Olarm system

### Removal

{% my integrations badge %}

1. Go to **{% my integrations icon title="Settings > Devices & Services" %}**
2. Locate the **Olarm** integration
3. Select the integration, then select **Delete**

## Known limitations

- A maximum of 5 Olarm {% term device %}s per {% term integration %} instance are currently supported
- Only one Olarm user account per Home Assistant instance - multiple Home Assistant instances require different Olarm user accounts
- Zone bypass {% term entities %} and buttons are optional and must be enabled during setup
- LINK buttons and binary sensors {% term entities %} only available if the respective modules are connected to your system
- MAX buttons and binary sensors only available if you have an Olarm MAX

## Use cases

- Automate alarm control based on occupancy, time, or home modes
- Get real-time alerts for alarm events and zone activity  
- Monitor alarm system health, connectivity, and signal strength
- Control gates, doors, and other devices through PGM outputs
- Integrate LINK modules for expanded I/O capabilities
- Bypass zones during maintenance or specific conditions
- Trigger utility functions through Home Assistant automations


