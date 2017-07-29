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

The intent_script component allows users to configure actions and responses to intents. Intents can be fired by any component that supports it. Examples are Alexa (Amazon Echo), API.ai (Google Assistant) and Snips.

```yaml
{% raw %}# Example configuration.yaml entry
intent_script:
  GetTemperature:  # Intent type
    speech:
      text: We have {{ states.sensor.temperature }} degrees
    action:
      service: notify.notify
      data_template:
        message: Hello from an intent!
{% endraw %}
```

Inside an intent we can define these variables:
- **speech** (*Optional*): Text or template to return
- **action** (*Optional*): [Script syntax]
- **async_action** (*Optional*): Set to True to have Home Assistant not wait for the script to finish before returning the intent response.

[Script syntax]: /docs/scripts/
