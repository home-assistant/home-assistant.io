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

{% configuration %}
  input_text:
    description: Alias for the input. Multiple entries are allowed.
    required: true
    type: map
    keys:
      name:
        description: Friendly name of the text input.
        required: false
        type: String
      min:
        description: Minimum length for the text value.
        required: false
        type: int
        default: 0
      max:
        description: Maximum length for the text value.
        required: false
        type: int
        default: 100
      initial:
        description: Initial value when Home Assistant starts.
        required: false
        type: String
        default: empty
      pattern:
        description: Regex pattern for client side validation.
        required: false
        type: String
        default: empty
{% endconfiguration %}
