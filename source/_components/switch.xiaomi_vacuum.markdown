---
layout: page
title: "Xiaomi Mi Robot Vacuum"
description: "Instructions how to integrate your Xiaomi Mi Robot Vacuum within Home Assistant."
date: 2017-05-05 18:11
sidebar: true
comments: false
sharing: true
footer: true
logo: xiaomi.png
ha_category: Switch
ha_release: 0.48
---

The `xiaomi_vacuum`switch platform allows you to control the state of your [Xiaomi Mi Robot Vacuum](http://www.mi.com/roomrobot/). 
Current supported features are `start` and `stop` (goes to dock).

{% linkable_title Getting started %}

Follow the pairing process using your phone and Mi-Home app. From here you will be able to retrieve the token from a SQLite file inside your phone.

<p class='note warning'>
If your Home Assistant installation is running in a [Virtualenv](/docs/installation/virtualenv/#upgrading-home-assistant), make sure you activate it by running the commands below.</p>

```bash 
$ sudo su -s /bin/bash homeassistant
$ source /srv/homeassistant/bin/activate
```

In order to fetch the token follow these instructions depending on your mobile phone platform.

### Windows and Android
1. Configure the robot with the Mi-Home app.
2. Enable developer mode and USB debugging on the Android phone and plug it into the computer.
3. Get ADB tool for Windows : https://developer.android.com/studio/releases/platform-tools.html
4. Create a backup of the application com.xiaomi.smarthome:
```bash
.\adb backup -noapk com.xiaomi.smarthome -f backup.ab
```
5. If you have this message : "More than one device or emulator", use this command to list all devices:
```bash
.\adb devices
``` 
and execute this command:
```bash
.\adb -s DEVICEID backup -noapk com.xiaomi.smarthome -f backup.ab # (with DEVICEID the device id from the previous command)
```
6. On the phone, you must confirm the backup. DO NOT enter any password and press button to make the backup.
7. Get ADB Backup Extractor : https://sourceforge.net/projects/adbextractor/
8. Extract All files from the backup:
```bash
java.exe -jar ../android-backup-extractor/abe.jar unpack backup.ab backup.tar ""
```
9. Unzip the ".tar" file.
10. Open the sqlite DB miio2.db with a tool like SQLite Manager extension for FireFox.
11. Get token from "devicerecord" table.


### macOS and iOS
1. Setup iOS device with the Mi-Home app.
2. Create an unencrypted backup of the device using iTunes.
3. Install iBackup Viewer from here: http://www.imactools.com/iphonebackupviewer/
4. Extract this file /raw data/com.xiami.mihome/_mihome.sqlite to your computer
5. Open the file extracted using notepad. You will then see the list of all the device in your account with their token.

{% linkable_title Configuration %}

```yaml
# Example configuration.yaml entry
- platform: xiaomi_vacuum
  name: 'name of the robot'
  host: 192.168.1.2
  token: your-token-here
```

Configuration variables:
- **name** (*Optional*): The name of your robot
- **host** (*Required*): The IP of your robot
- **token** (*Required*): The token of your robot. Go to Getting started section to read more about how to get it

### {% linkable_title Services %}

The switch has a number of services wich allow you to interact with the vacuum. You can set the fan speed and remote control the vacuum. For all the other possibilities you can send a raw command. See the [Python-mirobo](https://github.com/rytilahti/python-mirobo) package for all available commands.

#### Service `xiaomi_vacuum_set_fanspeed`

Set the fan speed of the vacuum. The default settings from the app are:

38 - Quiet
60 - Balanced
77 - Turbo
90 - Full speed

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ----------- |
| `fanspeed` | no | Fanspeed, between 0 and 100. | `60` |

#### Service `xiaomi_vacuum_command`

Send a raw command to the vacuum

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ----------- |
| `command` | no | Command to execute. | `set_dnd_timer` |
| `params` | yes | Parameters for the command. | `[22,0,6,0]` |

### {% linkable_title Remote control %}

You can remote control the vacuum with services. You have 2 options, with `xiaomi_vacuum_remote_control` the vacuum starts remote control, does one move and then stops remote control. If you want more moves you have to first call `xiaomi_vacuum_remote_control_start`, then a number of movements with `xiaomi_vacuum_remote_control_move` and when done `xiaomi_vacuum_remote_control_stop`.

#### Service `xiaomi_vacuum_remote_control_start`

Start remote control mode of the vacuum. You can then move it with `xiaomi_vacuum_move_remote_control`.

#### Service `xiaomi_vacuum_remote_control_move`

Let's the vacuum move in a particular direction.

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ----------- |
| `velocity` | no | Speed, between -0.3 - 0.3, a negative value is backwards. | `0.2` |
| `rotation` | yes | Rotation, between -180 degrees and 180 degrees | `90` |
| `duration` | yes | Not sure where it is used for, defaults to 1500. | `1500` |

#### Service `xiaomi_vacuum_remote_control_stop`

Stop remote control mode of the vacuum.

#### Service `xiaomi_vacuum_remote_control`

Starts remote control mode, makes one move and then stops remote control mode.

| Service data attribute | Optional | Description | Example |
| ---------------------- | -------- | ----------- | ----------- |
| `velocity` | no | Speed, between -0.3 - 0.3, a negative value is backwards. | `0.2` |
| `rotation` | yes | Rotation, between -180 degrees and 180 degrees | `90` |
| `duration` | yes | Not sure where it is used for, defaults to 1500. | `1500` |
