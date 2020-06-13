---
title: AlarmDecoder
description: Instructions on how to integrate a DSC/Honeywell alarm panel with Home Assistant using an AlarmDecoder device.
ha_category:
  - Alarm
  - Binary Sensor
  - Sensor
ha_release: 0.43
ha_iot_class: Local Push
ha_domain: alarmdecoder
ha_codeowners:
  - '@ajschmidt8'
---

The `alarmdecoder` integration will allow Home Assistant users who own either a DSC or Honeywell alarm panel to leverage their alarm system and its sensors to provide Home Assistant with rich information about their homes. Connectivity between Home Assistant and the alarm panel is accomplished through a device produced by Nu Tech Software Solutions, known as the AlarmDecoder. The AlarmDecoder devices provide a serial, TCP/IP socket or USB interface to the alarm panel, where it emulates an alarm keypad.

Please visit the [AlarmDecoder website](https://www.alarmdecoder.com/) for further information about the AlarmDecoder devices.

There is currently support for the following device types within Home Assistant:

- Binary Sensor: Reports on zone status
- Sensor: Emulates a keypad display
- [Alarm Control Panel](#alarm-control-panel): Reports on alarm status, and can be used to arm/disarm the system

This is a fully event-based component. Any event sent by the AlarmDecoder device will be immediately reflected within Home Assistant.

## Configuration

An `alarmdecoder` section must be present in the `configuration.yaml` file and contain the following options as required:

```yaml
# Example configuration.yaml entry
alarmdecoder:
  device:
    type: socket
    host: 192.168.1.20
    port: 10000
  panel_display: false
  zones:
    01:
      name: 'Smoke Detector'
      type: 'smoke'
      rfid: '0123456'
    02:
      name: 'Front Door'
      type: 'opening'
```

{% configuration %}
device:
  description: List of variables for the AlarmDecoder device.
  required: true
  type: list
  keys:
    type:
      description: "The type of AlarmDecoder device: socket, serial or USB."
      required: true
      default: socket
      type: string
    host:
      description: The IP address of the AlarmDecoder device on your home network, if using socket type.
      required: false
      default: localhost
      type: string
    port:
      description: The IP address of the AlarmDecoder device on your home network, if using socket type.
      required: false
      default: 10000
      type: integer
    path:
      description: The path of the AlarmDecoder device, if using serial type.
      required: false
      default: "/dev/ttyUSB0"
      type: string
    baudrate:
      description: The baud rate of the AlarmDecoder device, if using serial type.
      required: false
      default: 115200
      type: string
panel_display:
  description: Create a sensor called `sensor.alarm_display` to match the Alarm Keypad display.
  required: false
  default: false
  type: boolean
autobypass:
  description: "**Honeywell only.** Set to `true`, to automatically bypass all open zones (sending `6#`) when arming. This will require a code to be entered even if `code_arm_required` is set to `false`."
  required: false
  default: false
  type: boolean
code_arm_required:
  description: "Set to `false` to enable arming without having to enter a code."
  required: false
  default: true
  type: boolean
zones:
  description: "AlarmDecoder has no way to tell us which zones are actually in use, so each zone must be configured in Home Assistant. For each zone, at least a name must be given. For more information on the available zone types, take a look at the [Binary Sensor](/integrations/alarmdecoder) documentation. *Note: If no zones are specified, Home Assistant will not load any binary_sensor integrations.*"
  required: false
  type: list
  keys:
    name:
      description: A name for the zone.
      required: true
      type: string
    type:
      description: "A type for the zone. Here you can find a list of [Device Classes](/integrations/binary_sensor/#device-class)."
      required: false
      default: opening
      type: string
    rfid:
      description: The RF serial-number associated with RF zones. Providing this field allows Home Assistant to associate raw sensor data to a given zone, allowing direct monitoring of the state, battery, and supervision status.
      required: false
      type: string
    loop:
      description: The loop number associated with RF zones (1, 2, 3, or 4). Providing this field allows Home Assistant to read open/closed status from the raw sensor data in addition to from the panel display, meaning it can correctly show a bypassed RF zone as open or closed when the alarm is armed. (This is an alternative to relayaddr/relaychan below for RF zones.)
      required: false
      type: integer
    relayaddr:
      description: "Address of the relay or zone expander board to associate with the zone. (ex: 12, 13, 14, or 15). Typically used in cases where a panel will not send bypassed zones such as motion during an armed home state, the Vista 20P is an example of this. AlarmDecoder can emulate a zone expander board and the panel can be programmed to push zone events to this virtual expander. This allows the bypassed zone binary sensors to be utilized. One example is using bypassed motion sensors at night for motion-based automated lights while the system is armed with the motion sensor bypassed."
      required: inclusive
      type: integer
    relaychan:
      description: "Channel of the relay or zone expander board to associate with the zone. (ex: 1, 2, 3, or 4 for relay expander boards, 1 - 8 for zone expander boards)"
      required: inclusive
      type: integer
{% endconfiguration %}

## Alarm Control Panel

There are several attributes available on the alarm panel to give you more information about your alarm.

- `ac_power`: Set to `true` if your system has AC power supplying it.
- `backlight_on`: Set to `true` if your keypad's backlight is on.
- `battery_low`: Set to `true` if your system's back-up battery is low.
- `check_zone`: Set to `true` if your system was recently triggered. When `check_zone` is `true`, it must be cleared by entering your code + 1 before attempting to rearm your alarm.
- `chime`: Set to `true` if your system's chime is activated. When activated, your system will beep anytime a door or window is faulted while the alarm is disarmed.
- `entry_delay_off`: Set to `true` if your system is in "Instant" mode, meaning the alarm will sound on any faults.
- `programming_mode`: Set to `true` if your system is in programming mode.
- `ready`: Set to `true` if your system is ready to be armed. Any faults, including motions sensors, will make this value `false`.
- `zone_bypassed`: Set to `true` if your system is currently bypassing a zone.
- `code_arm_required`: Set to the value specified in your configuration.

## Services

The Alarm Decoder integration gives you access to several services for you to control your alarm with.

- `alarm_arm_away`: Arms the alarm in away mode; all faults will trigger the alarm.
- `alarm_arm_home`: Arms the alarm in stay mode; faults to the doors or windows will trigger the alarm.
- `alarm_arm_night`: Arms the alarm in instant mode; all faults will trigger the alarm. Additionally, the entry delay is turned off on the doors.
- `alarm_disarm`: Disarms the alarm from any state.
- `alarmdecoder.alarm_keypress`: Sends a string of characters to the alarm, as if you had touched those keys on a keypad.
- `alarmdecoder.alarm_toggle_chime`: Toggles the alarm's chime state.

<div class='note'>

`alarm_arm_custom_bypass` and `alarm_trigger`, while available in the services list in Home Assistant, are not currently implemented in the Alarm Decoder platform.

</div>

### Examples

Using a combination of the available services and attributes, you can create switch templates.

### Chime Status and Control

{% raw %}
```yaml
- platform: template
  switches:
    alarm_chime:
      friendly_name: Chime
      value_template: "{{ is_state_attr('alarm_control_panel.alarm_panel', 'chime', true) }}"
      turn_on:
        service: alarmdecoder.alarm_toggle_chime
        data:
          code: !secret alarm_code
      turn_off:
        service: alarmdecoder.alarm_toggle_chime
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

## Arming Key Sequences

The tables below show the key press sequences used for arming for the different panel brands and configuration setting combinations. They are taken from the [adext](https://pypi.org/project/adext/) PyPI package.

### Honeywell

#### code_arm_required = true (default)

| Mode                                                    | Key Sequence                |
| ------------------------------------------------------- | --------------------------- |
| `alarm_arm_home`                                        | `code` + `3`                |
| `alarm_arm_away`                                        | `code` + `2`                |
| `alarm_arm_night`                                       | `code` + `7`                |

#### code_arm_required = false

| Mode                                                    | Key Sequence                |
| ------------------------------------------------------- | --------------------------- |
| `alarm_arm_home`                                        | `#3`                        |
| `alarm_arm_away`                                        | `#2`                        |
| `alarm_arm_night`                                       | `#7`                        |

### DSC

#### code_arm_required = true (default)

| Mode                                                    | Key Sequence                |
| ------------------------------------------------------- | --------------------------- |
| `alarm_arm_home`                                        | `code`                      |
| `alarm_arm_away`                                        | `code`                      |
| `alarm_arm_night`                                       | `code`                      |

#### code_arm_required = false

<div class='note'>

The `chr(4)` and `chr(5)` sequences below are equivalent to pressing the <em>Stay</em> and <em>Away</em> keypad keys respectively (as outlined in the <a href='http://www.alarmdecoder.com/wiki/index.php/Protocol#Special_Keys'>AlarmDecoder documentation</a>).

</div>

| Mode                                                    | Key Sequence                    |
| ------------------------------------------------------- | ------------------------------- |
| `alarm_arm_home`                                        | `chr(4)` + `chr(4)` + `chr(4)`  |
| `alarm_arm_away`                                        | `chr(5)` + `chr(5)` + `chr(5)`  |
| `alarm_arm_night`                                       | `chr(4)` + `chr(4)` + `chr(4)`  |

