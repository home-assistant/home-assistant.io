---
title: Folder watcher
description: Integration for monitoring changes within the filesystem.
ha_category:
  - System monitor
ha_iot_class: Local Polling
ha_config_flow: true
ha_release: 0.67
ha_quality_scale: internal
ha_domain: folder_watcher
ha_integration_type: integration
---

The **Folder watcher** {% term integration %} adds [Watchdog](https://pythonhosted.org/watchdog/) file system monitoring, publishing events on the Home Assistant bus on the creation/deletion/modification of files within configured folders. The monitored `event_type` are:

- `closed`
- `created`
- `deleted`
- `modified`
- `moved`

Configured folders must be added to [allowlist_external_dirs](/integrations/homeassistant/#allowlist_external_dirs). Note that by default folder monitoring is recursive, meaning that the contents of sub-folders are also monitored.

{% include integrations/config_flow.md %}

## Patterns

Pattern matching using [fnmatch](https://docs.python.org/3.6/library/fnmatch.html) can be used to limit filesystem monitoring to only files which match the configured patterns.
As example to monitor specific file, as example YAML and text-files add `*.yaml` and `*.txt`.

## Automations

The elements the events contain are:
- `event_type`: matching the `event_type` of the filter (one of `created`, `moved`, `modified`, `deleted`, `closed`)
- `path`: The full path to the file (e.g. "/hello/world.txt")
- `file`: The name of the file (e.g. "world.txt")
- `folder`: The folder path (e.g. "/hello")

When the `event_type` is `moved`, the file details are for the source file and destination details are included:
- `dest_path`: The full path to the moved file (e.g. "/hello/world.txt")
- `dest_file`: The name of the moved file (e.g. "world.txt")
- `dest_folder`: The folder moved path (e.g. "/hello")

Automations can be triggered on filesystem event data using a template. The following automation will send a notification with the name and folder of new files added to that folder:

{% raw %}

```yaml
#Send notification for new image (including the image itself)
automation:
  alias: "New file alert"
  trigger:
    platform: event
    event_type: folder_watcher
    event_data:
      event_type: created
  action:
    service: notify.notify
    data:
      title: New image captured!
      message: "Created {{ trigger.event.data.file }} in {{ trigger.event.data.folder }}"
      data:
        file: "{{ trigger.event.data.path }}"
```

{% endraw %}
