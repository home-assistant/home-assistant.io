---
layout: page
title: "Xiaomi Gateway"
description: "Instructions how to integrate your Xiaomi Gateway within Home Assistant."
date: 2017-07-21 16:34
sidebar: true
comments: false
sharing: true
footer: true
logo: xiaomi.png
ha_category: Hub
ha_release: "0.50"
ha_iot_class: "Local Push"
---

The `xiaomi` platform allows you to integrate the following [Xiaomi](http://www.mi.com/en/) devices into Home Assistant.

- Temperature and Humidity Sensor (1st and 2nd generation)
- Motion Sensor (1st and 2nd generation)
- Door and Window Sensor (1st and 2nd generation)
- Button (1st and 2nd generation)
- Plug aka Socket (ZigBee version, reports power consumed, power load, state and if device in use)
- Wall Plug (reports power consumed, power load and state)
- Aqara Wall Switch (Single)
- Aqara Wall Switch (Double)
- Aqara Wall Switch LN (Single)
- Aqara Wall Switch LN (Double)
- Aqara Wireless Switch (Single)
- Aqara Wireless Switch (Double)
- Cube
- Gas Leak Detector (reports alarm and density)
- Smoke Detector (reports alarm and density)
- Gateway (Light, Illumination Sensor, Ringtone play)
- Intelligent Curtain
- Water Leak Sensor
- Battery

What's not available?

- Gateway Radio
- Gateway Button
- Aqara Air Conditioning Companion
- Aqara Intelligent Air Conditioner Controller Hub
- Decoupled mode of the Aqara Wall Switches (Single & Double)
- Additional alarm events of the Gas and Smoke Detector: Analog alarm, battery fault alarm (smoke detector only), sensitivity fault alarm, I2C communication failure

Follow the setup process using your phone and Mi-Home app. From here you will be able to retrieve the key from within the app following [this tutorial](https://community.home-assistant.io/t/beta-xiaomi-gateway-integration/8213/1832)

Please check the instructions in this [section](/xiaomi/#retrieving-the-access-token) to get the API token to use with your platforms.

To enable Xiaomi gateway in your installation, add the following to your `configuration.yaml` file:

### {% linkable_title One Gateway %}

```yaml
# You can leave mac empty if you only have one gateway.
xiaomi:
  gateways:
   - mac:
     key: xxxxxxxxxxxxxxxx
```

### {% linkable_title Multiple Gateways %}

```yaml
# 12 characters mac can be obtained from the gateway.
xiaomi:
  gateways:
    - mac: xxxxxxxxxxxx
      key: xxxxxxxxxxxxxxxx
    - mac: xxxxxxxxxxxx
      key: xxxxxxxxxxxxxxxx
```

### {% linkable_title Search for gateways on specific interface %}

```yaml
# 12 characters MAC can be obtained from the gateway.
xiaomi:
  interface: '192.168.0.1'
  gateways:
    - mac: xxxxxxxxxxxx
      key: xxxxxxxxxxxxxxxx
```

Configuration variables:

- **mac** (*Optional*): The MAC of your gateway. Required if you have more than one.
- **key** (*Optional*): The key of your gateway. Required if you also want to control lights and switches. Sensors and binary sensors will still work.
- **discovery_retry** (*Optional*): Amount of times Home Assitant should try to reconnect to the Xiaomi Gateway. Default is 3.
- **interface** (*Optional*): Which network interface to use. Defaults to any.

## {% linkable_title Services %}

The gateway provides two services: `xiaomi.play_ringtone` and `xiaomi.stop_ringtone`. To play ringtones by Home Assistant, the version of the gateway firmware must be `1.4.1_145` at least. A `ringtone_id` and `gw_mac` must be supplied. The parameter `ringtone_vol` (percent) is optional. Allowed values of the `ringtone_id` are:

- alarm ringtones [0-8]
- doorbell ring [10-13]
- alarm clock [20-29]
- custom ringtones (uploaded by the Mi Home app) starting from 10001

Automation example

```yaml
- alias: Let a dog bark on long press
  trigger:
    platform: event
    event_type: click
    event_data:
      entity_id: binary_sensor.switch_158d000xxxxxc2
      click_type: long_click_press
  action:
    service: xiaomi.play_ringtone
    data:
      gw_mac: xxxxxxxxxxxx
      ringtone_id: 8
      ringtone_vol: 8

- alias: Stop barking immediately on single click
  trigger:
    platform: event
    event_type: click
    event_data:
      entity_id: binary_sensor.switch_158d000xxxxxc2
      click_type: single
  action:
    service: xiaomi.stop_ringtone
    data:
      gw_mac: xxxxxxxxxxxx
```

### {% linkable_title Troubleshooting %}

**Connection problem**

```bash
2017-08-20 16:51:19 ERROR (SyncWorker_0) [homeassistant.components.xiaomi] No gateway discovered
2017-08-20 16:51:20 ERROR (MainThread) [homeassistant.setup] Setup failed for xiaomi: Component failed to initialize.
```

That means that Home Assistant is not getting any response from your Xiaomi gateway. Might be a local network problem or your firewall.
- Make sure you have enabled LAN access: https://community.home-assistant.io/t/beta-xiaomi-gateway-integration/8213/1832
- Turn off the firewall on the system where Home Assistant is running 
- Try to leave the MAC address `mac:` blank. 
- Try to set `discovery_retry: 10`
- Try to disable and then enable LAN access

### {% linkable_title Retrieving the Access Token %}

Follow the pairing process using your phone and Mi-Home app. You will be able to retrieve the token from a SQLite file inside your phone. This token is needed for using various `xiaomi_*` platforms.

Before you begin you need to install `libffi-dev` by running the command below. This is needed for `python-mirobi` to be installed correctly.

```bash
$ sudo apt-get install libffi-dev
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

#### {% linkable_title macOS and iOS %}

1. Setup iOS device with the Mi-Home app.
2. Create an unencrypted backup of the device using iTunes.
3. Install [iBackup Viewer](http://www.imactools.com/iphonebackupviewer/).
4. Extract this file: **`/raw data/com.xiami.mihome/1234567_mihome.sqlite`** to your computer, where `_1234567_` is any string of numbers.
5. Open the SQLite database with a tool like SQLite Manager extension for FireFox or DB Browser. You will then see the list of all the devices in your account with their token. The token you need is in the column **`ZToken`** and looks like **`123a1234567b12345c1d123456789e12`**.
(Location of SQLite files directly on iOS devices **/private/var/mobile/Containers/Data/Application/A80CE9E4-AD2E-4649-8C28-801C96B16BD7/Documents/**)
