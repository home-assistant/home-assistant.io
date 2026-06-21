---
title: Timer
description: Instructions on how to integrate timers into Home Assistant.
ha_category:
  - Automation
  - Helper
ha_release: 0.57
ha_quality_scale: internal
ha_domain: timer
ha_integration_type: helper
---

The **Timer** {% term integration %} lets you create and manage countdown timers in Home Assistant.

You can use timers in automations and scripts to keep a bathroom fan running for 20 minutes, remind yourself when laundry is nearly done, or turn lights off after motion has stopped.

{% note %}
Timers will be restored to their correct state and time on Home Assistant startup and restarts when configured with the `restore` option.

However, automations using the `timer.finished` event **will not** trigger on startup if the timer expires when Home Assistant is not running.
{% endnote %}

## Configuration

The preferred way to create a timer is from the user interface. Go to {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %}, select **Create helper**, and then select **Timer**.

If you removed `default_config:` from your {% term "`configuration.yaml`" %}, add `timer:` first before creating timers from the UI.

You can also define timers in YAML. To add a timer, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
timer:
  laundry:
    duration: "00:01:00"
```

{% configuration %}
"[alias]":
  description: Alias for the timer. Multiple entries are allowed.
  required: true
  type: map
  keys:
    name:
      description: Friendly name of the timer.
      required: false
      type: string
    duration:
      description: Initial duration in seconds or `00:00:00` when Home Assistant starts.
      required: false
      type: [integer, time]
      default: 0
    icon:
      description: Set a custom icon for the state card.
      required: false
      type: icon
    restore:
      description: When true, active and paused timers are restored after Home Assistant starts or restarts.
      required: false
      type: boolean
      default: false
{% endconfiguration %}

## Configuration options

When you create or edit a timer from the UI, the following options are available.

{% configuration_basic %}
Name:
  description: Friendly name of the timer.
Duration:
  description: The starting duration for the timer.
Icon:
  description: Optional icon to show for the timer.
Restore:
  description: Restores active and paused timers after Home Assistant starts or restarts.
{% endconfiguration_basic %}

Pick an icon from [Material Design Icons](https://pictogrammers.com/library/mdi/) and prefix it with `mdi:`.

## Supported functionality

The **Timer** integration provides timer entities that you can use in dashboards, scripts, and automations.

Use a timer when you want a countdown that can be started, paused, changed, canceled, finished, shown on a dashboard, or reused across multiple automations. Unlike an automation's `for` option, a timer is its own entity, so you can see it, manage it, and use the same countdown in more than one place. If you only need to wait until another trigger or condition stays true for a while, using that automation's `for` option is often simpler.

- **Timer entity**
  - **Description**: Represents a countdown that you can start, pause, change, cancel, or finish.
  - **States**: `idle`, `active`, and `paused`.
  - **Remarks**: A timer returns to `idle` when it finishes, is canceled, or has not been started yet.

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}

{% include integrations/actions.md %}

## Timer automation examples

{% include integrations/labs_entity_triggers_note.md %}

{% include docs/paste_yaml_tip.md %}

### Automation: turn off the bathroom fan when the timer finishes

Use a timer to keep the fan running for a fixed amount of time after a shower.

- **Trigger**: Timer finished
  - **Target**: Bathroom fan timer
  - **Trigger when**: Each
- **Action**: Turn off fan

{% details "YAML example for a bathroom fan timer" %}

{% example %}
automation: |
  alias: "Turn off bathroom fan when the timer finishes"
  triggers:
    - trigger: timer.finished
      target:
        entity_id: timer.bathroom_fan
  actions:
    - action: fan.turn_off
      target:
        entity_id: fan.bathroom
{% endexample %}

{% enddetails %}

### Automation: send a reminder when only five minutes remain

Get a reminder shortly before a timer finishes, like when laundry or cooking time is almost done.

- **Trigger**: Timer time remaining
  - **Target**: Laundry timer
  - **Time remaining**: 00:05:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a laundry timer reminder" %}

{% example %}
automation: |
  alias: "Notify when five minutes remain on the laundry timer"
  triggers:
    - trigger: timer.time_remaining
      target:
        entity_id: timer.laundry
      options:
        remaining: "00:05:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "The laundry timer has five minutes left."
{% endexample %}

{% enddetails %}

## Known limitations

- If a timer finishes while Home Assistant is not running, automations that use the **Timer finished** trigger do not run after startup.

## Removing the integration

To remove a timer created from the UI, go to {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %}, select the timer, and delete it.

If you configured a timer in YAML, remove it from your {% term "`configuration.yaml`" %} file and reload or restart Home Assistant.
