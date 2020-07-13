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

```yaml
# Waits 1 hour
- delay: '01:00'
```

```yaml
# Waits 1 minute, 30 seconds
- delay: '00:01:30'
```

```yaml
# Waits 1 minute
- delay:
    # Supports milliseconds, seconds, minutes, hours, days
    minutes: 1
```

{% raw %}
```yaml
# Waits however many seconds input_number.second_delay is set to
- delay:
    # Supports milliseconds, seconds, minutes, hours, days
    seconds: "{{ states('input_number.second_delay') | int }}"
```
{% endraw %}

{% raw %}
```yaml
# Waits however many minutes input_number.minute_delay is set to
# Valid formats include HH:MM and HH:MM:SS
- delay: "{{ states('input_number.minute_delay') | multiply(60) | timestamp_custom('%H:%M:%S',False) }}"
```
{% endraw %}

### Wait

Wait until some things are complete. We support at the moment `wait_template` for waiting until a condition is `true`, see also on [Template-Trigger](/docs/automation/trigger/#template-trigger). It is possible to set a timeout after which the script will continue its execution if the condition is not satisfied. Timeout has the same syntax as `delay`.

{% raw %}
```yaml
# Wait until media player have stop the playing
- wait_template: "{{ is_state('media_player.floor', 'stop') }}"
```
{% endraw %}

{% raw %}
```yaml
# Wait for sensor to trigger or 1 minute before continuing to execute.
- wait_template: "{{ is_state('binary_sensor.entrance', 'on') }}"
  timeout: '00:01:00'
```
{% endraw %}

When using `wait_template` within an automation `trigger.entity_id` is supported for `state`, `numeric_state` and `template` triggers, see also [Available-Trigger-Data](/docs/automation/templating/#available-trigger-data).

{% raw %}
```yaml
- wait_template: "{{ is_state(trigger.entity_id, 'on') }}"
```
{% endraw %}

It is also possible to use dummy variables, e.g., in scripts, when using `wait_template`.

{% raw %}
```yaml
# Service call, e.g., from an automation.
- service: script.do_something
  data_template:
    dummy: input_boolean.switch

# Inside the script
- wait_template: "{{ is_state(dummy, 'off') }}"
```
{% endraw %}

You can also get the script to abort after the timeout by using optional `continue_on_timeout`

{% raw %}
```yaml
# Wait until a valve is < 10 or abort after 1 minute.
- wait_template: "{{ state_attr('climate.kitchen', 'valve')|int < 10 }}"
  timeout: '00:01:00'
  continue_on_timeout: 'false'
```
{% endraw %}

Without `continue_on_timeout` the script will always continue.  

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

You can also use event_data_template to fire an event with custom data. This could be used to pass data to another script awaiting
an event trigger.

{% raw %}
```yaml
- event: MY_EVENT
  event_data_template:
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
      data_template:
        message: "kitchen light is turned {{ trigger.event.data.state }}"
```
{% endraw %}

### Repeat a Group of Actions

This action allows you to repeat a sequence of other actions. Nesting is fully supported.
There are three ways to control how many times the sequence will be repeated.

#### Counted Repeat

This form accepts a count value. The value may be specified by a template, in which case
the template is rendered when the repeat step is reached.

{% raw %}
```yaml
- alias: Repeat the sequence the specified number of times
  repeat:
    count: "{{ repeat_count }}"
    sequence:
      - ...
```
{% endraw %}

#### While Loop

This form accepts a list of conditions that are evaluated _before_ each time the sequence
is run. The sequence will be repeated _as long as_ the condition(s) evaluate to true.

{% raw %}
```yaml
- alias: Repeat the sequence AS LONG AS the conditions are true
  repeat:
    while:
      - condition: state
        entity_id: input_boolean.run_loop
        state: 'on'
      - condition: template
        value_template: "{{ repeat.index <= 20 }}"
    sequence:
      - ...
```
{% endraw %}

#### Repeat Until

This form accepts a list of conditions that are evaluated _after_ each time the sequence
is run. Therefore the sequence will always run at least once. The sequence will be executed
_until_ the condition(s) evaluate to true.

{% raw %}
```yaml
- alias: Repeat the sequence UNTIL the conditions are true
  repeat:
    sequence:
      - ...
    until:
      - condition: state
        entity_id: binary_sensor.the_cows_have_come_home
        state: 'on'
```
{% endraw %}

#### Repeat Loop Variable

A variable named `repeat` is defined within the repeat sequence. If repeat sequences are
nested, it always applies to the inner-most loop. It contains the following fields:

field | description
-|-
`first` | True during the first iteration of the repeat sequence
`index` | The iteration number of the loop: 1, 2, 3, ...
`last` | True during the last iteration of the repeat sequence, which is only valid for counted loops

### Choose a Group of Actions

This action allows you to select a sequence of other actions from a list of sequences.
Nesting is fully supported.

Each sequence can be paired with a list of conditions. The first sequence whose conditions are all true will be run. If a sequence does not have any conditions, then it will be run if none of the previous sequences in the list were run. This is typically used at the end of the list of sequences to be the "default", although it is not required.

{% raw %}
```yaml
- alias: Choose a sequence to run
  choose:
    - if:
        - condition: ...
        - condition: ...
    - sequence:
        - ...
    - if:
        - condition: ...
    - sequence:
        - ...
    # "Default" sequence to run if none of the above chosen
    - sequence:
        - ...
```
{% endraw %}

[Script component]: /integrations/script/
[automations]: /getting-started/automation-action/
[Alexa/Amazon Echo]: /integrations/alexa/
[service calls page]: /getting-started/scripts-service-calls/
[conditions page]: /getting-started/scripts-conditions/
