---
title: Command Line
description: Instructions on how to integrate the Command Line utility within Home Assistant.
ha_category:
  - Binary Sensor
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
---

The `command_line` offers functionality that issues specific commands to get data or to control a device.

## Binary sensor

To use your Command binary sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: command_line
    command: "cat /proc/sys/net/ipv4/ip_forward"
```

<div class='note'>

It's highly recommended to enclose the command in single quotes `'` as it ensures all characters can be used in the command and reduces the risk of unintentional escaping. To include a single quote in a command enclosed in single quotes, double it: `''`.

</div>

{% configuration %}
command:
  description: The action to take to get the value.
  required: true
  type: string
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
  default: "*name* from the device"
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
scan_interval:
  description: Defines number of seconds for polling interval.  
  required: false
  type: integer
  default: 60
value_template:
  description: Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the payload.
  required: false
  type: string
{% endconfiguration %}

## Cover

A `command_line`cover platform that issues specific commands when it is moved up, down and stopped. It allows anyone to integrate any type of cover into Home Assistant that can be controlled from the command line.

To enable a command line cover in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
cover:
  - platform: command_line
    covers:
      garage_door:
        command_open: move_command up garage
        command_close: move_command down garage
        command_stop: move_command stop garage
```

{% configuration %}
covers:
  description: The array that contains all command line covers.
  required: true
  type: list
  keys:
    identifier:
      description: Name of the command line cover as slug. Multiple entries are possible.
      required: true
      type: list
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
        friendly_name:
          description: The name used to display the cover in the frontend.
          required: false
          type: string
        scan_interval:
          description: Defines number of seconds for polling interval.  
          required: false
          type: integer
          default: 60
        unique_id:
          description: An ID that uniquely identifies this cover. Set this to a unique value to allow customization through the UI.
          required: false
          type: string
        value_template:
          description: if specified, `command_state` will ignore the result code of the command but the template evaluating will indicate the position of the cover. For example, if your `command_state` returns a string "open", using `value_template` as in the example configuration above will allow you to translate that into the valid state `100`.
          required: false
          default: "'{% raw %}{{ value }}{% endraw%}'"
          type: template
{% endconfiguration %}

## Notify

The `command_line` platform allows you to use external tools for notifications from Home Assistant. The message will be passed in as STDIN.

To enable those notifications in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: command_line
    command: "espeak -vmb/mb-us1"
```

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the service `notify.NOTIFIER_NAME`.
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
{% endconfiguration %}

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

## Sensor

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
command_timeout:
  description: Defines number of seconds for command timeout
  required: false
  type: integer
  default: 15
json_attributes:
  description: Defines a list of keys to extract values from a JSON dictionary result and then set as sensor attributes.
  required: false
  type: [string, list]
name:
  description: Name of the command sensor.
  required: false
  type: string
unique_id:
  description: An ID that uniquely identifies this sensor. Set this to a unique value to allow customization through the UI.
  required: false
  type: string
scan_interval:
  description: Defines number of seconds for polling interval.  
  required: false
  type: integer
  default: 60
unit_of_measurement:
  description: Defines the unit of measurement of the sensor, if any.
  required: false
  type: string
value_template:
  description: "Defines a [template](/docs/configuration/templating/#processing-incoming-data) to extract a value from the payload."
  required: false
  type: string
{% endconfiguration %}

## Switch

The `command_line` switch platform issues specific commands when it is turned on
and off. This might very well become our most powerful platform as it allows
anyone to integrate any type of switch into Home Assistant that can be
controlled from the command line, including calling other scripts!

To enable it, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
switch:
  - platform: command_line
    switches:
      kitchen_light:
        command_on: switch_command on kitchen
        command_off: switch_command off kitchen
