---
title: "Script Syntax"
description: "Documentation for the Home Assistant Script Syntax."
---

Scripts are a sequence of actions that Home Assistant will execute. Scripts are available as an entity through the standalone [Script component] but can also be embedded in [automations] and [Alexa/Amazon Echo] configurations.

When the script is executed within an automation the `trigger` variable is available. See [Available-Trigger-Data](/docs/automation/templating/#available-trigger-data).

The script syntax basic structure is a list of key/value maps that contain actions. If a script contains only 1 action, the wrapping list can be omitted.

All actions support an optional `alias`.

```yaml
# Example script integration containing script syntax
script:
  example_script:
    sequence:
      # This is written using the Script Syntax
      - alias: "Turn on ceiling light"
        service: light.turn_on
        target:
          entity_id: light.ceiling
      - alias: "Notify that ceiling light is turned on"
        service: notify.notify
        data:
          message: "Turned on the ceiling light!"
```

- [Call a Service](#call-a-service)
  - [Activate a Scene](#activate-a-scene)
- [Variables](#variables)
- [Test a Condition](#test-a-condition)
- [Delay](#delay)
- [Wait](#wait)
  - [Wait Template](#wait-template)
  - [Wait for Trigger](#wait-for-trigger)
  - [Wait Timeout](#wait-timeout)
  - [Wait Variable](#wait-variable)
- [Fire an Event](#fire-an-event)
  - [Raise and Consume Custom Events](#raise-and-consume-custom-events)
- [Repeat a Group of Actions](#repeat-a-group-of-actions)
  - [Counted Repeat](#counted-repeat)
  - [While Loop](#while-loop)
  - [Repeat Until](#repeat-until)
  - [Repeat Loop Variable](#repeat-loop-variable)
- [Choose a Group of Actions](#choose-a-group-of-actions)

## Call a Service

The most important one is the action to call a service. This can be done in various ways. For all the different possibilities, have a look at the [service calls page].

```yaml
- alias: "Bedroom lights on"
  service: light.turn_on
  target:
    entity_id: group.bedroom
  data:
    brightness: 100
```

### Activate a Scene

Scripts may also use a shortcut syntax for activating scenes instead of calling the `scene.turn_on` service.

```yaml
- scene: scene.morning_living_room
```

## Variables

The variables action allows you to set/override variables that will be accessible by templates in actions after it. See also [script variables] for how to define variables accessible in the entire script.

{% raw %}

```yaml
- alias: "Set variables"
  variables:
    entities: 
      - light.kitchen
      - light.living_room
    brightness: 100
- alias: "Control lights"
  service: light.turn_on
  target:
    entity_id: "{{ entities }}"
  data:
    brightness: "{{ brightness }}"
```

{% endraw %}

## Test a Condition

While executing a script you can add a condition to stop further execution. When a condition does not return `true`, the script will stop executing. There are many different conditions which are documented at the [conditions page].

```yaml
# If paulus is home, continue to execute the script below these lines
  alias: "Check if Paulus is home"
- condition: state
  entity_id: device_tracker.paulus
  state: "home"
```

## Delay

Delays are useful for temporarily suspending your script and start it at a later moment. We support different syntaxes for a delay as shown below.

{% raw %}

```yaml
# Seconds
# Waits 5 seconds
- alias: "Wait 5s"
  delay: 5
```

```yaml
# HH:MM
# Waits 1 hour
- delay: "01:00"
```

```yaml
# HH:MM:SS
# Waits 1.5 minutes
- delay: "00:01:30"
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

## Wait

These actions allow a script to wait for entities in the system to be in a certain state as specified by a template, or some event to happen as expressed by one or more triggers.

### Wait Template

This action evaluates the template, and if true, the script will continue. If not, then it will wait until it is true.

The template is re-evaluated whenever an entity ID that it references changes state. If you use non-deterministic functions like `now()` in the template it will not be continuously re-evaluated, but only when an entity ID that is referenced is changed. If you need to periodically re-evaluate the template, reference a sensor from the [Time and Date](/integrations/time_date/) component that will update minutely or daily.

{% raw %}
```yaml

# Wait until media player is stopped
- alias: "Wait until media player is stopped"
  wait_template: "{{ is_state('media_player.floor', 'stop') }}"
```

{% endraw %}

### Wait for Trigger

This action can use the same triggers that are available in an automation's `trigger` section. See [Automation Trigger](/docs/automation/trigger). The script will continue whenever any of the triggers fires. All previously defined [trigger_variables](/docs/automation/trigger#trigger_variables), [variables](#variables) and [script variables] are passed to the trigger.
{% raw %}

```yaml
# Wait for a custom event or light to turn on and stay on for 10 sec
- alias: "Wait for MY_EVENT or light on"
  wait_for_trigger:
    - platform: event
      event_type: MY_EVENT
    - platform: state
      entity_id: light.LIGHT
      to: "on"
      for: 10
```

{% endraw %}

### Wait Timeout

With both types of waits it is possible to set a timeout after which the script will continue its execution if the condition/event is not satisfied. Timeout has the same syntax as `delay`, and like `delay`, also accepts templates.

{% raw %}

```yaml
# Wait for sensor to change to 'on' up to 1 minute before continuing to execute.
- wait_template: "{{ is_state('binary_sensor.entrance', 'on') }}"
  timeout: "00:01:00"
```

{% endraw %}

You can also get the script to abort after the timeout by using optional `continue_on_timeout: false`.

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

Without `continue_on_timeout: false` the script will always continue since the default for `continue_on_timeout` is `true`.

### Wait Variable

After each time a wait completes, either because the condition was met, the event happened, or the timeout expired, the variable `wait` will be created/updated to indicate the result.

Variable | Description
-|-
`wait.completed` | Exists only after `wait_template`. `true` if the condition was met, `false` otherwise
`wait.trigger` | Exists only after `wait_for_trigger`. Contains information about which trigger fired. (See [Available-Trigger-Data](/docs/automation/templating/#available-trigger-data).) Will be `none` if no trigger happened before timeout expired
`wait.remaining` | Timeout remaining, or `none` if a timeout was not specified

This can be used to take different actions based on whether or not the condition was met, or to use more than one wait sequentially while implementing a single timeout overall.

{% raw %}

```yaml
# Take different actions depending on if condition was met.
- wait_template: "{{ is_state('binary_sensor.door', 'on') }}"
  timeout: 10
- choose:
    - conditions: "{{ not wait.completed }}"
      sequence:
        - service: script.door_did_not_open
  default:
    - service: script.turn_on
      target:
        entity_id:
          - script.door_did_open
          - script.play_fanfare

# Wait a total of 10 seconds.
- wait_template: "{{ is_state('binary_sensor.door_1', 'on') }}"
  timeout: 10
  continue_on_timeout: false
- service: switch.turn_on
  target:
    entity_id: switch.some_light
- wait_for_trigger:
    - platform: state
      entity_id: binary_sensor.door_2
      to: "on"
      for: 2
  timeout: "{{ wait.remaining }}"
  continue_on_timeout: false
- service: switch.turn_off
  target:
    entity_id: switch.some_light
```
{% endraw %}

## Fire an Event

This action allows you to fire an event. Events can be used for many things. It could trigger an automation or indicate to another integration that something is happening. For instance, in the below example it is used to create an entry in the logbook.

```yaml
- alias: "Fire LOGBOOK_ENTRY event"
  event: LOGBOOK_ENTRY
  event_data:
    name: Paulus
    message: is waking up
    entity_id: device_tracker.paulus
    domain: light
```

You can also use event_data to fire an event with custom data. This could be used to pass data to another script awaiting
an event trigger.

The `event_data` accepts templates.

{% raw %}

```yaml
- event: MY_EVENT
  event_data:
    name: myEvent
    customData: "{{ myCustomVariable }}"
```

{% endraw %}

### Raise and Consume Custom Events

The following automation example shows how to raise a custom event called `event_light_state_changed` with `entity_id` as the event data. The action part could be inside a script or an automation.

```yaml
- alias: "Fire Event"
  trigger:
    - platform: state
      entity_id: switch.kitchen
      to: "on"
  action:
    - event: event_light_state_changed
      event_data:
        state: "on"
```

The following automation example shows how to capture the custom event `event_light_state_changed` with an [Event Automation Trigger](/docs/automation/trigger#event-trigger), and retrieve corresponding `entity_id` that was passed as the event trigger data, see [Available-Trigger-Data](/docs/automation/templating/#available-trigger-data) for more details.

{% raw %}

```yaml
- alias: "Capture Event"
  trigger:
    - platform: event
      event_type: event_light_state_changed
  action:
    - service: notify.notify
      data:
        message: "kitchen light is turned {{ trigger.event.data.state }}"
```

{% endraw %}

## Repeat a Group of Actions

This action allows you to repeat a sequence of other actions. Nesting is fully supported.
There are three ways to control how many times the sequence will be run.

### Counted Repeat

This form accepts a count value. The value may be specified by a template, in which case
the template is rendered when the repeat step is reached.

{% raw %}

```yaml
script:
  flash_light:
    mode: restart
    sequence:
      - service: light.turn_on
        target:
          entity_id: "light.{{ light }}"
      - alias: "Cycle light 'count' times"
        repeat:
          count: "{{ count|int * 2 - 1 }}"
          sequence:
            - delay: 2
            - service: light.toggle
              target:
                entity_id: "light.{{ light }}"
  flash_hallway_light:
    sequence:
      - alias: "Flash hallway light 3 times"
        service: script.flash_light
        data:
          light: hallway
          count: 3
```

{% endraw %}

### While Loop

This form accepts a list of conditions (see [conditions page] for available options) that are evaluated _before_ each time the sequence
is run. The sequence will be run _as long as_ the condition(s) evaluate to true.

{% raw %}

```yaml
script:
  do_something:
    sequence:
      - service: script.get_ready_for_something
      - alias: "Repeat the sequence AS LONG AS the conditions are true"
        repeat:
          while:
            - condition: state
              entity_id: input_boolean.do_something
              state: "on"
            # Don't do it too many times
            - condition: template
              value_template: "{{ repeat.index <= 20 }}"
          sequence:
            - service: script.something
```

{% endraw %}

The `while` also accepts a [shorthand notation of a template condition][shorthand-template].
For example:

{% raw %}

```yaml
- while: "{{ is_state('sensor.mode', 'Home') and repeat.index < 10 }}"
  sequence:
    - ...
```

{% endraw %}

### Repeat Until

This form accepts a list of conditions that are evaluated _after_ each time the sequence
is run. Therefore the sequence will always run at least once. The sequence will be run
_until_ the condition(s) evaluate to true.

{% raw %}

```yaml
automation:
  - trigger:
      - platform: state
        entity_id: binary_sensor.xyz
        to: "on"
    condition:
      - condition: state
        entity_id: binary_sensor.something
        state: "off"
    mode: single
    action:
      - alias: "Repeat the sequence UNTIL the conditions are true"
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
              state: "on"
```

{% endraw %}

`until` also accepts a [shorthand notation of a template condition][shorthand-template].
For example:

{% raw %}

```yaml
- until: "{{ is_state('device_tracker.iphone', 'home') }}"
  sequence:
    - ...
```
{% endraw %}

### Repeat Loop Variable

A variable named `repeat` is defined within the repeat action (i.e., it is available inside `sequence`, `while` & `until`.)
It contains the following fields:

field | description
-|-
`first` | True during the first iteration of the repeat sequence
`index` | The iteration number of the loop: 1, 2, 3, ...
`last` | True during the last iteration of the repeat sequence, which is only valid for counted loops

## Choose a Group of Actions

This action allows you to select a sequence of other actions from a list of sequences.
Nesting is fully supported.

Each sequence is paired with a list of conditions. (See the [conditions page] for available options and how multiple conditions are handled.) The first sequence whose conditions are all true will be run.
An _optional_ `default` sequence can be included which will be run only if none of the sequences from the list are run.

An _optional_ `alias` can be added to each of the sequences, excluding the `default` sequence.

The `choose` action can be used like an "if" statement. The first `conditions`/`sequence` pair is like the "if/then", and can be used just by itself. Or additional pairs can be added, each of which is like an "elif/then". And lastly, a `default` can be added, which would be like the "else."

{% raw %}

```yaml
# Example with just an "if"
automation:
  - trigger:
      - platform: state
        entity_id: binary_sensor.motion
        to: "on"
    action:
      - choose:
          - alias: "IF nobody home, sound the alarm!"
            conditions:
              - condition: state
                entity_id: group.family
                state: not_home
            sequence:
              - service: script.siren
                data:
                  duration: 60
      - service: light.turn_on
        target:
          entity_id: all
```

```yaml
# Example with "if" and "else"
automation:
  - trigger:
      - platform: state
        entity_id: binary_sensor.motion
    mode: queued
    action:
      - alias: "Turn on front lights if motion detected, else turn off"
        choose:
          # IF motion detected
          - alias: "Motion detected"
            conditions: "{{ trigger.to_state.state == 'on' }}"
            sequence:
              - service: script.turn_on
                target:
                  entity_id:
                    - script.slowly_turn_on_front_lights
                    - script.announce_someone_at_door
        # ELSE (i.e., motion stopped)
        default:
          - service: light.turn_off
            target:
              entity_id: light.front_lights
```

```yaml
# Example with "if", "elif" and "else"
automation:
  - trigger:
      - platform: state
        entity_id: input_boolean.simulate
        to: "on"
    mode: restart
    action:
      - choose:
          # IF morning
          - conditions:
              - condition: template
                value_template: "{{ now().hour < 9 }}"
            sequence:
              - service: script.sim_morning
          # ELIF day
          - conditions:
              - condition: template
                value_template: "{{ now().hour < 18 }}"
            sequence:
              - service: light.turn_off
                target:
                  entity_id: light.living_room
              - service: script.sim_day
        # ELSE night
        default:
          - service: light.turn_off
            target:
              entity_id: light.kitchen
          - delay:
              minutes: "{{ range(1, 11)|random }}"
          - service: light.turn_off
            target:
              entity_id: all
```

{% endraw %}

`conditions` also accepts a [shorthand notation of a template condition][shorthand-template].
For example:

{% raw %}

```yaml
automation:
  - trigger:
      - platform: state
        entity_id: input_select.home_mode
    action:
      - choose:
          - conditions: >
              {{ trigger.to_state.state == 'Home' and
                 is_state('binary_sensor.all_clear', 'on') }}
            sequence:
              - service: script.arrive_home
                data:
                  ok: true
          - conditions: >
              {{ trigger.to_state.state == 'Home' and
                 is_state('binary_sensor.all_clear', 'off') }}
            sequence:
              - service: script.turn_on
                target:
                  entity_id: script.flash_lights
              - service: script.arrive_home
                data:
                  ok: false
          - conditions: "{{ trigger.to_state.state == 'Away' }}"
            sequence:
              - service: script.left_home
```

{% endraw %}


More `choose` can be used together. This is the case of an IF-IF.

The following example shows how a single automation can control entities that aren't related to each other but have in common the same trigger.

When the sun goes below the horizon, the `porch` and `garden` lights must turn on. If someone is watching the TV in the living room, there is a high chance that someone is in that room, therefore the living room lights have to turn on too. The same concept applies to the `studio` room.

{% raw %}

```yaml
# Example with "if" and "if"
automation:
  - alias: "Turn lights on when the sun gets dim and if some room is occupied"
      trigger:
        - platform: numeric_state
          entity_id: sun.sun
          attribute: elevation
          below: 4
      action:
        # This must always apply
        - service: light.turn_on
          data:
            brightness: 255
            color_temp: 366
          target:
            entity_id:
              - light.porch
              - light.garden
        # IF a entity is ON
        - choose:
            - conditions:
                - condition: state
                  entity_id: binary_sensor.livingroom_tv
                  state: "on"
              sequence:
                - service: light.turn_on
                  data:
                    brightness: 255
                    color_temp: 366
                  target:
                    entity_id: light.livingroom
         # IF another entity not related to the previous, is ON
        - choose:
            - conditions:
                - condition: state
                  entity_id: binary_sensor.studio_pc
                  state: "on"
              sequence:
                - service: light.turn_on
                  data:
                    brightness: 255
                    color_temp: 366
                  target:
                    entity_id: light.studio
```

{% endraw %}

[Script component]: /integrations/script/
[automations]: /getting-started/automation-action/
[Alexa/Amazon Echo]: /integrations/alexa/
[service calls page]: /getting-started/scripts-service-calls/
[conditions page]: /getting-started/scripts-conditions/
[shorthand-template]: /docs/scripts/conditions/#template-condition-shorthand-notation
[script variables]: /integrations/script/#-configuration-variables
