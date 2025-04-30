---
title: Command line
description: Instructions on how to integrate the command line utility within Home Assistant.
ha_category:
  - Binary sensor
  - Cover
  - Notifications
  - Sensor
  - Utility
ha_release: 0.12
ha_iot_class: Local Polling
ha_domain: command_line
ha_platforms:
  - binary_sensor
  - cover
  - notify
  - sensor
  - switch
ha_integration_type: integration
ha_codeowners:
  - '@gjohansson-ST'
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The **Command line** {% term integration %} offers functionality that issues specific commands to get data or to control a device.

{% tip %}
It's highly recommended to enclose the command in single quotes `'` as it ensures all characters can be used in the command and reduces the risk of unintentional escaping. To include a single quote in a command enclosed in single quotes, double it: `''`.
{% endtip %}

{% configuration %}
command_line:
  description: The platforms to use for you command_line integration.
  required: true
  type: list
  keys:
    binary_sensor:
      description: Binary sensor platform.
      required: false
      type: map
      keys:
        command:
          description: The action to take to get the value.
          required: true
          type: template
        command_timeout:
          description: Defines number of seconds for command timeout.
          required: false
          type: integer
          default: 15
        device_class:
          description: Sets the [class of the device](/integrations/binary_sensor/), changing the device state and icon that is displayed on the frontend.
          required: false
          type: string
        name:
          description: Let you overwrite the name of the device.
          required: false
          type: string
          default: "Binary Command Sensor"
        icon:
          description: Defines a template for the icon of the entity.
          required: false
          type: template
        payload_on:
          description: The payload that represents enabled state.
          required: false
          type: string
          default: 'ON'
        unique_id:
          description: An ID that uniquely identifies this binary sensor. Set this to a unique value to allow customization through the UI.
          required: false
          type: string
        payload_off:
          description: The payload that represents disabled state.
          required: false
          type: string
          default: 'OFF'
        value_template:
          description: Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the payload.
          required: false
          type: string
        availability:
          description: Defines a template to get the `available` state of the entity. If the template either fails to render or returns `True`, `"1"`, `"true"`, `"yes"`, `"on"`, `"enable"`, or a non-zero number, the entity will be `available`. If the template returns any other value, the entity will be `unavailable`. If not configured, the entity will always be `available`. Note that string comparisons are not case sensitive; `"TrUe"` and `"yEs"` are allowed.
          required: false
          type: template
          default: true
        scan_interval:
          description: Define time in seconds between each update.
          required: false
          type: integer
          default: 60
    cover:
      description: Cover platform.
      required: false
      type: map
      keys:
        command_close:
          description: The action to close the cover.
          required: true
          default: true
          type: string
        command_open:
          description: The command to open the cover.
          required: true
          default: true
          type: string
        command_state:
          description: If given, this will act as a sensor that runs in the background and updates the state of the cover. If the command returns a `0` the indicates the cover is fully closed, whereas a 100 indicates the cover is fully open.
          required: false
          type: string
        command_stop:
          description: The action to stop the cover.
          required: true
          default: true
          type: string
        command_timeout:
          description: Defines number of seconds for command timeout.
          required: false
          type: integer
          default: 15
        device_class:
          description: Sets the [class of the device](/integrations/cover/), changing the device state and icon that is displayed on the frontend.
          required: false
          type: string
        name:
          description: The name used to display the cover in the frontend.
          required: true
          type: string
        icon:
          description: Defines a template for the icon of the entity.
          required: false
          type: template          
        unique_id:
          description: An ID that uniquely identifies this cover. Set this to a unique value to allow customization through the UI.
          required: false
          type: string
        value_template:
          description: if specified, `command_state` will ignore the result code of the command but the template evaluating will indicate the position of the cover. For example, if your `command_state` returns a string "open", using `value_template` as in the example configuration above will allow you to translate that into the valid state `100`.
          required: false
          type: template
        availability:
          description: Defines a template to get the `available` state of the entity. If the template either fails to render or returns `True`, `"1"`, `"true"`, `"yes"`, `"on"`, `"enable"`, or a non-zero number, the entity will be `available`. If the template returns any other value, the entity will be `unavailable`. If not configured, the entity will always be `available`. Note that string comparisons are not case sensitive; `"TrUe"` and `"yEs"` are allowed.
          required: false
          type: template
          default: true
        scan_interval:
          description: Define time in seconds between each update.
          required: false
          type: integer
          default: 15
    notify:
      description: Notify platform.
      required: false
      type: map
      keys:
        name:
          description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the `notify.NOTIFIER_NAME` action.
          required: false
          default: notify
          type: string
        command:
          description: The action to take.
          required: true
          type: string
        command_timeout:
          description: Defines number of seconds for command timeout.
          required: false
          type: integer
          default: 15
    sensor:
      description: Sensor platform.
      required: false
      type: map
      keys:
        command:
          description: The action to take to get the value.
          required: true
          type: template
        command_timeout:
          description: Defines number of seconds for command timeout
          required: false
          type: integer
          default: 15
        json_attributes:
          description: Defines a list of keys to extract values from a JSON dictionary result and then set as sensor attributes.
          required: false
          type: [string, list]
        json_attributes_path:
          description: A [JSONPath](https://goessner.net/articles/JsonPath/) that references the location of the `json_attributes` in the JSON content.
          required: false
          type: string
        name:
          description: Name of the command sensor.
          required: false
          type: string
          default: "Command Sensor"
        icon:
          description: Defines a template for the icon of the entity.
          required: false
          type: template
        unique_id:
          description: An ID that uniquely identifies this sensor. Set this to a unique value to allow customization through the UI.
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
        availability:
          description: Defines a template to get the `available` state of the entity. If the template either fails to render or returns `True`, `"1"`, `"true"`, `"yes"`, `"on"`, `"enable"`, or a non-zero number, the entity will be `available`. If the template returns any other value, the entity will be `unavailable`. If not configured, the entity will always be `available`. Note that string comparisons are not case sensitive; `"TrUe"` and `"yEs"` are allowed.
          required: false
          type: template
          default: true
        device_class:
          description: Sets the class of the device, changing the device state and icon that is displayed on the UI (see below). It does not set the `unit_of_measurement`.
          required: false
          type: device_class
          default: None
        state_class:
          description: "The [state_class](https://developers.home-assistant.io/docs/core/entity/sensor#available-state-classes) of the sensor."
          required: false
          type: string
          default: None
        scan_interval:
          description: Define time in seconds between each update.
          required: false
          type: integer
          default: 60
        device_class:
          description: Sets the class of the device, changing the device state and icon that is displayed on the UI (see below). It does not set the `unit_of_measurement`.
          required: false
          type: device_class
        state_class:
          description: "The [state_class](https://developers.home-assistant.io/docs/core/entity/sensor#available-state-classes) of the sensor. This will display the value based on the **Number Format** defined in the user profile."
          required: false
          type: string
    switch:
      description: Switch platform.
      required: false
      type: map
      keys:
        command_on:
          description: The action to take for on.
          required: true
          type: string
        command_off:
          description: The action to take for off.
          required: true
          type: string
        command_state:
          description: "If given, this command will be run. Returning a result code `0` will indicate that the switch is on."
          required: false
          type: string
        command_timeout:
          description: Defines number of seconds for command timeout.
          required: false
          type: integer
          default: 15
        name:
          description: The name used to display the switch in the frontend.
          required: true
          type: string
        icon:
          description: Defines a template for the icon of the entity.
          required: false
          type: template
        unique_id:
          description: An ID that uniquely identifies this switch. Set this to a unique value to allow customization through the UI.
          required: false
          type: string
        value_template:
          description: "If specified, `command_state` will ignore the result code of the command but the template evaluating to `true` will indicate the switch is on."
          required: false
          type: string
        availability:
          description: Defines a template to get the `available` state of the entity. If the template either fails to render or returns `True`, `"1"`, `"true"`, `"yes"`, `"on"`, `"enable"`, or a non-zero number, the entity will be `available`. If the template returns any other value, the entity will be `unavailable`. If not configured, the entity will always be `available`. Note that string comparisons are not case sensitive; `"TrUe"` and `"yEs"` are allowed.
          required: false
          type: template
          default: true
        scan_interval:
          description: Define time in seconds between each update.
          required: false
          type: integer
          default: 30
{% endconfiguration %}

{% note %}
For sensors, while `value_template` is optional, if you set `json_attributes` because the output is a JSON, it is suggested to provide a template in the `value_template` field to provide a state to the sensor or the state will always be `unknown`. See [example](#usage-of-json-attributes-in-command-output) below.
{% endnote %}

## Troubleshooting

As **Command line** {% term integration %} is a yaml only integration, turning on extended logging needs to be done by setting the logging information in your {% term "`configuration.yaml`" %} file.

Entering this example in your configuration sets the default logging to info, and for `command_line` to debug. Once done, restart Home Assistant to enable.

{% raw %}
```yaml
# Set logging
logger:
  default: info
  logs:
    homeassistant.components.command_line: debug
