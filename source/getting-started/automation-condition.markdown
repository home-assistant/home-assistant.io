---
layout: page
title: "Automation Conditions"
description: "Automations can test conditions when invoked."
date: 2016-04-24 08:30 +0100
sidebar: true
comments: false
sharing: true
footer: true
---

Conditions are an optional part of an automation rule and be used to prevent an action from happening when triggered. Conditions look very similar to triggers but are very different. A trigger will look at events happening in the system while a condition only looks at how the system looks right now. A trigger can observe that a switch is being turned on. A condition can only see if a switch is currently on or off.

If your triggers and conditions are exactly the same, you can use a shortcut to specify conditions. In this case, triggers that are not valid conditions will be ignored.

```yaml
automation:
  condition: use_trigger_values
```

The available conditions for an automation are the same as for the script syntax. So see that page for a [full list of available conditions][script-condition].

Example of using condition:

```yaml
- alias: 'Enciende Despacho'
  trigger:
    platform: state
    entity_id: sensor.mini_despacho
    to: 'ON'
  condition:
      condition: or
      conditions:
      - condition: template
        value_template: '{{ states.sun.sun.attributes.elevation < 4 }}'
      - condition: template
        value_template: '{{ states.sensor.sensorluz_7_0.state < 10 }}'
  action:
    - service: scene.turn_on
      entity_id: scene.DespiertaDespacho
```

[script-condition]: /getting-started/scripts-conditions/
