---
title: "Automation conditions"
description: "Automations can test conditions when invoked."
toc: false
---

Conditions are an optional part of an automation rule. They can be used to prevent the automation's actions from being run. After a {% term trigger %} occurred, all conditions will be checked. The automation will be executed if all conditions return `true`. If any of the conditions returns `false`, the automation won't start.

A condition checks the state at the moment the automation runs, not at the moment of the trigger. For an example, refer to [how automations react to changes](/docs/automation/basics/#how-automations-react-to-changes).

The available conditions for an automation are the same as for the script syntax so see that page for a [full list of available conditions](/docs/scripts/conditions/).

Example of using condition:


```yaml
automation:
  - alias: "Turn on office lights"
    triggers:
      - trigger: state
        entity_id: sensor.office_motion_sensor
        to: "on"
    conditions:
      - or:
        - condition: numeric_state
          entity_id: sun.sun
          attribute: elevation
          below: 4
        - condition: numeric_state
          entity_id: sensor.office_lux_sensor
          below: 10
    actions:
      - action: scene.turn_on
        target:
          entity_id: scene.office_lights
```


The `condition` option of an automation, also accepts a single condition template directly. For example:


```yaml
automation:
  - alias: "Turn on office lights"
    triggers:
      - trigger: state
        entity_id: sensor.office_motion_sensor
        to: "on"
    conditions: "{{ state_attr('sun.sun', 'elevation') < 4 }}"
    actions:
      - action: scene.turn_on
        target:
          entity_id: scene.office_lights
```

