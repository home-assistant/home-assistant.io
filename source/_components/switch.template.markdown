---
layout: component
title: "Template switch"
description: "Instructions how to integrate Template switches into Home Assistant."
date: 2016-02-07 07:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Switch
---

The `template` platform supports switches which breaks out `turn_on` and the `turn_off` service.

To enable Template switches in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
switch:
  platform: template
  switches:
    test_switch:
      friendly_name: 'Slow script'
      value_template: '{% raw %}{{ states.script.slow.state }}{% endraw %}'
      turn_on:
        service: script.turn_on
        entity_id: script.slow
      turn_off:
        service: script.turn_off
        entity_id: script.slow
```

Configuration variables:

- **switches** array (*Required*): List of your switches.
  - **friendly_name** (*Optional*): Name to use in the Frontend.
  - **value_template** (*Optional*): Defines a [template](/getting-started/templating/) to extract a value from the payload.
  - **turn_on** (*Required*): Contains the `service` and the `entity_id` which are involved.
  - **turn_off** (*Required*):  Contains the `service` and the `entity_id` which are involved.

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor.

### {% linkable_title Sun angle %}

This example shows how a skylight with a sensor which shows if it's open or closed and two momentary switches to operate the open and close is handled.

```yaml
switch:
  - platform: template
      switches:
        skylight:
          value_template: "{% raw %}{{ states.sensor.skylight == 'tripped' }}{% endraw %}"
          turn_on:
            service: switch.turn_on
            entity_id: switch.skylight_open
           turn_off:
             service: switch.turn_on
             entity_id: switch.skylight_close
```

