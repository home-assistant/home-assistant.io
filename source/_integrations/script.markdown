---
title: Scripts
description: Create scripts in Home Assistant, ask for input with fields, choose a mode, and start scripts from dashboards, Assist, and automations.
ha_category:
  - Automation
ha_release: 0.7
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: script
ha_integration_type: system
---

The **Scripts** {% term integration %} lets you use {% term scripts %} in Home Assistant. A script is a saved list of steps that Home Assistant runs when you start it, for example, from a dashboard, with Assist, or from an automation.

Each script is an {% term entity %}, for example, `script.wake_up`, and is also available as an action. The integration also provides actions that control scripts as a whole, for example, to start or stop them. They are listed under [List of actions](#list-of-actions).

To create and run scripts, and to learn when to use them, refer to [Scripts](/docs/script/).

{% my scripts badge %}

## The script entity

Each script has an entity, for example, `script.wake_up`. Its state is `on` while the script is running, and `off` otherwise. You can use it like other entities:

- To react when a script starts or finishes, use a [**State changed**](/triggers/state/) trigger on the script entity.
- To check whether a script is running, use a **State** condition.

The entity has these attributes:

- `last_triggered`: When the script was last started.
- `mode`: The [mode](/docs/script/#script-modes) of the script.
- `current`: How many runs there are right now. In the **Queued** mode, this includes the runs that are waiting in the queue.
- `max`: How many runs there can be at the same time, including runs that are waiting. Only for the **Queued** and **Parallel** modes.
- `last_action`: The name of the step that started most recently. It's only there while the script runs.

<a id="configuration"></a>
<a id="fields"></a>
<a id="script-modes"></a>

## Scripts in YAML

Scripts that you create in the editor are stored in the `scripts.yaml` file. You can also write scripts in YAML yourself. Only the scripts in `scripts.yaml` can be edited in the editor. You can view scripts from other files, for example, directly in your {% term "configuration.yaml" %} file, in the editor, but you can't change them there.

In YAML, each script has a key, such as `message_temperature` in the example below. The key is also the name of the script's action, for example, `script.message_temperature`.

{% example %}
script: |
  message_temperature:
    sequence:
      - action: notify.notify
        data:
          message: "Current temperature is {{ states('sensor.temperature') }}"
{% endexample %}

{% important %}
Script keys can only contain lowercase letters, numbers, and underscores (`_`). They can't be `reload`, `turn_on`, `turn_off`, or `toggle`, because those are the names of the script actions.
{% endimportant %}

{% configuration %}
alias:
  description: The name of the script.
  required: false
  type: string
icon:
  description: The icon of the script.
  required: false
  type: icon
description:
  description: A description of the script. It is shown in the editor, and when you select the script as an action.
  required: false
  default: ''
  type: string
variables:
  description: Variables that are available in the templates of the script.
  required: false
  default: {}
  type: map
  keys:
    PARAMETER_NAME:
      description: The value of the variable. Any YAML is valid. Templates can also be used to pass a value to the variable.
      type: any
fields:
  description: "The input fields of the script. For details, refer to [About fields in scripts](/docs/script/#fields)."
  required: false
  default: {}
  type: map
  keys:
    FIELD_NAME:
      description: A field of the script. The key is the name of the variable in templates. The options are used by the editor and other parts of the UI.
      type: map
      keys:
        name:
          description: The name of the field.
          type: string
        description:
          description: A description of the field.
          type: string
        required:
          description: Marks the field as required in the UI. Home Assistant doesn't check it when the script runs.
          type: boolean
          default: false
        advanced:
          description: Shows the field only when **Advanced mode** is turned on in your user profile. Can only be set in YAML.
          type: boolean
          default: false
        example:
          description: An example value, shown in the developer tools. Can only be set in YAML.
          type: string
        default:
          description: The default value of the field in the UI. Home Assistant doesn't use it when the script runs.
          type: any
        selector:
          description: >
            The [selector](/docs/blueprint/selectors/) to use for this field.
            A selector defines how the input is shown in the UI.
          type: selector
          required: false
mode:
  description: "What happens when the script is started while it's still running: `single`, `restart`, `queued`, or `parallel`. For details, refer to [About script modes](/docs/script/#script-modes)."
  required: false
  type: string
  default: single
max:
  description: "The maximum number of runs that can run or wait at the same time. Only for the `queued` and `parallel` modes. The minimum is `2`."
  required: false
  type: integer
  default: 10
max_exceeded:
  description: "When `max` is exceeded (which is effectively 1 for `single` mode), Home Assistant logs a message. This option sets the level of that message. For the valid levels, refer to [log levels](/integrations/logger/#log-levels). To turn off the message, use `silent`."
  required: false
  type: string
  default: warning
sequence:
  description: The steps of the script.
  required: true
  type: list
{% endconfiguration %}

<a id="full-configuration"></a>
<a id="example-with-all-options"></a>

### Example with fields, variables, and a mode

This script turns on the bedroom lights, waits for the number of minutes that the `minutes` field asks for, and then turns on the living room lights. If it's started again while it's waiting, it starts over.

- **Script**: Wake up
  - **Field**: Minutes, a number from 0 to 60, with the **Default** 5
  - **Mode**: Restart
- **Action**: Log activity, with the message "started"
- **Action**: Turn on light
  - **Target**: Bedroom light (`light.bedroom`)
- **Action**: Wait for time to pass (delay)
  - **Duration**: The value of the **Minutes** field
- **Action**: Turn on light
  - **Target**: The light in the `turn_on_entity` variable, here the living room light (`light.living_room`)

The duration and the target come from templates, and the `turn_on_entity` variable is set for the whole script. You can only set these parts in YAML.

{% example %}
script: |
  wake_up:
    alias: "Wake up"
    icon: "mdi:party-popper"
    description: >
      Turns on the bedroom lights and then the living room lights after a delay
    variables:
      turn_on_entity: light.living_room
    fields:
      minutes:
        name: "Minutes"
        description: >
          The amount of time to wait before turning on the living room lights
        default: 5
        selector:
          number:
            min: 0
            max: 60
            step: 1
            unit_of_measurement: minutes
            mode: slider
    # If started again while it's still running, start over
    mode: restart
    sequence:
      - action: logbook.log
        data:
          name: "Wake up"
          message: "started"
          entity_id: script.wake_up
      - alias: "Bedroom lights on"
        action: light.turn_on
        target:
          entity_id: light.bedroom
        data:
          brightness: 100
      - delay:
          minutes: "{{ minutes | default(5) }}"
      - alias: "Living room lights on"
        action: light.turn_on
        target:
          entity_id: "{{ turn_on_entity }}"
{% endexample %}

### Passing values to a script in YAML

In YAML, when you run the script itself, every value in the `data` of the action becomes a variable in the script, even if the script has no field for it:

{% example %}
automation: |
  triggers:
    - trigger: light.turned_on
      target:
        entity_id: light.bedroom
  actions:
    - action: script.notify_pushover
      data:
        title: "State change"
        message: "The light is on!"
{% endexample %}

With [**Turn on script**](/actions/script.turn_on/), put the values under `variables`:

{% example %}
automation: |
  triggers:
    - trigger: light.turned_on
      target:
        entity_id: light.bedroom
  actions:
    - action: script.turn_on
      target:
        entity_id: script.notify_pushover
      data:
        variables:
          title: "State change"
          message: "The light is on!"
{% endexample %}

<a id="waiting-for-a-script-to-complete"></a>

### Waiting for a script to finish in YAML

To do other steps while a script runs, and still wait for it later, start it with [**Turn on script**](/actions/script.turn_on/), and wait until its entity is off again. This way, the first script also isn't stopped if the second one fails:

{% example %}
script: |
  script_1:
    sequence:
      - action: script.turn_on
        target:
          entity_id: script.script_2
      # Perform some other steps here while the second script runs
      # Now wait for the second script to finish
      - wait_template: "{{ is_state('script.script_2', 'off') }}"
      # Now do some other things
  script_2:
    sequence:
      # Do some things at the same time as the first script
      - delay: 5
{% endexample %}

{% include integrations/actions.md %}

## Examples of starting and stopping scripts

Scripts work well together with automations. An automation can start a script when something happens, give the script's fields a value, or stop a script that is still running. These examples are automations that use the Wake up script from the [example with fields, variables, and a mode](#example-with-fields-variables-and-a-mode).

{% include docs/paste_yaml_tip.md %}

### Automation: run the wake-up script every morning

Every morning at 7:00, this automation runs the Wake up script, and fills in its **Minutes** field. Because the automation runs the script itself, the field appears as an input in the action.

- **Trigger**: Time, at 07:00
- **Action**: Wake up (the script)
  - **Minutes**: 10

{% details "YAML example" %}

{% example %}
automation: |
  alias: "Run the wake-up script every morning"
  triggers:
    - trigger: time
      at: "07:00:00"
  actions:
    - action: script.wake_up
      data:
        minutes: 10
{% endexample %}

{% enddetails %}

### Automation: stop the wake-up script when you turn off the bedroom light

If you turn off the bedroom light while the Wake up script is still waiting, this automation stops the script, so the living room lights don't turn on.

- **Trigger**: Light turned off
  - **Target**: Bedroom light (`light.bedroom`)
- **Condition**: State
  - **Entity**: Wake up (`script.wake_up`)
  - **State**: On
- **Action**: Turn off script
  - **Target**: Wake up (`script.wake_up`)

{% details "YAML example" %}

{% example %}
automation: |
  alias: "Stop the wake-up script when the bedroom light turns off"
  triggers:
    - trigger: light.turned_off
      target:
        entity_id: light.bedroom
  conditions:
    - condition: state
      entity_id: script.wake_up
      state: "on"
  actions:
    - action: script.turn_off
      target:
        entity_id: script.wake_up
{% endexample %}

{% enddetails %}

## Troubleshooting

<a id="script-cant-be-edited-in-the-editor"></a>

{% details "Script can't be edited in the editor" %}

### Symptom

When you open the script, the editor shows "This script cannot be edited from the UI, because it is not stored in the 'scripts.yaml' file."

#### Description

The script is not in the `scripts.yaml` file, for example, because it's written directly in your `configuration.yaml` file. The editor can only change scripts in `scripts.yaml`.

#### Resolution

1. Open the script, and select **Menu** {% icon "mdi:dots-vertical" %} > **Migrate**.
2. Select **Save**.
   - The script is now stored in `scripts.yaml`.
3. Delete the old script from the YAML file it was in.
4. To load the changes, run the [**Reload scripts**](/actions/script.reload/) action, or restart Home Assistant.

{% enddetails %}

<a id="script-is-unavailable"></a>

{% details "Script is unavailable" %}

### Symptom

The script entity shows as **Unavailable**, and the script doesn't run.

#### Description

The configuration of the script is not valid, for example, because of a typo in YAML. Home Assistant creates a repair for it.

#### Resolution

1. Go to {% my repairs title="**Settings** > **System** > **Repairs**" %}, and open the repair for the script.
2. Fix the configuration of the script, and save it.

{% enddetails %}
