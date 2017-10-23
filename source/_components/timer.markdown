---
layout: page
title: "Timer"
description: "Instructions how to integrate timers into Home Assistant."
date: 2017-10-23 06:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Automation
ha_release: 0.57
---

The `timer` component aims to simplify automations based on (dynamic) durations.

When switching between the states the corresponding events will be fired. This for example allows you to diffferentiate if a timer has switched from `active` to `idle` because the given duration has elapsed or it has been cancelled. To control timers in your automations you can use the services mentioned below.

<p class='note warning'>
With the current implementation timers don't persist over restarts. After a restart they will be idle again, together with their initial configuration.
</p>

To add a timer to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
timer:
  timer:
    seconds: 30
```

Configuration variables:

- **[alias]** (*Required*): Alias for the timer. Multiple entries are allowed.
  - **name** (*Optional*): Friendly name of the timer.
  - **seconds** (*Optional*): Initial duration in seconds when Home Assistant starts. Defaults to 0.
  - **minutes** (*Optional*): Initial duration in minutes when Home Assistant starts. Defaults to 0.
  - **hours** (*Optional*): Initial duration in hours when Home Assistant starts. Defaults to 0.
  - **days** (*Optional*): Initial duration in days when Home Assistant starts. Defaults to 0.
  - **weeks** (*Optional*): Initial duration in weeks when Home Assistant starts. Defaults to 0.
  - **icon** (*Optional*): Set a custom icon for the state card.

Pick an icon that you can find on [materialdesignicons.com](https://materialdesignicons.com/) to use for your timer and prefix the name with `mdi:`. For example `mdi:car`, `mdi:ambulance`, or  `mdi:motorbike`.

## {% linkable_title States %}

| State | Description |
| ----- | ----------- |
|     0 | idle |
|     1 | active |
|     2 | paused |

## {% linkable_title Events %}

|           Event | Description |
| --------------- | ----------- |
|   timer.started | Fired when a timer has been (re)started |
|    timer.paused | Fired when a timer has been paused |
| timer.cancelled | Fired when a timer has been cancelled |
|  timer.finished | Fired when a timer has completed |

## {% linkable_title Services %}

#### {% linkable_title Service `timer.start` %}

Starts or restarts a timer with the provided duration. If no duration is given, it will either restart with its initial value, or continue a paused timer with the remaining duration. If a new duration is provided, this will be the new default for the timer until Home Assistant is restarted (which loads your default values). The different duration types (seconds, minutes etc.) may be combined however you like.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Name of the entity to take action, e.g., `timer.timer0`. |
| `seconds`              |      yes | Duration in seconds until the timer finishes. |
| `minutes`              |      yes | Duration in minutes until the timer finishes. |
| `hours`                |      yes | Duration in hours until the timer finishes. |
| `days`                 |      yes | Duration in days until the timer finishes. |
| `weeks`                |      yes | Duration in weeks until the timer finishes. |

#### {% linkable_title Service `timer.pause` %}

Pause a running timer. This will retain the remaining duration for later continuation.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name of the entity to take action, e.g., `timer.timer0`. |

#### {% linkable_title Service `timer.cancel` %}

Cancel an active timer. This resets the duration to the last known initial value without firing the `timer.finished` event.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name of the entity to take action, e.g., `timer.timer0`. |

#### {% linkable_title Service `timer.finish` %}

Manually finish a running timer earlier than scheduled.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      no  | Name of the entity to take action, e.g., `timer.timer0`. |


### {% linkable_title Use the service %}

Select <img src='/images/screenshots/developer-tool-services-icon.png' alt='service developer tool icon' class="no-shadow" height="38" /> **Services** from the **Developer Tools**. Choose **timer** from the list of **Domains**, select the **Service**, enter something like the sample below into the **Service Data** field, and hit **CALL SERVICE**.

```json
{
  "entity_id": "timer.timer0"
}
```

