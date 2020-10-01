---
title: Manual MQTT Alarm
description: Instructions on how to turn Home Assistant into an alarm system but integrating the manual alarm with MQTT control support.
ha_category:
  - Alarm
ha_release: '0.50'
ha_domain: manual_mqtt
---

The `mqtt` platform extends the [manual alarm](/integrations/manual) by adding support for MQTT control of the alarm by a remote device. It can be used to create external keypads which simply change the state of the manual alarm in Home Assistant.

It's essentially the opposite of the [MQTT Alarm Panel](/integrations/alarm_control_panel.mqtt/) which allows Home Assistant to observe an existing, fully-featured alarm where all of the alarm logic is embedded in that physical device.

The integration expects your Alarm Panel to send commands via MQTT to the `command_topic` in the form of a JSON map.  The integration requires the map to have an `action` key, and optionally takes a `code` key.  The integration will accept the following actions from your Alarm Panel:

- `DISARM`
- `ARM_HOME`
- `ARM_AWAY`
- `ARM_NIGHT`

An example command message would look like: `{"action":"DISARM", "code":"1234"}`

If your Alarm Panel sends the incorrect code to arm or disarm the alarm, the integration will publish the string `INVALID` to the `status_topic`.

When the state of the manual alarm changes, Home Assistant will publish one of the following states to the `state_topic`:

- `disarmed`
- `armed_home`
- `armed_away`
- `armed_night`
- `arming_home`
- `arming_away`
- `arming_night`
- `triggered`

When the integration starts, it will publish the configuration parameters to the `config_topic`.  The configuration is a JSON map that contains the following keys (see below for descriptions of these):

- `version`
- `code_arm_required`
- `code_disarm_required`
- `state_topic`
- `status_topic`
- `command_topic`
- `delay_times`
- `arming_times`
- `trigger_times`

## Configuration

To use your panel in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
alarm_control_panel:
  - platform: manual_mqtt
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
arming_time:
  description: The time in seconds of the arming time before effecting a state change to an armed state.
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
armed_home/armed_away/armed_night/disarmed/triggered:
  description: State specific settings
  required: false
  type: list
  keys:
    delay_time:
      description: State specific setting for **delay_time** (all states except **triggered**).
      required: false
      type: integer
    arming_time:
      description: State specific setting for **arming_time** (all states except **disarmed** and **triggered**).
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
  required: false
  type: string
  default: home/alarm
command_topic:
  description: The MQTT topic Home Assistant will subscribe to, to receive commands from a remote device to change the alarm state.
  required: false
  type: string
  default: home/alarm/set
config_topic:
  description: The MQTT topic Home Assistant will use to publish the alarm configuration for the Alarm Panel to use.
  required: false
  type: string
  default: home/alarm/config
status_topic:
  description: The MQTT topic Home Assistant will use to publish immediate status when a state transition command fails.
  required: false
  type: string
  default: home/alarm/status
qos:
  description: The maximum QoS level for subscribing and publishing to MQTT messages.
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
    code: '1234'
    arming_time: 30
    delay_time: 20
    trigger_time: 4
    disarmed:
      trigger_time: 0
    armed_home:
      arming_time: 0
      delay_time: 0
```

This will result in the following configuration JSON sent to the `config_topic` when the intrgration begins:

```txt
{"version": 1, "code_arm_required": true, "code_disarm_required": true, "state_topic": "home/alarm", "status_topic": "home/alarm/status", "comand_topic": "home/alarm/set", "delay_times": {"disarmed": 20, "armed_away": 20, "armed_home": 0, "armed_night": 20}, "arming_times": {"armed_away": 30, "armed_home": 0, "armed_night": 30}, "trigger_times": {"disarmed": 0, "armed_away": 4, "armed_home": 4, "armed_night": 4}}
```

Refer to the [Manual Alarm Control page](/integrations/manual#examples) for more real-life examples on how to use this panel.

## MQTT Control

The state of this alarm can be controlled using [MQTT](/integrations/mqtt/). Ensure you've configured that before adding this component.

To change the state of the alarm, publish a JSON map with one of the following actions and an optional code to the `command_topic`:

 - `DISARM`
 - `ARM_HOME`
 - `ARM_AWAY`
 - `ARM_NIGHT`

The JSON should look like: `{"action":"DISARM", "code":"1234"}`.  If you send the wrong code, you will receive a notification back on the `status_topic` with the string `INVALID`.

To receive state updates from HA, subscribe to the `state_topic`. Home Assistant will publish a new message whenever the state changes:

 - `disarmed`
 - `armed_home`
 - `armed_away`
 - `armed_night`
 - `arming_home`
 - `arming_away`
 - `arming_night`
 - `triggered`

Finally, when the integration starts it will send a JSON map to the `config_topic` which provides the necessary information for the alarm application to discover how HA was configured in order to provide a better user experience.  The `config_topic` keys have the following definitions:


{% configuration %}
version:
  description: The version of the integration / MQTT Protocol
  type: integer
  default: 1
code_arm_required:
  description: Whether a code is required to transition to an armed state.
  type: boolean
  default: true
code_disarm_required:
  description: Whether a code is required to disarm the alarm
  type: boolean
  default: false
state_topic:
  description: The MQTT topic Home Assistant will publish state updates to.
  type: string
command_topic:
  description: The MQTT topic Home Assistant will subscribe to, to receive commands from a remote device to change the alarm state.
  type: string
status_topic:
  description: The MQTT topic Home Assistant will use to publish immediate status when a state transition command fails.
  type: string
arming_times/delay_times/trigger_times:
  description: The transition times when transitioning into a particular state
  type: map
  keys:
    disarmed:
      description: Timer-specific setting for transitioning to **disarmed** state.  Not included in `arming_times`
      type: integer
    armed_away:
      description: Timer-specific setting for transitioning to **armed_away** state.
      type: integer
    armed_home:
      description: Timer-specific setting for transitioning to **armed_home** state.
      type: integer
    armed_night:
      description: Timer-specific setting for transitioning to **armed_night** state.
      type: integer
{% endconfiguration %}
