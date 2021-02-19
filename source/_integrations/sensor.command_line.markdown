---
title: "Command line Sensor"
description: "Instructions on how to integrate command line sensors into Home Assistant."
ha_category:
  - Utility
  - Sensor
ha_release: pre 0.7
ha_iot_class: Local Polling
ha_domain: command_line
---


The `command_line` sensor platform simply issues specific commands to get its data. This makes it a very powerful platform as it allows anyone to integrate any type of sensor into Home Assistant that can get data from the command line.

## Configuration

To enable it, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: command_line
    command: SENSOR_COMMAND
```

{% configuration %}
command:
  description: The action to take to get the value.
  required: true
  type: string
name:
  description: Name of the command sensor.
  required: false
  type: string
unit_of_measurement:
  description: Defines the unit of measurement of the sensor, if any.
  required: false
  type: string
value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the payload."
  required: false
  type: string
scan_interval:
  description: Defines number of seconds for polling interval.
  required: false
  type: integer
  default: 60
command_timeout:
  description: Defines number of seconds for command timeout
  required: false
  type: integer
  default: 15
json_attributes:
  description: Defines a list of keys to extract values from a JSON dictionary result and then set as sensor attributes.
  required: false
  type: [string, list]
{% endconfiguration %}

## Examples

In this section you find some real-life examples of how to use this sensor.

### CPU temperature

Thanks to the [`proc`](https://en.wikipedia.org/wiki/Procfs) file system, various details about a system can be retrieved. Here the CPU temperature is of interest. Add something similar to your `configuration.yaml` file:

{% raw %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: command_line
    name: CPU Temperature
    command: "cat /sys/class/thermal/thermal_zone0/temp"
    # If errors occur, make sure configuration file is encoded as UTF-8
    unit_of_measurement: "°C"
    value_template: "{{ value | multiply(0.001) | round(1) }}"
```

{% endraw %}

### Monitoring failed login attempts on Home Assistant

If you'd like to know how many failed login attempts are made to Home Assistant, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: command_line
    name: badlogin
    command: "grep -c 'Login attempt' /home/hass/.homeassistant/home-assistant.log"
```

Make sure to configure the [Logger integration](/integrations/logger) to monitor the [HTTP integration](/integrations/http/) at least the `warning` level.

```yaml
# Example working logger settings that works
logger:
  default: critical
  logs:
    homeassistant.components.http: warning
```

### Details about the upstream Home Assistant release

You can see directly in the frontend (**Developer tools** -> **About**) what release of Home Assistant you are running. The Home Assistant releases are available on the [Python Package Index](https://pypi.python.org/pypi). This makes it possible to get the current release.

```yaml
sensor:
  - platform: command_line
    command: python3 -c "import requests; print(requests.get('https://pypi.python.org/pypi/homeassistant/json').json()['info']['version'])"
    name: HA release
```

### Read value out of a remote text file

If you own devices which are storing values in text files which are accessible over HTTP then you can use the same approach as shown in the previous section. Instead of looking at the JSON response we directly grab the sensor's value.

```yaml
sensor:
  - platform: command_line
    command: python3 -c "import requests; print(requests.get('http://remote-host/sensor_data.txt').text)"
    name: File value
```

### Use an external script

The example is doing the same as the [aREST sensor](/integrations/arest#sensor) but with an external Python script. It should give you an idea about interfacing with devices which are exposing a RESTful API.

The one-line script to retrieve a value is shown below. Of course it would be possible to use this directly in the `configuration.yaml` file but need extra care about the quotation marks.

```bash
python3 -c "import requests; print(requests.get('http://10.0.0.48/analog/2').json()['return_value'])"
```

The script (saved as `arest-value.py`) that is used looks like the example below.

```python
#!/usr/bin/python3
from requests import get

response = get("http://10.0.0.48/analog/2")
print(response.json()["return_value"])
```

To use the script you need to add something like the following to your `configuration.yaml` file.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: command_line
    name: Brightness
    command: "python3 /path/to/script/arest-value.py"
```

### Usage of templating in `command:`

[Templates](/docs/configuration/templating/) are supported in the `command` configuration variable. This could be used if you want to include the state of a specific sensor as an argument to your external script.

{% raw %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: command_line
    name: wind direction
    command: "sh /home/pi/.homeassistant/scripts/wind_direction.sh {{ states('sensor.wind_direction') }}"
    unit_of_measurement: "Direction"
```

{% endraw %}

### Usage of JSON attributes in command output

The example shows how you can retrieve multiple values with one sensor (where the additional values are attributes) by using `value_json` and `json_attributes`.

{% raw %}

```yaml
# Example configuration.yaml entry
sensor:
  - platform: command_line
    name: JSON time
    json_attributes:
      - date
      - milliseconds_since_epoch
    command: "python3 /home/pi/.homeassistant/scripts/datetime.py"
    value_template: "{{ value_json.time }}"
```

{% endraw %}