```

{% configuration %}
switches:
  description: The array that contains all command switches.
  required: true
  type: map
  keys:
    identifier:
      description: Name of the command switch as slug. Multiple entries are possible.
      required: true
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
        friendly_name:
          description: The name used to display the switch in the frontend.
          required: false
          type: string
        icon_template:
          description: Defines a template for the icon of the entity.
          required: false
          type: template
        scan_interval:
          description: Defines number of seconds for polling interval.  
          required: false
          type: integer
          default: 60
        unique_id:
          description: An ID that uniquely identifies this switch. Set this to a unique value to allow customization through the UI.
          required: false
          type: string
        value_template:
          description: "If specified, `command_state` will ignore the result code of the command but the template evaluating to `true` will indicate the switch is on."
          required: false
          type: string
{% endconfiguration %}

A note on `friendly_name`:

When set, the `friendly_name` had been previously used for API calls and backend
configuration instead of the `object_id` ("identifier"), but
[this behavior is changing](https://github.com/home-assistant/home-assistant/pull/4343)
to make the `friendly_name` for display purposes only. This allows users to set
an `identifier` that emphasizes uniqueness and predictability for API and configuration
purposes but have a prettier `friendly_name` still show up in the UI. As an
additional benefit, if a user wanted to change the `friendly_name` / display
name (e.g., from "Kitchen Lightswitch" to "Kitchen Switch" or
"Living Room Light", or remove the `friendly_name` altogether), they could
do so without needing to change existing automations or API calls.
See aREST device below for an example.

## Execution

The `command` is executed within the [configuration directory](/docs/configuration/).

<div class='note'>

If you are using [Home Assistant Operating System](https://github.com/home-assistant/operating-system), the commands are executed in the `homeassistant` container context. So if you test or debug your script, it might make sense to do this in the context of this container to get the same runtime environment.

</div>

With a `0` exit code, the output (stdout) of the command is used as `value`. In case a command results in a non `0` exit code or is terminated by the `command_timeout`, the result is only logged to Home Assistant log and the sensors value is not updated.

## Examples binary sensor platform

In this section you find some real-life examples of how to use the command_line sensor.

### SickRage

Check the state of an [SickRage](https://github.com/sickragetv/sickrage) instance.

```yaml
# Example configuration.yaml entry
binary_sensor:
  - platform: command_line
    command: 'netstat -na | find "33322" | find /c "LISTENING" > nul && (echo "Running") || (echo "Not running")'
    name: "sickragerunning"
    device_class: moving
    payload_on: "Running"
    payload_off: "Not running"
```

### Check RasPlex

Check if [RasPlex](https://github.com/RasPlex/RasPlex) is `online`.

```yaml
binary_sensor:
  - platform: command_line
    command: 'ping -c 1 rasplex.local | grep "1 received" | wc -l'
    name: "is_rasplex_online"
    device_class: connectivity
    payload_on: 1
    payload_off: 0
```

An alternative solution could look like this:

```yaml
binary_sensor:
  - platform: command_line
    name: Printer
    command: 'ping -W 1 -c 1 192.168.1.10 > /dev/null 2>&1 && echo success || echo fail'
    device_class: connectivity
    payload_on: "success"
    payload_off: "fail"
```

Consider to use the [ping sensor](/integrations/ping#binary-sensor) as an alternative to the samples above.

### Check if a system service is running

The services running is listed in `/etc/systemd/system` and can be checked with the `systemctl` command:

```bash
$ systemctl is-active home-assistant@rock64.service
active
$ sudo service home-assistant@rock64.service stop
$ systemctl is-active home-assistant@rock64.service
inactive
```

A binary command line sensor can check this:

```yaml
binary_sensor:
  - platform: command_line
    command: '/bin/systemctl is-active home-assistant@rock64.service'
    payload_on: "active"
    payload_off: "inactive"
```

## Example cover platform

{% raw %}

```yaml
# Example configuration.yaml entry
cover:
  - platform: command_line
    covers:
      garage_door:
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

## Examples sensor platform

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

## Example switch platform

### Change the icon when a state changes

