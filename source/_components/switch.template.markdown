---
layout: page
title: "Template switch"
description: "Instructions how to integrate Template switches into Home Assistant."
date: 2016-02-07 07:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Switch
ha_release: 0.13
ha_iot_class: "Local Push"
logo: home-assistant.png
---

The `template` platform creates switches that combine components.

For example, if you have a garage door with a toggle switch that operates the motor and a sensor that allows you know whether the door is open or closed, you can combine these into a switch that knows whether the garage door is open or closed.

This can simplify the gui, and make it easier to write automations. You can mark the components you have combined as `hidden` so they don't appear themselves.

To enable Template switches in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: template
    switches:
      skylight:
        value_template: {% raw %}"{{ is_state('sensor.skylight', 'on') }}"{% endraw %}
        turn_on:
          service: switch.turn_on
          entity_id: switch.skylight_open
        turn_off:
          service: switch.turn_on
          entity_id: switch.skylight_close
```

Configuration variables:

- **switches** array (*Required*): List of your switches.
  - **friendly_name** (*Optional*): Name to use in the Frontend.
  - **value_template** (*Required*): Defines a [template](/topics/templating/) to set the state of the switch.
  - **turn_on** (*Required*): Defines an [action](/getting-started/automation/) to run when the switch is turned on.
  - **turn_off** (*Required*): Defines an [action](/getting-started/automation/) to run when the switch is turned off.
  - **entity_id** (*Optional*): Add a list of entity IDs so the switch only reacts to state changes of these entities. This will reduce the number of times the switch will try to update it's state.


## {% linkable_title Considerations %}

If you are using the state of a platform that takes extra time to load, the template switch may get an 'unknown' state during startup. This results in error messages in your log file until that platform has completed loading. If you use is_state() function in your template, you can avoid this situation. For example, you would replace {% raw %}'{{ states.switch.source.state }}'{% endraw %} with this equivalent that returns true/false and never gives an unknown result:
{% raw %}'{{ is_state('switch.source', 'on') }}'{% endraw %}

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this switch.

### {% linkable_title Copy switch %}

This example shows a switch that copies another switch.

```yaml
switch:
  - platform: template
    switches:
      copy:
        value_template: {% raw %}"{{ is_state('switch.source', 'on') }}"{% endraw %}
        turn_on:
          service: switch.turn_on
          entity_id: switch.source
        turn_off:
          service: switch.turn_off
          entity_id: switch.source
````

### {% linkable_title Toggle switch %}

This example shows a switch that takes its state from a sensor, and toggles a switch.

```yaml
switch:
  - platform: template
    switches:
      blind:
        friendly_name: 'Blind'
        value_template: {% raw %}"{{ is_state_attr('switch.blind_toggle', 'sensor_state', 'on') }}"{% endraw %}
        turn_on:
          service: switch.toggle
          entity_id: switch.blind_toggle
        turn_off:
          service: switch.toggle
          entity_id: switch.blind_toggle
```

### {% linkable_title Sensor and two switches %}

This example shows a switch that takes its state from a sensor, and uses two momentary switches to control a device.

```yaml
switch:
  - platform: template
    switches:
      skylight:
        friendly_name: 'Skylight'
        value_template: {% raw %}"{{ is_state('sensor.skylight.state', 'on') }}"{% endraw %}
        turn_on:
          service: switch.turn_on
          entity_id: switch.skylight_open
        turn_off:
          service: switch.turn_on
          entity_id: switch.skylight_close
```

