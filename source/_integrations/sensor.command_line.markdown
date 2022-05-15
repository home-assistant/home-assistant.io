---
title: "Command line Sensor"
description: "Instructions on how to integrate command line sensors into Home Assistant."
ha_category:
  - Utility
  - Sensor
ha_release: pre 0.7
ha_codeowners:
  - '@gjohansson-ST'
ha_config_flow: true
ha_iot_class: Local Polling
ha_domain: command_line
---


The `command_line` sensor platform simply issues specific commands to get its data. This makes it a very powerful platform as it allows anyone to integrate any type of sensor into Home Assistant that can get data from the command line.

{% include integrations/config_flow.md %}

## Execution

The `command` is executed within the [configuration directory](/docs/configuration/).

<div class='note'>

If you are using [Home Assistant Operating System](https://github.com/home-assistant/operating-system), the commands are executed in the `homeassistant` container context. So if you test or debug your script, it might make sense to do this in the context of this container to get the same runtime environment.

</div>

With a `0` exit code, the output (stdout) of the command is used as `value`. In case a command results in a non `0` exit code or is terminated by the `command_timeout`, the result is only logged to Home Assistant log and the value of the sensor is not updated.

## Examples

In this section you find some real-life examples of how to use this sensor.

### CPU temperature

Thanks to the [`proc`](https://en.wikipedia.org/wiki/Procfs) file system, various details about a system can be retrieved. Here the CPU temperature is of interest. Add something similar to your `configuration.yaml` file:

| Field | Entry |
| --- | --- |
| Name | CPU Temperature |
| Command | {% raw %}`cat /sys/class/thermal/thermal_zone0/temp`{% endraw %} |
| Unit of Measurement | °C |
| Value template | {% raw %}`{{ value | multiply(0.001) | round(1) }}`{% endraw %} |

### Monitoring failed login attempts on Home Assistant

If you'd like to know how many failed login attempts are made to Home Assistant, add the following to your `configuration.yaml` file:

| Field | Entry |
| --- | --- |
| Name | badlogin |
| Command | {% raw %}`grep -c 'Login attempt' /home/hass/.homeassistant/home-assistant.log`{% endraw %} |

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

| Field | Entry |
| --- | --- |
| Command | {% raw %}`python3 -c "import requests; print(requests.get('https://pypi.python.org/pypi/homeassistant/json').json()['info']['version'])"`{% endraw %} |
| Name | HA release |

### Read value out of a remote text file

If you own devices which are storing values in text files which are accessible over HTTP then you can use the same approach as shown in the previous section. Instead of looking at the JSON response we directly grab the sensor's value.

| Field | Entry |
| --- | --- |
| Command | {% raw %}`python3 -c "import requests; print(requests.get('http://remote-host/sensor_data.txt').text)"`{% endraw %} |
| Name | File value |

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

To use the script you need to add something like this as entry.

| Field | Entry |
| --- | --- |
| Name | Brightness |
| Command | {% raw %}`python3 /path/to/script/arest-value.py`{% endraw %} |

### Usage of templating in `command:`

[Templates](/docs/configuration/templating/) are supported in the `command` configuration variable. This could be used if you want to include the state of a specific sensor as an argument to your external script.

| Field | Entry |
| --- | --- |
| Name | wind direction |
| Command | {% raw %}`sh /home/pi/.homeassistant/scripts/wind_direction.sh {{ states('sensor.wind_direction') }}`{% endraw %} |
| Unit of Measurement | Direction |


### Usage of JSON attributes in command output

The example shows how you can retrieve multiple values with one sensor (where the additional values are attributes) by using `value_json` and `json_attributes`.

| Field | Entry |
| --- | --- |
| Name | JSON time |
| JSON attributes | date, milliseconds_since_epoch |
| Command | {% raw %}`python3 /home/pi/.homeassistant/scripts/datetime.py`{% endraw %} |
| Value template | {% raw %}`{{ value_json.time }}`{% endraw %} |
