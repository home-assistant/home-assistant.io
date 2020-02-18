---
title: "Automation Conditions"
description: "Automations can test conditions when invoked."
redirect_from: /getting-started/automation-condition/
---

Conditions are an optional part of an automation rule and can be used to prevent an action from happening when triggered. When a condition does not return true, the automation will stop executing. Conditions look very similar to triggers but are very different. A trigger will look at events happening in the system while a condition only looks at how the system looks right now. A trigger can observe that a switch is being turned on. A condition can only see if a switch is currently on or off.

The available conditions for an automation are the same as for the script syntax so see that page for a [full list of available conditions](/docs/scripts/conditions/).

Example of using condition:

```yaml
automation:
- alias: 'Enciende Despacho'
  trigger:
    platform: state
    entity_id: sensor.mini_despacho
    to: 'on'
  condition:
    condition: or
    conditions:
      - condition: template
        value_template: "{% raw %}{{ state_attr('sun.sun', 'elevation') < 4 }}{% endraw %}"
      - condition: template
        value_template: "{% raw %}{{ states('sensor.sensorluz_7_0') < 10 }}{% endraw %}"
  action:
    - service: scene.turn_on
      entity_id: scene.DespiertaDespacho
```

