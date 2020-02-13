---
title: Elmo Alarm
description: Instructions on how to integrate e-connect Elmo SpA alarm system with Home Assistant.
logo: ness.png
ha_category:
  - Alarm
  - Binary Sensor
ha_release: 1.105
ha_iot_class: Local Push
ha_codeowners:
  - '@markin'
---

The `elmo_alarm` integration will allow Home Assistant users who own a Elmo alarm system to leverage their alarm system and its sensors to provide Home Assistant with information about their homes. 
Connectivity between Home Assistant and the alarm is accomplished through e-connect platform (https://connect.elmospa.com) that must be configured and working with the alarm.

There is currently support for the following device types within Home Assistant:

- Binary Sensor: Reports on zone and input statuses
- Alarm Control Panel: Reports on alarm status, and can be used to arm/disarm the system

The module communicates via [e-connect](https://connect.elmospa.com).

## Configuration

A `elmo_alarm` section must be present in the `configuration.yaml` file and contain the following options as required:

```yaml
# Example configuration.yaml entry
elmo_alarm:
  host: 'https://connect.elmospa.com'
  vendor: '<vendor>'
  username: '<username>'
  password: '<password>'
  scan_interval:
    seconds: 5
  states:
    - name: 'armed_home'
      zones: [1]
    - name: 'armed_away'
      zones: [1, 2, 3, 4]
    - name: 'armed_night'
      zones: [1, 4]
    - name: 'armed_custom_bypass'
      zones: [3]
```

### Configuration parameters explanation
{% configuration %}
host:
  description: The url to e-connect.
  required: true
  type: string
vendor:
  description: The name of the vendor account.
  required: true
  type: string
username:
  description: The username to login into e-connect.
  required: true
  type: string
password:
  description: The password to login into e-connect.
  required: true
  type: string
scan_interval:
  description: "Time interval between updates. Supported formats: `scan_interval: 'HH:MM:SS'`, `scan_interval: 'HH:MM'` and Time period dictionary (see example below)."
  required: false
  default: '00:01:00'
  type: time
states:
  description: List of states (to match with sectors/zones) available
  required: true
  type: list
  keys:
    name:
      description: Name of the state ("arm_home", "arm_away", "arm_night", "arm_custom_bypass")
      required: true
      type: string
    zones:
      description: Indexes of the zones to include in the state definition.
      required: true
      type: list
{% endconfiguration %}
#### Time period dictionary example

```yaml
scan_interval:
  # At least one of these must be specified:
  days: 0
  hours: 0
  minutes: 0
  seconds: 10
  milliseconds: 0
```
