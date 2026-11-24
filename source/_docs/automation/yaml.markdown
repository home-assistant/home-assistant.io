---
title: "Automations in YAML"
description: "Power-user reference for writing automations directly in YAML, including the full structure, additional options, and how to manage automations from configuration.yaml."
---

Automations are created in Home Assistant via the UI, but are stored in a {% term YAML %} format. If you want to edit the {% term YAML %} of an {% term automation %}, select the automation, select the menu button in the top right then on **Edit in YAML**.

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

After you change automations in a YAML file, reload them. For the steps, refer to [Reloading automations](#reloading-automations).

{% configuration %}
alias:
  description: Name of the automation.
  required: false
  type: string
id:
  description: >
    A unique ID for your automation. With an ID, you can change the name and entity ID in the UI, and the automation stores debug traces. The ID must be text. To use a number, put it in quotes, for example `id: "1700000000000"`.
  required: false
  type: string
description:
  description: A description of the automation.
  required: false
  type: string
initial_state:
  description: Used to define the state of your automation at startup. When not set, the state will be restored from the last run. If there is no state to restore, the automation is turned on. See [Automation initial state](#automation-initial-state).
  required: false
  type: boolean
  default: Restored from last run, otherwise `true`
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
  description: "Variables that you can use in the templates of all triggers, for example, in a [template trigger](/triggers/template/), in the `enabled` option of a trigger, in the `event_type` of an event trigger, in the `webhook_id` of a webhook trigger, or in the `topic` of an MQTT trigger. Home Assistant sets them when it sets up the triggers, for example, when it loads the automation or when you turn the automation on."
  required: false
  default: {}
  type: map
  keys:
    PARAMETER_NAME:
      description: "The value of the variable. Any YAML is valid. Only [limited templates](/docs/templating/limited-templates/) can be used."
      type: any
mode:
  description: "Controls what happens when the automation is invoked while it is still running from one or more previous invocations. See [Automation modes](/docs/automation/modes/)."
  required: false
  type: string
  default: single
max:
  description: "Controls maximum number of runs executing and/or queued up to run at a time. Only valid with modes `queued` and `parallel`. The minimum is 2."
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
    alias:
      description: "A name for the trigger. It's shown in the automation editor and in the trace."
      type: string
      required: false
    id:
      description: "An ID that can be used in the automation to determine which trigger caused the automation to start. The ID must be text. To use a number, put it in quotes."
      type: string
      required: false
    enabled:
      description: "Set to `false` to disable the trigger. You can also use a [limited template](/docs/templating/limited-templates/). For details, refer to [Disabling a trigger](/docs/automation/trigger/#disabling-a-trigger)."
      type: [boolean, template]
      required: false
      default: true
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
  description: Conditions that have to be `true` for the automation to run its actions. When a trigger starts the automation, Home Assistant checks the conditions. If they are not met, the automation stops. By default, all conditions listed have to be `true`. To change this, use the [And](/conditions/and/), [Or](/conditions/or/), and [Not](/conditions/not/) conditions.
  required: false
  type: list
actions:
  description: "The sequence of actions to be performed in the automation."
  required: true
  type: list
{% endconfiguration %}


## YAML example

Example of a {% term YAML %} based automation that you can add to {% term "`configuration.yaml`" %}.


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
        entity_id:
          - person.paulus
          - person.anne_therese
        to: "home"
    conditions:
      # Prefix the first line of each condition configuration
      # with a '-' to enter multiple
      - condition: state
        entity_id:
          - person.paulus
          - person.anne_therese
        match: any
        state: "home"
      - condition: time
        after: "16:00:00"
        before: "23:00:00"
    actions:
      # With a single action entry, we don't need a '-' before action - though you can if you want to
      - action: homeassistant.turn_on
        target:
          entity_id: light.living_room

  # Turn off lights when everybody leaves the house
  - alias: "Rule 2 - Away Mode"
    triggers:
      - trigger: state
        entity_id: zone.home
        to: "0"
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

## Older YAML syntax

Older examples, such as in forum posts, guides, or blueprints, can use keys that have been renamed since. Home Assistant still accepts the old keys, so these examples keep working. When you save an automation in the editor, Home Assistant changes the keys to the current names.

The renamed keys are:

- `service:` in an action is now `action:`.
  - Renamed in Home Assistant 2024.8.
- `platform:` in a trigger is now `trigger:`.
  - Renamed in Home Assistant 2024.10.
- The top-level `trigger:`, `condition:`, and `action:` keys of an automation are now `triggers:`, `conditions:`, and `actions:`.
  - Renamed in Home Assistant 2024.10.

At the automation level, `triggers:`, `conditions:`, and `actions:` are plural. The key that identifies a trigger or condition within those lists stays singular (`trigger:` or `condition:`), and an action call uses singular `action:`.

Use either the old key or the new key, not both in the same place. For example, an automation can't have both `trigger:` and `triggers:`. Before you copy part of an older example into your automation, change its keys to the current names.

## Additional options

Some options are only available when writing automations directly in {% term YAML %} and cannot be configured through the user interface.

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


<a id="deleting-automations"></a>

## Removing an automation from a YAML file

To delete an automation that you manage in the UI, use the automation editor. For the steps, refer to [Duplicating, turning off, or deleting an automation](/docs/automation/editor/#duplicating-turning-off-or-deleting-an-automation).

Before you remove an automation, check whether another automation, a script, or a dashboard uses it.

To remove an automation that you wrote in {% term YAML %}:

1. Open the YAML file that contains the automation, such as `configuration.yaml`. For how to set up file access and an editor, refer to [Editing `configuration.yaml`](/docs/configuration/#editing-configurationyaml).
   - If the automation is in `automations.yaml` and has an `id`, delete it in the automation editor instead.
2. Delete the entire automation. It starts with a line that begins with `-`, such as `- id:`, `- alias:`, or `- triggers:`. It ends before the next line that begins with `-` at the same indentation.
   - If you split your automations into one file per automation with [`!include_dir_list`](/docs/configuration/splitting_configuration/#example-include_dir_list), the file contains only this automation, without a `-` at the start. Delete the entire file instead.
3. [Check the configuration](/docs/configuration/#validating-the-configuration), and then [reload your automations](#reloading-automations).
   - Result: The automation is removed. If it had an `id`, its entity stays until you delete it.
4. If the automation had an `id`, delete its entity:
   1. Go to {% my entities title="**Settings** > **Devices & services** > **Entities**" %}.
   2. Select **Enter selection mode**, and then select the automation.
   3. Select the three dots {% icon "mdi:dots-vertical" %} menu, and then select **Delete selected**. Confirm the deletion.

## Reloading automations

After you change automations in a YAML file, reload them to apply the changes. Reloading only affects the automations that you changed:

- If one of them is running, the run stops.
- If one of them has a **For at least** duration in progress, the duration is lost.

For details, refer to [When a run stops before it finishes](/docs/automation/modes/#when-a-run-stops-before-it-finishes).

1. Go to {% my tools_yaml title="**Settings** > **Tools** > **YAML**" %}.
2. Under **YAML configuration reloading**, select **Automations**.

To reload automations from an automation or a script, use the [Reload automations](/actions/automation.reload/) action.
