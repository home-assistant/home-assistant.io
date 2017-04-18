---
layout: page
title: "Scripts"
description: "Instructions how to setup scripts within Home Assistant."
date: 2015-03-23 19:59
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Automation
---

The script component allows users to specify a sequence of actions to be executed by Home Assistant when turned on. The script component will create an entity for each script and allow them to be controlled via services.

The sequence of actions is specified using the [Home Assistant Script Syntax].

[Home Assistant Script Syntax]: /getting-started/scripts/

```yaml
# Example configuration.yaml entry
script:
  message_temperature:
    sequence:
      # This is Home Assistant Script Syntax
      - service: notify.notify
        data_template:
          message: Current temperature is {% raw %}{{ states.sensor.temperature.state }}{% endraw %}

  # Turns on the bedroom lights and then the living room lights 1 minute later
  wakeup:
    alias: Wake Up
    sequence:
      # This is Home Assistant Script Syntax
      - event: LOGBOOK_ENTRY
        event_data:
          name: Paulus
          message: is waking up
          entity_id: device_tracker.paulus
          domain: light
      - alias: Bedroom lights on
        service: light.turn_on
        data:
          entity_id: group.bedroom
          brightness: 100
      - delay:
          # supports seconds, milliseconds, minutes, hours
          minutes: 1
      - alias: Living room lights on
        service: light.turn_on
        data:
          entity_id: group.living_room
```

### {% linkable_title Passing parameters in service calls %}

As part of the service, parameters can be passed in that will be made available to the script as variables within templates.

There are two ways to activate scripts. One is using the generic `script.turn_on` service. To pass variables to the script with this service, call it using the following parameters:

```yaml
{
  "entity_id": "script.wakeup",
  "variables": {
    "hello": "world",
    "name": "Paulus"
  }
}
```

If you are calling the script service directly, for example `script.wakeup`. All service data will be made available as variables.