```
{% endraw%}

{% note %}

While `command` is accepting a template for `sensor` and `binary_sensor`, it's only the arguments that can be a template. This means the command name itself cannot be generated by a template, but it must be literally provided.

{% endnote %}

{% include integrations/using_templates.md %}

## Binary sensor

To use your Command binary sensor in your installation, add the following to your {% term "`configuration.yaml`" %} file:

{% raw %}
```yaml
# Example configuration.yaml entry
command_line:
  - binary_sensor:
      command: "cat /proc/sys/net/ipv4/ip_forward"
  - binary_sensor:
      command: "echo 1"
```
{% endraw%}

## Cover

A `command_line`cover platform that issues specific commands when it is moved up, down and stopped. It allows anyone to integrate any type of cover into Home Assistant that can be controlled from the command line.

To enable a command line cover in your installation, add the following to your {% term "`configuration.yaml`" %} file:

{% raw %}
```yaml
# Example configuration.yaml entry
command_line:
  - cover:
      command_open: move_command up garage
      command_close: move_command down garage
      command_stop: move_command stop garage
      name: Garage
```
{% endraw%}

## Notify

The `command_line` platform allows you to use external tools for notifications from Home Assistant. The message will be passed in as STDIN.

To enable those notifications in your installation, add the following to your {% term "`configuration.yaml`" %} file:

{% raw %}
```yaml
# Example configuration.yaml entry
command_line:
  - notify:
      command: "espeak -vmb/mb-us1"
