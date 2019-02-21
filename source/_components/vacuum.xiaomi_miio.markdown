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

The `xiaomi_miio` vacuum platform allows you to control the state of your [Xiaomi Mi Robot Vacuum](https://www.mi.com/roomrobot/).

Currently supported services are:

- `start`
- `pause`
- `stop`
- `return_to_base`
- `locate`
- `clean_spot`
- `set_fan_speed`
- remote control of your robot.

## {% linkable_title Configuration %}

Please follow [Retrieving the Access Token](/components/vacuum.xiaomi_miio/#retrieving-the-access-token) to retrieve the API token used in
`configuration.yaml`.

To add a vacuum to your installation, add the following to `configuration.yaml`:

```yaml
vacuum:
  - platform: xiaomi_miio
    host: 192.168.1.2
    token: YOUR_TOKEN
```

{% configuration %}
host:
  description: The IP address of your robot.
  required: true
  type: string
token:
  description: The API token of your robot.
  required: true
  type: string
name:
  description: The name of your robot.
  required: false
  type: string
  default: Xiaomi Vacuum cleaner
{% endconfiguration %}

## {% linkable_title Platform Services %}

In addition to all of the services provided by the `vacuum` component (`start`, `pause`, `stop`, `return_to_base`, `locate`, `set_fan_speed` and `send_command`), the `xiaomi` platform introduces specific services to access the remote control mode of the robot. These are:

- `xiaomi_remote_control_start`
- `xiaomi_remote_control_stop`
- `xiaomi_remote_control_move`
- `xiaomi_remote_control_move_step`

### {% linkable_title Service `vacuum.xiaomi_remote_control_start` %}

Start the remote control mode of the robot. You can then move it with `remote_control_move`; when done, call `remote_control_stop`.

| Service data attribute    | Optional | Description                                       |
|---------------------------|----------|---------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific robot; default targets all |

### {% linkable_title Service `vacuum.xiaomi_remote_control_stop` %}

Exit the remote control mode of the robot.

| Service data attribute    | Optional | Description                                       |
|---------------------------|----------|---------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific robot; default targets all |

### {% linkable_title Service `vacuum.xiaomi_remote_control_move` %}

Remote control the robot. Please ensure you first set it in remote control mode with `remote_control_start`.

| Service data attribute    | Optional | Description                                               |
|---------------------------|----------|-----------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific robot; default targets all         |
| `velocity`                |       no | Speed: between -0.29 and 0.29                             |
| `rotation`                |       no | Rotation: between -179 degrees and 179 degrees            |
| `duration`                |       no | The number of milliseconds that the robot should move for |

### {% linkable_title Service `vacuum.xiaomi_remote_control_move_step` %}

Enter remote control mode, make one move, stop, and exit remote control mode.

| Service data attribute    | Optional | Description                                               |
|---------------------------|----------|-----------------------------------------------------------|
| `entity_id`               |      yes | Only act on a specific robot; default targets all         |
| `velocity`                |       no | Speed: between -0.29 and 0.29                             |
| `rotation`                |       no | Rotation: between -179 degrees and 179 degrees            |
| `duration`                |       no | The number of milliseconds that the robot should move for |

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
As per Version 5.4.49 the Android Mi Home app stores the token readable in the log files. It can easily be retrieved in the folder Smarthome on in the Android device. Just open the text file inside the Smarthome/logs folder and search for the token.
<br/> <br/>
The iPhone app still stores the token in the SQLite db as of v4.10.2 (Dec 22, 2018).
<br/> <br/>
This token (32 hexadecimal characters) is required for the Xiaomi Mi Robot Vacuum, Mi Robot 2 (Roborock) Vacuum, Xiaomi Philips Lights and Xiaomi IR Remote. The Xiaomi Gateway uses another security method and requires a `key` (16 alphanumeric chars), which can be obtained
easily via a hidden menu item at the Mi-Home app or using the `miio` command line tool.
</p>

### {% linkable_title Miio command line tool %}

You can install the command line tool using the following command:

```bash
npm install -g miio
```

Discovering devices on the current network:

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

- `Device ID` - The unique identifier of the device, does not change if the device is reset.
- `Model ID`- The model id if it could be determined, this indicates what type of device it is.
- `Address` - The IP that the device has on the network.
- `Token` - The token of the device or `???` if it could not be automatically determined.

### {% linkable_title Windows and Android %}

To fetch the token follow these instructions depending on your mobile phone platform.

1. Configure the robot with the Mi-Home app.
2. Download and extract the [MiToolKit.zip](https://github.com/ultrara1n/MiToolkit/releases).
3. Enable developer mode and USB debugging on the Android phone and plug it into the computer.
4. Change the MiToolKit language to English if you need to.
5. Click "Extract Token".
6. On the phone, you must confirm the backup. DO NOT enter any password and press the button to make the backup.
7. Once you have confirmed the backup the token extraction will begin, it should appear in the MiToolKit shortly.
8. If you don't get a token, close MiToolKit completely, delete the folder MiToolkit\apps\com.xiaomi.smarthome and relaunch MiToolKit to force recreate a new backup (sometimes the files would not be overwritten before deleting the old ones).

### {% linkable_title Linux and Android (not rooted) %}

Follow the pairing process using your phone and Mi-Home app. You will be able to retrieve the token from an SQLite file inside your phone.

Before you begin you need to install `libffi-dev` and `libssl-dev` by running the command below. This is needed for `python-miio` to be installed correctly.

```bash
sudo apt-get install libffi-dev libssl-dev
```

If your Home Assistant installation is running in a [virtualenv](/docs/installation/virtualenv/#upgrading-home-assistant), make sure you activate it by running the commands below.

```bash
sudo -u homeassistant -H -s
source /srv/homeassistant/bin/activate
```

To fetch the token follow these instructions depending on your mobile phone platform.

1. Configure the robot with the Mi-Home app.
2. Enable developer mode, USB debugging and plug the Android phone into the computer.
3. Get ADB by running `apt-get install android-tools-adb` or `apt-get install adb`.
4. `adb devices` should list your device. Consult the ADB manual if necessary.
5. Issue a backup command via adb: `adb backup -noapk com.xiaomi.smarthome -f backup.ab` (set a password if prompted on your phone). Some devices may require single quotes in the command `adb backup '-noapk com.xiaomi.smarthome -f backup.ab'`.
6. Download the ['ADB Backup Extractor'](https://sourceforge.net/projects/adbextractor/files/latest/download).
7. Extract the data from the backup: (enter the password, if prompted)
   ```bash
   java -jar Android\ Backup\ Utilities/Android\ Backup\ Extractor/android-backup-extractor-20171005-bin/abe.jar unpack backup.ab unpacked.tar
   ```
8. Untar the unpacked data: `tar -xvf unpacked.tar`.
9. The following command returns the token for your Xiaomi vacuum bot:
    ```bash
    sqlite3 apps/com.xiaomi.smarthome/db/miio2.db 'select token from devicerecord where name like "%Vacuum%";'
    ```

### {% linkable_title Linux and Android (rooted!) %}

Follow the pairing process using your phone and Mi-Home app. You will be able to retrieve the token from an SQLite file inside your phone.

Before you begin you need to install `libffi-dev` and `libssl-dev` by running the command below. This is needed for `python-miio` to be installed correctly.

```bash
sudo apt-get install libffi-dev libssl-dev
```

If your Home Assistant installation is running in a [virtualenv](/docs/installation/virtualenv/#upgrading-home-assistant), make sure you activate it by running the commands below.

```bash
sudo -u homeassistant -H -s
source /srv/homeassistant/bin/activate
```

To fetch the token follow these instructions depending on your mobile phone platform.

1. Configure the robot with the Mi-Home app.
2. Enable developer mode, USB debugging and root permission only for ADB on the Android phone and plug it into the computer.
3. Get ADB (e.g, using `apt-get install android-tools-adb`).
4. The command `adb devices` should list your device.
5. The command `adb root` (does work for development builds only: ones with `ro.debuggable=1`).
6. The command `adb shell` (for those using Magisk based root the this command won't work. After entering a shell, type `su` to enter the root shell and try again).
7. The following command returns a list of all registered devices including IP address and token:
    ```bash
    echo "select name,localIP,token from devicerecord;" | sqlite3 /data/data/com.xiaomi.smarthome/databases/miio2.db
    ```

### {% linkable_title iOS %}

1. Configure the robot with the Mi-Home app.
2. Using iTunes, create an unencrypted backup of your iPhone.
3. Install [iBackup Viewer](https://www.imactools.com/iphonebackupviewer/), open it, and open your backup.
4. Open the "Raw Data" module.
5. Navigate to `com.xiaomi.mihome`.
6. Search for a file that looks like this: `123456789_mihome.sqlite` (Note: `_mihome.sqlite` is *not* the correct file).
7. Save this file to your filesystem.
8. Install [DB Browser for SQLite](https://sqlitebrowser.org/).
9. Open DB Browser and load the `.sqlite` file you saved from your backup.
10. Click on the `Execute SQL` tab.
11. Input and run this query:
    ```sql
    SELECT ZTOKEN FROM ZDEVICE WHERE ZMODEL LIKE "%vacuum%"
    ```
12. Copy the returned 32-digit hexadecimal string to your clipboard.
13. Open `Terminal` and execute this command:
    ```bash
    echo '0: <YOUR HEXADECIMAL STRING>' | xxd -r -p | openssl enc -d -aes-128-ecb -nopad -nosalt -K 00000000000000000000000000000000
    ```
14. Use the resulting string as your token.

### {% linkable_title Bluestacks %}

1. Configure the robot with the Mi-Home app.
2. Install [BlueStacks](https://www.bluestacks.com).
3. Set up the Mi-Home app in BlueStacks and login to synchronize devices.
4. Use [BlueStacks Tweaker](https://forum.xda-developers.com/general/general/bluestacks-tweaker-2-tool-modifing-t3622681) to access the filesystem and retrieve the token.

### {% linkable_title Selecting token manually (Windows and Android) %}

The following instruction explained an alternative method, in case the MiToolKit didn't work.

Software Required:

- Android ADB is contained in [Android SDK](https://developer.android.com/studio/releases/platform-tools)
- [Mi-Home version 5.0.30](https://www.apkmirror.com/apk/xiaomi-inc/mihome/mihome-5-0-30-release/)
- [Android Backup Extractor](https://sourceforge.net/projects/adbextractor/)
- [SQLite Browser](https://sqlitebrowser.org/)

Steps to take:

1. Install an old Version of MiHome (e.g. Mi-Home version 5.0.30) on your Android-Device.
2. Open MiHome, log-in and add your devices.
3. Enable USB-Debugging on your Android.
4. Create a backup from your MiHome App, by using adb:
    ```bash
    adb backup com.xiaomi.smarthome
    ```
    Now the backup App opens on you Android-Device. You don't need to set a password, just click save.
5. Extract the backup-file with android-backup-extractor:
    ```bash
    java -jar abe.jar unpack backup.ab backup.tar
    ```
    After that, extract the file with WinRAR, 7-Zip (or similar).
6. Go to `\apps\com.xiaomi.smarthome\db`.
7. Open `miio2.db` with the SQLite Browser.
8. You can find your device tokens in `devicerecord` table.
