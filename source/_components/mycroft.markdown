---
layout: page
title: "Mycroft"
description: "Instructions how to setup Mycroft AI within Home Assistant."
date: 2017-08-26 17:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mycroft.png
ha_category: Voice
ha_release: 0.53
---

[Mycroft](https://mycroft.ai) is a open source voice assistant that allows you to send notifications and more to Mycroft from Home Assistant.

```yaml
# Example configuration.yaml entry
mycroft:
  host: 0.0.0.0
```

`host` is your IP address of your mycroft instance.  Once you have added your host to your `configuration.yaml` file, restart your Home Assistant server. This will load up the Mycroft component and make a service available to notify on Mycroft and more eventually.


The `mycroft` notification platform allows you to deliver notifications from Home Assistant to [Mycroft AI](https://mycroft.ai/).

To use this notification platform you simply need to input into the configuration that mycroft is your notification platform like seen above.


To use notifications, please see the [getting started with automation page](/getting-started/automation/).
