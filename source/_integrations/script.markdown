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
ha_iot_class:
---

The `script` integration allows users to specify a sequence of actions to be executed by Home Assistant. These are run when you turn the script on. The script integration will create an entity for each script and allow them to be controlled via services.

## Configuration

The sequence of actions is specified using the [Home Assistant Script Syntax](/getting-started/scripts/).

{% raw %}

```yaml
# Example configuration.yaml entry
script:
  message_temperature:
    sequence:
      # This is Home Assistant Script Syntax
      - service: notify.notify
        data:
          message: "Current temperature is {{ states('sensor.temperature') }}"
```

{% endraw %}

<div class='note'>

Script names (e.g., `message_temperature` in the example above) are not allowed to contain capital letters, or dash (minus) characters, i.e., `-`. The preferred way to separate words for better readability is to use underscore (`_`) characters.

</div>

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
  description: A description of the script that will be displayed in the Services tab under Developer Tools.
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
  description: "Information about the parameters that the script uses; see the [Passing variables to scripts](#passing-variables-to-scripts) section below. Please note: In order for this description to be displayed in the Services tab of the Developer Tools, the script description must be defined as well."
  required: false
  default: {}
  type: map
  keys:
    PARAMETER_NAME:
      description: A parameter used by this script.
      type: map
      keys:
        description:
          description: A description of PARAMETER_NAME.
          type: string
        example:
          description: An example value for PARAMETER_NAME.
          type: string
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

### Script Modes

Mode | Description
-|-
`single` | Do not start a new run. Issue a warning.
`restart` | Start a new run after first stopping previous run.
`queued` | Start a new run after all previous runs complete. Runs are guaranteed to execute in the order they were queued.
`parallel` | Start a new, independent run in parallel with previous runs.

<p class='img'>
  <img src='/images/integrations/script/script_modes.jpg'>
</p>

### Full Configuration

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
        description: "The amount of time to wait before turning on the living room lights"
        example: 1
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
        service: light.turn_on
        target:
          entity_id: group.bedroom
        data:
          brightness: 100
      - delay:
          # supports seconds, milliseconds, minutes, hours
          minutes: "{{ minutes }}"
      - alias: "Living room lights on"
        service: light.turn_on
        target:
          entity_id: "{{ turn_on_entity }}"
```

{% endraw %}

### Passing variables to scripts

As part of the service, variables can be passed along to a script so they become available within templates in that script.

There are two ways to achieve this. One way is using the generic `script.turn_on` service. To pass variables to the script with this service, call it with the desired variables:

```yaml
# Example configuration.yaml entry
automation:
  trigger:
    platform: state
    entity_id: light.bedroom
    from: "off"
    to: "on"
  action:
    service: script.turn_on
    target:
      entity_id: script.notify_pushover
    data:
      variables:
        title: "State change"
        message: "The light is on!"
```

The other way is calling the script as a service directly. In this case, all service data will be made available as variables. If we apply this approach on the script above, it would look like this:

```yaml
# Example configuration.yaml entry
automation:
  trigger:
    platform: state
    entity_id: light.bedroom
    from: "off"
    to: "on"
  action:
    service: script.notify_pushover
    data:
      title: "State change"
      message: "The light is on!"
```

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
      - service: notify.pushover
        data:
          title: "{{ title }}"
          message: "{{ message }}"
```

{% endraw %}

### Waiting for Script to Complete

When calling a script "directly" (e.g., `script.NAME`) the calling script will wait for the called script to finish.
If any errors occur that cause the called script to abort, the calling script will be aborted as well.

When calling a script (or multiple scripts) via the `script.turn_on` service the calling script does _not_ wait. It starts the scripts, in the order listed, and continues as soon as the last script is started.
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
      - service: script.turn_on
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
