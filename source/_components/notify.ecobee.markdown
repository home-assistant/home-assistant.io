---
layout: page
title: "Ecobee Notify"
description: "Instructions on how to setup the Ecobee notification component within Home Assistant."
date: 2016-05-12 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ecobee.png
ha_category: Notifications
ha_release: "0.20"
---

To get your Ecobee notifications working with Home Assistant, you must first have the main [Ecobee component](/components/ecobee/) loaded and running.  Once you have that configured, you can setup this component to send messages to your Ecobee device.

To use this notification platform in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: ecobee
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

