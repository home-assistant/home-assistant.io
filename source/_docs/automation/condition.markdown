---
title: "Automation conditions"
description: "Automations can test conditions when invoked."
---

Conditions are an optional part of an automation rule. They can be used to prevent the automation's actions from being run. After a {% term trigger %} occurred, all conditions will be checked. The automation will be executed if all conditions return `true`. If any of the conditions returns `false`, the automation won't start.

Conditions look very similar to triggers, but they are very different &mdash; a trigger can observe events that may have happened and start an automation. A condition will only see the current state after the automation is started from the trigger. Take the example of a switch being turned on and then off in quick succession. That switch turned on event will start an automation regardless the fact is now off again. By the time the automation checks the conditions from the switch on event, it may already be off again as its current state. This scenario is also known as a race condition.

The available conditions for an automation are the same as for the script syntax so see that page for a [full list of available conditions](/docs/scripts/conditions/).

Example of using condition:

{% raw %}

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

{% endraw %}

The `condition` option of an automation, also accepts a single condition template directly. For example:

{% raw %}

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

{% endraw %}