```
{% endraw%}

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

## Sensor

To enable it, add the following lines to your {% term "`configuration.yaml`" %}:

{% raw %}
```yaml
# Example configuration.yaml entry
command_line:
  - sensor:
      command: SENSOR_COMMAND
  - sensor:
      command: SENSOR_COMMAND_2
```
{% endraw%}

## Switch

The `command_line` switch platform issues specific commands when it is turned on
and off. This might very well become our most powerful platform as it allows
anyone to integrate any type of switch into Home Assistant that can be
controlled from the command line, including calling other scripts!

To enable it, add the following lines to your {% term "`configuration.yaml`" %}:

{% raw %}
```yaml
# Example configuration.yaml entry
command_line:
  - switch:
      name: Kitchen Light
      command_on: switch_command on kitchen
      command_off: switch_command off kitchen
```
{% endraw%}

{% note %}

A note on `name` for `cover` and `switch`:
  
The use of `friendly_name` and `object_id` has been deprecated and the slugified `name` will also be used as identifier.

Use `unique_id` to enable changing the name from the UI and if required, use the slugified `name` as identifier.

{% endnote %}

## Execution

The `command` is executed within the [configuration directory](/docs/configuration/).

{% note %}

If you are using [Home Assistant Operating System](https://github.com/home-assistant/operating-system), the commands are executed in the `homeassistant` container context. So if you test or debug your script, it might make sense to do this in the context of this container to get the same runtime environment.

{% endnote %}

With a `0` exit code, the output (stdout) of the command is used as `value`. In case a command results in a non `0` exit code or is terminated by the `command_timeout`, the result is only logged to Home Assistant log and the sensors value is not updated.

## Examples binary sensor platform

In this section you find some real-life examples of how to use the command_line sensor.

### SickRage

Check the state of an [SickRage](https://github.com/sickragetv/sickrage) instance.

{% raw %}
```yaml
# Example configuration.yaml entry
command_line:
  - binary_sensor:
      command: 'netstat -na | find "33322" | find /c "LISTENING" > nul && (echo "Running") || (echo "Not running")'
      name: "sickragerunning"
      device_class: moving
      payload_on: "Running"
      payload_off: "Not running"
