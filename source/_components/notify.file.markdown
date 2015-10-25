---
layout: component
title: "File"
description: "Instructions how to add file notifications to Home Assistant."
date: 2015-06-22 10:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Notifications
---


The file platform allows you to store notifications from Home Assistant as a file.

To enable file notifications in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  name: NOTIFIER_NAME
  platform: file
  filename: FILENAME
  timestamp: 1 or 0
```

Configuration variables:

- **name** (*Optional*): Setting the optional parameter `name` allows multiple notifiers to be created. The default value is `notify`. The notifier will bind to the service `notify.NOTIFIER_NAME`.
- **filename** (*Required*): Name of the file to use. The file will be created if it doesn't exist and saved in your `config/` folder.
- **timestamp** (*Optional*): Setting `timestamp` to 1 adds a timestamp to every entry.

To use notifications, please see the [getting started with automation page]({{site_root}}/components/automation.html).
