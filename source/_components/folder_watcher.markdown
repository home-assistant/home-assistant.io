---
layout: page
title: "Folder Watcher"
description: "Component for monitoring changes within the filesystem."
date: 2018-03-11 14:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: System Monitor
ha_iot_class: "Local Polling"
ha_release: 0.67
---

This component adds [Watchdog](https://pythonhosted.org/watchdog/) file system monitoring, publishing events on the Home Assistant bus on the creation/deletion/modification of files within configured folders. The monitored `event_type` are:

* `created`
* `deleted`
* `modified`
* `moved`

Configured folders must be added to [whitelist_external_dirs](/docs/configuration/basic/). Note that by default folder monitoring is recursive, meaning that the contents of sub-folders are also monitored.

To enable the Folder Watcher component in your installation, add the following to your `configuration.yaml` file:

{% raw %}
```yaml
folder_watcher:
  - folder: /config
```
{% endraw %}

{% configuration %}
folder:
  description: The folder path
  required: true
  type: string
patterns:
  description: Pattern matching to apply
  required: false
  default: "*"
  type: string
{% endconfiguration %}

## Patterns

Pattern matching using [fnmatch](https://docs.python.org/3.6/library/fnmatch.html) can be used to limit filesystem monitoring to only files which match the configured patterns. The following example shows the configuration required to only monitor filetypes `.yaml` and `.txt`.

{% raw %}
```yaml
folder_watcher:
  - folder: /config
    patterns:
      - '*.yaml'
      - '*.txt'
```
{% endraw %}

## Automations

Automations can be triggered on filesystem event data using a `data_template`. The following automation will send a notification with the name and folder of new files added to that folder:

{% raw %}
```yaml
- action:
  - data_template:
      message: 'Created {{ trigger.event.data.file }} in {{ trigger.event.data.folder }}'
      title: New image captured!
      data:
        file: " {{ trigger.event.data.path }} "
    service: notify.pushbullet
  alias: New file alert
  condition: []
  id: '1520092824697'
  trigger:
  - event_data: {"event_type":"created"}
    event_type: folder_watcher
    platform: event
```
{% endraw %}
