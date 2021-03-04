---
title: "Automation Conditions"
description: "Automations can test conditions when invoked."
---

Conditions are an optional part of an automation rule and can be used to prevent an action from happening when triggered. When a condition does not return true, the automation will stop executing. Conditions look very similar to triggers but are very different. A trigger will look at events happening in the system while a condition only looks at how the system looks right now. A trigger can observe that a switch is being turned on. A condition can only see if a switch is currently on or off.

The available conditions for an automation are the same as for the script syntax so see that page for a [full list of available conditions](/docs/scripts/conditions/).

Example of using condition:

{% raw %}

```yaml
automation:
  - alias: "Enciende Despacho"
    trigger:
      - platform: state
        entity_id: sensor.mini_despacho
        to: "on"
    condition:
      - condition: or
        conditions:
          - condition: numeric_state
            entity_id: sun.sun
            attribute: elevation
            below: 4
          - condition: numeric_state
            entity_id: sensor.sensorluz_7_0
            below: 10
    action:
      - service: scene.turn_on
        target:
          entity_id: scene.DespiertaDespacho
```

{% endraw %}

The `condition` option of an automation, also accepts a single condition template directly. For example:

{% raw %}

```yaml
automation:
  - alias: "Enciende Despacho"
    trigger:
      - platform: state
        entity_id: sensor.mini_despacho
        to: "on"
    condition: "{{ state_attr('sun.sun', 'elevation') < 4 }}"
    action:
      - service: scene.turn_on
        target:
          entity_id: scene.DespiertaDespacho
```

{% endraw %}
