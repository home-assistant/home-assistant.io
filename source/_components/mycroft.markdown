---
layout: page
title: "Mycroft"
description: "Instructions on how to setup Mycroft AI within Home Assistant."
date: 2017-08-26 17:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mycroft.png
ha_category: Voice
ha_release: 0.53
---

[Mycroft](https://mycroft.ai) is an open source voice assistant that allows you to send notifications and more to Mycroft from Home Assistant.

## {% linkable_title Configuration %}

To use Mycroft in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
mycroft:
  host: 0.0.0.0
```

{% configuration %}
host:
  description: The IP address of your Mycroft instance.
  required: true
  type: string
{% endconfiguration %}


