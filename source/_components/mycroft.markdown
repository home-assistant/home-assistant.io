---
layout: page
title: "Mycroft"
description: "Instructions how to setup Mycroft AI within Home Assistant."
date: 2017-08-37 17:00
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
