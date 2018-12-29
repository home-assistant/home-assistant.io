---
layout: page
title: "Timer"
description: "Instructions on how to integrate timers into Home Assistant."
date: 2017-10-23 06:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Automation
ha_release: 0.57
ha_qa_scale: internal
---

The `timer` component aims to simplify automations based on (dynamic) durations.

When a timer finishes or gets canceled the corresponding events are fired. This allows you to differentiate if a timer has switched from `active` to `idle` because the given duration has elapsed or it has been canceled. To control timers in your automations you can use the services mentioned below. When calling the `start` service on a timer that is already running, it resets the duration it will need to finish and restart the timer without triggering a canceled or finished event. This, for example, makes it easy to create timed lights that get triggered by motion. Starting a timer triggers a started event unless the timer is paused, in that case, it triggers a restarted event.

<p class='note warning'>
With the current implementation timers don't persist over restarts. After a restart they will be idle again, together with their initial configuration.
</p>

## {% linkable_title Configuration %}

To add a timer to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
timer:
  laundry:
    duration: '00:01:00'
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
{% endconfiguration %}

Pick an icon that you can find on [materialdesignicons.com](https://materialdesignicons.com/) to use for your timer and prefix the name with `mdi:`. For example `mdi:car`, `mdi:ambulance`, or  `mdi:motorbike`.

## {% linkable_title Events %}

|           Event | Description |
| --------------- | ----------- |
| timer.cancelled | Fired when a timer has been canceled |
| timer.finished | Fired when a timer has completed |
| timer.started | Fired when a timer has been started|
| timer.restarted | Fired when a timer has been restarted |
| timer.paused | Fired when a timer has been paused |

## {% linkable_title Services %}

#### {% linkable_title Service `timer.start` %}

Starts or restarts a timer with the provided duration. If no duration is given, it will either restart with its initial value, or continue a paused timer with the remaining duration. If a new duration is provided, this will be the new default for the timer until Home Assistant is restarted (which loads your default values). The duration can be specified as a number of seconds or the easier to read `01:23:45` format.  
If no `entity_id` is given all active timers will be started.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Name of the entity to take action, e.g., `timer.timer0`. |
| `duration`             |      yes | Duration in seconds or `00:00:00` until the timer finishes. |

#### {% linkable_title Service `timer.pause` %}

Pause a running timer. This will retain the remaining duration for later continuation. If no `entity_id` is given all active timers will be paused.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Name of the entity to take action, e.g., `timer.timer0`. |

#### {% linkable_title Service `timer.cancel` %}

Cancel an active timer. This resets the duration to the last known initial value without firing the `timer.finished` event. If no `entity_id` is given all active timers will be canceled.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Name of the entity to take action, e.g., `timer.timer0`. |

#### {% linkable_title Service `timer.finish` %}

Manually finish a running timer earlier than scheduled. If no `entity_id` is given all active timers will be finished.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Name of the entity to take action, e.g., `timer.timer0`. |

### {% linkable_title Use the service %}

Select <img src='/images/screenshots/developer-tool-services-icon.png' alt='service developer tool icon' class="no-shadow" height="38" /> **Services** from the **Developer Tools**. Choose **timer** from the list of **Domains**, select the **Service**, enter something like the sample below into the **Service Data** field, and hit **CALL SERVICE**.

```json
{
  "entity_id": "timer.timer0"
}
```

## {% linkable_title Examples %}

Set a timer called `test` to a duration of 30 seconds.

```yaml
# Example configuration.yaml entry
timer:
  test:
    duration: '00:00:30'
```

### {% linkable_title Control a timer from the frontend %}

```yaml
# Example automations.yaml entry
- alias: Timerswitch
  id: 'Timerstart'
  # Timer is started when the switch pumprun is set to on.
  trigger:
  - platform: state
    entity_id: switch.pumprun
    to: 'on'
  action:
  - service: timer.start
    entity_id: timer.test

# When timer is stopped, the time run out, another message is sent
- alias: Timerstop
  id: 'Timerstop'
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

### {% linkable_title Control a timer from the frontend %}

With the [`script`](/components/script/) component you would be able to control a timer (see above for a `timer` configuration sample) manually.

```yaml
script:
  start_timer:
    alias: Start timer
    sequence:
      - service: timer.start
        entity_id: timer.test
  pause_timer:
    alias: Pause timer
    sequence:
      - service: timer.pause
        entity_id: timer.test
  cancel_timer:
    alias: Cancel timer
    sequence:
      - service: timer.cancel
        entity_id: timer.test
  finish_timer:
    alias: Finish timer
    sequence:
      - service: timer.finish
        entity_id: timer.test
```
