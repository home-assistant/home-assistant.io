---
title: System Log
description: Summary of errors and warnings in Home Assistant during runtime.
ha_category:
  - Other
ha_release: 0.58
ha_quality_scale: internal
ha_domain: system_log
ha_integration_type: system
---

The `system_log` integration stores information about all logged errors and warnings in Home Assistant. To view your logs, navigate to **Settings** -> **System** -> **Logs**. In order to not overload Home Assistant with log data, only the 50 last errors and warnings will be stored. Older entries are automatically discarded from the log. It is possible to change the number of stored log entries using the parameter `max_entries`.

## Configuration

This integration is automatically loaded by the `frontend` (so no need to do anything if you are using the frontend). If you are not doing so, or if you wish to change a parameter, add the following section to your {% term "`configuration.yaml`" %} file:

```yaml
system_log:
  max_entries: MAX_ENTRIES
```

{% configuration %}
max_entries:
  description: Number of entries to store (older entries are discarded).
  required: false
  type: integer
  default: 50
fire_event:
  description: Whether events are fired (required when used for triggers).
  required: false
  type: string
  default: false
{% endconfiguration %}

## Actions

### Action `clear`

To manually clear the system log, use this action.

### Action `write`

Write a log entry

| Data attribute | Optional | Description                                                                    |
| ---------------------- | -------- | ------------------------------------------------------------------------------ |
| `message`              | no       | Message to log                                                                 |
| `level`                | yes      | Log level: debug, info, warning, error, critical. Defaults to 'error'.         |
| `logger`               | yes      | Logger name under which to log the message. Defaults to 'system_log.external'. |

## Events

Errors and warnings are posted as the event `system_log_event`, so it is possible to write automations that trigger whenever a warning or error occurs. The following information is included in each event:

| Field       | Description                                                                 |
| ----------- | --------------------------------------------------------------------------- |
| `level`     | Either `WARNING` or `ERROR` depending on severity.                          |
| `source`    | File that triggered the error, e.g., `core.py` or `media_player/yamaha.py`. |
| `exception` | Full stack trace if available, an empty string otherwise.                   |
| `message`   | Descriptive message of the error, e.g., "Error handling request".           |
| `name`      | Name of the integration, e.g., `homeassistant.components.device_tracker`    |
| `timestamp` | Unix timestamp with as a double, e.g., 1517241010.237416.                   |

Live examples of these events can be found in the Home Assistant log file (`home-assistant.log`) or by just looking in the system log. An example could, for instance, look like this:

```text
2019-02-14 16:20:35 ERROR (MainThread) [homeassistant.loader] Unable to find integration system_healt
2019-02-14 16:20:36 ERROR (MainThread) [homeassistant.components.device_tracker] Error setting up platform google_maps
Traceback (most recent call last):
  File "/home/fab/Documents/repos/ha/home-assistant/homeassistant/integrations/device_tracker/__init__.py", line 184, in
[...]
```

The message ("Unable to find integration system_healt"), name (`homeassistant.loader`) and level (`ERROR`) can easily be extracted from the log. The exact timestamp and if there is a stack trace that's shown as well. 

## Examples 

Here are some examples using the events posted by `system_log`. `fire_event` must be set to `true` for these to work.

### Counting Number of Warnings

This will create a `counter` that increases every time a warning is logged:

```yaml
counter:
  warning_counter:
    name: Warnings
    icon: mdi:alert

automation:
  - alias: "Count warnings"
    triggers:
      - trigger: event
        event_type: system_log_event
        event_data:
          level: WARNING
    actions:
      - action: counter.increment
        target:
          entity_id: counter.warning_counter
```

### Conditional Messages

This automation will create a persistent notification whenever an error or warning is logged that has the word "action" in the message:

{% raw %}

```yaml
automation:
  - alias: "Create notifications for 'action' errors"
    triggers:
      - trigger: event
        event_type: system_log_event
    conditions:
      - condition: template
        value_template: '{{ "action" in trigger.event.data.message[0] }}'
    actions:
      - action: persistent_notification.create
        data:
          title: "Something bad happened"
          message: "{{ trigger.event.data.message[0] }}"
```

{% endraw %}

### Writing to log

This automation will create a new log entry when the door is opened:

```yaml
automation:
  - alias: "Log door opened"
    triggers:
      - trigger: state
        entity_id: binary_sensor.door
        from: "off"
        to: "on"
    actions:
      - action: system_log.write
        data:
          message: "Door opened!"
          level: info
```
