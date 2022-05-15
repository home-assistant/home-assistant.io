---
title: "Command line Switch"
description: "Instructions on how to have switches call command line commands."
ha_category:
  - Switch
ha_release: pre 0.7
ha_codeowners:
  - '@gjohansson-ST'
ha_config_flow: true
ha_iot_class: Local Polling
ha_domain: command_line
---

The `command_line` switch platform issues specific commands when it is turned on
and off. This might very well become our most powerful platform as it allows
anyone to integrate any type of switch into Home Assistant that can be
controlled from the command line, including calling other scripts!

{% include integrations/config_flow.md %}

## Examples

In this section you find some real-life examples of how to use this switch.

### Change the icon when a state changes

This example demonstrates how to use template to change the icon as its state changes. This icon is referencing its own state.

| Field | Entry |
| --- | --- |
| Name | Driveway buiten sensor |
| command_on | curl -X PUT -d '{"on":true}' "http://ip_address/api/sensors/27/config/" |
| command_off | curl -X PUT -d '{"on":false}' "http://ip_address/api/sensors/27/config/" |
| command_state | curl http://ip_address/api/sensors/27/ |
| value_template | {{value_json.config.on}} |
| icon_template | {% if value_json.config.on == true %} mdi:toggle-switch {% else %} mdi:toggle-switch-off {% endif %} |


### aREST device

The example below is doing the same as the
[aREST switch](/integrations/arest#switch).
The command line tool [`curl`](https://curl.haxx.se/) is used to toggle a pin
which is controllable through REST.

| Field | Entry |
| --- | --- |
| command_on | "/usr/bin/curl -X GET http://192.168.1.10/digital/4/1" |
| command_off | "/usr/bin/curl -X GET http://192.168.1.10/digital/4/0" |
| command_state | "/usr/bin/curl -X GET http://192.168.1.10/digital/4" |
| value_template | '{{ value == "1" }}' |
| Name | Kitchen Lightswitch |


Given this example, in the UI one would see the `friendly_name` of
"Kitchen Light". However, the `identifier` is `arest_pin_four`, making the
`entity_id` `switch.arest_pin_four`, which is what one would use in
[`automation`](/integrations/automation/) or in [API calls](/developers/).

### Shutdown your local host

This switch will shutdown your system that is hosting Home Assistant.

<div class='note warning'>
This switch will shutdown your host immediately, there will be no confirmation.
</div>

| Field | Entry |
| --- | --- |
| command_off | "/usr/sbin/poweroff" |

### Control your VLC player

This switch will control a local VLC media player
([Source](https://community.home-assistant.io/t/vlc-player/106)).

| Field | Entry |
| --- | --- |
| command_on | "cvlc 1.mp3 vlc://quit &" |
| command_off | "pkill vlc" |

### Control Foscam Motion Sensor

This switch will control the motion sensor of Foscam Webcams which Support CGI
Commands ([Source](https://www.iltucci.com/blog/wp-content/uploads/2018/12/Foscam-IPCamera-CGI-User-Guide-V1.0.4.pdf)).
This switch supports statecmd,
which checks the current state of motion detection.

| Field | Entry |
| --- | --- |
| command_on | 'curl -k "https://ipaddress:443/cgi-bin/CGIProxy.fcgi?cmd=setMotionDetectConfig&isEnable=1&usr=admin&pwd=password"' |
| command_off | 'curl -k "https://ipaddress:443/cgi-bin/CGIProxy.fcgi?cmd=setMotionDetectConfig&isEnable=0&usr=admin&pwd=password"' |
| command_state | 'curl -k --silent "https://ipaddress:443/cgi-bin/CGIProxy.fcgi?cmd=getMotionDetectConfig&usr=admin&pwd=password" | grep -oP "(?<=isEnable>).*?(?=</isEnable>)"' |
| value_template | '{{ value == "1" }}' |

- Replace admin and password with an "Admin" privileged Foscam user
- Replace ipaddress with the local IP address of your Foscam
