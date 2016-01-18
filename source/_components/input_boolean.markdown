---
layout: component
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

The input boolean component allows the user to define boolean values that can be controlled via the frontend and can be used within conditions of automation. This can for example be used to disable or enable certain automations.

```yaml
# Example configuration.yaml entry
input_boolean:
  notify_home:
    # Optional, friendly name of entry
    name: Notify when someome arrives home
    # Optional, value when Home Assistant starts
    initial: off
    # Optional, icon for entry
    icon: mdi:car
```
