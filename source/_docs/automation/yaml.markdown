---
title: "Automation YAML"
description: "How to use the automation integration with YAML."
---

Automations are created in Home Assistant via the UI, but are stored in a {% term YAML %} format. If you want to edit the {% term YAML %} of an {% term automation %}, select the automation, click on the menu button in the top right then on **Edit in YAML**.

The UI will write your automations to `automations.yaml`. This file is managed by the UI and should not be edited manually.

It is also possible to write your automations directly inside {% term "`configuration.yaml`" %} or other {% term YAML %} files. You can do this by adding a labeled `automation` block to your `configuration.yaml`:

```yaml
# The configuration required for the UI to work
automation: !include automations.yaml

# Labeled automation block
automation kitchen:
  - triggers:
      - trigger: ...
```

You can add as many labeled `automation` blocks as you want.

{% configuration %}
alias:
  description: Friendly name for the automation.
  required: false
  type: string
id:
  description: A unique id for your automation, will allow you to make changes to the name and entity_id in the UI, and will enable debug traces.
  required: false
  type: string
description:
  description: A description of the automation.
  required: false
  default: ''
  type: string
initial_state:
  description: Used to define the state of your automation at startup. When not set, the state will be restored from the last run. See [Automation initial state](#automation-initial-state).
  required: false
  type: boolean
  default: Restored from last run
trace:
  description: "Configuration values for the traces stored, currently only `stored_traces` can be configured."
  required: false
  default: {}
  type: map
  keys:
    stored_traces:
      description: "The number of traces which will be stored. See [Number of debug traces stored](#number-of-debug-traces-stored)."
      type: integer
      default: 5
      required: false
variables:
  description: "Variables that will be available inside your templates, both in `conditions` and `actions`."
  required: false
  default: {}
  type: map
  keys:
    PARAMETER_NAME:
      description: "The value of the variable. Any YAML is valid. Templates can also be used to pass a value to the variable."
      type: any
trigger_variables:
  description: "Variables that will be available inside your [templates triggers](/docs/automation/trigger/#template-trigger)."
  required: false
  default: {}
  type: map
  keys:
    PARAMETER_NAME:
      description: "The value of the variable. Any YAML is valid. Only [limited templates](/docs/configuration/templating/#limited-templates) can be used."
      type: any
mode:
  description: "Controls what happens when the automation is invoked while it is still running from one or more previous invocations. See [Automation modes](#automation-modes)."
  required: false
  type: string
  default: single
max:
  description: "Controls maximum number of runs executing and/or queued up to run at a time. Only valid with modes `queued` and `parallel`."
  required: false
  type: integer
  default: 10
max_exceeded:
  description: "When `max` is exceeded (which is effectively 1 for `single` mode) a log message will be emitted to indicate this has happened. This option controls the severity level of that log message. See [Log Levels](/integrations/logger/#log-levels) for a list of valid options. Or `silent` may be specified to suppress the message from being emitted."
  required: false
  type: string
  default: warning
triggers:
  description: "The trigger(s) which will start the automation. Multiple triggers can be added and the automation will start when any of these triggers trigger."
  required: true
  type: list
  keys:
    id:
      description: "An ID that can be used in the automation to determine which trigger caused the automation to start."
      type: string
      required: false
    variables:
      description: "Variables that will be available in the conditions and action sequence."
      required: false
      default: {}
      type: map
      keys:
        PARAMETER_NAME:
          description: "The value of the variable. Any YAML is valid. Templates can also be used to pass a value to the variable."
          type: any
conditions:
  description: Conditions that have to be `true` to start the automation. By default all conditions listed have to be `true`, you can use [logical conditions](/docs/scripts/conditions/#logical-conditions) to change this default behavior.
  required: false
  type: list
actions:
  description: "The sequence of actions to be performed in the script."
  required: true
  type: list
{% endconfiguration %}

### Automation modes

| Mode       | Description                                                                                                     |
| ---------- | --------------------------------------------------------------------------------------------------------------- |
| `single`   | Do not start a new run. Issue a warning.                                                                        |
| `restart`  | Start a new run after first stopping previous run.                                                              |
| `queued`   | Start a new run after all previous runs complete. Runs are guaranteed to execute in the order they were queued. |
| `parallel` | Start a new, independent run in parallel with previous runs.                                                    |

<p class='img'>
  <img src='/images/integrations/script/script_modes.jpg'>
</p>

## YAML example

Example of a {% term YAML %} based automation that you can add to {% term "`configuration.yaml`" %}.

{% raw %}

```yaml
# Example of entry in configuration.yaml
automation my_lights:
  # Turns on lights 1 hour before sunset if people are home
  # and if people get home between 16:00-23:00
  - alias: "Rule 1 Light on in the evening"
    triggers:
      # Prefix the first line of each trigger configuration
      # with a '-' to enter multiple
      - trigger: sun
        event: sunset
        offset: "-01:00:00"
      - trigger: state
        entity_id: all
        to: "home"
    conditions:
      # Prefix the first line of each condition configuration
      # with a '-'' to enter multiple
      - condition: state
        entity_id: all
        state: "home"
      - condition: time
        after: "16:00:00"
        before: "23:00:00"
    actions:
      # With a single action entry, we don't need a '-' before action - though you can if you want to
      - action: homeassistant.turn_on
        target:
          entity_id: group.living_room

  # Turn off lights when everybody leaves the house
  - alias: "Rule 2 - Away Mode"
    triggers:
      - trigger: state
        entity_id: all
        to: "not_home"
    actions:
      - action: light.turn_off
        target:
          entity_id: all

  # Notify when Paulus leaves the house in the evening
  - alias: "Leave Home notification"
    triggers:
      - trigger: zone
        event: leave
        zone: zone.home
        entity_id: device_tracker.paulus
    conditions:
      - condition: time
        after: "20:00"
    actions:
      - action: notify.notify
        data:
          message: "Paulus left the house"

  # Send a notification via Pushover with the event of a Xiaomi cube. Custom event from the Xiaomi integration.
  - alias: "Xiaomi Cube Action"
    initial_state: false
    triggers:
      - trigger: event
        event_type: cube_action
        event_data:
          entity_id: binary_sensor.cube_158d000103a3de
    actions:
      - action: notify.pushover
        data:
          title: "Cube event detected"
          message: "Cube has triggered this event: {{ trigger.event }}"
```

{% endraw %}

## Extra options

When writing automations directly in {% term YAML %}, you will have access to advanced options that are not available in the user interface.

### Automation initial state

At startup, automations by default restore their last state of when Home Assistant ran. This can be controlled with the `initial_state` option. Set it to `false` or `true` to force initial state to be off or on.

```yaml
automation:
  - alias: "Automation Name"
    initial_state: false
    triggers:
      - trigger: ...
```

### Number of debug traces stored

When using {% term YAML %} you can configure the number of debugging traces stored for an automation. This is controlled with the `stored_traces` option under `trace`. Set `stored_traces` to the number of traces you wish to store for the particular automation. If not specified the default value of 5 will be used.

```yaml
automation:
  - alias: "Automation Name"
    trace:
      stored_traces: 10
    triggers:
      - trigger: ...
```

## Migrating your YAML automations to `automations.yaml`

If you want to migrate your manual automations to use the editor, you'll have to copy them to `automations.yaml`. Make sure that `automations.yaml` remains a list! For each automation that you copy over, you'll have to add an `id`. This can be any string as long as it's unique.

{% raw %}

```yaml
# Example automations.yaml entry. Note, automations.yaml is always a list!
- id: my_unique_id  # <-- Required for editor to work, for automations created with the editor the id will be automatically generated.
  alias: "Hello world"
  triggers:
    - trigger: state
      entity_id: sun.sun
      from: below_horizon
      to: above_horizon
  conditions:
    - condition: numeric_state
      entity_id: sensor.temperature
      above: 17
      below: 25
      value_template: "{{ float(state.state) + 2 }}"
  actions:
    - action: light.turn_on
```

{% endraw %}

### Deleting automations

When automations remain visible in the Home Assistant dashboard, even after having deleted in the {% term YAML %} file, you have to delete them in the UI.

To delete them completely, go to UI {% my entities title="**Settings** > **Devices & services** > **Entities**" %} and find the automation in the search field or by scrolling down.

Check the square box aside of the automation you wish to delete and from the top-right of your screen, select 'REMOVE SELECTED'.