```
{% endraw%}

### Check RasPlex

Check if [RasPlex](https://github.com/RasPlex/RasPlex) is `online`.

{% raw %}
```yaml
command_line:
  - binary_sensor:
      command: 'ping -c 1 rasplex.local | grep "1 received" | wc -l'
      name: "is_rasplex_online"
      device_class: connectivity
      payload_on: 1
      payload_off: 0
```
{% endraw%}

An alternative solution could look like this:

{% raw %}
```yaml
command_line:
  - binary_sensor:
      name: Printer
      command: 'ping -W 1 -c 1 192.168.1.10 > /dev/null 2>&1 && echo success || echo fail'
      device_class: connectivity
      payload_on: "success"
      payload_off: "fail"
```
{% endraw%}

Consider to use the [ping sensor](/integrations/ping#binary-sensor) as an alternative to the samples above.

### Check if a system service is running

The services running is listed in `/etc/systemd/system` and can be checked with the `systemctl` command:

{% raw %}
```bash
$ systemctl is-active home-assistant@rock64.service
active
$ sudo service home-assistant@rock64.service stop
$ systemctl is-active home-assistant@rock64.service
inactive
```
{% endraw%}

A binary command line sensor can check this:

{% raw %}
```yaml
command_line:
  - binary_sensor:
      command: '/bin/systemctl is-active home-assistant@rock64.service'
      payload_on: "active"
      payload_off: "inactive"
```
{% endraw%}

## Example cover platform

{% raw %}
```yaml
# Example configuration.yaml entry
command_line:
  - cover:
      name: Garage door
      command_open: move_command up garage
      command_close: move_command down garage
      command_stop: move_command stop garage
      command_state: state_command garage
      value_template: >
        {% if value == 'open' %}
        100
        {% elif value == 'closed' %}
        0
        {% endif %}
```
{% endraw%}

## Examples sensor platform

In this section you find some real-life examples of how to use this sensor.

### CPU temperature

Thanks to the [`proc`](https://en.wikipedia.org/wiki/Procfs) file system, various details about a system can be retrieved. Here the CPU temperature is of interest. Add something similar to your {% term "`configuration.yaml`" %} file:

{% raw %}
```yaml
# Example configuration.yaml entry
command_line:
  - sensor:
      name: CPU Temperature
      command: "cat /sys/class/thermal/thermal_zone0/temp"
      # If errors occur, make sure configuration file is encoded as UTF-8
      unit_of_measurement: "°C"
      value_template: "{{ value | multiply(0.001) | round(1) }}"
```
{% endraw%}

### Monitoring failed login attempts on Home Assistant

If you'd like to know how many failed login attempts are made to Home Assistant, add the following to your {% term "`configuration.yaml`" %} file:

{% raw %}
```yaml
# Example configuration.yaml entry
command_line:
  - sensor:
      name: Badlogin
      command: "grep -c 'Login attempt' /home/hass/.homeassistant/home-assistant.log"
