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

```yaml
# Example configuration.yaml entry
input_boolean:
  notify_home:
    name: Notify when someome arrives home
    initial: off
    icon: mdi:car
```

Configuration variables:

- **[alias]** (*Required*): Alias for the input.
- **name** (*Optional*): Friendly name of the input.
- **initial** (*Optional*): Initial value when Home Assistant starts.
- **icon** (*Optional*): Icon for entry.

Pick an icon that you can find on [materialdesignicons.com](https://materialdesignicons.com/) to use for your input and prefix the name with `mdi:`. For example `mdi:car`, `mdi:ambulance`, or  `mdi:motorbike`.

