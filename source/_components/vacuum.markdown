---
layout: page
title: "Vacuum cleaner robots"
description: "Instructions on how to setup and use vacuum's in Home Assistant."
date: 2017-07-28 15:00
sidebar: true
comments: false
sharing: true
footer: true
---

The `vacuum` component enables the ability to control home cleaning robots within Home Assistant.

To use this component in your installation, add a `vacuum` platform to your `configuration.yaml` file, like the [Xiaomi](/components/vacuum.xiaomi_miio/).

```yaml
# Example configuration.yaml entry
vacuum:
  - platform: xiaomi_miio
    name: Living room
    host: 192.168.1.2
```

### {% linkable_title Component services %}

Available services: `turn_on`, `turn_off`, `start_pause`, `start`, `pause`, `stop`, `return_to_home`, `locate`, `clean_spot`, `set_fanspeed` and `send_command`.

Before calling one of these services, make sure your vacuum platform supports it.

#### {% linkable_title Service `vacuum.turn_on` %}

Start a new cleaning task. For the Xiaomi Vacuum and neato use `vacuum.start` instead.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific vacuum. Else targets all.        |

#### {% linkable_title Service `vacuum.turn_off` %}

Stop the current cleaning task and return to the dock. For the Xiaomi Vacuum and neato use `vacuum.stop` instead.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific vacuum. Else targets all.        |

#### {% linkable_title Service `vacuum.start_pause` %}

Start, pause or resume a cleaning task.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific vacuum. Else targets all.        |

#### {% linkable_title Service `vacuum.start` %}

Start or resume a cleaning task.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific vacuum. Else targets all.        |

#### {% linkable_title Service `vacuum.pause` %}

Pause a cleaning task.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific vacuum. Else targets all.        |

#### {% linkable_title Service `vacuum.stop` %}

Stop the current activity of the vacuum.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific vacuum. Else targets all.        |

#### {% linkable_title Service `vacuum.return_to_home` %}

Tell the vacuum to return home.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific vacuum. Else targets all.        |

#### {% linkable_title Service `vacuum.locate` %}

Locate the vacuum cleaner robot.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific vacuum. Else targets all.        |

#### {% linkable_title Service `vacuum.clean_spot` %}

Tell the vacuum cleaner to do a spot clean-up.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific vacuum. Else targets all.        |

#### {% linkable_title Service `vacuum.set_fanspeed` %}

Set the fan speed of the vacuum. The `fanspeed` can be a label, as `balanced` or `turbo`, or be a number; it depends on the `vacuum` platform.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific vacuum. Else targets all.        |
| `fanspeed`                |       no | Platform dependent vacuum cleaner fan speed, with speed steps, like 'medium', or by percentage, between 0 and 100. |

#### {% linkable_title Service `vacuum.send_command` %}

Send a platform-specific command to the vacuum cleaner.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific vacuum. Else targets all.        |
| `command`                 |       no | Command to execute.                                   |
| `params`                  |      yes | Parameters for the command.                           |
