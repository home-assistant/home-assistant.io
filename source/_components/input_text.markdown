---
layout: page
title: "Input Text"
description: "Instructions how to integrate the Input Text component into Home Assistant."
date: 2016-03-15 06:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Automation
ha_release: 0.53
---

The `input_text` component allows the user to define values that can be controlled via the frontend and can be used within conditions of automation. Changes to the value stored in the text box generate state events. These state events can be utilized as `automation` triggers as well. 

```yaml
# Example configuration.yaml entries
input_text:
  text1:
    name: Text 1
    initial: Some Text
  text2:
    name: Text 2
    min: 8
    max: 40
  text3:
    name: Text 3
    pattern: '[a-fA-F0-9]*'
```

Configuration variables:

- **[alias]** (*Required*): Alias for the text input.
- **min** (*Optional*): Minimum length for the text value. Default is `0`.
- **max** (*Optional*): Maximum length for the text value. Default is `100`.
- **name** (*Optional*): Friendly name of the text input.
- **initial** (*Optional*): Initial value when Home Assistant starts. Default is empty string.
- **pattern** (*Optional*): Regex pattern for client side validation. Default is empty string, which is treated same as `.*`.
