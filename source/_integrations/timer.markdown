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

- **Timer entity**
  - **Description**: Represents a countdown that you can start, pause, change, cancel, or finish.
  - **States**: `idle`, `active`, and `paused`.
  - **Remarks**: A timer returns to `idle` when it finishes, is canceled, or has not been started yet.

{% include integrations/triggers.md %}

{% include integrations/conditions.md %}

## Actions

### Action: Start

The `timer.start` action starts or restarts a timer with the provided duration. If no duration is given, it will either restart with its initial value, or continue a paused timer with the remaining duration. If a new duration is provided, this will be the duration for the timer until it finishes or is canceled, which then will reset the duration back to the original configured value. The duration can be specified as a number of seconds or the easier to read `01:23:45` format.
You can also use `entity_id: all` and all active timers will be started.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name of the entity to take action, e.g., `timer.timer0`. |
| `duration`             |      yes | Duration in seconds or `01:23:45` format until the timer finishes. |

### Action: Change

The `timer.change` action changes an active timer. This changes the duration of the timer with the duration given. You can also use `entity_id: all` and all active timers will be changed. You cannot extend the duration beyond that set by `timer.start`.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name of the entity to take action, e.g., `timer.timer0`. |
| `duration`             |      no  | Duration in seconds or `00:00:00` to add or subtract from the running timer. |

### Action: Pause

The `timer.pause` action pauses a running timer. This will retain the remaining duration for later continuation. To resume a timer use the `timer.start` action without passing a duration. You can also use `entity_id: all` and all active timers will be paused.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name of the entity to take action, e.g., `timer.timer0`. |

### Action: Cancel

The `timer.cancel` action cancels a running or paused timer. This resets the duration to the last known initial value without firing the `timer.finished` event. You can also use `entity_id: all` and all active and paused timers will be canceled.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name of the entity to take action, e.g., `timer.timer0`. |

### Action: Finish

The `timer.finish` action manually finishes a running or paused timer earlier than scheduled. You can also use `entity_id: all` and all active and paused timers will be finished.

| Data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name of the entity to take action, e.g., `timer.timer0`. |

### Action: Reload

The `timer.reload` action reloads `timer`'s configuration without restarting Home Assistant itself. This action takes no data attributes.

### Using the action

Go to {% my developer_services title="**Settings** > **Developer tools** > **Actions**" %} and select the `timer.start` action, then click the **Fill Example Data** button. Now change the `entity_id` and `duration` and select **Perform action** button.

## Timer automation examples

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
- The **Reload timers** action applies only to timers configured in YAML.

## Removing the integration

To remove a timer created from the UI, go to {% my helpers title="**Settings** > **Devices & services** > **Helpers**" %}, select the timer, and delete it.

If you configured a timer in YAML, remove it from your {% term "`configuration.yaml`" %} file and reload or restart Home Assistant.
