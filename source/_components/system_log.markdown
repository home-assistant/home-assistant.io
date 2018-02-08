---
layout: page
title: "System Log"
description: "Summary of errors and warnings in Home Assistant during runtime."
date: 2017-11-11 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: Other
ha_release: 0.58
---

The `system_log` component stores information about all logged errors and warnings in Home Assistant. All collected information is accessible directly in the frontend, just navigate to the `Info` section under `Developer Tools`. In order to not overload Home Assistant with log data, only the 50 last errors and warnings will be stored. Older entries are automatically discarded from the log. It is possible to change the number of stored log entries using the parameter `max_entries`.

This component is automatically loaded by the `frontend` (so no need to do anything if you are using the frontend). If you are not doing so, or if you wish to change a parameter, add the following section to your `configuration.yaml` file: 

```yaml
system_log:
  max_entries: MAX_ENTRIES
```

{% configuration %}
max_entries:
  description: Number of entries to store (older entries are discarded).
  required: false
  type: int
  default: 50
{% endconfiguration %}

## {% linkable_title Services %}

### {% linkable_title Service `clear` %}

To manually clear the system log, call this service.

## {% linkable_title Events %}

Errors and warnings are posted as the event `system_log_event`, so it is possible to write automations that trigger whenever a warning or error occurs. The following information is included in each event:

| Field       | Description                                                                |
|------------------------------------------------------------------------------------------|
| `level`     | Either `WARNING` or `ERROR` depending on severity.                         |
| `source`    | File that triggered the error, e.g., `core.py` or `media_player/yamaha.py`. |
| `exception` | Full stack trace if available, otherwise empty string.                      |
| `message`   | Descriptive message of the error, e.g., "Error handling request".           |
| `timestamp` | Unix timestamp with as a double, e.g., 1517241010.237416.                   |

Live examples of these events can be found in the Home Assistant log file or by just looking in the system log. An example could, for instance, look like this:

<img src='/images/components/system_log/system_log_entry.png' />

The message ("Unable to find service..."), source (`core.py`) and level (`WARNING`) can easily be extracted from the image. Exact timestamp and stack trace is shown if the entry is selected.

## {% linkable_title Examples  %}

Here are some examples using the events posted by `system_log`.

### {% linkable_title Counting Number of Warnings %}

This will create a `counter` that increases every time a warning is logged:

```yaml
counter:
  warning_counter:
    name: Warnings
    icon: mdi:alert

automation:
  - alias: Count warnings
    trigger:
      platform: event
      event_type: system_log_event
      event_data:
        level: WARNING
    action:
      service: counter.increment
      entity_id: counter.warning_counter
```

### {% linkable_title Conditional Messages %}

This automation will create a persistent notification whenever an error or warning is logged that has the word "service" in the message:

```yaml
automation:
  - alias: Create notifications for "service" errors
    trigger:
      platform: event
      event_type: system_log_event
    condition:
      condition: template
      value_template: {% raw %}'{{ "service" in trigger.event.data.message }}'{% endraw %}
    action:
      service: persistent_notification.create
      data_template:
        title: Something bad happened
        message: {% raw %}'{{ trigger.event.data.message }}'{% endraw %}
```