This example demonstrates how to use template to change the icon as its state changes. This icon is referencing its own state.

{% raw %}

```yaml
switch:
  - platform: command_line
    switches:

      driveway_sensor_motion:
        friendly_name: Driveway outside sensor
        command_on: >
          curl -X PUT -d '{"on":true}' "http://ip_address/api/sensors/27/config/"
        command_off: >
          curl -X PUT -d '{"on":false}' "http://ip_address/api/sensors/27/config/"
        command_state: curl http://ip_address/api/sensors/27/
        value_template: >
          {{value_json.config.on}}
        icon_template: >
          {% if value_json.config.on == true %} mdi:toggle-switch
          {% else %} mdi:toggle-switch-off
          {% endif %}
```

{% endraw %}

### aREST device

The example below is doing the same as the
[aREST switch](/integrations/arest#switch).
The command line tool [`curl`](https://curl.haxx.se/) is used to toggle a pin
which is controllable through REST.

{% raw %}

```yaml
# Example configuration.yaml entry
switch:
  - platform: command_line
    switches:
      arest_pin_four:
        command_on: "/usr/bin/curl -X GET http://192.168.1.10/digital/4/1"
        command_off: "/usr/bin/curl -X GET http://192.168.1.10/digital/4/0"
        command_state: "/usr/bin/curl -X GET http://192.168.1.10/digital/4"
        value_template: '{{ value == "1" }}'
        friendly_name: Kitchen Lightswitch
```

{% endraw %}

Given this example, in the UI one would see the `friendly_name` of
"Kitchen Light". However, the `identifier` is `arest_pin_four`, making the
`entity_id` `switch.arest_pin_four`, which is what one would use in
[`automation`](/integrations/automation/) or in [API calls](/developers/).

### Shutdown your local host

This switch will shutdown your system that is hosting Home Assistant.

<div class='note warning'>
This switch will shutdown your host immediately, there will be no confirmation.
</div>

```yaml
# Example configuration.yaml entry
switch:
  - platform: command_line
    switches:
      home_assistant_system_shutdown:
        command_off: "/usr/sbin/poweroff"
```

### Control your VLC player

This switch will control a local VLC media player
([Source](https://community.home-assistant.io/t/vlc-player/106)).

```yaml
# Example configuration.yaml entry
switch:
  - platform: command_line
    switches:
      vlc:
        command_on: "cvlc 1.mp3 vlc://quit &"
        command_off: "pkill vlc"
```

### Control Foscam Motion Sensor

This switch will control the motion sensor of Foscam Webcams which Support CGI
Commands ([Source](https://www.iltucci.com/blog/wp-content/uploads/2018/12/Foscam-IPCamera-CGI-User-Guide-V1.0.4.pdf)).
This switch supports statecmd,
which checks the current state of motion detection.

{% raw %}

```yaml
# Example configuration.yaml entry
switch:
  - platform: command_line
    switches:
      foscam_motion:
        command_on: 'curl -k "https://ipaddress:443/cgi-bin/CGIProxy.fcgi?cmd=setMotionDetectConfig&isEnable=1&usr=admin&pwd=password"'
        command_off: 'curl -k "https://ipaddress:443/cgi-bin/CGIProxy.fcgi?cmd=setMotionDetectConfig&isEnable=0&usr=admin&pwd=password"'
        command_state: 'curl -k --silent "https://ipaddress:443/cgi-bin/CGIProxy.fcgi?cmd=getMotionDetectConfig&usr=admin&pwd=password" | grep -oP "(?<=isEnable>).*?(?=</isEnable>)"'
        value_template: '{{ value == "1" }}'
```

{% endraw %}

- Replace admin and password with an "Admin" privileged Foscam user
- Replace ipaddress with the local IP address of your Foscam

## Services

Available services: `reload`.

### Service `command_line.reload`

Reload all `command_line` entities.

This service takes no service data attributes.
