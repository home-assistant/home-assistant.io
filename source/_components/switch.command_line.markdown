---
layout: page
title: "Command line Switch"
description: "Instructions how to have switches call command line commands."
date: 2015-06-10 22:41
sidebar: true
comments: false
sharing: true
footer: true
logo: command_line.png
ha_category: Switch
ha_release: pre 0.7
ha_iot_class: "Local Polling"
---


The `command_line` switch platform issues specific commands when it is turned on and off. This might very well become our most powerful platform as it allows anyone to integrate any type of switch into Home Assistant that can be controlled from the command line, including calling other scripts!

To enable it, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
switch:
  platform: command_line
  switches:
    kitchen_light:
      command_on: switch_command on kitchen
      command_off: switch_command off kitchen
```

Configuration variables:

- **switches** (*Required*): The array that contains all command switches.
  - **identifier** (*Required*): Name of the command switch as slug. Multiple entries are possible.
    - **command_on** (*Required*): The action to take for on.
    - **command_off** (*Required*): The action to take for off.
    - **command_state** (*Optional*): If given, this command will be run. Returning a result code `0` will indicate that the switch is on.
    - **value_template** (*Optional*): If specified, `command_state` will ignore the result code of the command but the template evaluating to `true` will indicate the switch is on.
    - **friendly_name** (*Optional*): The name used to display the switch in the frontend.

## {% linkable_title Examples %}

In this section you find some real life examples of how to use this switch.

### {% linkable_title aREST device %}

The example below is doing the same as the [aREST switch](/components/switch.arest/). The commandline tool [`curl`](http://curl.haxx.se/) is used to toogle a pin which is controllable through REST.

```yaml
# Example configuration.yaml entry
switch:
  platform: command_line
  switches:
    arest_pin4:
      command_on: "/usr/bin/curl -X GET http://192.168.1.10/digital/4/1"
      command_off: "/usr/bin/curl -X GET http://192.168.1.10/digital/4/0"
      command_state: "/usr/bin/curl -X GET http://192.168.1.10/digital/4"
      value_template: '{% raw %}{{ return_value == "1" }}{% endraw %}'
      friendly_name: aREST Pin 4
```

### {% linkable_title Shutdown your local host %}

This switch will shutdown your system that is hosting Home Assistant.

<p class='note warning'>
This switch will shutdown your host immediately, there will be no confirmation.
</p>


```yaml
# Example configuration.yaml entry
switch:
  platform: command_line
  switches:
    Home Assistant system shutdown:
      command_off: "/usr/sbin/poweroff"
```

### {% linkable_title Control your VLC player %}

This switch will control a local VLC media player ([Source](https://community.home-assistant.io/t/vlc-player/106)). 


```yaml
# Example configuration.yaml entry
switch:
  platform: command_line
  switches:
    VLC:
      command_on: "cvlc 1.mp3 vlc://quit &"
      command_off: "pkill vlc"
```

### {% linkable_title Control Foscam Motion Sensor %}

This switch will control the motion sensor of Foscam Webcams which Support CGI Commands ([Source](http://www.ipcamcontrol.net/files/Foscam%20IPCamera%20CGI%20User%20Guide-V1.0.4.pdf)). This switch supports statecmd, which checks the current state of motion detection.

```yaml
# Example configuration.yaml entry
switch:
  platform: command_line
  switches:
    foscam_motion:
      command_on: 'curl -k "https://ipaddress:443/cgi-bin/CGIProxy.fcgi?cmd=setMotionDetectConfig&isEnable=1&usr=admin&pwd=password"'
      command_off: 'curl -k "https://ipaddress:443/cgi-bin/CGIProxy.fcgi?cmd=setMotionDetectConfig&isEnable=0&usr=admin&pwd=password"'
      command_state: 'curl -k --silent "https://ipaddress:443/cgi-bin/CGIProxy.fcgi?cmd=getMotionDetectConfig&usr=admin&pwd=password" | grep -oP "(?<=isEnable>).*?(?=</isEnable>)"'
      value_template: {% raw %}'{{ value == "1" }}'{% endraw %}
```

- Replace admin and password with an "Admin" privileged Foscam user
- Replace ipaddress with the local IP address of your Foscam
