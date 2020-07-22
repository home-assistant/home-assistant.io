---
title: "Script Syntax"
description: "Documentation for the Home Assistant Script Syntax."
redirect_from: /getting-started/scripts/
---

Scripts are a sequence of actions that Home Assistant will execute. Scripts are available as an entity through the standalone [Script component] but can also be embedded in [automations] and [Alexa/Amazon Echo] configurations.

The script syntax basic structure is a list of key/value maps that contain actions. If a script contains only 1 action, the wrapping list can be omitted.

```yaml
# Example script integration containing script syntax
script:
  example_script:
    sequence:
      # This is written using the Script Syntax
      - service: light.turn_on
        data:
          entity_id: light.ceiling
      - service: notify.notify
        data:
          message: 'Turned on the ceiling light!'
```

### Call a Service

The most important one is the action to call a service. This can be done in various ways. For all the different possibilities, have a look at the [service calls page].

```yaml
- alias: Bedroom lights on
  service: light.turn_on
  data:
    entity_id: group.bedroom
    brightness: 100
```

#### Activate a Scene

Scripts may also use a shortcut syntax for activating scenes instead of calling the `scene.turn_on` service.

```yaml
- scene: scene.morning_living_room
```

### Test a Condition

While executing a script you can add a condition to stop further execution. When a condition does not return `true`, the script will stop executing. There are many different conditions which are documented at the [conditions page].

```yaml
# If paulus is home, continue to execute the script below these lines
- condition: state
  entity_id: device_tracker.paulus
  state: 'home'
```

### Delay

Delays are useful for temporarily suspending your script and start it at a later moment. We support different syntaxes for a delay as shown below.

{% raw %}
```yaml
# Seconds
# Waits 5 seconds
- delay: 5
```

```yaml
# HH:MM
# Waits 1 hour
- delay: '01:00'
```

```yaml
# HH:MM:SS
# Waits 1.5 minutes
- delay: '00:01:30'
```

```yaml
# Supports milliseconds, seconds, minutes, hours, days
# Can be used in combination, at least one required
# Waits 1 minute
- delay:
    minutes: 1
```
{% endraw %}

All forms accept templates.

{% raw %}
```yaml
# Waits however many minutes input_number.minute_delay is set to
- delay: "{{ states('input_number.minute_delay') | multiply(60) | int }}"
```
{% endraw %}

### Wait

These actions allow a script to wait for entities in the system to be in a certain state as specified by a template, or some event to happen as expressed by one or more triggers.

