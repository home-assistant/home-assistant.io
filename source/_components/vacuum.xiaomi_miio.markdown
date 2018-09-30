---
layout: page
title: "Xiaomi Mi Robot Vacuum"
description: "Instructions on how to integrate your Xiaomi Mi Robot Vacuum within Home Assistant."
date: 2018-06-03 11:30
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

Currently supported services are:

- `start`
- `pause`
- `stop`
- `return_to_base`
- `locate`
- `clean_spot`
- `set_fan_speed`
- remote control of your robot.

Please follow [Retrieving the Access Token](/components/vacuum.xiaomi_miio/#retrieving-the-access-token) to retrieve the API token used in
`configuration.yaml`.

## {% linkable_title Configuring the Platform %}

To add a vacuum to your installation, add the following to `configuration.yaml`:

```yaml
vacuum:
  - platform: xiaomi_miio
    host: 192.168.1.2
    token: YOUR_TOKEN
```

Configuration variables:

- **host** (*Required*): The IP of your robot.
- **token** (*Required*): The API token of your robot.
- **name** (*Optional*): The name of your robot.

## {% linkable_title Platform Services %}

In addition to all of the services provided by the `vacuum` component (`start`, `pause`, `stop`, `return_to_base`, `locate`, `set_fan_speed` and `send_command`), the `xiaomi` platform introduces specific services to access the remote control mode of the robot. These are:

- `xiaomi_remote_control_start`
- `xiaomi_remote_control_stop`
- `xiaomi_remote_control_move`
- `xiaomi_remote_control_move_step`

### {% linkable_title Service `vacuum.xiaomi_remote_control_start` %}

Start the remote control mode of the robot. You can then move it with `remote_control_move`; when done, call `remote_control_stop`.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific robot; default targets all       |

### {% linkable_title Service `vacuum.xiaomi_remote_control_stop` %}

Exit the remote control mode of the robot.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific robot; default targets all       |

### {% linkable_title Service `vacuum.xiaomi_remote_control_move` %}

Remote control the robot. Please ensure you first set it in remote control mode with `remote_control_start`.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific robot; default targets all       |
| `velocity`                |       no | Speed: between -0.29 and 0.29                         |
| `rotation`                |       no | Rotation: between -179 degrees and 179 degrees        |
| `duration`                |       no | The number of milliseconds that the robot should move for  |

### {% linkable_title Service `vacuum.xiaomi_remote_control_move_step` %}

Enter remote control mode, make one move, stop, and exit remote control mode.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |      yes | Only act on specific robot; default targets all       |
| `velocity`                |       no | Speed: between -0.29 and 0.29.                        |
| `rotation`                |       no | Rotation: between -179 degrees and 179 degrees.       |
| `duration`                |       no | The number of milliseconds that the robot should move for  |

## {% linkable_title Attributes %}

In addition to [all of the attributes provided by the `vacuum` component](/components/vacuum/#attributes),
(`battery_icon`, `cleaned_area`, `fan_speed`, `fan_speed_list`, and `params`), the `xiaomi` platform introduces specific attributes. These are:

- `cleaning_time`
- `do_not_disturb`
- `main_brush_left`
- `side_brush_left`
- `filter_left`
- `cleaning_count`
- `total_cleaned_area`
- `total_cleaning_time`

The following table shows the units of measurement for each attribute:

| Attribute                 | Unit of measurement | Description                                           |
|---------------------------|---------------------|-------------------------------------------------------|
| `do_not_disturb`          |                     | DND mode on / off                                     |
| `cleaning_time`           | minutes             | Last / actual cleaning time in minutes                |
| `cleaned_area`            | square meter        | Last / actual cleaned area in square meters           |
| `main_brush_left`         | hours               | Hours left until a change of the main brush is needed |
| `side_brush_left`         | hours               | Hours left until a change of the side brush is needed |
| `filter_left`             | hours               | Hours left until a change of the filter is needed     |
| `cleaning_count`          |                     | Number of total cleaning cycles                       |
| `total_cleaned_area`      | square meter        | Total cleaned area in square meters                   |
| `total_cleaning_time`     | minutes             | Total cleaning time in minutes                        |

## {% linkable_title Retrieving the Access Token %}

<p class='note'>
As per [python-miio issue 185](https://github.com/rytilahti/python-miio/issues/185) the Android Mi-Home app no longer stores the token within the database (it's retrieved from Xiaomi servers from version 5.0.31+). Currently the only known fix is to uninstall, then install a downgraded version of the apk. Apkmirror is a trusted source for older versions of the app. [Mi-Home version 5.0.0](https://www.apkmirror.com/apk/xiaomi-inc/mihome/mihome-5-0-0-release/) is confirmed as working for the following Android methods.
  
The iPhone app still stores the token in the sqlite db as of v4.7.18 (July 17, 2018).

This token (32 hexadecimal characters) is required for the Xiaomi Mi Robot Vacuum, Mi Robot 2 (Roborock) Vacuum, Xiaomi Philips Lights and Xiaomi IR Remote. The Xiaomi Gateway uses another security method and requires a `key` (16 alphanumeric chars), which can be obtained
easily via a hidden menu item at the Mi-Home app or using the `miio` command line tool.
</p>

#### {% linkable_title Miio command line tool %}

You can install the command line tool with:

```bash
npm install -g miio
```

Discovering devices on current network

```bash
miio discover
```

This will list devices that are connected to the same network as your computer. Let it run for a while so it has a chance to reach all devices, as it might take a minute or two for all devices to answer.

The commands outputs each device on this format:

```text
Device ID: 48765421
Model info: zhimi.airpurifier.m1
Address: 192.168.100.9
Token: token-as-hex-here via auto-token
Support: At least basic
```

The information output is:

- __Device ID__ - the unique identifier of the device, does not change if the device is reset.
- __Model ID__ - the model id if it could be determined, this indicates what type of device it is
- __Address__ - the IP that the device has on the network
- __Token__ - the token of the device or ??? if it could not be automatically determined

#### {% linkable_title Windows and Android %}

To fetch the token follow these instructions depending on your mobile phone platform.

1. Configure the robot with the Mi-Home app.
2. Download and extract the [MiToolKit.zip](https://github.com/ultrara1n/MiToolkit/releases).
3. Enable developer mode and USB debugging on the Android phone and plug it into the computer.
4. Change the MiToolKit language to English if you need to.
5. Click "Extract Token"
6. On the phone, you must confirm the backup. DO NOT enter any password and press the button to make the backup.
7. Once you have confirmed the backup the token extraction will begin, it should appear in the MiToolKit shortly.

#### {% linkable_title Linux and Android (not rooted) %}

Follow the pairing process using your phone and Mi-Home app. You will be able to retrieve the token from a SQLite file inside your phone.

Before you begin you need to install `libffi-dev` and `libssl-dev` by running the command below. This is needed for `python-miio` to be installed correctly.

```bash
sudo apt-get install libffi-dev libssl-dev
```

If your Home Assistant installation is running in a [Virtualenv](/docs/installation/virtualenv/#upgrading-home-assistant), make sure you activate it by running the commands below.

```bash
sudo -u homeassistant -H -s
source /srv/homeassistant/bin/activate
```

To fetch the token follow these instructions depending on your mobile phone platform.

1. Configure the robot with the Mi-Home app.
2. Enable developer mode, USB debugging and plug the Android phone into the computer.
3. Get ADB e.g., `apt-get install android-tools-adb` or `apt-get install adb`
4. `adb devices` should list your device. Consult ADB manual if necessary.
5. Issue a backup command via adb: `adb backup -noapk com.xiaomi.smarthome -f backup.ab` (set a password if prompted on your phone). Some devices may required single quotes in the command `adb backup '-noapk com.xiaomi.smarthome -f backup.ab'`
6. Download the 'ADB Backup Extractor' from [here](https://sourceforge.net/projects/adbextractor/files/latest/download)
7. Extract the data from the backup: `java -jar Android\ Backup\ Utilities/Android\ Backup\ Extractor/android-backup-extractor-20171005-bin/abe.jar unpack backup.ab unpacked.tar` (enter the password, if prompted)
8. Untar the unpacked data: `tar -xvf unpacked.tar`
9. `sqlite3 apps/com.xiaomi.smarthome/db/miio2.db 'select token from devicerecord where name like "%Vacuum%";'` returns the token for your Xiaomi vacuum bot.

#### {% linkable_title Linux and Android (rooted!) %}

Follow the pairing process using your phone and Mi-Home app. You will be able to retrieve the token from a SQLite file inside your phone.

Before you begin you need to install `libffi-dev` and `libssl-dev` by running the command below. This is needed for `python-miio` to be installed correctly.

```bash
sudo apt-get install libffi-dev libssl-dev
```

If your Home Assistant installation is running in a [Virtualenv](/docs/installation/virtualenv/#upgrading-home-assistant), make sure you activate it by running the commands below.

```bash
sudo -u homeassistant -H -s
source /srv/homeassistant/bin/activate
```

To fetch the token follow these instructions depending on your mobile phone platform.

1. Configure the robot with the Mi-Home app.
2. Enable developer mode, USB debugging and root permission only for ADB on the Android phone and plug it into the computer.
3. Get ADB f.e. `apt-get install android-tools-adb`
4. `adb devices` should list your device
5. `adb root` (does work for development builds only: ones with `ro.debuggable=1`)
6. `adb shell` (for those using Magisk based root the previous command won't work. After entering a shell, type `su` to enter the root shell)
7. `echo "select name,localIP,token from devicerecord;" | sqlite3 /data/data/com.xiaomi.smarthome/databases/miio2.db` returns a list of all registered devices including IP address and token.

#### {% linkable_title iOS %}

1. Configure the robot with the Mi-Home app.
2. Using iTunes, create an unencrypted backup of your iPhone.
3. Install [iBackup Viewer](http://www.imactools.com/iphonebackupviewer/), open it, and open your backup.
4. Open the "Raw Data" module.
5. Navigate to `com.xiaomi.mihome`.
6. Search for a file that looks like this: `123456789_mihome.sqlite` – note that `_mihome.sqlite` is *not* the correct file.
7. Save this file to your filesystem.
8. Install [DB Browser for SQLite](http://sqlitebrowser.org/).
9. Open DB Browser and load the `.sqlite` file you saved from your backup.
10. Click on the `Execute SQL` tab.
11. Input and run this query: `SELECT ZTOKEN FROM ZDEVICE WHERE ZMODEL LIKE "%vacuum%"`
12. Copy the returned 32-digit hexadecimal string to your clipboard.
13. Open `Terminal` and execute this command: `echo '0: <YOUR HEXADECIMAL STRING>' | xxd -r -p | openssl enc -d -aes-128-ecb -nopad -nosalt -K 00000000000000000000000000000000`
14. Use the resulting string as your token.
