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
ha_iot_class: "Local Polling"
---

The `xiaomi miio` vacuum platform allows you to control the state of your [Xiaomi Mi Robot Vacuum](http://www.mi.com/roomrobot/).

Current supported features are `turn_on`, `pause`, `stop`, `return_to_home`, `turn_off` (stops goes to dock), `locate`, `clean_spot`, `set_fanspeed` and even remote control your robot.

Please follow the instructions on [Retrieving the Access Token](/components/vacuum.xiaomi/#retrieving-the-access-token) to get the API token to use in the `configuration.yaml` file.

To add a vacuum to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
vacuum:
  - platform: xiaomi_miio
    host: 192.168.1.2
    token: YOUR_TOKEN
```

Configuration variables:

- **host** (*Required*): The IP of your robot.
- **token** (*Required*): The API token of your robot.
- **name** (*Optional*): The name of your robot.

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

Use this call to enter the remote control mode, make one move, and stop and exit the remote control mode.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific botvac. Else targets all.        |
| `velocity`                |       no | Speed, between -0.29 and 0.29.                        |
| `rotation`                |       no | Rotation, between -179 degrees and 179 degrees.       |
| `duration`                |       no | Parameter affecting the duration of the movement.     |

### {% linkable_title Attributes %}

In addition to all [`vacuum` component attributes] (`battery_icon`, `cleaned_area`, `fan_speed`, `fan_speed_list`, `status`, `params`), the `xiaomi` platform introduces specific attributes to get information of the botvac.

These are: `cleaning_time`, `do_not_disturb`, `main_brush_left`, `side_brush_left`, `filter_left`, `cleaning_count`, `total_cleaned_area` and `total_cleaning_time`.

The following table shows the units of measurement for the single attributes.

| Attribute                 | Unit of measurement | Description                                           |
|---------------------------|---------------------|-------------------------------------------------------|
| `do_not_disturb`          |                     | DND mode on / off                                     |
| `cleaning_time`           | minutes             | Last / actual cleaning time in minutes                | 
| `cleaned_area`            | square meter        | Last / actual cleaned area in square meter            |
| `main_brush_left`         | hours               | Hours left until a change of the main brush is needed |
| `side_brush_left`         | hours               | Hours left until a change of the side brush is needed |
| `filter_left`             | hours               | Hours left until a change of the filter is needed     |
| `cleaning_count`          |                     | Number of total cleaning passage                      |
| `total_cleaned_area`      | square meter        | Total cleaned area in square meter                    |
| `total_cleaning_time`     | minutes             | Total cleaning time in minutes                        |

### {% linkable_title Retrieving the Access Token %}

<p class='note'>
This token (32 hexadecimal characters) is required for the Xiaomi Mi Robot Vacuum and Xiaomi Philips Light. The Xiaomi Gateway uses another security method and requires a `key` (16 alphanumeric chars) which can be obtained easily via a hidden menu item at the Mi-Home app.
</p>

Follow the pairing process using your phone and Mi-Home app. You will be able to retrieve the token from a SQLite file inside your phone.

Before you begin you need to install `libffi-dev` and `libssl-dev` by running the command below. This is needed for `python-mirobo` to be installed correctly.

```bash
$ sudo apt-get install libffi-dev libssl-dev
```

If your Home Assistant installation is running in a [Virtualenv](/docs/installation/virtualenv/#upgrading-home-assistant), make sure you activate it by running the commands below.

```bash
$ sudo su -s /bin/bash homeassistant
$ source /srv/homeassistant/bin/activate
```

To fetch the token follow these instructions depending on your mobile phone platform.

#### {% linkable_title Windows and Android %}

1. Configure the robot with the Mi-Home app.
2. Enable developer mode and USB debugging on the Android phone and plug it into the computer.
3. Get and install the [ADB tool for Windows](https://developer.android.com/studio/releases/platform-tools.html).
4. Create a backup of the application `com.xiaomi.smarthome`:
```bash
$ adb backup -noapk com.xiaomi.smarthome -f backup.ab
```
5. If you have this message: "More than one device or emulator", use this command to list all devices:
```bash
$ adb devices
```
and execute this command:
```bash
$ adb -s DEVICEID backup -noapk com.xiaomi.smarthome -f backup.ab # (with DEVICEID the device id from the previous command)
```
6. On the phone, you must confirm the backup. DO NOT enter any password and press button to make the backup.
7. Get and install [ADB Backup Extractor](https://sourceforge.net/projects/adbextractor/).
8. Extract All files from the backup:
```bash
$ java.exe -jar ../android-backup-extractor/abe.jar unpack backup.ab backup.tar ""
```
9. Unzip the ".tar" file.
10. Open the SQLite database `miio2.db` with a tool like SQLite Manager extension for FireFox.
11. Get the token from "devicerecord" table.

#### {% linkable_title Linux and Android (rooted!) %}

1. Configure the light with the Mi-Home app.
2. Enable developer mode, USB debugging and root permission only for ADB on the Android phone and plug it into the computer.
3. Get ADB f.e. `apt-get install android-tools-adb`
4. `adb devices` should list your device
5. `adb root` (does work for development builds only: ones with `ro.debuggable=1`)
6. `adb shell`
7. `echo "select name,localIP,token from devicerecord;" | sqlite3 /data/data/com.xiaomi.smarthome/databases/miio2.db` returns a list of all registered devices including IP address and token.
