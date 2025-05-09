---
title: Scripts
description: Instructions on how to setup scripts within Home Assistant.
ha_category:
  - Automation
ha_release: 0.7
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: script
ha_integration_type: system
---

The script integration allows users to specify a sequence of actions to be executed by Home Assistant. These are run when you turn the script on. The script integration will create an entity for each script and allow them to be controlled via actions.

Scripts can be created via YAML configuration (described below) or via {% my scripts title="the UI" %}.

{% my scripts badge %}

## Configuration

The sequence of actions is specified using the [Home Assistant Script Syntax](/getting-started/scripts/).

{% raw %}

```yaml
# Example configuration.yaml entry
script:
  message_temperature:
    sequence:
      # This is Home Assistant Script Syntax
      - action: notify.notify
        data:
          message: "Current temperature is {{ states('sensor.temperature') }}"
```

{% endraw %}

{% important %}
Script names (e.g., `message_temperature` in the example above) are not allowed to contain capital letters, or dash (minus) characters, i.e., `-`. The preferred way to separate words for better readability is to use underscore (`_`) characters.
{% endimportant %}

{% configuration %}
alias:
  description: Friendly name for the script.
  required: false
  type: string
icon:
  description: Icon for the script.
  required: false
  type: string
description:
  description: A description of the script that will be displayed in the **Actions** tab under **Developer tools**.
  required: false
  default: ''
  type: string
variables:
  description: Variables that will be available inside your templates
  required: false
  default: {}
  type: map
  keys:
    PARAMETER_NAME:
      description: The value of the variable. Any YAML is valid. Templates can also be used to pass a value to the variable.
      type: any
fields:
  description: "Information about the script field parameters; see the [Passing variables to scripts](#passing-variables-to-scripts) section below."
  required: false
  default: {}
  type: map
  keys:
    FIELD_NAME:
      description: A parameter field used by this script. All sub-options are only used for creating a representation of this script in the UI.
      type: map
      keys:
        name:
          description: The name of this script parameter field.
          type: string
        description:
          description: A description of this script parameter.
          type: string
        advanced:
          description: Marks this field as an advanced parameter. This causes it only to be shown in the UI, when the user has advanced mode enabled.
          type: boolean
          default: false
        required:
          description: Mark if this field is required. This is a UI only feature.
          type: boolean
          default: false
        example:
          description: An example value. This will only be shown in table of options available in the **Actions** tab of the **Developer tools**.
          type: string
        default:
          description: The default value for this field, as shown in the UI.
          type: any
        selector:
          description: >
            The [selector](/docs/blueprint/selectors/) to use for this input. A
            selector defines how the input is displayed in the frontend UI.
          type: selector
          required: false
mode:
  description: "Controls what happens when script is invoked while it is still running from one or more previous invocations. See [Script Modes](#script-modes)."
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
sequence:
  description: The sequence of actions to be performed in the script.
  required: true
  type: list
{% endconfiguration %}

### Script modes

Mode | Description
-|-
`single` | Do not start a new run. Issue a warning.
`restart` | Start a new run after first stopping previous run.
`queued` | Start a new run after all previous runs complete. Runs are guaranteed to execute in the order they were queued.
`parallel` | Start a new, independent run in parallel with previous runs.

<p class='img'>
  <img src='/images/integrations/script/script_modes.jpg'>
</p>

### Passing variables to scripts

As part of the action, variables can be passed along to a script so they become available within templates in that script.

To configure a script to accept variables using the UI, the variables can be added as fields in the script editor.
1. In the script editor, in the 3-dots menu, select **Add fields**.
2. A new section called **Fields** is added between the basic information and **Sequence** sections.
3. Enter a name and choose type and options of each desired field.
4. Fields set up here will be shown in other UI editors, such as in an automation that calls the script as inputs depending on the type of field.
5. To use the field data, use them as templates using the **Field key name** when they were added, as shown in the example below.

Using the variables in the script requires the use of templates:

