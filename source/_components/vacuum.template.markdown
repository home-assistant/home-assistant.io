---
layout: page
title: "Template Vacuum"
description: "Instructions how to setup Template vacuums within Home Assistant."
date: 2018-10-07 16:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Vacuum
ha_release: 0.80
ha_iot_class: "Local Push"
logo: home-assistant.png
ha_qa_scale: internal
---

The `template` platform creates vacuums that combine components and provides the
ability to run scripts or invoke services for each of the start, pause, stop,
return_to_base, clean_spot, locate and set_fan_speed commands of a vacuum.

To enable Template Vacuums in your installation, add the following to your
`configuration.yaml` file:

{% raw %}
```yaml
# Example configuration.yaml entry
vacuum:
  - platform: template
    vacuums:
      living_room_vacuum:
        start:
            service: script.vacuum_start
```
{% endraw %}

{% configuration %}
  vacuums:
    description: List of your vacuums.
    required: true
    type: map
    keys:
      friendly_name:
        description: Name to use in the frontend.
        required: false
        type: string
      value_template:
        description: "Defines a template to get the state of the vacuum. Valid value: `docked`/`cleaning`/`idle`/`paused`/`returning`/`error`"
        required: false
        type: template
      battery_level_template:
        description: "Defines a template to get the battery level of the vacuum. Legal values are numbers between `0` and `100`."
        required: false
        type: template
      fan_speed_template:
        description: Defines a template to get the fan speed of the vacuum.
        required: false
        type: template
      start:
        description: Defines an action to run when the vacuum is started.
        required: true
        type: action
      pause:
        description: Defines an action to run when the vacuum is paused.
        required: false
        type: action
      stop:
        description: Defines an action to run when the vacuum is stopped.
        required: false
        type: action
      return_to_base:
        description: Defines an action to run when the vacuum is given a return to base command.
        required: false
        type: action
      clean_spot:
        description: Defines an action to run when the vacuum is given a clean spot command.
        required: false
        type: action
      locate:
        description: Defines an action to run when the vacuum is given a locate command.
        required: false
        type: action
      set_fan_speed:
        description: Defines an action to run when the vacuum is given a command to set the fan speed.
        required: false
        type: action
      fan_speeds:
        description: List of fan speeds supported by the vacuum.
        required: false
        type: string list
{% endconfiguration %}
