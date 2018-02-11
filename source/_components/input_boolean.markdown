---
layout: page
title: "Input Boolean"
description: "Instructions how to integrate the Input Boolean component into Home Assistant."
date: 2016-01-17 16:58
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Automation
---

The `input_boolean` component allows the user to define boolean values that can be controlled via the frontend and can be used within conditions of automation. This can for example be used to disable or enable certain automations.

To enable input booleans in your installation, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
input_boolean:
  notify_home:
    name: Notify when someone arrives home
    initial: off
    icon: mdi:car
```

{% configuration %}
  input_boolean:
    description: Alias for the input. Multiple entries are allowed.
    required: true
    type: map
    keys:
      name:
        description: Friendly name of the input.
        required: false
        type: String
      initial:
        description: Initial value when Home Assistant starts.
        required: false
        type: boolean
        default: false
      icon:
        description: Icon to display for the component. Refer to the [Customizing devices](/docs/configuration/customizing-devices/#possible-values) page for possible values.
        required: false
        type: icon
{% endconfiguration %}

### {% linkable_title Restore State %}

This component supports the `restore_state` function which restores the state after Home Assistant has started to the value it has been before Home Assistant stopped. To use this feature please make sure that the [`recorder`](/components/recorder/) component is enabled and your entity does not have a value set for `initial`. Additional information can be found in the [Restore state](/components/recorder/#restore-state) section of the [`recorder`](/components/recorder/) component documentation.

## {% linkable_title Automation Examples %}

Here's an example of an automation using the above `input_boolean`. This action will only occur if the switch is on.

```yaml
automation:
  alias: Arriving home
  trigger:
    platform: state
    entity_id: binary_sensor.motion_garage
    to: 'on'
  condition:
    condition: state
    entity_id: input_boolean.notify_home
    state: 'on'
  action:
    service: notify.pushbullet
    data:
      title: ""
      message: "Honey, I'm home!"
```

You can also set or change the status of an `input_boolean` by using `input_boolean.turn_on`, `input_boolean.turn_off` or `input_boolean.toggle` in your automations.

```yaml
    - service: input_boolean.turn_on
      data:
        entity_id: input_boolean.notify_home
```
