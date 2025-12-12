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
ha_config_flow: true
---

The **File** {% term integration %} allows storing notifications in a file or setting up a sensor based on a file's content.

This integration is enabled by default, unless you've disabled or removed the [`default_config:`](/integrations/default_config/) line from your configuration. If that is the case, the following example shows you how to enable this integration manually:

```yaml
# Basic configuration.yaml entry
file:
```
  
{% include integrations/config_flow.md %}

## Action: Read file

The `file.read_file` action reads a file and returns the data in a response.

| Data attribute | Optional | Description |
| -------------- | -------- | ----------- |
| `file_name`    | No       | The path of the file and name to read. Files should be UTF-8 encoded. Example: `config/www/myfile.yaml` |
| `file_encoding`| No       | The content type of the file (`JSON` or `YAML`). Example: `YAML` |

> **Note:** The file paths should be relative to the Home Assistant configuration directory.

> **Note:** File paths must be added to [allowlist_external_dirs](/integrations/homeassistant/#allowlist_external_dirs) in your {% term "`configuration.yaml`" %}.

The action returns a dictionary with a data element containing the parsed content from the file.

Example, read a JSON file out of the `www` directory.
```yaml
  - action: file.read_file
    data:
      file_name: config/www/myfile.json
      file_encoding: JSON
    response_variable: file_content
```
<!-- textlint-disable -->
Contents of myfile.json
<!-- textlint-enable -->
```json
{
  "latitude": 32.87336,
  "longitude": -117.22743,
  "gps_accuracy": 1.2
}
```
Response:
```yaml
data:
  latitude: 32.87336
  longitude: -117.22743
  gps_accuracy: 1.2
```

## Notifications

Make sure that the file you want to use is added to the [allowlist_external_dirs](https://www.home-assistant.io/integrations/homeassistant/#allowlist_external_dirs). The file will be created if it doesn't exist, but make sure the folder exists. Add the path of your [configuration](/docs/configuration/) folder (for example, `/config/file_notifications`) to save the file there. Setting `timestamp` to `true` adds a timestamp to every logged entry.
After creating a config entry, you can change the entry name, the name of the notify entity, or the entity ID, if you prefer.

To use notifications in automations or scripts, see the [getting started with automation page](/getting-started/automation/).

Use the `notify.send_message` action to store notification messages.

## Sensor

The `file` sensor platform reads the entries from a plain-text file and shows the found value. Only the last line of the file is used. This is similar to do `$ tail -n 1 sensor.txt` on the command-line. Note that file paths must be added to [allowlist_external_dirs](/integrations/homeassistant/#allowlist_external_dirs).

### Examples

In this section you find some real-life examples of how to use this sensor.

#### Entries as JSON

Assuming that the log file contains multiple values formatted as JSON as shown below:

```text
[...]
{"temperature": 21, "humidity": 39}
{"temperature": 22, "humidity": 36}
```

This would require the following settings to extract the temperature:

- Name: `Temperature`
- File path: `/config/sensor.json`
- Value template: {% raw %}`{{ value_json.temperature }}`{% endraw %}
- Unit of measurement: `"°C"`

#### Entries as CSV

Assuming the log file contains multiple values formatted as CSV as shown below:

```text
timestamp,temperature,humidity
1631472948,21,39
1631472949,22,36
```

This would require the following settings to extract the temperature:

- Name: `Temperature`
- File path: `/config/sensor.csv`
- Value template: {% raw %}`{{ value.split(",")[1] }}`{% endraw %}
- Unit of measurement: `"°C"`