{% raw %}
```yaml
# Example configuration.yaml entry
script:
  notify_pushover:
    description: "Send a pushover notification"
    fields:
      title:
        description: "The title of the notification"
        example: "State change"
      message:
        description: "The message content"
        example: "The light is on!"
    sequence:
      - condition: state
        entity_id: switch.pushover_notifications
        state: "on"
      - action: notify.pushover
        data:
          title: "{{ title }}"
          message: "{{ message }}"
```
{% endraw %}

Aside from the automation editor UI, variables can be passed to scripts within the action data. This can be used either by calling the script directly or the generic `script.turn_on` action. The difference is described in [Waiting for Script to Complete](#waiting-for-script-to-complete). All action data will be made available as variables in templates, even if not specified as fields in the script. This example shows how to call the script directly:

{% raw %}
```yaml
# Example configuration.yaml entry
automation:
  triggers:
    - trigger: state
      entity_id: light.bedroom
      from: "off"
      to: "on"
  actions:
    - action: script.notify_pushover
      data:
        title: "State change"
        message: "The light is on!"
```
{% endraw %}

This example shows using `script.turn_on` action:

{% raw %}
```yaml
# Example configuration.yaml entry
automation:
  triggers:
    - trigger: state
      entity_id: light.bedroom
      from: "off"
      to: "on"
  actions:
    - action: script.turn_on
      target:
        entity_id: script.notify_pushover
      data:
        variables:
          title: "State change"
          message: "The light is on!"
```
{% endraw %}



{% note %}

Script variables that may be used by templates include the following: 
- those provided from the configuration as fields
- those that are passed as data when started from an action,
- the `this` variable the value of which is a dictionary of the current script's state.

{% endnote %}

### Waiting for Script to Complete

When calling a script "directly" (e.g., `script.NAME`) the calling script will wait for the called script to finish.
If any errors occur that cause the called script to abort, the calling script will be aborted as well.

When calling a script (or multiple scripts) via the `script.turn_on` action the calling script does _not_ wait. It starts the scripts, in the order listed, and continues as soon as the last script is started.
Any errors that occur in the called scripts that cause them to abort will _not_ affect the calling script.

<p class='img'>
  <img src='/images/integrations/script/script_wait.jpg'>
</p>

Following is an example of the calling script not waiting. It performs some other operations while the called script runs "in the background." Then it later waits for the called script to complete via a `wait_template`.
This technique can also be used for the calling script to wait for the called script, but _not_ be aborted if the called script aborts due to errors.

{% raw %}

```yaml
script:
  script_1:
    sequence:
      - action: script.turn_on
        target:
          entity_id: script.script_2
      # Perform some other steps here while second script runs...
      # Now wait for called script to complete.
      - wait_template: "{{ is_state('script.script_2', 'off') }}"
      # Now do some other things...
  script_2:
    sequence:
      # Do some things at the same time as the first script...
```

{% endraw %}

### Full configuration

{% raw %}
```yaml
script: 
  wakeup:
    alias: "Wake Up"
    icon: "mdi:party-popper"
    description: "Turns on the bedroom lights and then the living room lights after a delay"
    variables:
      turn_on_entity: group.living_room
    fields:
      minutes:
        name: Minutes
        description: "The amount of time to wait before turning on the living room lights"
        selector:
          number:
            min: 0
            max: 60
            step: 1
            unit_of_measurement: minutes
            mode: slider
    # If called again while still running (probably in delay step), start over.
    mode: restart
    sequence:
      # This is Home Assistant Script Syntax
      - event: LOGBOOK_ENTRY
        event_data:
          name: Paulus
          message: is waking up
          entity_id: device_tracker.paulus
          domain: light
      - alias: "Bedroom lights on"
        action: light.turn_on
        target:
          entity_id: group.bedroom
        data:
          brightness: 100
      - delay:
          # supports seconds, milliseconds, minutes, hours
          minutes: "{{ minutes }}"
      - alias: "Living room lights on"
        action: light.turn_on
        target:
          entity_id: "{{ turn_on_entity }}"
```
{% endraw %}


## Video tutorial

This video tutorial explains how scripts work, how to use fields in scripts, and how to use response variables in scripts.

<lite-youtube videoid="vD_xckjQxRk" videotitle="Mastering Scripts in Home Assistant: A Comprehensive Guide" posterquality="maxresdefault"></lite-youtube>