```
{% endraw%}

Make sure to configure the [Logger integration](/integrations/logger) to monitor the [HTTP integration](/integrations/http/) at least the `warning` level.

{% raw %}
```yaml
# Example working logger settings that works
logger:
  default: critical
  logs:
    homeassistant.components.http: warning
```
{% endraw%}

### Details about the upstream Home Assistant release

You can see directly in the frontend (**Developer tools** -> **About**) what release of Home Assistant you are running. The Home Assistant releases are available on the [Python Package Index](https://pypi.python.org/pypi). This makes it possible to get the current release.

{% raw %}
```yaml
command_line:
  - sensor:
      command: python3 -c "import requests; print(requests.get('https://pypi.python.org/pypi/homeassistant/json').json()['info']['version'])"
      name: HA release
```
{% endraw%}

### Read value out of a remote text file

If you own devices which are storing values in text files which are accessible over HTTP then you can use the same approach as shown in the previous section. Instead of looking at the JSON response we directly grab the sensor's value.

{% raw %}
```yaml
command_line:
  - sensor:
      command: python3 -c "import requests; print(requests.get('http://remote-host/sensor_data.txt').text)"
      name: File value
```
{% endraw%}

### Use an external script

The example is doing the same as the [aREST sensor](/integrations/arest#sensor) but with an external Python script. It should give you an idea about interfacing with devices which are exposing a RESTful API.

The one-line script to retrieve a value is shown below. Of course it would be possible to use this directly in the {% term "`configuration.yaml`" %} file but need extra care about the quotation marks.

{% raw %}
```bash
python3 -c "import requests; print(requests.get('http://10.0.0.48/analog/2').json()['return_value'])"
```
{% endraw%}

The script (saved as `arest-value.py`) that is used looks like the example below.

{% raw %}
```python
#!/usr/bin/python3
from requests import get

response = get("http://10.0.0.48/analog/2")
print(response.json()["return_value"])
```
{% endraw%}

To use the script you need to add something like the following to your {% term "`configuration.yaml`" %} file.

{% raw %}
```yaml
# Example configuration.yaml entry
command_line:
  - sensor:
      name: Brightness
      command: "python3 /path/to/script/arest-value.py"
```
{% endraw%}

### Usage of templating in `command:`

[Templates](/docs/configuration/templating/) are supported in the `command` configuration variable. This could be used if you want to include the state of a specific sensor as an argument to your external script.

{% raw %}
```yaml
# Example configuration.yaml entry
command_line:
  - sensor:
      name: Wind direction
      command: "sh /home/pi/.homeassistant/scripts/wind_direction.sh {{ states('sensor.wind_direction') }}"
      unit_of_measurement: "Direction"
```
{% endraw%}

### Usage of JSON attributes in command output

The example shows how you can retrieve multiple values with one sensor (where the additional values are attributes) by using `value_json` and `json_attributes`.

{% raw %}
```yaml
# Example configuration.yaml entry
command_line:
  - sensor:
      name: JSON time
      json_attributes:
        - date
        - milliseconds_since_epoch
      command: "python3 /home/pi/.homeassistant/scripts/datetime.py"
      value_template: "{{ value_json.time }}"
```
{% endraw%}

[JSONPlaceholder](https://jsonplaceholder.typicode.com/) provides sample JSON data for testing. In the below example, JSONPath locates the attributes in the JSON document. [JSONPath Online Evaluator](https://jsonpath.com/) provides a tool to test your JSONPath.

{% raw %}

```yaml
command_line:
  - sensor:
      name: JSON user
      command: python3 -c "import requests; print(requests.get('https://jsonplaceholder.typicode.com/users').text)"
      json_attributes_path: "$.[0].address"
      json_attributes:
        - street
        - suite
        - city
        - zipcode
      value_template: "{{ value_json[0].name }}"
