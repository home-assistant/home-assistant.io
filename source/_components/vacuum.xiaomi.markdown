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
ha_category: Vacuum
ha_release: 0.51
---

The `xiaomi` vacuum platform allows you to control the state of your [Xiaomi Mi Robot Vacuum](http://www.mi.com/roomrobot/).

Current supported features are `turn_on`, `pause`, `stop`, `return_to_home`, `turn_off` (stops goes to dock), `locate`, `clean_spot`, `set_fanspeed` and even remote control your robot.

## {% linkable_title Getting started %}

Follow the pairing process using your phone and Mi-Home app. From here you will be able to retrieve the token from a SQLite file inside your phone.

Before you begin you need to install `libffi-dev` by running the command below. This is needed for `python-mirobi` to be installed correctly. 

```bash
apt-get install libffi-dev
```

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
4. Extract this file: **`/raw data/com.xiami.mihome/1234567_mihome.sqlite`** to your computer, where _1234567_ is any string of numbers.
5. Open the sqlite DB with a tool like SQLite Manager extension for FireFox, DB Browser, etc. You will then see the list of all the devices in your account with their token. The token you need is in the column **`ZToken`** and looks like **`123a1234567b12345c1d123456789e12`**.

## {% linkable_title Configuration %}

```yaml
# Example configuration.yaml entry
vacuum:
- platform: xiaomi
  name: 'name of the robot'
  host: 192.168.1.2
  token: your-token-here
```

Configuration variables:
- **name** (*Optional*): The name of your robot
- **host** (*Required*): The IP of your robot
- **token** (*Required*): The token of your robot. Go to Getting started section to read more about how to get it

### {% linkable_title Platform services %}

In addition to all [`vacuum` component services](/components/vacuum#component-services) (`turn_on`, `turn_off`, `start_pause`, `stop`, `return_to_home`, `locate`, `set_fanspeed` and `send_command`), the `xiaomi` platform introduces specific services to access the remote control mode of the botvac.

These are: `xiaomi_remote_control_start`, `xiaomi_remote_control_stop`, `xiaomi_remote_control_move` and `xiaomi_remote_control_move_step`.

#### {% linkable_title Service `vacuum/xiaomi_remote_control_start` %}

Start the remote control mode of the vacuum cleaner. You can then move it with `remote_control_move`, when done call `remote_control_stop`.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific botvac. Else targets all.        |

#### {% linkable_title Service `vacuum/xiaomi_remote_control_stop` %}

Exit the remote control mode of the vacuum cleaner.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific botvac. Else targets all.        |

#### {% linkable_title Service `vacuum/xiaomi_remote_control_move` %}

Remote control the vacuum cleaner, make sure you first set it in remote control mode with `remote_control_start`.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific botvac. Else targets all.        |
| `velocity`                |       no | Speed, between -0.29 and 0.29.                        |
| `rotation`                |       no | Rotation, between -179 degrees and 179 degrees.       |
| `duration`                |       no | Parameter affecting the duration of the movement.     |


#### {% linkable_title Service `vacuum/xiaomi_remote_control_move_step` %}

Use this call to enter the remote control mode, make one movement, and stop and exit the remote control mode.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific botvac. Else targets all.        |
| `velocity`                |       no | Speed, between -0.29 and 0.29.                        |
| `rotation`                |       no | Rotation, between -179 degrees and 179 degrees.       |
| `duration`                |       no | Parameter affecting the duration of the movement.     |
