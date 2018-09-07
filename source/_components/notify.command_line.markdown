---
layout: page
title: "Command line Notify"
description: "Instructions on how to add command line notifications to Home Assistant."
date: 2016-02-22 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: command_line.png
ha_category: Notifications
ha_release: 0.14
---

The `command_line` platform allows you to use external tools for notifications from Home Assistant. The message will be passed in as STDIN.

To enable those notifications in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: command_line
    command: "espeak -vmb/mb-us1"
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **command** (*Required*): The action to take.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
