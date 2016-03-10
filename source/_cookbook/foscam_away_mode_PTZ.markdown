---
layout: page
title: "Foscam Recording during Away Mode Only using Pan/Tilt/Zoom Control and Motion Detection"
description: "Example of how to set Foscam to only have Motion Detection Recording while no one is home. When users are home the Foscam will indicate it is not recording by pointing down and away from users"
date: 2016-03-10 13:05
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Automation Examples
---
This requires a [Foscam IP Camera](/components/camera.foscam/) camera with PTZ (Pan, Tilt, Zoom) and CGI functionality ([Source](http://www.ipcamcontrol.net/files/Foscam%20IPCamera%20CGI%20User%20Guide-V1.0.4.pdf)) 

Foscam Cameras can be controlled by Home Assistant through a number of CGI commands. 
The following outlines examples of the switch, services, and scripts required to move between 2 preset destinations while controlling motion detection, but many other options of movement are provided in the Foscam CGI User Guide linked above.

The `switch.foscam_motion` will control whether the motion detection is on or off. This switch supports `statecmd`, which checks the current state of motion detection.
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
 ```
 
 The service `shell_command.foscam_turn_off` sets the camera to point down and away to indicate it is not recording, and `shell_command.foscam_turn_on` sets the camera to point where I'd like to record. h of these services require preset points to be added to your camera. See source above for additional information.
 ```yaml
 shell_command:
   #Created a preset point in Foscam Web Interface named Off which essentially points the camera down and away
   foscam_turn_off: 'curl -k "https://ipaddress:443/cgi-bin/CGIProxy.fcgi?cmd=ptzGotoPresetPoint&name=Off&usr=admin&pwd=password"'
   #Created a preset point in Foscam Web Interface named Main which points in the direction I would like to record
   foscam_turn_on: 'curl -k "https://ipaddress:443/cgi-bin/CGIProxy.fcgi?cmd=ptzGotoPresetPoint&name=Main&usr=admin&pwd=password"'
 ```
 The `script.foscam_off` and `script.foscam_on` can be used to set the motion detection appropriately, and then move the camera. These scripts can be called as part of an automation with `device_tracker` triggers to set `home` and `not_home` modes for your Foscam and disable motion detection recording while `home`.
```yaml
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

I'm working on the `automation` component to be used to set when `home` and `not_home`
