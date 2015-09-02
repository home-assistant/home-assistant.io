---
layout: page
title: "Scheduler"
description: "Instructions how to setup the scheduler within Home Assistant."
date: 2015-03-23 19:59
sidebar: false
comments: false
sharing: true
footer: true
---

A component that will act as a scheduler and performe actions based
on the events in the schedule.

Load the component by enabling it in `configuration.yaml`
```
scheduler:
```

It will read a json object from the file `schedule.json` in the config dir (`~/.homeassistant`) and create a schedule based on it.

Each schedule is a JSON with the keys `id`, `name`, `description`, `entity_ids`, `events`.

- days is an array with the weekday number (monday=0) that the schdule
    is active
- entity_ids an array with entity ids that the events in the schedule should
    effect (can also be groups)
- events is an array of objects that describe the different events that is
    supported. Read in the events descriptions for more information

Example `schedule.json` file

```json
[
    {
        "id": "window_lamps",
        "name": "Window lamps",
        "description": "Turn on window lamps on sunset and turn off at 22:30",
        "days": [0, 1, 2, 3, 4],
        "entity_ids": [
            "group.window_lamps"
        ],
        "events": [
            {
                "type": "time",
                "service": "switch.turn_off",
                "time": "22:30:00"
            },
            {
                "type": "sun",
                "service": "switch.turn_on",
                "event": "sunset",
                "offset": "-00:45:00"
            }
        ]
    }
]
```
