---
title: Manual MQTT Alarm control panel
description: Instructions on how to integrate manual alarms into Home Assistant with MQTT support.
ha_category:
  - Alarm
ha_release: '0.50'
ha_domain: manual_mqtt
ha_iot_class: Local Push
ha_platforms:
  - alarm_control_panel
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `mqtt` {% term integration %} extends the [manual alarm](/integrations/manual) by adding support for MQTT control of the alarm by a remote device. It can be used to create external keypads which simply change the state of the manual alarm in Home Assistant.

It's essentially the opposite of the [MQTT Alarm Panel](/integrations/alarm_control_panel.mqtt/) which allows Home Assistant to observe an existing, fully-featured alarm where all of the alarm logic is embedded in that physical device.

The {% term integration %} will accept the following commands from your Alarm Panel via the `command_topic`:

- `DISARM`
- `ARM_HOME`
- `ARM_AWAY`
- `ARM_NIGHT`
- `ARM_VACATION`
- `ARM_CUSTOM_BYPASS`

When the state of the manual alarm changes, Home Assistant will publish one of the following states to the `state_topic`:

- 'disarmed'
- 'armed_home'
- 'armed_away'
- 'armed_night'
- 'armed_vacation'
- 'armed_custom_bypass'
- 'pending'
- 'triggered'

## Configuration

To use your panel in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: manual_mqtt
    state_topic: home/alarm
    command_topic: home/alarm/set
```

The following configuration variables from the base manual alarm platform are available:

{% configuration %}
name:
  description: The name of the alarm.
  required: false
  type: string
  default: HA Alarm
code:
  description: >
    If defined, specifies a code to enable or disable the alarm in the frontend.
    This code is not required for MQTT interactions.
    Only one of **code** and **code_template** can be specified.
  required: exclusive
  type: string
code_template:
  description: >
    If defined, returns a code to enable or disable the alarm in the frontend; an empty string disables checking the code.
    Inside the template, the variables **from_state** and **to_state** identify the current and desired state.
    Only one of **code** and **code_template** can be specified.
  required: exclusive
  type: string
code_arm_required:
  description: >
   If true, the code is required to arm the alarm. If false, the code is not validated.
  required: false
  type: boolean
  default: true
delay_time:
  description: The time in seconds of delay added to the triggered state's **pending_time** before triggering the alarm.
  required: false
  type: integer
  default: 0
pending_time:
  description: The time in seconds of the pending time before effecting a state change.
  required: false
  type: integer
  default: 60
trigger_time:
  description: The time in seconds of the trigger time in which the alarm is firing.
  required: false
  type: integer
  default: 120
disarm_after_trigger:
  description: If true, the alarm will automatically disarm after it has been triggered instead of returning to the previous state.
  required: false
  type: boolean
  default: false
armed_home/armed_away/armed_night/armed_vacation/armed_custom_bypass/disarmed/triggered:
  description: State specific settings
  required: false
  type: list
  keys:
    delay_time:
      description: State specific setting for **delay_time** (all states except **triggered**).
      required: false
      type: integer
    pending_time:
      description: State specific setting for **pending_time** (all states except **disarmed**).
      required: false
      type: integer
    trigger_time:
      description: State specific setting for **trigger_time** (all states except **triggered**).
      required: false
      type: integer
{% endconfiguration %}

See the documentation for the [manual alarm platform](/integrations/manual) for a description.

Additionally, the following MQTT configuration variables are also available.

{% configuration %}
state_topic:
  description: The MQTT topic Home Assistant will publish state updates to.
  required: true
  type: string
command_topic:
  description: The MQTT topic Home Assistant will subscribe to, to receive commands from a remote device to change the alarm state.
  required: true
  type: string
qos:
  description: The maximum QoS level to be used when receiving and publishing messages.
  required: false
  type: integer
  default: 0
payload_disarm:
  description: The payload to disarm this Alarm Panel.
  required: false
  type: string
  default: DISARM
payload_arm_home:
  description: The payload to set armed-home mode on this Alarm Panel.
  required: false
  type: string
  default: ARM_HOME
payload_arm_away:
  description: The payload to set armed-away mode on this Alarm Panel.
  required: false
  type: string
  default: ARM_AWAY
payload_arm_night:
  description: The payload to set armed-night mode on this Alarm Panel.
  required: false
  type: string
  default: ARM_NIGHT
payload_arm_vacation:
  description: The payload to set armed-vacation mode on this Alarm Panel.
  required: false
  type: string
  default: ARM_VACATION
payload_arm_custom_bypass:
  description: The payload to set armed-custom bypass mode on this Alarm Panel.
  required: false
  type: string
  default: ARM_CUSTOM_BYPASS
{% endconfiguration %}

## Examples

In the configuration example below:

- The disarmed state never triggers the alarm
- The armed_home state will leave no time to leave the building or disarm the alarm
- While other states state will give 30 seconds to leave the building before triggering the alarm, and 20 seconds to disarm the alarm when coming back
- Setting pending_time to 0 for triggered state allows the alarm to trigger after previous state's delay time only. If not set, the alarm will be pending for previous state's delay_time plus the default pending_time before triggering.

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: manual_mqtt
    state_topic: home/alarm
    command_topic: home/alarm/set
    pending_time: 30
    delay_time: 20
    trigger_time: 4
    disarmed:
      trigger_time: 0
    armed_home:
      pending_time: 0
      delay_time: 0
    triggered:
      pending_time: 0
```

Refer to the [Manual Alarm Control page](/integrations/manual#examples) for more real-life examples on how to use this panel.

## MQTT control

The state of this alarm can be controlled using [MQTT](/integrations/mqtt/). Ensure you've configured that before adding this component.

To change the state of the alarm, publish one of the following messages to the `command_topic`:

 - `DISARM`
 - `ARM_HOME`
 - `ARM_AWAY`
 - `ARM_NIGHT`
 - `ARM_VACATION`
 - `ARM_CUSTOM_BYPASS`

To receive state updates from HA, subscribe to the `state_topic`. Home Assistant will publish a new message whenever the state changes:

 - `disarmed`
 - `armed_home`
 - `armed_away`
 - `armed_night`
 - `armed_vacation`
 - `armed_custom_bypass`
 - `pending`
 - `triggered`
