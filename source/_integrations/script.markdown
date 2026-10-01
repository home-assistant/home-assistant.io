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

A {% term script %} is a saved list of steps that Home Assistant runs when you start it. For example, a "Good morning" script can turn on the lights, start the coffee machine, and read out the weather. Unlike an {% term automation %}, a script has no triggers, and no conditions that are checked before it starts. It runs its steps as soon as you start it: from a dashboard, with Assist, from an automation, or from another script. If a script should only continue in certain situations, it can check a condition as one of its steps, with the [**Condition**](/docs/scripts/#test-a-condition) building block.

The **Scripts** {% term integration %} creates an {% term entity %} for each script, and makes each script available as an action. The steps of a script are the same actions and building blocks you use in automations. The integration also provides actions that control scripts as a whole, for example, to start or stop them. They are listed under [List of actions](#list-of-actions).

{% my scripts badge %}

## When to use a script

A script is useful when you want to use the same steps more than once, or control them separately:

- Starting the same steps from several places
  - For example, an automation at 7:00, a button on a dashboard, and Assist can all start the same morning routine. You only maintain the steps in one place.
- Using different values each time
  - With [fields](#fields), one script covers several cases, for example, waiting 5 minutes on weekdays and 20 minutes on weekends.
- Stopping the steps separately
  - You can stop a running script with [**Turn off script**](/actions/script.turn_off/), without changing the automation that started it.
- Getting a result back
  - A script can [return a response](#returning-a-response) that the automation then uses, for example, in a notification.

If the steps are only needed in one automation, you can add them to the automation directly. You don't need a script for that.

## Creating a script

1. Go to {% my scripts title="**Settings** > **Automations & scenes** > **Scripts**" %}.
2. Select **Create script**, then select **Create new script**.
   - To start from a {% term blueprint %} instead, select **Create from blueprint**.
3. Under **Sequence**, select **Add action**, and add the steps of the script.
4. Select **Save**.
5. Enter a **Name** for the script.
   - Optional: Select **Add icon** or **Add description**, or add an area, a category, or labels.
6. Select **Save**.

### Changing the name, icon, or description

1. Go to {% my scripts title="**Settings** > **Automations & scenes** > **Scripts**" %}, and open the script.
2. Select **Menu** {% icon "mdi:dots-vertical" %} > **Rename**.
3. Change the name, icon, or description, and select **Rename**.

### Changing the entity ID

The entity ID is how templates, YAML, and other automations refer to the script, for example, `script.wake_up`. After you rename a script, you might want its entity ID to match the new name, so it's easier to recognize.

Changing the entity ID doesn't change the name of the script's action. The action keeps the key the script had when you first saved it. For example, if you change `script.wake_up` to `script.good_morning`, the action is still `script.wake_up`.

1. Go to {% my scripts title="**Settings** > **Automations & scenes** > **Scripts**" %}, and open the script.
2. Select **Menu** {% icon "mdi:dots-vertical" %} > **Settings**.
3. Change the **Entity ID**, and select **Update**.

## Running a script

You can start a script in several ways:

- From the script editor
  - Select **Menu** {% icon "mdi:dots-vertical" %} > **Run script**. If the script has [fields](#fields), a dialog asks for their values first.
- From a dashboard
  - Add the script to a card, for example, an [Entities card](/dashboards/entities/), and select **Run**.
- With Assist
  - [Expose the script to Assist](/voice_control/voice_remote_expose_devices/), and ask Assist to run it by its name.
- From an automation or another script
  - Add the script as an action. For details, refer to [Starting a script from an automation or another script](#starting-a-script-from-an-automation-or-another-script).

<a id="fields"></a>

## About fields in scripts

Fields let a script ask for input when it starts, for example, how many minutes to wait or which light to turn on. When you run the script, or add it as an action in an automation, the editor shows an input for each field. In the steps of the script, you use the value of a field in a template, with its field key, for example, `{{ minutes }}`.

### Adding fields to a script

1. Open the script, and select **Menu** {% icon "mdi:dots-vertical" %} > **Add fields**.
2. Under **Fields**, select **Add field**.
3. Enter a **Name** for the field.
   - The **Field key** is filled in from the name. This is the name of the variable you use in templates.
4. Optional: Turn on **Required**.
5. Under **Selector**, choose what kind of input the field asks for, for example, a number or an entity.
   - Optional: Enter a **Default** value, which the input shows when it opens.
6. Select **Save**.

### Good to know about fields

- **Required** and **Default** are used by the editor. Home Assistant doesn't check them when the script runs.
  - If an automation in YAML starts the script without a value for a field, the variable isn't defined.
  - To handle that, give the template a fallback value, for example, `{{ minutes | default(5) }}`.
- Values that are passed to the script without a field are also available as variables.
- Templates in the script can also use the `this` variable, which holds the current state of the script entity.

<a id="script-modes"></a>

## About script modes

The mode controls what happens when a script is started while it's still running. To change it, open the script, and select **Menu** {% icon "mdi:dots-vertical" %} > **Change mode**.

- **Single** (default)
  - Do not start a new run. Issue a warning.
- **Restart**
  - Start a new run after first stopping the previous run.
- **Queued**
  - Start a new run after all previous runs complete. The runs happen in the order they were started.
  - Use **Queue length** to set how many runs can be running or waiting at the same time.
- **Parallel**
  - Start a new, independent run in parallel with previous runs.
  - Use **Max number of parallel runs** to set how many runs can happen at the same time.

![Diagram showing how the four script modes (single, restart, queued, parallel) behave when a script is invoked while already running](/images/integrations/script/script_modes.jpg)

Automations use the same modes. For more details, refer to [Automation modes](/docs/automation/modes/).

## Starting a script from an automation or another script

There are two ways to start a script from an automation or another script. They differ in whether the automation waits for the script, and in how you pass values to it.

- You can run the script itself.
  - In the editor, select **Add action**, and search for the name of the script. The script's fields appear as inputs.
  - In YAML, use the script as the action, for example, `action: script.wake_up`.
  - The automation waits until the script has finished, and can receive a [response](#returning-a-response).
- You can use the [**Turn on script**](/actions/script.turn_on/) action.
  - It starts the script in the background, and the automation continues right away.
  - It doesn't return a response.
  - In YAML, you pass values to the script with `variables`.

<a id="passing-variables-to-scripts"></a>

### Passing values to a script

If a script has fields, or uses variables in its templates, you give it the values when you start it. In the editor, fill in the script's fields in the action. Nothing is passed automatically: the script doesn't see the variables or the trigger data of the automation that started it. If the script needs them, pass them as values.

In YAML, when you run the script itself, every value in the `data` of the action becomes a variable in the script, also if the script has no field for it:

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

With **Turn on script**, put the values under `variables`:

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

### Waiting for a script to finish

When you run the script itself, the automation or script that started it waits for it to finish. If the script stops because of an error, the automation or script that started it stops too.

With **Turn on script**, the automation or script that started it doesn't wait. If you start several scripts, they start in the order you list them, and the automation continues as soon as the last one has started. Errors in those scripts don't affect the automation.

![Diagram showing the difference between calling a script directly and via script.turn_on, and how the calling script waits or continues](/images/integrations/script/script_wait.jpg)

To do other steps while a script runs, and still wait for it later, start it with **Turn on script**, and wait until its entity is off again. This way, the first script also isn't stopped if the second one fails:

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

### Returning a response

A script can return data to the automation or script that started it. In the script, add a [**Stop**](/docs/scripts/#stopping-a-script-sequence) building block, and enter the name of the variable to return in **The name of the variable to use as response**. In the automation, run the script itself, and enter a name in **Response variable**. The automation can then use the data in templates.

The variable that the script returns must contain keys and values.

## The script entity

Each script has an entity, for example, `script.wake_up`. Its state is `on` while the script is running, and `off` otherwise. You can use it like other entities:

- To react when a script starts or finishes, use a [**State changed**](/triggers/state/) trigger on the script entity.
- To check whether a script is running, use a **State** condition.

The entity has these attributes:

- `last_triggered`: When the script was last started.
- `mode`: The [mode](#script-modes) of the script.
- `current`: How many runs are active right now.
- `max`: How many runs can be active at the same time. Only for the **Queued** and **Parallel** modes.
- `last_action`: The step that is running right now, while the script runs.

<a id="configuration"></a>

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
  description: "The input fields of the script. For details, refer to [About fields in scripts](#fields)."
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
  description: "What happens when the script is started while it's still running: `single`, `restart`, `queued`, or `parallel`. For details, refer to [About script modes](#script-modes)."
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

<h3 class="no_toc">Symptom</h3>

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

<h3 class="no_toc">Symptom</h3>

The script entity shows as **Unavailable**, and the script doesn't run.

#### Description

The configuration of the script is not valid, for example, because of a typo in YAML. Home Assistant creates a repair for it.

#### Resolution

1. Go to {% my repairs title="**Settings** > **System** > **Repairs**" %}, and open the repair for the script.
2. Fix the configuration of the script, and save it.

{% enddetails %}
