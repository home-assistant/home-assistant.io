---
layout: page
title: "Command line Sensor"
description: "Instructions on how to integrate command line sensors into Home Assistant."
date: 2015-09-13 10:10
sidebar: true
comments: false
sharing: true
footer: true
logo: command_line.png
ha_category: Sensor
ha_release: pre 0.7
ha_iot_class: "Local Polling"
---


The `command_line` sensor platform that issues specific commands to get data. This might become our most powerful platform as it allows anyone to integrate any type of sensor into Home Assistant that can get data from the command line.

To enable it, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: command_line
    command: SENSOR_COMMAND
```

Configuration variables:

- **command** (*Required*): The action to take to get the value.
- **name** (*Optional*): Name of the command sensor.
- **unit_of_measurement** (*Optional*): Defines the unit of measurement of the sensor, if any.
- **value_template** (*Optional*): Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the payload.
- **scan_interval** (*Optional*): Defines number of seconds for polling interval (defaults to 60 seconds).

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this sensor.

### {% linkable_title Hard drive temperature %}

There are several ways to get the temperature of your hard drive. A simple solution is to use [hddtemp](https://savannah.nongnu.org/projects/hddtemp/).

```bash
$ hddtemp -n /dev/sda
```

To use this information, the entry for a command-line sensor in the `configuration.yaml` file will look like this.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: command_line
    name: HD Temperature
    command: "hddtemp -n /dev/sda"
    # If errors occur, remove degree symbol below
    unit_of_measurement: "°C"
```

### {% linkable_title CPU temperature %}

Thanks to the [`proc`](https://en.wikipedia.org/wiki/Procfs) file system, various details about a system can be retrieved. Here the CPU temperature is of interest. Add something similar to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: command_line
    name: CPU Temperature
    command: "cat /sys/class/thermal/thermal_zone0/temp"
    # If errors occur, remove degree symbol below
    unit_of_measurement: "°C"
    value_template: '{% raw %}{{ value | multiply(0.001) | round(1) }}{% endraw %}'
```

### {% linkable_title Monitoring failed login attempts on Home Assistant %}

If you'd like to know how many failed login attempts are made to Home Assistant, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: command_line
    name: badlogin
    command: "grep -c 'Login attempt' /home/hass/.homeassistant/home-assistant.log"
```

Make sure to configure the [logger component](/components/logger) to monitor the [http component](/components/http/) at least the `warning` level.

```yaml
# Example working logger settings that works
logger:
  default: critical
  logs:
    homeassistant.components.http: warning
```

### {% linkable_title Details about the upstream Home Assistant release %}

You can see directly in the frontend (**Developer tools** -> **About**) what release of Home Assistant you are running. The Home Assistant releases are available on the [Python Package Index](https://pypi.python.org/pypi). This makes it possible to get the current release.

```yaml
sensor:
  - platform: command_line
    command: python3 -c "import requests; print(requests.get('https://pypi.python.org/pypi/homeassistant/json').json()['info']['version'])"
    name: HA release
```

### {% linkable_title Read value out of a remote text file %}

If you own a devices which are storing values in text files which are accessible over HTTP then you can use the same approach as shown in the previous section. Instead of looking at the JSON response we directly grab the sensor's value.

```yaml
sensor:
  - platform: command_line
    command: python3 -c "import requests; print(requests.get('http://remote-host/sensor_data.txt').text)"
    name: File value
```

### {% linkable_title Use an external script %}

The example is doing the same as the [aREST sensor](/components/sensor.arest/) but with an external Python script. It should give you an idea about interfacing with devices which are exposing a RESTful API.

The one-line script to retrieve a value is shown below. Of course would it be possible to use this directly in the `configuration.yaml` file but need extra care about the quotation marks.

```bash
$ python3 -c "import requests; print(requests.get('http://10.0.0.48/analog/2').json()['return_value'])"
```

The script (saved as `arest-value.py`) that is used looks like the example below.

```python
#!/usr/bin/python3
from requests import get
response = get('http://10.0.0.48/analog/2')
print(response.json()['return_value'])
```

To use the script you need to add something like the following to your `configuration.yaml` file.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: command_line
    name: Brightness
    command: "python3 /path/to/script/arest-value.py"
```

### {% linkable_title Usage of templating in `command:` %}

[Templates](/docs/configuration/templating/) are supported in the `command:` configuration variable. This could be used if you want to include the state of a specific sensor as an argument to your external script.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: command_line
    name: wind direction
    command: 'sh /home/pi/.homeassistant/scripts/wind_direction.sh {% raw %}{{ states.sensor.wind_direction.state }}{% endraw %}'
    unit_of_measurement: "Direction"
```