```

{% endraw %}

## Example switch platform

### Change the icon when a state changes

This example demonstrates how to use template to change the icon as its state changes. This icon is referencing its own state.

{% raw %}
```yaml
command_line:
  - switch:
      name: Driveway outside sensor
      command_on: >
        curl -X PUT -d '{"on":true}' "http://ip_address/api/sensors/27/config/"
      command_off: >
        curl -X PUT -d '{"on":false}' "http://ip_address/api/sensors/27/config/"
      command_state: curl http://ip_address/api/sensors/27/
      value_template: >
        {{value_json.config.on}}
      icon: >
        {% if value_json.config.on == true %} mdi:toggle-switch
        {% else %} mdi:toggle-switch-off
        {% endif %}
```
{% endraw%}

### aREST device

The example below is doing the same as the
[aREST switch](/integrations/arest#switch).
The command line tool [`curl`](https://curl.haxx.se/) is used to toggle a pin
which is controllable through REST.

{% raw %}
```yaml
# Example configuration.yaml entry
command_line:
  - switch:
      command_on: "/usr/bin/curl -X GET http://192.168.1.10/digital/4/1"
      command_off: "/usr/bin/curl -X GET http://192.168.1.10/digital/4/0"
      command_state: "/usr/bin/curl -X GET http://192.168.1.10/digital/4"
      value_template: '{{ value == "1" }}'
      name: Kitchen Lightswitch
```
{% endraw%}

Given this example, in the UI one would see the `friendly_name` of
"Kitchen Light". However, the `identifier` is `arest_pin_four`, making the
`entity_id` `switch.arest_pin_four`, which is what one would use in
[`automation`](/integrations/automation/) or in [API calls](/developers/).

### Shutdown your local host

This switch will shutdown your system that is hosting Home Assistant.

{% warning %}
This switch will shutdown your host immediately, there will be no confirmation.
{% endwarning %}

{% raw %}
```yaml
# Example configuration.yaml entry
command_line:
  - switch:
      name: Home Assistant System Shutdown
      command_off: "/usr/sbin/poweroff"
```
{% endraw%}

### Control your VLC player

This switch will control a local VLC media player
([Source](https://community.home-assistant.io/t/vlc-player/106)).

{% raw %}
```yaml
# Example configuration.yaml entry
command_line:
  - switch:
      name: VLC
      command_on: "cvlc 1.mp3 vlc://quit &"
      command_off: "pkill vlc"
```
{% endraw%}

### Control Foscam motion sensor

This switch will control the motion sensor of Foscam Webcams which Support CGI
Commands ([Source](https://www.iltucci.com/blog/wp-content/uploads/2018/12/Foscam-IPCamera-CGI-User-Guide-V1.0.4.pdf)).
This switch supports statecmd,
which checks the current state of motion detection.

{% raw %}
```yaml
# Example configuration.yaml entry
command_line:
  - switch:
      name: Foscam Motion
      command_on: 'curl -k "https://ipaddress:443/cgi-bin/CGIProxy.fcgi?cmd=setMotionDetectConfig&isEnable=1&usr=admin&pwd=password"'
      command_off: 'curl -k "https://ipaddress:443/cgi-bin/CGIProxy.fcgi?cmd=setMotionDetectConfig&isEnable=0&usr=admin&pwd=password"'
      command_state: 'curl -k --silent "https://ipaddress:443/cgi-bin/CGIProxy.fcgi?cmd=getMotionDetectConfig&usr=admin&pwd=password" | grep -oP "(?<=isEnable>).*?(?=</isEnable>)"'
      value_template: '{{ value == "1" }}'
```
{% endraw%}

- Replace admin and password with an "Admin" privileged Foscam user
- Replace ipaddress with the local IP address of your Foscam

## Actions

Available actions: `reload`.

### Action `command_line.reload`

Reload all `command_line` entities.

This action takes no data attributes.
