---
title: AlarmDecoder
description: Instructions on how to integrate a DSC/Honeywell alarm panel with Home Assistant using an AlarmDecoder device.
ha_category:
  - Alarm
  - Binary sensor
  - Sensor
ha_release: 0.43
ha_iot_class: Local Push
ha_domain: alarmdecoder
ha_config_flow: true
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - sensor
ha_integration_type: device
---

The **AlarmDecoder** {% term integration %} will allow Home Assistant users who own either a DSC or Honeywell alarm panel to leverage their alarm system and its sensors to provide Home Assistant with rich information about their homes. Connectivity between Home Assistant and the alarm panel is accomplished through a device produced by Nu Tech Software Solutions, known as the AlarmDecoder. The AlarmDecoder devices provide a serial, TCP/IP socket or USB interface to the alarm panel, where it emulates an alarm keypad.

Please visit the [AlarmDecoder website](https://www.alarmdecoder.com/) for further information about the AlarmDecoder devices.

There is currently support for the following {% term device %} types within Home Assistant:

- [Alarm control panel](#alarm-control-panel): Reports on alarm status, and can be used to arm/disarm the system
- Sensor: Emulates a keypad display
- Binary sensor: Reports on zone status

This is a fully event-based integration. Any {% term event %} sent by the AlarmDecoder device will be immediately reflected within Home Assistant.

{% include integrations/config_flow.md %}

You will be prompted to select a protocol (i.e. `socket` or `serial`). Depending on your selection, you will be asked for the following connection information:

- **socket**:
  - **host** - The hostname or IP address of AlarDecoder device that is connected to your alarm panel.
  - **port** - The port that AlarmDecoder is accessible on (i.e. `10000`).
- **serial**:
  - **path** - The path to the AlarmDecoder device (i.e. `/dev/ttyUSB0`).
  - **baud rate** - The baud rate of the AlarmDecoder device (i.e. `115200`).

## Settings

Once AlarmDecoder has been set up according to the instructions above, the arming settings and zones can be configured by selecting _Options_ on the _AlarmDecoder_ card on the **{% my integrations title="Settings > Devices & services" %}** page.

### Arming settings

There are currently 3 arming settings for AlarmDecoder (shown below).

- **Alternative Night Mode** - For Honeywell systems, set to `true` to enable _Night-Stay_ mode instead of _Instant_ mode for night arming. For DSC systems, set to `true` to enable _No-Entry_ mode instead of _Stay_ mode for night arming. For both systems, whenever this option is set to `true`, a code will be required for night arming **regardless of the _Code Required for Arming_ setting.** See [Arming Key Sequences](#arming-key-sequences) section below for more information.
- **Auto Bypass on Arm** - (Honeywell only) Set to `true` to automatically bypass all open zones by sending `code` + `6#` before arming. This setting requires a code only if there are faulted zones when arming.
- **Code Required for Arming** - Set to `false` to enable arming without a code. See [Arming Key Sequences](#arming-key-sequences) section below for more information.

### Zones

Zones can be added, edited, and removed through the option forms.

Each {% term zone %} that's added to AlarmDecoder will have its own [binary sensor](https://www.home-assistant.io/integrations/binary_sensor/) created.

#### Adding a new zone

When prompted, enter the number of the {% term zone %} you'd like to add. Select _Submit_ to move to the next screen, where you'll be prompted for the [zone settings](#zone-settings). Select _Submit_ again to save.

**Note:** The zone number that was entered will appear as an attribute on the binary sensor entity that's created in order to easily edit the zone settings at a later time.

#### Editing an existing zone

When prompted, enter the number of the {% term zone %} you'd like to edit. Select _Submit_ to move to the next screen, where the existing zone settings will be pre-filled. Edit the zone settings and select _Submit_ to save the changes.

#### Removing an existing zone

When prompted, enter the number of the {% term zone %} you'd like to remove. Select _Submit_ to move to the next screen, where the existing zone settings will be pre-filled. Clear the _Zone Name_ field and select _Submit_.

#### Zone settings

The settings for {% term zone %} are described below:

- **Zone Name** - a name for the zone
- **Zone Type** - the type of sensor (see [Device Classes](https://www.home-assistant.io/integrations/binary_sensor/#device-class))
- **RF Serial** - (optional) The RF serial-number associated with wireless RF zones. Providing this field allows Home Assistant to associate raw sensor data to a given zone, allowing direct monitoring of the state, battery, and supervision status.
- **RF Loop** - (optional) The loop number associated with RF zones (1, 2, 3, or 4). Providing this field allows Home Assistant to read open/closed status from the raw sensor data in addition to from the panel display, meaning it can correctly show a bypassed RF zone as open or closed when the alarm is armed. (This is an alternative to relayaddr/relaychan below for RF zones.)
- **Relay Address** - (optional) Address of the relay or zone expander board to associate with the zone. (ex: 12, 13, 14, or 15). Typically used in cases where a panel will not send bypassed zones such as motion during an armed home state, the Vista 20P is an example of this. AlarmDecoder can emulate a zone expander board and the panel can be programmed to push zone events to this virtual expander. This allows the bypassed zone binary sensors to be utilized. One example is using bypassed motion sensors at night for motion-based automated lights while the system is armed with the motion sensor bypassed.
- **Relay Channel** - (optional) Channel of the relay or zone expander board to associate with the zone. (ex: 1, 2, 3, or 4 for relay expander boards, 1 - 8 for zone expander boards)

## Alarm control panel

There are several attributes available on the alarm panel to give you more information about your alarm.

- `ac_power`: Set to `true` if your system has AC power supplying it.
- `alarm_event_occurred`: Set to `true` if your system was recently triggered. When `alarm_event_occurred` is `true`, it must be cleared by entering your code + 1 (or calling the `alarm_control_panel.alarm_disarm` action) before attempting to arm your alarm.
- `backlight_on`: Set to `true` if your keypad's backlight is on.
- `battery_low`: Set to `true` if your system's back-up battery is low.
- `check_zone`: Set to `true` if your system detects a problem with a zone.
- `chime`: Set to `true` if your system's chime is activated. When activated, your system will beep anytime a door or window is faulted while the alarm is disarmed.
- `entry_delay_off`: Set to `true` if your system is in "Instant" mode, meaning the alarm will sound on any faults.
- `programming_mode`: Set to `true` if your system is in programming mode.
- `ready`: Set to `true` if your system is ready to be armed. Any faults, including motions sensors, will make this value `false`.
- `zone_bypassed`: Set to `true` if your system is currently bypassing a zone.
- `code_arm_required`: Set to the value specified in your AlarmDecoder options.

## Actions

The **Alarm Decoder** {% term integration %} gives you access to several {% term actions %} for you to control your alarm with.

- `alarm_arm_away`: Arms the alarm in away mode; all faults will trigger the alarm.
- `alarm_arm_home`: Arms the alarm in stay mode; faults to the doors or windows will trigger the alarm.
- `alarm_arm_night`: Arms the alarm according to the `Alternative Night Mode` option.
- `alarm_disarm`: Disarms the alarm from any state.
- `alarmdecoder.alarm_keypress`: Sends a string of characters to the alarm, as if you had touched those keys on a keypad.
- `alarmdecoder.alarm_toggle_chime`: Toggles the alarm's chime state.

{% note %}
`alarm_arm_custom_bypass` and `alarm_trigger`, while available in the actions list in Home Assistant, are not currently implemented in the Alarm Decoder platform.
{% endnote %}

### Examples

Using a combination of the available {% term actions %} and attributes, you can create switch templates.

### Chime status and control

{% raw %}

```yaml
- platform: template
  switches:
    alarm_chime:
      friendly_name: Chime
      value_template: "{{ is_state_attr('alarm_control_panel.alarm_panel', 'chime', true) }}"
      turn_on:
        - condition: state
          entity_id: alarm_control_panel.alarm_panel
          attribute: chime
          state: False
        - action: alarmdecoder.alarm_toggle_chime
          target:
            entity_id: alarm_control_panel.alarm_panel
          data:
            code: !secret alarm_code
      turn_off:
        - condition: state
          entity_id: alarm_control_panel.alarm_panel
          attribute: chime
          state: True
        - action: alarmdecoder.alarm_toggle_chime
          target:
            entity_id: alarm_control_panel.alarm_panel
          data:
            code: !secret alarm_code
      icon_template: >-
        {% if is_state_attr('alarm_control_panel.alarm_panel', 'chime', true) %}
          mdi:bell-ring
        {% else %}
          mdi:bell-off
        {% endif %}
```

{% endraw %}

## Arming key sequences

The tables below show the key press sequences used for arming for the different panel brands and configuration setting combinations. They are taken from the [adext](https://pypi.org/project/adext/) PyPI package.

### Honeywell

#### code_arm_required = true (default)

| Mode                                                    | Key Sequence  |
| ------------------------------------------------------- | ------------- |
| `alarm_arm_home`                                        | `code` + `3`  |
| `alarm_arm_away`                                        | `code` + `2`  |
| `alarm_arm_night` (`alt_night_mode` = `false`, default) | `code` + `7`  |
| `alarm_arm_night` (`alt_night_mode` = `true`)           | `code` + `33` |

#### code_arm_required = false

| Mode                                                    | Key Sequence  |
| ------------------------------------------------------- | ------------- |
| `alarm_arm_home`                                        | `#3`          |
| `alarm_arm_away`                                        | `#2`          |
| `alarm_arm_night` (`alt_night_mode` = `false`, default) | `#7`          |
| `alarm_arm_night` (`alt_night_mode` = `true`)           | `code` + `33` |

### DSC

#### code_arm_required = true (default)

| Mode                                                    | Key Sequence  |
| ------------------------------------------------------- | ------------- |
| `alarm_arm_home`                                        | `code`        |
| `alarm_arm_away`                                        | `code`        |
| `alarm_arm_night` (`alt_night_mode` = `false`, default) | `code`        |
| `alarm_arm_night` (`alt_night_mode` = `true`)           | `*9` + `code` |

#### code_arm_required = false

{% note %}

The `chr(4)` and `chr(5)` sequences below are equivalent to pressing the <em>Stay</em> and <em>Away</em> keypad keys respectively (as outlined in the <a href='https://www.alarmdecoder.com/wiki/index.php/Protocol#Special_Keys'>AlarmDecoder documentation</a>).

{% endnote %}

| Mode                                                    | Key Sequence                   |
| ------------------------------------------------------- | ------------------------------ |
| `alarm_arm_home`                                        | `chr(4)` + `chr(4)` + `chr(4)` |
| `alarm_arm_away`                                        | `chr(5)` + `chr(5)` + `chr(5)` |
| `alarm_arm_night` (`alt_night_mode` = `false`, default) | `chr(4)` + `chr(4)` + `chr(4)` |
| `alarm_arm_night` (`alt_night_mode` = `true`)           | `*9` + `code`                  |
