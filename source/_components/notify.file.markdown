---
layout: page
title: "File"
description: "Instructions on how to add file notifications to Home Assistant."
date: 2015-06-22 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: file.png
ha_category: Notifications
ha_release: pre 0.7
---

The `file` platform allows you to store notifications from Home Assistant as a file.

To enable file notifications in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: file
    filename: FILENAME
```

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
  required: false
  default: notify
  type: string
filename:
  description: Name of the file to use. The file will be created if it doesn't exist and saved in your [configuration](/docs/configuration/) folder.
  required: true
  type: string
timestamp:
  description: Setting `timestamp` to `true` adds a timestamp to every entry.
  required: false
  default: false
  type: boolean
{% endconfiguration %}

To use notifications, please see the [getting started with automation page](/getting-started/automation/).
