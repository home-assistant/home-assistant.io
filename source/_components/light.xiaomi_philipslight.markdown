---
layout: page
title: "Xiaomi Philips Light"
description: "Instructions how to integrate your Xiaomi Philips Lights within Home Assistant."
date: 2017-08-26 08:45
sidebar: true
comments: false
sharing: true
footer: true
logo: philips.png
ha_category: Light
ha_iot_class: "Local Polling"
---

The `xiaomi_philipslight` platform allows you to control the state of your [Xiaomi Philips LED Ball Lamp and Xiaomi Philips LED Ceiling Lamp.

Current supported features are `on`, `off`, `set_cct` (colortemp) , `set_bright` (brightness).

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

To fetch the token follow these instructions depending on your mobile phone platform.

### Windows and Android
1. Configure the light with the Mi-Home app.
2. Enable developer mode and USB debugging on the Android phone and plug it into the computer.
3. Get ADB tool for Windows: https://developer.android.com/studio/releases/platform-tools.html
4. Create a backup of the application com.xiaomi.smarthome:
```bash
.\adb backup -noapk com.xiaomi.smarthome -f backup.ab
```
5. If you have this message: "More than one device or emulator", use this command to list all devices:
```bash
.\adb devices
```
and execute this command:
```bash
.\adb -s DEVICEID backup -noapk com.xiaomi.smarthome -f backup.ab # (with DEVICEID the device id from the previous command)
```
6. On the phone, you must confirm the backup. DO NOT enter any password and press button to make the backup.
7. Get ADB Backup Extractor: https://sourceforge.net/projects/adbextractor/
8. Extract All files from the backup:
```bash
java.exe -jar ../android-backup-extractor/abe.jar unpack backup.ab backup.tar ""
```
9. Unzip the ".tar" file.
10. Open the SQLite DB miio2.db with a tool like SQLite Manager extension for FireFox.
11. Get the token from "devicerecord" table. The token you need is in the column **`token`** and looks like **`123a1234567b12345c1d123456789e12`**.

### Linux and Android (rooted!)

1. Configure the light with the Mi-Home app.
2. Enable developer mode, USB debugging and root permission only for ADB on the Android phone and plug it into the computer.
3. Get ADB f.e. `apt-get install android-tools-adb`
4. `adb devices` should list your device
5. `adb root` (does work for development builds only: ones with ro.debuggable=1)
6. `adb shell`
7. `echo "select name,localIP,token from devicerecord;" | sqlite3 /data/data/com.xiaomi.smarthome/databases/miio2.db` returns a list of all registered devices including ip address and token.

```bash
$ echo "select name,localIP,token from devicerecord;" | sqlite3 /data/data/com.xiaomi.smarthome/databases/miio2.db
Philips connected bulb|192.168.130.67|your-led-ball-token-here
```

### macOS and iOS
1. Setup iOS device with the Mi-Home app.
2. Create an unencrypted backup of the device using iTunes.
3. Install iBackup Viewer from here: http://www.imactools.com/iphonebackupviewer/
4. Extract this file: **`/raw data/com.xiami.mihome/1234567_mihome.sqlite`** to your computer, where _1234567_ is any string of numbers.
5. Open the sqlite DB with a tool like SQLite Manager extension for FireFox, DB Browser, etc. You will then see the list of all the devices in your account with their token. The token you need is in the column **`ZToken`** and looks like **`123a1234567b12345c1d123456789e12`**.

## {% linkable_title Configuration %}

```yaml
# Example configuration.yaml entries
light:
  - platform: xiaomi_philipslight
    name: Xiaomi Philips Smart LED Ball
    host: 192.168.130.67
    token: your-led-ball-token-here
  - platform: xiaomi_philipslight
    name: Xiaomi Philips Smart LED Ceiling Lamp
    host: 192.168.130.68
    token: your-ceiling-lamp-token-here
```

Configuration variables:
- **name** (*Optional*): The name of your light
- **host** (*Required*): The IP of your light
- **token** (*Required*): The token of your light. Go to Getting started section to read more about how to get it.
