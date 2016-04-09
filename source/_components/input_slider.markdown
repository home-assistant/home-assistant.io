---
layout: page
title: "Input Slider"
description: "Instructions how to integrate the Input Slider component into Home Assistant."
date: 2016-03-15 06:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Automation
---

The `input_slider` component allows the user to define values that can be controlled via the frontend and can be used within conditions of automation.

```yaml
# Example configuration.yaml entry
input_slider:
  slider1:
    name: Slider 1
    initial: 30
    min: -20
    max: 35
    step: 1
```

Configuration variables:

- **[alias]** (*Required*): Alias for the slider input.
- **name** (*Optional*): Friendly name of the slider input.
- **initial** (*Optional*): Initial value when Home Assistant starts.
- **min** (*Optional*): Minimum value for the slider.
- **max** (*Optional*): Maximum value for the slider.
- **step** (*Optional*): Step value for the slider.

