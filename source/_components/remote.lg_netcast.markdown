---
layout: page
title: "LG Netcast Remote"
description: "Instructions on how to integrate LG Netcast (Netcast 3.0 & 4.0) remotes into Home Assistant."
date: 2016-11-05 17:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lg.png
ha_category: Remote
ha_iot_class: "Local Push"
ha_release: 0.85
---

The `lg_netcast` remote platform allows you to control the state of your LG Netcast TV, NetCast 3.0 (LG Smart TV models released in 2012) and NetCast 4.0 (LG Smart TV models released in 2013).


```yaml
# Example configuration.yaml entry
remote:
  - platform: lg_netcast
    name: tv_room
    host: 192.168.0.20
```

{% configuration %}
host:
  description: The IP address of the LG Smart TV, e.g., 192.168.0.20.
  required: true
  type: string
access_token:
  description: The access token needed to connect.
  required: false
  type: string
name:
  description: The name you would like to give to the LG Smart TV.
  required: false
  default: LG TV Remote
  type: string
{% endconfiguration %}

To get the access token for your TV configure the `lg_netcast` platform in Home Assistant without the `access_token`.
After starting Home Assistant the TV will display the access token on screen.
Just add the token to your configuration and restart Home Assistant and the media player component for your LG TV will show up.

<p class='note'>
The access token will not change until you factory reset your TV.
</p>

### {% linkable_title Service `remote.turn_off` %}

Turn off device.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Only act on a specific remote, else target all.


### {% linkable_title Service `remote.send_command` %}

Send a single command or a set of commands to one device. You can optionally specify the number of times you wish to repeat the command(s) and delay you want between repeated command(s).

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id`            |      yes | Only act on a specific remote, else target all.
| `command`              |       no | A single command or a list of commands to send.
| `num_repeats`          |      yes | The number of times to repeat the command(s).
| `delay_secs`           |      yes | The number of seconds between sending each command.

A typical service call for sending several button presses looks like this:

```yaml
service: remote.send_command
data:
  entity_id: remote.tv_room
  command:
    - POWER
    - 3
    - 6
  delay_secs: 0.6
```

You can use a string command (POWER, UP, DOWN, etc) or integer ID of the command.
Available commands are :

```python
    POWER = 1
    NUMBER_0 = 2
    NUMBER_1 = 3
    NUMBER_2 = 4
    NUMBER_3 = 5
    NUMBER_4 = 6
    NUMBER_5 = 7
    NUMBER_6 = 8
    NUMBER_7 = 9
    NUMBER_8 = 10
    NUMBER_9 = 11
    UP = 12
    DOWN = 13
    LEFT = 14
    RIGHT = 15
    OK = 20
    HOME_MENU = 21
    BACK = 23
    VOLUME_UP = 24
    VOLUME_DOWN = 25
    MUTE_TOGGLE = 26
    CHANNEL_UP = 27
    CHANNEL_DOWN = 28
    BLUE = 29
    GREEN = 30
    RED = 31
    YELLOW = 32
    PLAY = 33
    PAUSE = 34
    STOP = 35
    FAST_FORWARD = 36
    REWIND = 37
    SKIP_FORWARD = 38
    SKIP_BACKWARD = 39
    RECORD = 40
    RECORDING_LIST = 41
    REPEAT = 42
    LIVE_TV = 43
    EPG = 44
    PROGRAM_INFORMATION = 45
    ASPECT_RATIO = 46
    EXTERNAL_INPUT = 47
    PIP_SECONDARY_VIDEO = 48
    SHOW_SUBTITLE = 49
    PROGRAM_LIST = 50
    TELE_TEXT = 51
    MARK = 52
    VIDEO_3D = 400
    LR_3D = 401
    DASH = 402
    PREVIOUS_CHANNEL = 403
    FAVORITE_CHANNEL = 404
    QUICK_MENU = 405
    TEXT_OPTION = 406
    AUDIO_DESCRIPTION = 407
    ENERGY_SAVING = 409
    AV_MODE = 410
    SIMPLINK = 411
    EXIT = 412
    RESERVATION_PROGRAM_LIST = 413
    PIP_CHANNEL_UP = 414
    PIP_CHANNEL_DOWN = 415
    SWITCH_VIDEO = 416
    APPS = 417
```


