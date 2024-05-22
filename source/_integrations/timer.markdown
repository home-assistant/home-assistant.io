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

The `timer` integration aims to simplify automations based on (dynamic) durations.

When a timer finishes or gets canceled the corresponding events are fired. This allows you to differentiate if a timer has switched from `active` to `idle` because the given duration has elapsed or it has been canceled. To control timers in your automations you can use the services mentioned below. When calling the `start` service on a timer that is already running, it resets the duration it will need to finish and restarts the timer without triggering a canceled or finished event. This, for example, makes it easy to create timed lights that get triggered by motion. Starting a timer triggers a started event unless the timer is paused, in that case, it triggers a restarted event.

<div class='note'>
  
Timers will be restored to their correct state and time on Home Assistant startup and restarts when configured with the `restore` option.

However, automations using the `timer.finished` event **will not** trigger if the timer expires when Home Assistant is not running.

</div>

## Configuration

The preferred way to configure timer helpers is via the user interface at **{% my helpers title="Settings > Devices & Services > Helpers" %}** and click the add button; next choose the {% my config_flow_start domain=page.ha_domain title=page.title %} option.

To be able to add Helpers via the user interface you should have `default_config:` in your `configuration.yaml`, it should already be there by default unless you removed it. If you removed `default_config:` from your configuration, you must add `timer:` to your `configuration.yaml` first, then you can use the UI.

Timers can also be configured via configuration.yaml:
To add a timer to your installation, add the following to your `configuration.yaml` file:

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
      description: When true, active and paused timers will be restored to the correct state and time on Home Assistant startup and restarts. If an active timer was supposed to end while Home Assistant is stopped, the `timer.finished` event will fire on startup for that timer. The `finished_at` property in the event data will provide you with the time that the timer was actually supposed to fire which you can use in automation conditions to decide whether or not to act on it.
      required: false
      type: boolean
      default: false
{% endconfiguration %}

Pick an icon from [Material Design Icons](https://pictogrammers.com/library/mdi/) to use for your timer and prefix the name with `mdi:`. For example `mdi:car`, `mdi:ambulance`, or  `mdi:motorbike`.

## Possible states

| State | Description |
| ----- | ----------- |
| `idle` | Timer is idle because the timer finished, was canceled or was never started |
| `active` | Timer is currently running because it was (re-)started |
| `paused` | Timer is paused because it was paused |

## Events

|           Event | Description |
| --------------- | ----------- |
| `timer.cancelled` | Fired when a timer has been canceled |
| `timer.finished` | Fired when a timer has completed and includes `finished_at` date/time in event data. `finished_at` should usually be now, or within the last several seconds, but if the `restore` property is true, `finished_at` may be further in the past since this event will fire on startup for any timers that would have ended while Home Assistant was stopped. |
| `timer.started` | Fired when a timer has been started |
| `timer.restarted` | Fired when a timer has been restarted |
| `timer.paused` | Fired when a timer has been paused |

## Services

### Service `timer.start`

Starts or restarts a timer with the provided duration. If no duration is given, it will either restart with its initial value, or continue a paused timer with the remaining duration. If a new duration is provided, this will be the duration for the timer until it finishes or is canceled, which then will reset the duration back to the original configured value. The duration can be specified as a number of seconds or the easier to read `01:23:45` format.  
You can also use `entity_id: all` and all active timers will be started.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name of the entity to take action, e.g., `timer.timer0`. |
| `duration`             |      yes | Duration in seconds or `01:23:45` format until the timer finishes. |

### Service `timer.change`

Change an active timer. This changes the duration of the timer with the duration given. You can also use `entity_id: all` and all active timers will be changed.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name of the entity to take action, e.g., `timer.timer0`. |
| `duration`             |      no  | Duration in seconds or `00:00:00` to add or subtract from the running timer. |

### Service `timer.pause`

Pause a running timer. This will retain the remaining duration for later continuation. To resume a timer use the `timer.start` service without passing a duration. You can also use `entity_id: all` and all active timers will be paused. 

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name of the entity to take action, e.g., `timer.timer0`. |

### Service `timer.cancel`

Cancel an active timer. This resets the duration to the last known initial value without firing the `timer.finished` event. You can also use `entity_id: all` and all active timers will be canceled.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name of the entity to take action, e.g., `timer.timer0`. |

### Service `timer.finish`

Manually finish a running timer earlier than scheduled. You can also use `entity_id: all` and all active timers will be finished.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name of the entity to take action, e.g., `timer.timer0`. |

### Service `timer.reload`

Reload `timer`'s configuration without restarting Home Assistant itself. This service takes no service data attributes.

### Use the service

Navigate to **Developer Tools** -> **Services** and select the `timer.start` service, then click the **Fill Example Data** button. Now change the `entity_id` and `duration` and click **Call Service** button.

## Examples

Set a timer called `test` to a duration of 30 seconds.

```yaml
# Example configuration.yaml entry
timer:
  test:
    duration: "00:00:30"
```

### Control a timer from the frontend

```yaml
# Example automations.yaml entry
- alias: "Timerswitch"
  id: "Timerstart"
  # Timer is started when the switch pumprun is set to on.
  trigger:
  - platform: state
    entity_id: switch.pumprun
    to: "on"
  action:
  - service: timer.start
    target:
      entity_id: timer.test

# When timer is stopped, the time run out, another message is sent
- alias: "Timerstop"
  id: "Timerstop"
  trigger:
  - platform: event
    event_type: timer.finished
    event_data:
      entity_id: timer.test
  action:
  - service: notify.nma
    data:
      message: "Timer stop"
```

### Control a timer manually

With the [`script`](/integrations/script/) integration you would be able to control a timer (see above for a `timer` configuration sample) manually.

```yaml
script:
  start_timer:
    alias: "Start timer"
    sequence:
      - service: timer.start
        target:
          entity_id: timer.test
  pause_timer:
    alias: "Pause timer"
    sequence:
      - service: timer.pause
        target:
          entity_id: timer.test
  cancel_timer:
    alias: "Cancel timer"
    sequence:
      - service: timer.cancel
        target:
          entity_id: timer.test
  finish_timer:
    alias: "Finish timer"
    sequence:
      - service: timer.finish
        target:
          entity_id: timer.test
```
