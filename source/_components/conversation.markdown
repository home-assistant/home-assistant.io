---
layout: page
title: "Conversation"
description: "Instructions how to have conversations with your Home Assistant."
date: 2015-03-15 00:39
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: "Voice"
---


The conversation component can process sentences into commands for Home Assistant. It is currently limited to parsing commands in the format `turn <Friendly Name> <on/off>`.


To enable the conversion option in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
conversation:
```

When this component is active and you are using a supported browser voice commands will be activated in the frontend. Browse to [the demo](/demo/) using Chrome or Chromium to see it in action.

<p class='img'>
  <img src="/images/screenshots/voice-commands.png" />
</p>

<p class='note'>
  Apple iPhones do not support this feature in any browser. 
</p>
