---
title: "Command line Switch"
description: "Instructions on how to have switches call command line commands."
ha_category:
  - Switch
ha_release: pre 0.7
ha_iot_class: Local Polling
ha_domain: command_line
---

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
        value_template:
          description: "If specified, `command_state` will ignore the result code of the command but the template evaluating to `true` will indicate the switch is on."
          required: false
          type: string
        friendly_name:
          description: The name used to display the switch in the frontend.
          required: false
          type: string
        icon_template:
          description: Defines a template for the icon of the entity.
          required: false
          type: template
        command_timeout:
          description: Defines number of seconds for command timeout.
          required: false
          type: integer
          default: 15
        unique_id:
          description: An ID that uniquely identifies this switch. Set this to a unique value to allow customization through the UI.
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

## Examples

In this section you find some real-life examples of how to use this switch.

### Change the icon when a state changes

This example demonstrates how to use template to change the icon as its state changes. This icon is referencing its own state.

{% raw %}

```yaml
switch:
  - platform: command_line
    switches:

      driveway_sensor_motion:
        friendly_name: Driveway buiten sensor
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
