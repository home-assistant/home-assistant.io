---
title: "Script Syntax"
description: "Documentation for the Home Assistant Script Syntax."
toc: true
no_toc: true
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

{{ page.content | markdownify | toc_only }}

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

Variables can be templated.

{% raw %}

```yaml
- alias: "Set a templated variable"
  variables:
    blind_state_message: "The blind is {{ states('cover.blind') }}."
- alias: "Notify about the state of the blind"
  service: notify.mobile_app_iphone
  data:
    message: "{{ blind_state_message }}"
```

{% endraw %}

### Scope of Variables

Variables have local scope. This means that if a variable is changed in a nested sequence block, that change will not be visible in an outer sequence block.

Inside the `if` sequence the `variables` action will only alter the `people` variable for that sequence.

{% raw %}

```yaml
sequence:
  # Set the people variable to a default value
  - variables:
      people: 0
  # Try to increment people if Paulus is home
  - if:
      - condition: state
        entity_id: device_tracker.paulus
        state: "home"
    then:
      # At this scope and this point of the sequence, people == 0
      - variables:
          people: "{{ people + 1 }}"
      # At this scope, people will now be 1 ...
      - service: notify.notify
        data:
          message: "There are {{ people }} people home" # "There are 1 people home"
  # ... but at this scope it will still be 0
  - service: notify.notify
    data:
      message: "There are {{ people }} people home" # "There are 0 people home"
```

{% endraw %}

## Test a Condition

While executing a script you can add a condition in the main sequence to stop further execution. When a condition does not return `true`, the script will stop executing. There are many different conditions which are documented at the [conditions page].

<div class='note'>

