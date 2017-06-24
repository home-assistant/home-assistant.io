---
layout: page
title: "File Sensor"
description: "Instructions how to integrate sensors which read from files into Home Assistant."
date: 2017-05-13 12:10
sidebar: true
comments: false
sharing: true
footer: true
logo: file.png
ha_category: Sensor
ha_iot_class: "Local Polling"
ha_release: 0.45
---


The `file` sensor platform reads the entries from a plain-text file and shows the found value. Only the last line of the file is used. This is similar to do `$ tail -n 1 sensor.txt` on the command-line.

To enable the `file` sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: file
    file_path: /home/user/.homeassistant/sensor-data.txt
```

Configuration variables:

- **file_path** (*Required*): path to file that stores the sensor data.
- **name** (*Optional*): Name of the sensor to use in the frontend. Defaults to `File`.
- **unit_of_measurement** (*Optional*): Defines the units of measurement of the sensor, if any.
- **value_template** (*Optional*): Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the payload.

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor.

### {% linkable_title Entries as JSON %}

Assuming that the log file contains multiple values formatted as JSON like shown below:

```text
[...]
{"temperature": 21, "humidity": 39}
{"temperature": 22, "humidity": 36}
```

This would require the following entry in the `configuration.yaml` file to extract the temperature:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: file
    name: Temperature
    file_path: /home/user/.homeassistant/sensor.json
    value_template: {% raw %}'{{ value_json.temperature }}'{% endraw %}
    unit_of_measurement: '°C'
```

