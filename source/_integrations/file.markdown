---
title: File
description: Instructions on how to integrate sensors which read from files into Home Assistant.
ha_category:
  - Notifications
  - Sensor
  - Utility
ha_release: pre 0.7
ha_iot_class: Local Polling
ha_codeowners:
  - '@fabaff'
ha_domain: file
ha_platforms:
  - notify
  - sensor
ha_integration_type: integration
---

The File integration allows to store notifications to a file or to set up a sensor based on a file's content.

{% include integrations/config_flow.md %}

## Notifications

The `file` platform allows you to store notifications from Home Assistant as a file. Make sure that the file you want to use is added to the [allowlist_external_dirs](https://www.home-assistant.io/integrations/homeassistant/#allowlist_external_dirs). The file will be created if it doesn't exist. Add the path of your [configuration](/docs/configuration/) folder (e.g., `/config`) to save the file there. Setting the optional parameter `name` allows multiple notifiers to be created. Setting `timestamp` to `true` adds a timestamp to every entry.

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

Use the `notify.{name}` service to store notification messages.

## Sensor

The `file` sensor platform reads the entries from a plain-text file and shows the found value. Only the last line of the file is used. This is similar to do `$ tail -n 1 sensor.txt` on the command-line. Note that file paths must be added to [allowlist_external_dirs](/integrations/homeassistant/#allowlist_external_dirs).

### Examples

In this section you find some real-life examples of how to use this sensor.

#### Entries as JSON

Assuming that the log file contains multiple values formatted as JSON like shown below:

```text
[...]
{"temperature": 21, "humidity": 39}
{"temperature": 22, "humidity": 36}
```

This would require the following settings extract the temperature:

- Name: `Temperature`
- File path: `/home/user/.homeassistant/sensor.json`
- Value template: `'{{ value_json.temperature }}'`
- Unit of measurement: `"°C"`

#### Entries as CSV

Assuming the log file contains multiple values formatted as CSV like shown below:

```text
timestamp,temperature,humidity
1631472948,21,39
1631472949,22,36
```

This would require the following settings to extract the temperature:

- Name: `Temperature`
- File path: `/home/user/.homeassistant/sensor.csv`
- Value template: {% raw %}`'{{ value.split(",")[1] }}'`{% endraw %}
- Unit of measurement: `"°C"`