When used within an automation the `trigger` variable is available. See [Available-Trigger-Data](/docs/automation/templating/#available-trigger-data).

#### Wait Template

This action evaluates the template, and if true, the script will continue. If not, then it will wait until it is true.

{% raw %}
```yaml
# Wait until media player have stop the playing
- wait_template: "{{ is_state('media_player.floor', 'stop') }}"
```
{% endraw %}

#### Wait for Trigger

This action can use the same triggers that are available in an automation's `trigger` section. See [Automation Trigger](/docs/automation/trigger). The script will continue whenever any of the triggers fires.
{% raw %}
```yaml
# Wait for a custom event or light to turn on and stay on for 10 sec
- wait_for_trigger:
    - platform: event
      event_type: MY_EVENT
    - platform: state
      entity_id: light.LIGHT
      to: 'on'
      for: 10
```
{% endraw %}

#### Wait Timeout

With both types of waits it is possible to set a timeout after which the script will continue its execution if the condition/event is not satisfied. Timeout has the same syntax as `delay`, and like `delay`, also accepts templates.

{% raw %}
```yaml
# Wait for sensor to change to 'on' up to 1 minute before continuing to execute.
- wait_template: "{{ is_state('binary_sensor.entrance', 'on') }}"
  timeout: '00:01:00'
```
{% endraw %}

You can also get the script to abort after the timeout by using optional `continue_on_timeout`.

{% raw %}
```yaml
# Wait for IFTTT event or abort after specified timeout.
- wait_for_trigger:
    - platform: event
      event_type: ifttt_webhook_received
      event_data:
        action: connected_to_network
  timeout:
    minutes: "{{ timeout_minutes }}"
  continue_on_timeout: false
```
{% endraw %}

Without `continue_on_timeout` the script will always continue.

#### Wait Variable

After each time a wait completes, either because the condition was met, the event happened, or the timeout expired, the variable `wait` will be created/updated to indicate the result.

Variable | Description
-|-
`wait.completed` | Exists only after `wait_template`. `true` if the condition was met, `false` otherwise
`wait.trigger` | Exists only after `wait_for_trigger`. See [Available-Trigger-Data](/docs/automation/templating/#available-trigger-data)
`wait.remaining` | Timeout remaining, or `none` if a timeout was not specified

This can be used to take different actions based on whether or not the condition was met, or to use more than one wait sequentially while implementing a single timeout overall.

{% raw %}
```yaml
# Take different actions depending on if condition was met.
- wait_template: "{{ is_state('binary_sensor.door', 'on') }}"
  timeout: 10
- choose:
    - conditions:
        - condition: template
          value_template: "{{ not wait.completed }}"
      sequence:
        - service: script.door_did_not_open
  default:
    - service: script.turn_on
      entity_id:
        - script.door_did_open
        - script.play_fanfare

# Wait a total of 10 seconds.
- wait_template: "{{ is_state('binary_sensor.door_1', 'on') }}"
  timeout: 10
  continue_on_timeout: false
- service: switch.turn_on
  entity_id: switch.some_light
- wait_for_trigger:
    - platform: state
      entity_id: binary_sensor.door_2
      to: 'on'
      for: 2
  timeout: "{{ wait.remaining }}"
  continue_on_timeout: false
- service: switch.turn_off
  entity_id: switch.some_light
```
{% endraw %}

### Fire an Event

This action allows you to fire an event. Events can be used for many things. It could trigger an automation or indicate to another integration that something is happening. For instance, in the below example it is used to create an entry in the logbook.

```yaml
- event: LOGBOOK_ENTRY
  event_data:
    name: Paulus
    message: is waking up
    entity_id: device_tracker.paulus
    domain: light
```

You can also use event_data to fire an event with custom data. This could be used to pass data to another script awaiting
an event trigger.

{% raw %}
```yaml
- event: MY_EVENT
  event_data:
    name: myEvent
    customData: "{{ myCustomVariable }}"
```
{% endraw %}

### Raise and Consume Custom Events

The following automation shows how to raise a custom event called `event_light_state_changed` with `entity_id` as the event data. The action part could be inside a script or an automation.

{% raw %}
```yaml
- alias: Fire Event
  trigger:
    - platform: state
      entity_id: switch.kitchen
      to: 'on'
  action:
    - event: event_light_state_changed
      event_data:
        state: 'on'
```
{% endraw %}

The following automation shows how to capture the custom event `event_light_state_changed`, and retrieve corresponding `entity_id` that was passed as the event data.

{% raw %}
```yaml
- alias: Capture Event
  trigger:
    - platform: event
      event_type: event_light_state_changed
  action:
    - service: notify.notify
      data:
        message: "kitchen light is turned {{ trigger.event.data.state }}"
```
{% endraw %}

### Repeat a Group of Actions

This action allows you to repeat a sequence of other actions. Nesting is fully supported.
There are three ways to control how many times the sequence will be run.

#### Counted Repeat

This form accepts a count value. The value may be specified by a template, in which case
the template is rendered when the repeat step is reached.

{% raw %}
```yaml
script:
  flash_light:
    mode: restart
    sequence:
      - service: light.turn_on
        data:
          entity_id: "light.{{ light }}"
      - repeat:
          count: "{{ count|int * 2 - 1 }}"
          sequence:
            - delay: 2
            - service: light.toggle
              data:
                entity_id: "light.{{ light }}"
  flash_hallway_light:
    sequence:
      - service: script.flash_light
        data:
          light: hallway
          count: 3
```
{% endraw %}

#### While Loop

This form accepts a list of conditions (see [conditions page] for available options) that are evaluated _before_ each time the sequence
is run. The sequence will be run _as long as_ the condition(s) evaluate to true.

{% raw %}
```yaml
script:
  do_something:
    sequence:
      - service: script.get_ready_for_something
      - alias: Repeat the sequence AS LONG AS the conditions are true
        repeat:
          while:
            - condition: state
              entity_id: input_boolean.do_something
              state: 'on'
            # Don't do it too many times
            - condition: template
              value_template: "{{ repeat.index <= 20 }}"
          sequence:
            - service: script.something
```
{% endraw %}

#### Repeat Until

This form accepts a list of conditions that are evaluated _after_ each time the sequence
is run. Therefore the sequence will always run at least once. The sequence will be run
_until_ the condition(s) evaluate to true.

{% raw %}
```yaml
automation:
  - trigger:
      - platform: state
        entity_id: binary_sensor.xyz
        to: 'on'
    condition:
      - condition: state
        entity_id: binary_sensor.something
        state: 'off'
    mode: single
    action:
      - alias: Repeat the sequence UNTIL the conditions are true
        repeat:
          sequence:
            # Run command that for some reason doesn't always work
            - service: shell_command.turn_something_on
            # Give it time to complete
            - delay:
                milliseconds: 200
          until:
            # Did it work?
            - condition: state
              entity_id: binary_sensor.something
              state: 'on'
```
{% endraw %}

#### Repeat Loop Variable

A variable named `repeat` is defined within the repeat action (i.e., it is available inside `sequence`, `while` & `until`.)
It contains the following fields:

field | description
-|-
`first` | True during the first iteration of the repeat sequence
`index` | The iteration number of the loop: 1, 2, 3, ...
`last` | True during the last iteration of the repeat sequence, which is only valid for counted loops

### Choose a Group of Actions

This action allows you to select a sequence of other actions from a list of sequences.
Nesting is fully supported.
Each sequence is paired with a list of conditions (see [conditions page] for available options.) The first sequence whose conditions are all true will be run.
An optional `default` sequence can be included which will be run if none of the sequences from the list are run.

{% raw %}
```yaml
automation:
  - trigger:
      - platform: state
        entity_id: binary_sensor.motion
    mode: queued
    action:
      - choose:
          # IF motion detected
          - conditions:
              - condition: template
                value_template: "{{ trigger.to_state.state == 'on' }}"
            sequence:
              - service: script.turn_on
                entity_id:
                  - script.slowly_turn_on_front_lights
                  - script.announce_someone_at_door
        # ELSE (i.e., motion stopped)
        default:
          - service: light.turn_off
            entity_id: light.front_lights
```
{% endraw %}

[Script component]: /integrations/script/
[automations]: /getting-started/automation-action/
[Alexa/Amazon Echo]: /integrations/alexa/
[service calls page]: /getting-started/scripts-service-calls/
[conditions page]: /getting-started/scripts-conditions/