The `condition` action only stops executing the current sequence block. When it is used inside a [repeat](#repeat-a-group-of-actions) action, only the current iteration of the `repeat` loop will stop. When it is used inside a [choose](#choose-a-group-of-actions) action, only the actions within that `choose` will stop.

</div>

```yaml
# If paulus is home, continue to execute the script below these lines
- alias: "Check if Paulus is home"
  condition: state
  entity_id: device_tracker.paulus
  state: "home"
```

`condition` can also be a list of conditions and execution will then only continue if ALL conditions return `true`.

```yaml
- alias: "Check if Paulus ishome AND temperature is below 20"
  condition:
    - condition: state
      entity_id: "device_tracker.paulus"
      state: "home"
    - condition: numeric_state
      entity_id: "sensor.temperature"
      below: 20
```

## Wait for time to pass (delay)

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

### Wait for a template

This action evaluates the template, and if true, the script will continue. If not, then it will wait until it is true.

The template is re-evaluated whenever an entity ID that it references changes state. If you use non-deterministic functions like `now()` in the template it will not be continuously re-evaluated, but only when an entity ID that is referenced is changed. If you need to periodically re-evaluate the template, reference a sensor from the [Time and Date](/integrations/time_date/) component that will update minutely or daily.

{% raw %}
```yaml

# Wait until media player is stopped
- alias: "Wait until media player is stopped"
  wait_template: "{{ is_state('media_player.floor', 'stop') }}"
```

{% endraw %}

### Wait for a trigger

This action can use the same triggers that are available in an automation's `trigger` section. See [Automation Trigger](/docs/automation/trigger). The script will continue whenever any of the triggers fires. All previously defined [trigger variables](/docs/automation/trigger#trigger-variables), [variables](#variables) and [script variables] are passed to the trigger.
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
- if:
    - "{{ not wait.completed }}"
  then:
    - service: script.door_did_not_open
  else:
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

### For each

This repeat form accepts a list of items to iterate over. The list of items
can be a pre-defined list, or a list created by a template.

The sequence is ran for each item in the list, and current item in the
iteration is available as `repeat.item`.

The following example will turn a list of lights:

{% raw %}

```yaml
repeat:
  for_each:
    - "living_room"
    - "kitchen"
    - "office"
  sequence:
    - service: light.turn_off
      target:
        entity_id: "light.{{ repeat.item }}"
```

{% endraw %}

Other types are accepted as list items, for example, each item can be a
template, or even an mapping of key/value pairs. 

{% raw %}

```yaml
repeat:
  for_each:
    - language: English
      message: Hello World
    - language: Dutch
      message: Hallo Wereld
  sequence:
    - service: notify.phone
      data:
        title: "Message in {{ repeat.item.language }}"
        message: "{{ repeat.item.message }}!"
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
- repeat:
    while: "{{ is_state('sensor.mode', 'Home') and repeat.index < 10 }}"
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
- repeat:
    until: "{{ is_state('device_tracker.iphone', 'home') }}"
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

## If-then

This action allow you to conditionally (`if`) run a sequence of actions (`then`)
and optionally supports running other sequence when the condition didn't
pass (`else`).

```yaml
script:
  - if:
      - alias: "If no one is home"
        condition: state
        entity_id: zone.home
        state: 0
    then:
      - alias: "Then start cleaning already!"
        service: vacuum.start
        target:
          area_id: living_room
    # The `else` is fully optional and can be omitted
    else:
      - service: notify.notify
        data:
          message: "Skipped cleaning, someone is home!"
```

This action supports nesting, however, if you find yourself using nested if-then
actions in the `else` part, you may want to consider using
[choose](#choose-a-group-of-actions) instead.

## Choose a Group of Actions

This action allows you to select a sequence of other actions from a list of sequences.
Nesting is fully supported.

Each sequence is paired with a list of conditions. (See the [conditions page] for available options and how multiple conditions are handled.) The first sequence whose conditions are all true will be run.
An _optional_ `default` sequence can be included which will be run only if none of the sequences from the list are run.

An _optional_ `alias` can be added to each of the sequences, excluding the `default` sequence.

The `choose` action can be used like an "if/then/elseif/then.../else" statement. The first `conditions`/`sequence` pair is like the "if/then", and can be used just by itself. Or additional pairs can be added, each of which is like an "elif/then". And lastly, a `default` can be added, which would be like the "else."

{% raw %}

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

## Parallelizing actions

By default, all sequences of actions in Home Assistant run sequentially. This
means the next action is started after the current action has been completed.

This is not always needed, for example, if the sequence of actions doesn't rely
on each other and order doesn't matter. For those cases, the `parallel` action
can be used to run the actions in the sequence in parallel, meaning all
the actions are started at the same time.

The following example shows sending messages out at the time (in parallel):

```yaml
automation:
  - trigger:
      - platform: state
        entity_id: binary_sensor.motion
        to: "on"
    action:
      - parallel:
          - service: notify.person1
            data:
              message: "These messages are sent at the same time!"
          - service: notify.person2
            data:
              message: "These messages are sent at the same time!"
```

It is also possible to run a group of actions sequantially inside the parallel
actions. The example below demonstrates that:

```yaml
script:
  example_script:
    sequence:
      - parallel:
          - sequence:
              - wait_for_trigger:
                  - platform: state
                    entity_id: binary_sensor.motion
                    to: "on"
              - service: notify.person1
                data:
                  message: "This message awaited the motion trigger"
          - service: notify.person2
            data:
              message: "I am sent immediately and do not await the above action!"
```

<div class='note'>

Running actions in parallel can be helpful in many cases, but use it with
caution and only if you need it.

There are some caveats (see below) when using parallel actions.

While it sounds attractive to parallelize, most of the time, just the regular
sequential actions will work just fine.

</div>

Some of the caveats of running actions in parallel:

- There is no order guarantee. The actions will be started in parallel, but
  there is no guarantee that they will be completed in the same order.
- If one action fails or errors, the other actions will keep running until
  they too have finished or errored.
- Variables created/modified in one parallelized action are not available
  in another parallelized action. Each step in a parallelized has its own scope.

## Stopping a script sequence

It is possible to halt a script sequence at any point. Using the `stop` action.

The `stop` action takes a text as input explaining the reason for halting the
sequence. This text will be logged and shows up in the automations and
script traces.

`stop` can be useful to halt a script halfway through a sequence when,
for example, a condition is not met.

```yaml
- stop: "Stop running the rest of the sequence"
```

There is also an `error` option, to indicate we are stopping because of
an unexpected error. It stops the sequence as well, but marks the automation
or script as failed to run.

```yaml
- stop: "Well, that was unexpected!"
  error: true
```

## Continuing on error

By default, a sequence of actions will be halted when one of the actions in
that sequence encounters an error. The automation or script will be halted,
an error is logged, and the automation or script run is marked as errored.

Sometimes these errors are expected, for example, because you know the service
you call can be problematic at times, and it doesn't matter if it fails.
You can set `continue_on_error` for those cases on such an action.

The `continue_on_error` is available on all actions and is set to
`false`. You can set it to `true` if you'd like to continue the action
sequence, regardless of whether that action encounters an error.

The example below shows the `continue_on_error` set on the first action. If
it encounters an error; it will continue to the next action.

```yaml
- alias: "If this one fails..."
  continue_on_error: true
  service: notify.super_unreliable_service_provider
  data:
    message: "I'm going to error out..."

- alias: "This one will still run!"
  service: persistent_notification.create
  data:
    title: "Hi there!"
    message: "I'm fine..."
```

Please note that `continue_on_error` will not suppress/ignore misconfiguration
or errors that Home Assistant does not handle.

## Disabling an action

Every individual action in a sequence can be disabled, without removing it.
To do so, add `enabled: false` to the action. For example:

```yaml
# Example script with a disabled action
script:
  example_script:
    sequence:
      # This action will not run, as it is disabled.
      # The message will not be sent.
      - enabled: false
        alias: "Notify that ceiling light is being turned on"
        service: notify.notify
        data:
          message: "Turning on the ceiling light!"

      # This action will run, as it is not disabled
      - alias: "Turn on ceiling light"
        service: light.turn_on
        target:
          entity_id: light.ceiling
```

[Script component]: /integrations/script/
[automations]: /getting-started/automation-action/
[Alexa/Amazon Echo]: /integrations/alexa/
[service calls page]: /getting-started/scripts-service-calls/
[conditions page]: /getting-started/scripts-conditions/
[shorthand-template]: /docs/scripts/conditions/#template-condition-shorthand-notation
[script variables]: /integrations/script/#configuration-variables
