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

Configuration variables:

- **[alias]** (*Required*): Alias for the input.
  - **name** (*Optional*): Friendly name of the input.
  - **initial** (*Optional*): Initial value when Home Assistant starts. Defaults to `False`.
  - **icon** (*Optional*): Icon for entry.

Pick an icon that you can find on [materialdesignicons.com](https://materialdesignicons.com/) to use for your input and prefix the name with `mdi:`. For example `mdi:car`, `mdi:ambulance`, or  `mdi:motorbike`.

Here's an example of an automation using the above input_boolean. This action will only occur if the switch is on.

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
