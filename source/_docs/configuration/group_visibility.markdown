---
title: "Group Visibility"
description: "Instructions on how to change group visibility using automations."
redirect_from: /topics/group_visibility/
---

After filling Home Assistant with all your precious home automation devices, you usually end up with a cluttered interface and lots of groups that are not interesting in your current context. What if you just want to show groups that are interesting _now_ and hide the rest? That's when group visibility comes to play.

## Changing visibility of a group

To change visibility of a group, use the service `group.set_visibility`, pass the group name as `entity_id` and use `visible` to decide whether the group should be shown or hidden.

```yaml
service: group.set_visibility
entity_id: group.basement
data:
  visible: false
```

<div class='note'>
If a sensor belongs to only one group and that group is hidden, the sensor will "jump" to the top of the web interface. Add the sensor to an additional (visible) group if you do not want this to happen.
</div>

## Automations

First you should decide under which circumstances a group should be visible or not. Depending on the complexity, you might have to write two automations: one that hides the group and another that shows it.

In this example, the group `group.basement` is hidden when the sun sets and shown again when it rises:

```yaml
automation:
  trigger:
    platform: sun
    event: sunset
  action:
    service: group.set_visibility
    entity_id: group.basement
    data:
      visible: false

automation 2:
  trigger:
    platform: sun
    event: sunrise
  action:
    service: group.set_visibility
    entity_id: group.basement
    data:
      visible: true
```

## Easier automations

One of the most common uses cases are to show groups during certain times of day, maybe commuting information during a work day morning or light switches when it is getting dark. The complexity of automations needed to make this happen will quickly get out of hand. So, one way to make the automations easier is to create a sensor that alters its state depending on time of day. One way of doing that is using a `command_line` sensor and a script:

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from datetime import time, datetime


def mk_occasion(name, start, end, days=None):
    s = start.split(":")
    e = end.split(":")
    return {
        "name": name,
        "start": time(int(s[0]), int(s[1]), int(s[2])),
        "end": time(int(e[0]), int(e[1]), int(e[2])),
        "days": days,
    }


# Matching is done from top to bottom
OCCASIONS = [
    # More specific occasions
    mk_occasion("work_morning", "06:00:00", "07:10:00", range(5)),
    # General matching
    mk_occasion("weekday", "00:00:00", "23:59:59", range(5)),
    mk_occasion("weekend", "00:00:00", "23:59:59", [5, 6]),
]


def get_current_occasion(occasion_list, default_occasion="normal"):
    now = datetime.now()
    for occasion in OCCASIONS:
        if occasion["start"] <= now.time() <= occasion["end"] and (
            occasion["days"] is None or now.weekday() in occasion["days"]
        ):
            return occasion["name"]
    return default_occasion


if __name__ == "__main__":
    print(get_current_occasion(OCCASIONS))
```

This script will output "work_morning" from 06:00-07:10 during weekdays (Monday-Friday), "weekday" during all other time from Monday-Friday and "weekend" on Saturdays and Sundays. Adjust according to your needs. To create the sensor, just add it like this:

```yaml
sensor:
  - platform: command_line
    name: Occasion
    command: "python3 occasion.py"
```
<div class='note'>
If you are using docker to run Home Assistant then the occasion.py script will be placed under /config. Your command should instead be: command: "python3 /config/occasion.py"
</div>


To simplify things, we create a Home Assistant script that changes the visibility of a group, but also verifies that an entity is in a specific state:

```yaml
script:
  group_visibility:
    sequence:
      - service: group.set_visibility
        data_template:
          entity_id: '{% raw %}{{ entity_id }}{% endraw %}'
          visible: '{% raw %}{{ is_state(cond, visible_state) }}{% endraw %}'
```

The last part is writing an automation that hides or shows the group:

```yaml
automation:
  - alias: Work morning
    trigger:
      - platform: state
        entity_id: sensor.occasion
      - platform: homeassistant
        event: start
    action:
      service: script.group_visibility
      data:
        entity_id: group.work_sensors
        cond: sensor.occasion
        visible_state: 'work_morning'
```

Our previously defined script will be called if `sensor.occasion` changes state OR when Home Assistant has started. The group `group.work_sensors` will be shown when `sensor.occasion` changes state to "work_morning" and hidden otherwise.

### The complete example

```yaml
group:
  default_view:
    entities:
      - group.work_sensors

  # Only visible when it's time to go to work
  work_sensors:
    name: Time to go to work
    entities:
      - sensor.something1
      - sensor.something2

sensor:
  - platform: command_line
    name: Occasion
    command: "python3 occasion.py"

script:
  group_visibility:
    sequence:
      - service: group.set_visibility
        data_template:
          entity_id: '{% raw %}{{ entity_id }}{% endraw %}'
          visible: '{% raw %}{{ is_state(cond, visible_state) }}{% endraw %}'

automation:
  - alias: Work morning
    trigger:
      - platform: state
        entity_id: sensor.occasion
      - platform: homeassistant
        event: start
    action:
      service: script.group_visibility
      data:
        entity_id: group.work_sensors
        cond: sensor.occasion
        visible_state: 'work_morning'
```
