---
title: "Automation conditions"
description: "Automations can test conditions when invoked."
---

Conditions are an optional part of an automation rule. They can be used to prevent the automation's actions from being run. After a {% term trigger %} occurred, all conditions will be checked. The automation will be executed if all conditions return true, otherwise, if any of them does not return true, the automation will stop executing.

Conditions look very similar to triggers, but they are very different &mdash; a trigger will look at events happening in the system, while a condition only looks at how the system looks right now. A trigger can observe that a switch is being turned on. A condition can only see if a switch is currently on or off.

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
