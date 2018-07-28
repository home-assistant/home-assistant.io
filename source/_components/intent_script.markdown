---
layout: page
title: "Intent Script"
description: "Instructions on how to setup scripts to run on intents."
date: 2016-02-10 17:11
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Intent
ha_release: "0.50"
---

The intent_script component allows users to configure actions and responses to intents. Intents can be fired by any component that supports it. Examples are [Alexa](/components/alexa/) (Amazon Echo), [API.ai](/components/dialogflow/) (Google Assistant) and [Snips](/components/snips/).

```yaml
# Example configuration.yaml entry
intent_script:
  GetTemperature:  # Intent type
    speech:
      text: We have {% raw %}{{ states.sensor.temperature }}{% endraw %} degrees
    action:
      service: notify.notify
      data_template:
        message: Hello from an intent!
```
Configuration variables:

Inside an intent we can define these variables:

- **intent** (*Required*): Name of the intent. Multiple entries are possible.
  - **speech** (*Optional*): Text or template to return.
  - **action** (*Optional*): [Script syntax](/docs/scripts/).
  - **async_action** (*Optional*): Set to `true` to have Home Assistant not wait for the script to finish before returning the intent response.
