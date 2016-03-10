---
layout: page
title: "Foscam IP Camera"
description: "Instructions how to integrate Foscam IP cameras within Home Assistant."
date: 2015-09-17 08:01
sidebar: true
comments: false
sharing: true
footer: true
logo: foscam.png
ha_category: Camera
---


The `foscam` platform allows you to watch the live stream of your [Foscam](http://www.foscam.com/) IP camera in Home Assistant.

To enable your Foscam IP camera in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
camera:
  platform: foscam
  ip: 192.168.0.123
  name: Door Camera
  port: 88
  username: USERNAME
  password: PASSWORD
```

Configuration variables:

- **ip** *Required*: The IP address your camera.
- **port** *Optional*: The port that the camera is running on. The default is 88. 
- **name** *Optional*: This parameter allows you to override the name of your camera.
- **username** *Required*: The username for accessing your camera.
- **password** *Required*: The password for accessing your camera.
  - **Note**: There seems to be some issues within Foscam with lengthy passwords and passwords containing certain symbols. Be sure to check your camera's documentation.
 
### {% linkable_title Control Foscam PTZ (Pan/Tilt/Zoom) - Home/Away %}
 Foscam Webcams which support CGI Commands ([Source](http://www.ipcamcontrol.net/files/Foscam%20IPCamera%20CGI%20User%20Guide-V1.0.4.pdf)) can be controlled by Home Assistant. The following outlines examples of the switch, services, and scripts required to move between 2 preset destinations while controlling motion detection, but many other options of movement are provided in the Foscam CGI User Guide linked above.

The switch.foscam_motion will control whether the motion detection is on or off. This switch supports statecmd, which checks the current state of motion detection.

The service shell_command.foscam_turn_off sets the camera to point down and away to indicate it is not recording.
The service shell_command.foscam_turn_on sets the camera to point where I'd like to record.
Both of these services require preset points to be added to your camera. See source above for additional information.

The script.foscam_off and script.foscam_on can be used to set the motion detection appropriately, and then move the camera. These scripts can be called as part of an automation with device_tracker triggers to set home and not_home modes for your Foscam and disable motion detection recording while home.

```yaml
# Replace admin and password with an "Admin" priviledged Foscam user
# Replace ipaddress with the local IP address of your Foscam
switch:
  platform: command_line
  switches:
    #Switch for Foscam Motion Detection
    foscam_motion:
      oncmd: 'curl -k "https://ipaddress:443/cgi-bin/CGIProxy.fcgi?cmd=setMotionDetectConfig&isEnable=1&usr=admin&pwd=password"'
      offcmd: 'curl -k "https://ipaddress:443/cgi-bin/CGIProxy.fcgi?cmd=setMotionDetectConfig&isEnable=0&usr=admin&pwd=password"'
      statecmd: 'curl -k --silent "https://ipaddress:443/cgi-bin/CGIProxy.fcgi?cmd=getMotionDetectConfig&usr=admin&pwd=password" | grep -oP "(?<=isEnable>).*?(?=</isEnable>)"'
      value_template: '{{ value == "1" }}'

shell_command:
  #Created a preset point in Foscam Web Interface named Off which essentially points the camera down and away
  foscam_turn_off: 'curl -k "https://ipaddress:443/cgi-bin/CGIProxy.fcgi?cmd=ptzGotoPresetPoint&name=Off&usr=admin&pwd=password"'
  #Created a preset point in Foscam Web Interface named Main which points in the direction I would like to record
  foscam_turn_on: 'curl -k "https://ipaddress:443/cgi-bin/CGIProxy.fcgi?cmd=ptzGotoPresetPoint&name=Main&usr=admin&pwd=password"'
script:
  foscam_off:
    sequence:
    - execute_service: switch.turn_off
      service_data:
        entity_id: switch.foscam_motion
    - service: shell_command.foscam_turn_off
  foscam_on:
    sequence:
    - execute_service: switch.turn_off
      service_data:
        entity_id: switch.foscam_motion
    - service: shell_command.foscam_turn_on
    - execute_service: switch.turn_on
      service_data:
        entity_id: switch.foscam_motion
```
