---
title: Automation
description: Instructions on how to setup automation within Home Assistant.
ha_category:
  - Automation
ha_release: 0.7
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_iot_class:
ha_domain: automation
---

Please see [Automating Home Assistant](/docs/automation/) for in-depth
documentation on how to use the automation integration.

<p class='img'>
  <img src='/images/screenshots/automation-switches.png' />
</p>

## Configuration

This integration is by default enabled, unless you've disabled or removed the [`default_config:`](https://www.home-assistant.io/integrations/default_config/) line from your configuration. If that is the case, the following example shows you how to enable this integration manually:

```yaml
# Example configuration.yaml entry
automation:
```

### Automation initial state

When you create a new automation, it will be enabled unless you explicitly add `initial_state: false` to it or turn it off manually via UI/another automation/developer tools. In case automations need to be always enabled or disabled when Home Assistant starts, then you can set the `initial_state` in your automations. Otherwise, the previous state will be restored.

Please note that if for some reason Home Assistant cannot restore the previous state, it will result in the automation being enabled.

```yaml
automation:
- alias: Automation Name
  initial_state: false
  trigger:
  ...
```

### Automation Modes

The automation's `mode` configuration option controls what happens when the automation is triggered while the actions are still running from a previous trigger.

Mode | Description
-|-
`single` | (Default) Do not start a new run. Issue a warning.
`restart` | Start a new run after first stopping previous run.
`queued` | Start a new run after all previous runs complete. Runs are guaranteed to execute in the order they were queued.
`parallel` | Start a new, independent run in parallel with previous runs.

<p class='img'>
  <img src='/images/integrations/script/script_modes.jpg'>
</p>

For both `queued` and `parallel` modes, configuration option `max` controls the maximum
number of runs that can be executing and/or queued up at a time. The default is 10.

When `max` is exceeded (which is effectively 1 for `single` mode) a log message will be emitted to indicate this has happened. Configuration option `max_exceeded` controls the severity level of that log message. See [Log Levels](/integrations/logger/#log-levels) for a list of valid options. Or `silent` may be specified to suppress the message from being emitted. The default is `warning`.

#### Example Setting Automation Mode

```yaml
automation:
  - trigger:
      - ...
    mode: queued
    max: 25
    action:
      - ...
```

### Deleting Automations

When automations remain visible in the Home Assistant Dashboard, even after having deleted in the YAML file, you have to delete them in the UI.

To delete them completely, go to UI **Configuration** -> **Entities** and find the automation in the search field or by scrolling down.

Check the square box aside of the automation you wish to delete and from the top-right of your screen, select 'REMOVE SELECTED'.

## Services

### `automation.turn_on`

This service enables the automation's triggers.

Service data attribute | Optional | Description
-|-|-
`entity_id` | no | Entity ID of automation to turn on. Can be a list. `none` or `all` are also accepted.

### `automation.turn_off`

This service disables the automation's triggers, and optionally stops any currently active actions.

Service data attribute | Optional | Description
-|-|-
`entity_id` | no | Entity ID of automation to turn on. Can be a list. `none` or `all` are also accepted.
`stop_actions` | yes | Stop any currently active actions (defaults to true).

### `automation.toggle`

This service enables the automation's triggers if they were disabled, or disables the automation's triggers, and stops any currently active actions, if the triggers were enabled.

Service data attribute | Optional | Description
-|-|-
`entity_id` | no | Entity ID of automation to turn on. Can be a list. `none` or `all` are also accepted.

### `automation.reload`

This service reloads all automations, stopping any currently active actions in all of them.

### `automation.trigger`

This service will trigger the action of an automation. By default it bypasses any conditions, though that can be changed via the `skip_condition` attribute.

Service data attribute | Optional | Description
-|-|-
`entity_id` | no | Entity ID of automation to trigger. Can be a list. `none` or `all` are also accepted.
`skip_condition` | yes | Whether or not the condition will be skipped (defaults to true).
