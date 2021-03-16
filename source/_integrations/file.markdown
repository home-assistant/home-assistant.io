---
title: File
description: Instructions on how to integrate sensors which read from files into Home Assistant.
ha_category:
  - Utility
  - Notifications
  - Sensor
ha_release: pre 0.7
ha_iot_class: Local Polling
ha_codeowners:
  - '@fabaff'
ha_domain: file
ha_platforms:
  - notify
  - sensor
---

There is currently support for the following device types within Home Assistant:

- [Notifications](#notifications)
- [Sensor](#sensor)

## Notifications

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

## Sensor

The `file` sensor platform reads the entries from a plain-text file and shows the found value. Only the last line of the file is used. This is similar to do `$ tail -n 1 sensor.txt` on the command-line. Note that file paths must be added to [allowlist_external_dirs](/docs/configuration/basic/).

To enable the `file` sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: file
    file_path: /home/user/.homeassistant/sensor-data.txt
```

{% configuration %}
file_path:
  description: Path to file that stores the sensor data.
  required: true
  type: string
name:
  description: Name of the sensor to use in the frontend.
  required: false
  default: file name
  type: string
unit_of_measurement:
  description: Defines the units of measurement of the sensor, if any.
  required: false
  type: string
value_template:
  description: Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the payload.
  required: false
  type: template
{% endconfiguration %}

### Examples

In this section you find some real-life examples of how to use this sensor.

#### Entries as JSON

Assuming that the log file contains multiple values formatted as JSON like shown below:

```text
[...]
{"temperature": 21, "humidity": 39}
{"temperature": 22, "humidity": 36}
```

This would require the following entry in the `configuration.yaml` file to extract the temperature:

{% raw %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: file
    name: Temperature
    file_path: /home/user/.homeassistant/sensor.json
    value_template: '{{ value_json.temperature }}'
    unit_of_measurement: "°C"
```

{% endraw %}
