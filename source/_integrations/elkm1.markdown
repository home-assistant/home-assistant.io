---
title: Elk-M1 Control
description: Instructions to setup the Elk-M1 controller.
ha_release: 0.81
ha_category:
  - Alarm
  - Binary sensor
  - Climate
  - Hub
  - Light
  - Scene
  - Sensor
  - Switch
ha_iot_class: Local Push
ha_domain: elkm1
ha_dhcp: true
ha_config_flow: true
ha_codeowners:
  - '@gwww'
  - '@bdraco'
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - climate
  - light
  - scene
  - sensor
  - switch
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The Elk-M1 is a home security and automation controller that is capable of alarm control panel functions and automation.

The Elk-M1 controller is manufactured by [Elk Products](https://www.elkproducts.com).

There is currently support for the following device types within Home Assistant:

- **Alarm** - An ElkM1 area (also known as partition) is represented as an `alarm_control_panel`.
- **Binary sensor** - ElkM1 zones that have 4 states (i.e.: are not analog zones) are represented as `binary_sensor` entities. `Normal` is `off` and any of the other values is `on`.
- **Climate** - An ElkM1 thermostat is represented as a `climate` entity.
- **Light** - An ElkM1 light (which can be X10, Insteon, UPB) is represented as a `light`.
- **Scene** - ElkM1 tasks are represented as `scene` entities.
- **Sensor** - ElkM1 counters, keypads, panel, settings, and zones are represented as `sensor` entities.
- **Switch** - ElkM1 outputs are represented as `switch` entities.

The implementation follows the Elk Products ElkM1 "ASCII Protocol & Interface 
Specification, Revision 1.84" document. This document can be found on the Internet.

## ElkM1 configuration and version

In order for the ElkM1 integration to work to its fullest with Home Assistant the
ElkM1 panel must be configured correctly. This section describes the configuration
required on the ElkM1 panel.

### ElkM1 version

ElkM1 should be running:

- Version 4.6.8, or
- Version 5.2.0 or higher.

Force arm away and stay are available in 5.3.0 or higher.

Many features will work with lower versions of the ElkM1. Check the "ElkM1 RS232 Protocol" manual for details.

### ELK-M1XEP version

The ELK-M1XEP is the Ethernet controller board for the ElkM1. If connecting the integration
in secure mode the version of the ELK-M1XEP determines which secure protocol is supported.
ELK-M1XEP versions less than 2.0.46 support TLS 1.0, while version 2.0.46 and above support
TLS 1.2. When adding the ElkM1 integration in the user interface use `secure` for TLS 1.0 and
use `TLS 1.2` for TLS 1.2. Note that ELK-M1XEP does not support auto-negotiation of the 
version of the TLS protocol, the user must specify the TLS version to connect.

### Global Setting 35

The ElkM1 integration tracks the user number and name of the last username to
arm or disarm the panel. The `changed_by` and `changed_by_id` attributes of
the `alarm_control_panel` hold those two attributes.

On the ElkM1 panel Global Setting 35, "Transmit Event Log" must be
enabled for this to fully work.

Note that without Global Setting 35 set and in a single area system,
`changed_by` and `changed_by_id` are updated when a user enters a valid
code on a physical keypad.

### Global Setting 36 — 40

If you are using the features below then these respective global options
should be enabled:

| Option # | Option Name                      | Description                                                                                                                                                                                                                        |
| -------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 36       | Transmit Zone Changes            | If you are using Zones this allows Home Assistant to track the status of the Zones.                                                                                                                                                |
| 37       | Transmit Output Changes          | If you are using Outputs this allows Home Assistant to track the status of the Outputs.                                                                                                                                            |
| 38       | Transmit Automation Task Changes | If you are using ElkM1 Tasks this allows Home Assistant to track the status of the Tasks.                                                                                                                                          |
| 39       | Transmit Light Changes           | If you are using ElkM1 Lights this allows Home Assistant to track the status of the lights.                                                                                                                                        |
| 40       | Transmit Keypad Changes          | Oddly, this option tracks keypad changes and alarm status. If you are wishing to track keypresses on ElkM1 keypad or if you are wishing to track the armed, disarmed, and alarm state of the ElkM1 then this option should be set. |

## System Trouble Status

The ElkM1 is able to report general system trouble statuses. This is
reported using the `system_trouble_status` attribute of the
panel sensor (often named `sensor.elkm1`) in Home Assistant.

The format of the `system_trouble_status` attribute is a comma separated list
of the active troubles. Only active trouble statuses are in the list.
If the trouble is for a zone then `zone <number>` is appended to the trouble name.

For example, if zone 42 wireless sensor lost communication with the panel then
`system_trouble_status` would be "Lost Transmitter zone 42". If in addition there
was an AC failure then `system_trouble_status` would be the string
"AC Fail, Lost Transmitter zone 42".

The complete list of trouble statuses are:

- AC Fail
- Box Tamper (zone is part of status)
- Fail To Communicate
- EEProm Memory Error
- Low Battery Control
- Transmitter Low Battery (zone is part of status)
- Over Current
- Telephone Fault
- Output 2
- Missing Keypad
- Zone Expander
- Output Expander
- ELKRP Remote Access
- Common Area Not Armed
- Flash Memory Error
- Security Alert (zone is part of status)
- Serial Port Expander
- Lost Transmitter (zone is part of status)
- GE Smoke CleanMe
- Ethernet
- Display Message In Keypad Line 1
- Display Message In Keypad Line 2
- Fire (zone is part of status)

{% include integrations/config_flow.md %}

## Manual configuration

Alternatively, configuration through the {% term "`configuration.yaml`" %} file
is supported (example below).

Both methods of configuration support "auto configuration". This works by
reporting only elements on the ElkM1 that have a "Name" configured.
So, for example, if counter #11 on the panel was configured with
the name "Test counter" then this element would show up in Home Assistant. If
an element is being used but does not have a name configured then
it will not appear in Home Assistant through the auto-configuration feature.

```yaml
# Example configuration.yaml entry
elkm1:
  - host: elk://IP_ADDRESS_1
  ...
  - host: elk://IP_ADDRESS_2
    prefix: gh  # for guest house controller
```

{% configuration %}
host:
  description: Connection string to Elk of the form `<method>://<address>[:port]`. `<method>` is `elk` for non-secure connection, `elks` for secure TLS 1.0 connection, `elksv1_2` for secure TLS 1.2 connection, and `serial` for serial port connection. `<address>` is IP address or domain or for `serial` the serial port that the Elk is connected to. Optional `<port>` is the port to connect to on the Elk, defaulting to 2101 for `elk` and 2601 for `elks` and `elksv1_2`. For `serial` method, _address_ is the path to the tty _/dev/ttyS1_ for example and `[:baud]` is the baud rate to connect with (Elk systems default to 115200 baud, but this can be changed during Elk system configuration). See ELK-M1XEP section above for information on selecting the appropriate secure version. You may have multiple host sections for connecting multiple controllers.
  required: true
  type: string
username:
  description: Username to login to Elk. Required if using a secure connection method.
  required: false
  type: string
password:
  description: Password to login to Elk. Required if using a secure connection method.
  required: false
  type: string
prefix:
  description: The prefix to use, if any, for all the devices created for this controller. At most one host can omit the prefix, all others must have a unique prefix within the Home Assistant instance.
  require: false
  type: string
auto_configure:
  description: Auto configure `area`, `counter`, `keypad`, `output`, `setting`, `task`, `thermostat`, `plc`, and `zone` by only adding elements that ElkM1 reports on the initial sync.
  required: false
  type: boolean
  default: False
area:
  description: Elk areas to include in Home Assistant.
  required: false
  default: All included.
  type: map
  keys:
    enabled:
      description: Enable this configuration section.
      type: boolean
      required: false
      default: true
    include:
      description: List to include in the form of either `<value>` or `<value>-<value>` where `<value>` is a positive integer or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: All included.
    exclude:
      description: List to exclude in the form of either `<value>` or `<value>-<value>` where `<value>` is a number or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: None excluded.
counter:
  description: Elk counters to include in Home Assistant.
  required: false
  default: All included.
  type: map
  keys:
    enabled:
      description: Enable this configuration section.
      type: boolean
      required: false
      default: true
    include:
      description: List to include in the form of either `<value>` or `<value>-<value>` where `<value>` is a positive integer or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: All included.
    exclude:
      description: List to exclude in the form of either `<value>` or `<value>-<value>` where `<value>` is a number or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: None excluded.
keypad:
  description: Elk keypads to include in Home Assistant.
  required: false
  default: All included.
  type: map
  keys:
    enabled:
      description: Enable this configuration section.
      type: boolean
      required: false
      default: true
    include:
      description: List to include in the form of either `<value>` or `<value>-<value>` where `<value>` is a positive integer or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: All included.
    exclude:
      description: List to exclude in the form of either `<value>` or `<value>-<value>` where `<value>` is a number or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: None excluded.
output:
  description: Elk outputs to include in Home Assistant.
  required: false
  default: All included.
  type: map
  keys:
    enabled:
      description: Enable this configuration section.
      type: boolean
      required: false
      default: true
    include:
      description: List to include in the form of either `<value>` or `<value>-<value>` where `<value>` is a positive integer or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: All included.
    exclude:
      description: List to exclude in the form of either `<value>` or `<value>-<value>` where `<value>` is a number or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: None excluded.
setting:
  description: Elk settings to include in Home Assistant.
  required: false
  default: All included.
  type: map
  keys:
    enabled:
      description: Enable this configuration section.
      type: boolean
      required: false
      default: true
    include:
      description: List to include in the form of either `<value>` or `<value>-<value>` where `<value>` is a positive integer or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: All included.
    exclude:
      description: List to exclude in the form of either `<value>` or `<value>-<value>` where `<value>` is a number or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: None excluded.
task:
  description: Elk tasks to include in Home Assistant.
  required: false
  default: All included.
  type: map
  keys:
    enabled:
      description: Enable this configuration section.
      type: boolean
      required: false
      default: true
    include:
      description: List to include in the form of either `<value>` or `<value>-<value>` where `<value>` is a positive integer or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: All included.
    exclude:
      description: List to exclude in the form of either `<value>` or `<value>-<value>` where `<value>` is a number or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: None excluded.
thermostat:
  description: Elk thermostats to include in Home Assistant.
  required: false
  default: All included.
  type: map
  keys:
    enabled:
      description: Enable this configuration section.
      type: boolean
      required: false
      default: true
    include:
      description: List to include in the form of either `<value>` or `<value>-<value>` where `<value>` is a positive integer or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: All included.
    exclude:
      description: List to exclude in the form of either `<value>` or `<value>-<value>` where `<value>` is a number or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: None excluded.
plc:
  description: Elk PLC lights to include in Home Assistant.
  required: false
  default: All included.
  type: map
  keys:
    enabled:
      description: Enable this configuration section.
      type: boolean
      required: false
      default: true
    include:
      description: List to include in the form of either `<value>` or `<value>-<value>` where `<value>` is a positive integer or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: All included.
    exclude:
      description: List to exclude in the form of either `<value>` or `<value>-<value>` where `<value>` is a number or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: None excluded.
zone:
  description: Elk zones to include in Home Assistant.
  required: false
  default: All included.
  type: map
  keys:
    enabled:
      description: Enable this configuration section.
      type: boolean
      required: false
      default: true
    include:
      description: List to include in the form of either `<value>` or `<value>-<value>` where `<value>` is a positive integer or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: All included.
    exclude:
      description: List to exclude in the form of either `<value>` or `<value>-<value>` where `<value>` is a number or an X10 housecode. See configuration below for examples of ranges.
      type: list
      required: false
      default: None excluded.
{% endconfiguration %}

Example configuration of the above:

```yaml
elkm1:
  host: elks://IP_ADDRESS
  username: USERNAME
  password: PASSWORD
  area:
    exclude: [5-8]
  zone:
    exclude: [11-16, 19-192, 199-208]
  plc:
    include: [a1-d16, 192]
    exclude: [b12-d5]
```

Example configuration using `auto_configure`:

```yaml
elkm1:
  host: elks://IP_ADDRESS
  username: USERNAME
  password: PASSWORD
  auto_configure: true
```

Example for a serial port instance on /dev/ttyUSB0 at 115200 baud:

```yaml
elkm1:
  - host: serial:///dev/ttyUSB0:115200
    # Elk doesn't know which areas/zones/etc are unused, so it can generate
    # many unwanted Home Assistant Entities.  Be liberal in excluding them:
    area:
      exclude: [2-8]
    zone:
      exclude: [17-192, 195-208]
    plc:
      enabled: false
    task:
      enabled: false
    counter:
      exclude: [1-64]
    keypad:
      exclude: [3-16]
    setting:
      exclude: [1-20]
    output:
      enabled: false
    thermostat:
      enabled: false
```

## Events

The ElkM1 integration supports the following event: `elkm1.keypad_key_pressed`.
The event is generated whenever a key is pressed on an ElkM1 keypad.
The `event_data` contains the following:

- `keypad_id`: The number of the keypad that reported the keypress.
- `key_name`: The name of the key that was pressed.
- `key`: The number of the key that was pressed.

## Actions

Besides the standard Home Assistant actions for Alarm control panel, Climate, Light, Scene, Sensor,
and Switch the ElkM1 integration offers these additional actions:

- `elkm1.alarm_arm_home_instant`
- `elkm1.alarm_arm_night_instant`
- `elkm1.alarm_arm_vacation`
- `elkm1.alarm_bypass`
- `elkm1.alarm_clear_bypass`
- `elkm1.alarm_display_message`
- `elkm1.sensor_counter_refresh`
- `elkm1.sensor_counter_set`
- `elkm1.sensor_zone_bypass`
- `elkm1.sensor_zone_trigger`
- `elkm1.set_time`
- `elkm1.speak_phrase`
- `elkm1.speak_word`

### Actions `elkm1.alarm_arm_home_instant`, `elkm1.alarm_arm_night_instant`, and `elkm1.alarm_arm_vacation`

Arms the ElkM1 area in "home instant", "night instant", or "vacation" modes
respectively.

| Data attribute | Optional | Description                                   |
| ---------------------- | -------- | --------------------------------------------- |
| `entity_id`            | yes      | ElkM1 area which to arm.                      |
| `code`                 | no       | Alarm code to arm the system (4 or 6 digits). |

### Actions `elkm1.alarm_bypass` and `elkm1.alarm_clear_bypass`

For all zones associated with the specified alarm panel these actions respectively
bypass or clear the bypass the zones.

| Data attribute | Optional | Description                                           |
| ---------------------- | -------- | ----------------------------------------------------- |
| `entity_id`            | yes      | ElkM1 area which to bypass or clear bypass.           |
| `code`                 | no       | Alarm code to bypass the alarm panel (4 or 6 digits). |

### Action `elkm1.alarm_display_message`

Display text on an area's keypads.

| Data attribute | Optional | Description                                                                     |
| ---------------------- | -------- | ------------------------------------------------------------------------------- |
| `entity_id`            | yes      | ElkM1 area which to display the message.                                        |
| `clear`                | yes      | 0=clear message, 1=clear message with * key, 2=Display until timeout; default 2 |
| `beep`                 | yes      | 0=no beep, 1=beep; default 0                                                    |
| `timeout`              | yes      | Time to display message, 0=forever, max 65535, default 0                        |
| `line1`                | yes      | Up to 16 characters of text (truncated if too long). Default blank.             |
| `line2`                | yes      | Up to 16 characters of text (truncated if too long). Default blank.             |

### Action `elkm1.sensor_counter_refresh`

Refresh the value of a counter. Note that under certain conditions the
panel does not automatically send a new value under certain
conditions. This action retrieves the current counter value.

| Data attribute | Optional | Description               |
| ---------------------- | -------- | ------------------------- |
| `entity_id`            | yes      | ElkM1 counter to refresh. |

### Action `elkm1.sensor_counter_set`

Set counter to value.

| Data attribute | Optional | Description                                 |
| ---------------------- | -------- | ------------------------------------------- |
| `entity_id`            | yes      | ElkM1 counter to refresh.                   |
| `value`                | no       | Value to set the counter to Can be 0-65536. |

### Action `elkm1.sensor_zone_bypass`

Bypass a zone. Note that the only mechanism ElkM1 offers to clear the bypass
is to clear all the bypassed zones in a given alarm panel (area).

| Data attribute | Optional | Description                                    |
| ---------------------- | -------- | ---------------------------------------------- |
| `entity_id`            | yes      | ElkM1 zone which to bypass.                    |
| `code`                 | no       | Alarm code to bypass the zone (4 or 6 digits). |

### Action `elkm1.sensor_zone_trigger`

Cause a zone on the panel to trigger. This command creates a virtual momentary 
open condition on the zone as if the EOL hardwired loop had been physically opened.

| Data attribute | Optional | Description                  |
| ---------------------- | -------- | ---------------------------- |
| `entity_id`            | yes      | ElkM1 zone which to trigger. |

### Action `elkm1.set_time`

Set the time on the panel. Uses the current time on the instance of Home Assistant.

| Data attribute | Optional | Description                                               |
| ---------------------- | -------- | --------------------------------------------------------- |
| `prefix`               | yes      | Prefix to identify panel when multiple panels configured. |

### Action `elkm1.speak_phrase`

Speak a phrase. The list of phrases is defined in the ElkM1 ASCII Protocol documentation.

| Data attribute | Optional | Description                                               |
| ---------------------- | -------- | --------------------------------------------------------- |
| `phrase`               | no       | Phrase to speak.                                          |
| `prefix`               | yes      | Prefix to identify panel when multiple panels configured. |

### Action `elkm1.speak_word`

Speak a word. The list of words is defined in the ElkM1 ASCII Protocol documentation.

| Data attribute | Optional | Description                                               |
| ---------------------- | -------- | --------------------------------------------------------- |
| `word`                 | no       | Word to speak.                                            |
| `prefix`               | yes      | Prefix to identify panel when multiple panels configured. |

## Debugging
Debug logs are often required to solve an issue. Follow the instructions on [Enabling debug logging](/docs/configuration/troubleshooting/#enabling-debug-logging).

Sometimes, for example, a problem can occur while starting Home Assistant. In this case, follow these instructions.
Add the following to your {% term "`configuration.yaml`" %} file in your Home Assistant `config` directory:

```yaml
logger:
  logs:
    elkm1_lib: debug
    homeassistant.components.elkm1: debug
```

After updating your configuration file, restart Home Assistant. The debug logs will be in the file `homeassistant.log` in the `config` directory.
