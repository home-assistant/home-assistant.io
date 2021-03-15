---
title: Verisure
description: Instructions on how to setup Verisure devices within Home Assistant.
ha_category:
  - Hub
  - Alarm
  - Binary Sensor
  - Camera
  - Lock
  - Sensor
  - Switch
ha_release: pre 0.7
ha_iot_class: Cloud Polling
ha_domain: verisure
ha_codeowners:
  - '@frenck'
ha_platforms:
  - alarm_control_panel
  - binary_sensor
  - camera
  - lock
  - sensor
  - switch
---

Home Assistant has support to integrate your [Verisure](https://www.verisure.com/) devices.

There is currently support for the following device types within Home Assistant:

- Alarm
- Camera
- Switch (Smartplug)
- Sensor (Thermometers, Hygrometers and Mouse detectors)
- Lock
- Binary Sensor (Door & Window)

## Configuration

To integrate Verisure with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
verisure:
  username: USERNAME
  password: PASSWORD
```

{% configuration %}
username:
  description: The username to Verisure mypages.
  required: true
  type: string
password:
  description: The password to Verisure mypages.
  required: true
  type: string
alarm:
  description: Set to `true` to show alarm, `false` to disable.
  required: false
  type: boolean
  default: true
hygrometers:
  description: Set to `true` to show hygrometers, `false` to disable.
  required: false
  type: boolean
  default: true
smartplugs:
  description: Set to `true` to show smartplugs, `false` to disable.
  required: false
  type: boolean
  default: true
locks:
  description: Set to `true` to show locks, `false` to disable.
  required: false
  type: boolean
  default: true
default_lock_code:
  description: Code that will be used to lock or unlock, if none is supplied.
  required: false
  type: string
thermometers:
  description: Set to `true` to show thermometers, `false` to disable.
  required: false
  type: boolean
  default: true
mouse:
  description: Set to `true` to show mouse detectors, `false` to disable.
  required: false
  type: boolean
  default: true
door_window:
  description: Set to `true` to show doors and windows, `false` to disable.
  required: false
  type: boolean
  default: true
code_digits:
  description: Number of digits in PIN code.
  required: false
  type: integer
  default: 4
giid:
  description: The GIID of your installation (If you have more then one alarm system). To find the GIID for your systems run `python verisure.py` EMAIL PASSWORD installations'.
  required: false
  type: string
{% endconfiguration %}

## Alarm Control Panel

The Verisure alarm control panel platform allows you to control your [Verisure](https://www.verisure.com/) Alarms.

The requirement is that you have setup your Verisure hub first, with the instruction above.

The `changed_by` attribute enables one to be able to take different actions depending on who armed/disarmed the alarm in [automation](/getting-started/automation/).

{% raw %}

```yaml
automation:
  - alias: "Alarm status changed"
    trigger:
      - platform: state
        entity_id: alarm_control_panel.alarm_1
    action:
      - service: notify.notify
        data:
          message: >
            Alarm changed from {{ trigger.from_state.state }}
            to {{ trigger.to_state.state }}
            by {{ trigger.to_state.attributes.changed_by }}
```

{% endraw %}

## Services

| Service | Description |
| ------- | ----------- |
| disable_autolock | Disables autolock function for a specific lock. |
| enable_autolock | Enables autolock function for a specific lock. |
| smartcam_capture | Capture a new image from a specific smartcam. |

## 2 Factor Authentication Workaround

In March 2021 Verisure added new 2FA rules that aren't fully support through their third party API integration. If you have 2FA enabled (which is forced as default) You might not be able to use this integration. Here are some steps for a work around.

1. Create a specific Home Assistant user. (not necessary but it's not recommended to turn of 2FA for your admin user).
2. Make sure that user is admin, you've logged in & setup 2FA
3. Login as the Home Assistant user, browse to Account and subscription -> Account -> Login Credentials -> Disable 2FA

   **Note this will only be available if the user is admin and has logged in once with 2FA, logged out and in again**
4. Login as your administrator again and change the Home Assistant user to a restricted user
5. Change Home Assistant Verisure config to the new user credentials in Home Assistant
6. Restart Home Assistant
