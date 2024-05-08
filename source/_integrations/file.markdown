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
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The File integration allows to store notifications to a file or to set up a sensor based on a file's content.

{% include integrations/config_flow.md %}

## Notifications

The `file` {% term integration %} allows you to store notifications from Home Assistant as a file.

To enable file notifications in your installation, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

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
  description: Name of the file to use. The file will be created if it doesn't exist. Add the path of your [configuration](/docs/configuration/) folder (e.g., `/config`) to save the file there.
  required: true
  type: string
timestamp:
  description: Setting `timestamp` to `true` adds a timestamp to every entry.
  required: false
  default: false
  type: boolean
{% endconfiguration %}

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

Use the `notify.send_message` entity service to store notification messages.

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
- Value template: {% raw %}`'{{ value_json.temperature }}'`{% endraw %}
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
