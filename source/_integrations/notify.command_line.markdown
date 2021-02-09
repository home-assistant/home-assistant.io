---
title: "Command Line Notify"
description: "Instructions on how to add command line notifications to Home Assistant."
ha_category:
  - Notifications
ha_release: 0.14
ha_domain: command_line
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

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  default: notify
  type: string
command:
  description: The action to take.
  required: true
  type: string
command_timeout:
  description: Defines number of seconds for command timeout.
  required: false
  type: integer
  default: 15
{% endconfiguration %}

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
