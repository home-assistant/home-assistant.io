---
title: Xiaomi Miio
description: Instructions on how to integrate Xiaomi devices using the Xiaomi Miio integration within Home Assistant.
ha_category:
  - Hub
  - Fan
  - Alarm
  - Presence Detection
  - Remote
  - Health
  - Vacuum
  - Light
ha_iot_class: Local Polling
ha_release: 0.51
ha_codeowners:
  - '@rytilahti'
  - '@syssi'
  - '@starkillerOG'
ha_domain: xiaomi_miio
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - air_quality
  - alarm_control_panel
  - device_tracker
  - fan
  - light
  - remote
  - sensor
  - switch
  - vacuum
---

The `xiaomi_miio` integration supports the following devices:

- [Xiaomi Gateway](#xiaomi-gateway)
- [Xiaomi device tracker (Xiaomi Mi WiFi Repeater 2)](#xiaomi-device-tracker-xiaomi-mi-wifi-repeater-2)
- [Xiaomi Air Purifier and Humidifier](#xiaomi-air-purifier-and-humidifier)
- [Xiaomi Air Quality Index Monitor](#xiaomi-air-quality-index-monitor)
- [Xiaomi Mi Air Quality Monitor](#xiaomi-mi-air-quality-monitor)
- [Xiaomi IR Remote](#xiaomi-ir-remote)
- [Xiaomi Mi Robot Vacuum](#xiaomi-mi-robot-vacuum)
- [Xiaomi Philips Light](#xiaomi-philips-light)
- [Xiaomi Smart WiFi Socket and Smart Power Strip](#xiaomi-smart-wifi-socket-and-smart-power-strip)

For many of these devices you need an access token, the first section will describe how to obtain that access token.

## Retrieving the Access Token

### Xiaomi Cloud Tokens Extractor

One of Home Assistant users wrote a tokens extractor tool, which is currently the easiest way to retrieve tokens for all devices assigned to Xiaomi account.
[In the repository](https://github.com/PiotrMachowski/Xiaomi-cloud-tokens-extractor) there's executable for convenient use on Windows or Python script to be run on any platform. If you do not wish to run executable, then you can run it using the source code:

1. Install requirements:

  ```bash
  pip3 install pycryptodome pybase64 requests
  ```
  
2. Run script

  ```bash
  python3 token_extractor.py
  ```
  
3. Provide e-mail address or username for Xiaomi's account, password and country of the account (most used: CN - China Mainland, DE - Germany etc.)
4. Script will print out all devices connected to the account with their IP address and tokens for use in Home Assistant.

### Xiaomi Home app (Xiaomi Aqara Gateway, Android & iOS)

1. Install the Xiaomi Home app.
2. Sign In/make an account.
3. Make sure you set your region to: Mainland China (Seems to be the longest line with Chinese characters) under settings -> Region (language can later be set on English).
4. Select your Gateway in Xiaomi Home app.
5. Then the 3 dots at the top right of the screen.
6. Then click on about.
7. Tap the version number (Plug-in version 2.77.1 as of January 2020, iOS has a white space instead of version number) at the bottom of the screen repeatedly.
8. You should now see 2 extra options listed in English (iOS still in Chinese), this means you enabled developer mode. [if not, try all steps again!].
9. Android: under "Hub info" there is quite some text in JSON format, this includes the "token" that you need.
iOS: Most options are still in Chinese, you need the fourth item from the top.

Note: If you have multiple devices needing a token, e.g., Xiaomi Mi Robot Vacuum and a Xiaomi IR Remote, the above method may not work. The Xiaomi Home app will display a token, though it isn't the correct one. The alternative method using "Mi Home v5.4.49" will provide the correct token.

### Windows or macOS

If using an Windows or macOS device to retrieve the Access Token use the [Get MiHome devices token](https://github.com/Maxmudjon/Get_MiHome_devices_token) App.

### Alternative methods

<div class='note'>

If using an Android device to retrieve the Access Token only `v5.4.49` of Mi Home is confirmed working (December 2019). Use `v5.4.49` of Mi Home locate a text file under the `Smarthome/logs` folder where the 32 character token is stored. There will likely be several text files in this directory, search all of them for the word 'token' and you should find it there. Be advised that the latest version of Mi Home does not store the token in clear text.
<br/> <br/>
The iPhone app still stores the token in the SQLite db as of `v4.23.4` (Nov 17, 2019).
<br/> <br/>
After resetting the Wi-Fi settings of the Xiaomi robot vacuum, a new Access Token will be generated and therefore these instructions need to be followed again.
<br/> <br/>
These instructions are written for the Mi Home app - not for the new RoboRock app.
<br/> <br/>
This token (32 hexadecimal characters) is required for the Xiaomi Mi Robot Vacuum, Mi Robot 2 (Roborock) Vacuum, Xiaomi Philips Lights and Xiaomi IR Remote.
</div>

### Android (not rooted)

> If using an Android device to retrieve the Access Token only `v5.4.49` of Mi Home is confirmed working (December 2019).

1. To begin, set up your Robovac with the latest version of Mi Home on your primary Android device as you normally would.
2. If your Robovac is already set up, you must reset its WiFi settings for it to get a new token.
3. Using `v5.4.49` of Mi Home locate a text file under the `Smarthome/logs` folder where the 32 character token is stored.
4. There will likely be several text files in this directory, search all of them for the word 'token' and you should find it there. Be advised that the latest version of Mi Home does not store the token in clear text.

### Linux and Rooted Android

1. To begin, set up your Robovac with the latest version of Mi Home on your primary Android device as you normally would.
2. Ensure successful operation using the latest Mi Home app and give the Vacuum a static IP in your router or however you do that on your LAN.
3. Install version `v5.4.54` of Mi Home on your rooted Android device and login (you can't have two version of Mi Home installed at the same time).
4. Ensure you are using the same server every time
5. Ensure successful operation using 5.4.54 (locate is a nice simple test)
6. Using adb we will now extract the token from the rooted phone
7. Use adb shell to connect to your device and become root (if using Magisck root do `adb shell -> su -> whoami` to ensure root access.
8. Then run grep -R '"token"' /data/data/com.xiaomi.smarthome and grab the token

### iOS

1. Configure the robot with the Mi Home app. Make sure to select the correct region, as Xiaomi uses different product names for different geographical areas. Note that the new RoboRock app is currently not supported for this method.
2. Using iTunes, create an unencrypted backup of your iPhone. Since macOS 10.15 there is no iTunes app. Use Finder instead - after connecting your iOS device you should see it in left menu of Finder window.
3. Install [iBackup Viewer](https://www.imactools.com/iphonebackupviewer/), open it, and open your backup.
4. Open the "Raw Data" module.
5. Navigate to `com.xiaomi.mihome`.
6. Search for a file that looks like this: `123456789_mihome.sqlite` (Note: `_mihome.sqlite` is *not* the correct file. Most likely, you will find this file in the `Documents` folder.)
7. Save this file to your filesystem.
8. Install [DB Browser for SQLite](https://sqlitebrowser.org/).
9. Open DB Browser and load the `.sqlite` file you saved from your backup.
10. Click on the `Execute SQL` tab.
11. Input and run this query (use appropriate SELECT query for your device i.e. Vacuum, Powerstrip or Plug):

    ```sql
    -- Execute to retrieve token for Vacuum
    SELECT ZTOKEN FROM ZDEVICE WHERE ZMODEL LIKE "%vacuum%"

    -- Execute to retrieve token for Smart Powerstrip
    SELECT ZTOKEN FROM ZDEVICE WHERE ZMODEL LIKE "%powerstrip%"

    -- Execute to retrieve token for Smart Plug
    SELECT ZTOKEN FROM ZDEVICE WHERE ZMODEL LIKE "%plug%"
    ```

12. Copy the returned 96-digit hexadecimal string to your clipboard.
13. Open `Terminal` and execute this command:

    ```bash
    echo '0: <YOUR HEXADECIMAL STRING>' | xxd -r -p | openssl enc -d -aes-128-ecb -nopad -nosalt -K 00000000000000000000000000000000
    ```

14. Use the resulting 32-digit string as your token. (On your mac in front of the terminal session)

### Bluestacks

1. Configure the robot with the Mi-Home app. Make sure to select the correct region, as Xiaomi uses different product names for different geographical areas. Note that the new RoboRock app is currently not supported for this method.
2. Install [BlueStacks](https://www.bluestacks.com).
3. Set up [Mi Home version 5.4.49](https://www.apkmirror.com/apk/xiaomi-inc/mihome/mihome-5-4-49-release/) in BlueStacks and login to synchronize devices.
4. Open Filemanager in the `More Apps` menu.
5. Use `Explore` on the left and navigate to `sdcard/SmartHome/logs/plug_DeviceManager`.
6. Click on `Export to Windows` in the lower left corner and select any or all files to export to you local disk.
7. Search for `"token":"<yourTokenHere>"`.

### Miio command line tool

Use of Miio should be done before the Vacuum is connected to Mi Home. If you already connected to the app you will need to delete it and then join the ad-hoc Wi-Fi network the Vacuum creates. If the vacuum is already paired it's likely this method will only return `???` as your token.

Discovering devices on the current network:

```bash
npx miio discover
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

### Xiaomi Cloud Tokens Extractor

Alternate method to get all yours devices tokens in one run. Please follow this [instruction](https://github.com/PiotrMachowski/Xiaomi-cloud-tokens-extractor).

## Xiaomi Gateway

The `xiaomi_miio` gateway integration allows you to control the gateway and its connected subdevices.

Please follow the instructions on [Retrieving the Access Token](/integrations/xiaomi_miio/#retrieving-the-access-token) to get the API token to use during configuration flow setup.

### Configuration flow setup

To set up the Xiaomi gateway, click Configuration in the sidebar, then click Integrations and then click the + icon in the lower right and find xiaomi_miio. You will then be presented with a form in which you will need to fill in the "IP address" and 32 characters "token". After you click submit, you will have the opportunity to select the area that your devices are located.

### Supported Xiaomi gateway models:

| Gateway name       | Zigbee id           | model                    | supported                                 |
| ------------------ | ------------------- | ------------------------ |------------------------------------------ |
| Chinese version    | lumi.gateway.v3     | DGNWG02LM                | yes                                       |
| European version   | lumi.gateway.mieu01 | ZHWG11LM-763 / DGNWQ05LM | only gateway features (no subdevices yet) |
| Aqara hub          | lumi.gateway.aqhm01 | ZHWG11LM                 | untested                                  |
| Mijia Zigbee 3.0   | lumi.gateway.mgl03  | ZNDMWG03LM               | untested                                  |
| Aqara AC Companion | lumi.acpartner.v1   | KTBL01LM                 | untested                                  |
| Mi AC Companion    | lumi.acpartner.v2   | KTBL02LM                 | untested                                  |
| Aqara AC Companion | lumi.acpartner.v3   | KTBL11LM                 | yes                                       |

### Gateway Features

- Gateway alarm control (Turn on/off; see status `armed_away`, `disarmed`, `arming`)
- Gateway light control (Turn on/off; change brightness; change color; see status)
- Gateway illuminance sensor readout (illuminance value in lux)

Not yet implemented features (but possible):

- Gateway internet radio (only chinese stations)
- Gateway ringtones/sounds

### Supported subdevices

These subdevices are fully implemented in HomeAssistant:

| Subdevice name                   | Zigbee id               | model           | features                                         |
| -------------------------------- | ----------------------- | --------------- | ------------------------------------------------ |
| Weather sensor                   | lumi.sensor_ht          | WSDCGQ01LM      | readout `temperature` and `humidity`             |
| Weather sensor                   | lumi.weather.v1         | WSDCGQ11LM      | readout `temperature`, `humidity` and `pressure` |

### Recognized subdevices (not yet implemented)

These subdevices are recognized by the python-miio code but are still being worked on (not yet implemented).

| Subdevice name                   | Zigbee id               | model           |
| -------------------------------- | ----------------------- | --------------- |
| Button                           | lumi.sensor_switch      | WXKG01LM        |
| Button                           | lumi.sensor_switch.aq2  | WXKG11LM 2015   |
| Button                           | lumi.sensor_switch.aq3  | WXKG12LM        |
| Button                           | lumi.remote.b1acn01     | WXKG11LM 2018   |
| Cube                             | lumi.sensor_cube.v1     | MFKZQ01LM       |
| Cube                             | lumi.sensor_cube.aqgl01 | MFKZQ01LM       |
| Motion sensor                    | lumi.sensor_motion      | RTCGQ01LM       |
| Motion sensor                    | lumi.sensor_motion.aq2  | RTCGQ11LM       |
| Door sensor                      | lumi.sensor_magnet      | MCCGQ01LM       |
| Door sensor                      | lumi.sensor_magnet.aq2  | MCCGQ11LM       |
| Vibration sensor                 | lumi.vibration.aq1      | DJT11LM         |
| Honeywell smoke detector         | lumi.sensor_smoke       | JTYJ-GD-01LM/BW |
| Honeywell natural gas detector   | lumi.sensor_natgas      | JTQJ-BF-01LM/BW |
| Water leak sensor                | lumi.sensor_wleak.aq1   | SJCGQ11LM       |
| Remote switch single             | lumi.sensor_86sw1.v1    | WXKG03LM 2016   |
| Remote switch single             | lumi.remote.b186acn01   | WXKG03LM 2018   |
| D1 remote switch single          | lumi.remote.b186acn02   | WXKG06LM        |
| Remote switch double             | lumi.sensor_86sw2.v1    | WXKG02LM 2016   |
| Remote switch double             | lumi.remote.b286acn01   | WXKG02LM 2018   |
| D1 remote switch double          | lumi.remote.b286acn02   | WXKG07LM        |
| Wall switch single               | lumi.ctrl_ln1           | QBKG11LM        |
| Wall switch single               | lumi.ctrl_ln1.aq1       | QBKG11LM        |
| Wall switch no neutral           | lumi.ctrl_neutral1.v1   | QBKG04LM        |
| Wall switch double               | lumi.ctrl_ln2           | QBKG12LM        |
| Wall switch double               | lumi.ctrl_ln2.aq1       | QBKG12LM        |
| Wall switch double no neutral    | lumi.ctrl_neutral2      | QBKG03LM        |
| D1 wall switch triple            | lumi.switch.n3acn3      | QBKG26LM        |
| D1 wall switch triple no neutral | lumi.switch.l3acn3      | QBKG25LM        |
| Wall outlet                      | lumi.ctrl_86plug.v1     | QBCZ11LM        |
| Wall outlet                      | lumi.ctrl_86plug.aq1    | QBCZ11LM        |
| Plug                             | lumi.plug               | ZNCZ02LM        |
| Relay                            | lumi.relay.c2acn01      | LLKZMK11LM      |
| Curtain                          | lumi.curtain            | ZNCLDJ11LM      |
| Curtain                          | lumi.curtain.aq2        | ZNGZDJ11LM      |
| Curtain B1                       | lumi.curtain.hagl04     | ZNCLDJ12LM      |
| Door lock S1                     | lumi.lock.aq1           | ZNMS11LM        |
| Door lock S2                     | lumi.lock.acn02         | ZNMS12LM        |
| Door lock S2 pro                 | lumi.lock.acn03         | ZNMS13LM        |
| Vima cylinder lock               | lumi.lock.v1            | A6121           |
| Smart bulb E27                   | lumi.light.aqcn02       | ZNLDP12LM       |
| IKEA smart bulb E27 white        | ikea.light.led1545g12   | LED1545G12      |
| IKEA smart bulb E27 white        | ikea.light.led1546g12   | LED1546G12      |
| IKEA smart bulb E12 white        | ikea.light.led1536g5    | LED1536G5       |
| IKEA smart bulb GU10 white       | ikea.light.led1537r6    | LED1537R6       |
| IKEA smart bulb E27 white        | ikea.light.led1623g12   | LED1623G12      |
| IKEA smart bulb GU10 white       | ikea.light.led1650r5    | LED1650R5       |
| IKEA smart bulb E12 white        | ikea.light.led1649c5    | LED1649C5       |
| Thermostat S2                    | lumi.airrtc.tcpecn02    | KTWKQ03ES       |

## Xiaomi device tracker (Xiaomi Mi WiFi Repeater 2)

The `xiaomi_miio` device tracker platform is observing your Xiaomi Mi WiFi Repeater 2 and reporting all associated WiFi clients.

Please follow the instructions on [Retrieving the Access Token](/integrations/xiaomi_miio/#retrieving-the-access-token) to get the API token.

To add a Xiaomi Mi WiFi Repeater device tracker to your installation, add the following to your `configuration.yaml` file:

```yaml
device_tracker:
  - platform: xiaomi_miio
    host: 192.168.130.73
    token: YOUR_TOKEN
```

{% configuration %}
host:
  description: The IP address of your miio device.
  required: true
  type: string
token:
  description: The API token of your miio device.
  required: true
  type: string
{% endconfiguration %}

## Xiaomi Air Purifier and Humidifier

The `xiaomi_miio` fan platform allows you to control the Xiaomi Air Purifier, Air Humidifier and Air Fresh.

Supported devices:

| Name                   | Model                  | Model no. |
| ---------------------- | ---------------------- | --------- |
| Air Purifier           | zhimi.airpurifier.v1   | |
| Air Purifier 2         | zhimi.airpurifier.v2   | FJY4006CN |
| Air Purifier V3        | zhimi.airpurifier.v3   | |
| Air Purifier V5        | zhimi.airpurifier.v5   | |
| Air Purifier Pro       | zhimi.airpurifier.v6   | |
| Air Purifier Pro V7    | zhimi.airpurifier.v7   | |
| Air Purifier 2 (mini)  | zhimi.airpurifier.m1   | |
| Air Purifier (mini)    | zhimi.airpurifier.m2   | |
| Air Purifier MA1       | zhimi.airpurifier.ma1  | |
| Air Purifier MA2       | zhimi.airpurifier.ma2  | |
| Air Purifier 2S        | zhimi.airpurifier.mc1  | |
| Air Purifier Super     | zhimi.airpurifier.sa1  | |
| Air Purifier Super 2   | zhimi.airpurifier.sa2  | |
| Air Purifier 3 (2019)  | zhimi.airpurifier.ma4  | |
| Air Purifier 3H (2019) | zhimi.airpurifier.mb3  | |
| Air Humidifier         | zhimi.humidifier.v1    | |
| Air Humidifier CA1     | zhimi.humidifier.ca1   | |
| Air Humidifier CA4     | zhimi.humidifier.ca4   | |
| Air Humidifier CB1     | zhimi.humidifier.cb1   | |
| Air Fresh VA2          | zhimi.airfresh.va2     | |

### Features

### Air Purifier 2 et al.

- Power (on, off)
- Operation modes (auto, silent, favorite, idle)
- Buzzer (on, off)
- Child lock (on, off)
- LED (on, off), LED brightness (bright, dim, off)
- Favorite Level (0...16)
- Attributes
  - `model`
  - `temperature`
  - `humidity`
  - `aqi`
  - `mode`
  - `filter_hours_used`
  - `filter_life_remaining`
  - `favorite_level`
  - `child_lock`
  - `led`
  - `motor_speed`
  - `average_aqi`
  - `purify_volume`
  - `learn_mode`
  - `sleep_time`
  - `sleep_mode_learn_count`
  - `extra_features`
  - `turbo_mode_supported`
  - `auto_detect`
  - `use_time`
  - `button_pressed`
  - `buzzer`
  - `led_brightness`
  - `sleep_mode`

### Air Purifier Pro (zhimi.airpurifier.v6)

- Power (on, off)
- Operation modes (auto, silent, favorite)
- Child lock (on, off)
- LED (on, off)
- Favorite Level (0...16)
- Attributes
  - `model`
  - `temperature`
  - `humidity`
  - `aqi`
  - `mode`
  - `filter_hours_used`
  - `filter_life_remaining`
  - `favorite_level`
  - `child_lock`
  - `led`
  - `motor_speed`
  - `average_aqi`
  - `purify_volume`
  - `learn_mode`
  - `sleep_time`
  - `sleep_mode_learn_count`
  - `extra_features`
  - `turbo_mode_supported`
  - `auto_detect`
  - `use_time`
  - `button_pressed`
  - `filter_rfid_product_id`
  - `filter_rfid_tag`
  - `filter_type`
  - `illuminance`
  - `motor2_speed`
  - `volume`

### Air Purifier Pro V7 (zhimi.airpurifier.v7)

- Power (on, off)
- Operation modes (auto, silent, favorite)
- Child lock (on, off)
- LED (on, off)
- Favorite Level (0...16)
- Attributes
  - `model`
  - `temperature`
  - `humidity`
  - `aqi`
  - `mode`
  - `filter_hours_used`
  - `filter_life_remaining`
  - `favorite_level`
  - `child_lock`
  - `led`
  - `motor_speed`
  - `average_aqi`
  - `learn_mode`
  - `extra_features`
  - `turbo_mode_supported`
  - `button_pressed`
  - `filter_rfid_product_id`
  - `filter_rfid_tag`
  - `filter_type`
  - `illuminance`
  - `motor2_speed`
  - `volume`

### Air Purifier 2S (zhimi.airpurifier.mc1)

- Power (on, off)
- Operation modes (auto, silent, favorite)
- Buzzer (on, off)
- Child lock (on, off)
- LED (on, off)
- Favorite Level (0...16)
- Attributes
  - `model`
  - `temperature`
  - `humidity`
  - `aqi`
  - `mode`
  - `filter_hours_used`
  - `filter_life_remaining`
  - `favorite_level`
  - `child_lock`
  - `led`
  - `motor_speed`
  - `average_aqi`
  - `learn_mode`
  - `extra_features`
  - `turbo_mode_supported`
  - `button_pressed`
  - `filter_rfid_product_id`
  - `filter_rfid_tag`
  - `filter_type`
  - `illuminance`
  - `buzzer`

### Air Purifier 3/3H (2019) (zhimi.airpurifier.ma4/zhimi.airpurifier.mb3)

This model uses newer MiOT communication protocol.

- Power (on, off)
- Operation modes (auto, silent, favorite, fan)
- Buzzer (on, off)
- Child lock (on, off)
- LED (on, off)
- Favorite Level (0...16)
- Fan Level (1...3)
- Attributes
  - `model`
  - `temperature`
  - `humidity`
  - `aqi`
  - `mode`
  - `filter_hours_used`
  - `filter_life_remaining`
  - `favorite_level`
  - `child_lock`
  - `led`
  - `motor_speed`
  - `average_aqi`
  - `purify_volume`
  - `use_time`
  - `buzzer`
  - `led_brightness`
  - `filter_rfid_product_id`
  - `filter_rfid_tag`
  - `filter_type`
  - `fan_level`

### Air Purifier V3 (zhimi.airpurifier.v3)

- Power (on, off)
- Operation modes (auto, silent, favorite, idle, medium, high, strong)
- Child lock (on, off)
- LED (on, off)
- Attributes
  - `model`
  - `aqi`
  - `mode`
  - `led`
  - `buzzer`
  - `child_lock`
  - `illuminance`
  - `filter_hours_used`
  - `filter_life_remaining`
  - `motor_speed`
  - `average_aqi`
  - `volume`
  - `motor2_speed`
  - `filter_rfid_product_id`
  - `filter_rfid_tag`
  - `filter_type`
  - `purify_volume`
  - `learn_mode`
  - `sleep_time`
  - `sleep_mode_learn_count`
  - `extra_features`
  - `auto_detect`
  - `use_time`
  - `button_pressed`

### Air Humidifier (zhimi.humidifier.v1)

- On, Off
- Operation modes (silent, medium, high, strong)
- Buzzer (on, off)
- Child lock (on, off)
- LED (on, off), LED brightness (bright, dim, off)
- Target humidity (30, 40, 50, 60, 70, 80)
- Attributes
  - `model`
  - `temperature`
  - `humidity`
  - `mode`
  - `buzzer`
  - `child_lock`
  - `trans_level`
  - `target_humidity`
  - `led_brightness`
  - `button_pressed`
  - `use_time`
  - `hardware_version`

### Air Humidifier CA (zhimi.humidifier.ca1)

- On, Off
- Operation modes (silent, medium, high, auto)
- Buzzer (on, off)
- Child lock (on, off)
- LED (on, off), LED brightness (bright, dim, off)
- Target humidity (30, 40, 50, 60, 70, 80)
- Dry mode (on, off)
- Attributes
  - `model`
  - `temperature`
  - `humidity`
  - `mode`
  - `buzzer`
  - `child_lock`
  - `trans_level`
  - `target_humidity`
  - `led_brightness`
  - `button_pressed`
  - `use_time`
  - `hardware_version`
  - `motor_speed`
  - `depth`
  - `dry`

### Air Humidifier CA (zhimi.humidifier.ca4)

- On, Off
- Operation modes (auto, low, medium, high)
- Buzzer (on, off)
- Child lock (on, off)
- LED brightness (off, dim, bright)
- Target humidity (30 - 80)
- Dry mode (on, off)
- Motor speed rpm (200 - 2000)
- Attributes
  - `model`
  - `temperature`
  - `humidity`
  - `mode`
  - `buzzer`
  - `child_lock`
  - `target_humidity`
  - `led_brightness`
  - `use_time`
  - `actual_speed`
  - `button_pressed`
  - `dry`
  - `fahrenheit`
  - `motor_speed`
  - `power_time`
  - `water_level`

### Air Humidifier CB (zhimi.humidifier.cb1)

- On, Off
- Operation modes (silent, medium, high, auto)
- Buzzer (on, off)
- Child lock (on, off)
- LED (on, off), LED brightness (bright, dim, off)
- Target humidity (30, 40, 50, 60, 70, 80)
- Dry mode (on, off)
- Attributes
  - `speed`
  - `speed_list`
  - `model`
  - `temperature`
  - `humidity`
  - `mode`
  - `buzzer`
  - `child_lock`
  - `target_humidity`
  - `led_brightness`
  - `use_time`
  - `hardware_version`
  - `motor_speed`
  - `depth`
  - `dry`
  - `supported_features`

### Air Fresh VA2

- Power (on, off)
- Operation modes (auto, silent, interval, low, middle, strong)
- Buzzer (on, off)
- Child lock (on, off)
- LED (on, off), LED brightness (bright, dim, off)
- Attributes
  - `model`
  - `aqi`
  - `average_aqi`
  - `temperature`
  - `humidity`
  - `co2`
  - `mode`
  - `led`
  - `led_brightness`
  - `buzzer`
  - `child_lock`
  - `filter_life_remaining`
  - `filter_hours_used`
  - `use_time`
  - `motor_speed`
  - `extra_features`

Please follow the instructions on [Retrieving the Access Token](/integrations/xiaomi_miio/#retrieving-the-access-token) to get the API token to use in the `configuration.yaml` file.

To add a Xiaomi Air Purifier to your installation, add the following to your `configuration.yaml` file:

```yaml
fan:
# Example configuration.yaml entry
  - platform: xiaomi_miio
    host: 192.168.130.66
    token: YOUR_TOKEN
```

{% configuration %}
host:
  description: The IP address of your miio fan.
  required: true
  type: string
token:
  description: The API token of your miio fan.
  required: true
  type: string
name:
  description: The name of your miio fan.
  required: false
  type: string
  default: Xiaomi Air Purifier
model:
  description: The model of your miio fan. See the table above for valid values (f.e. `zhimi.airpurifier.v2`). This setting can be used to bypass the device model detection and is recommended if your device isn't always available.
  required: false
  type: string
{% endconfiguration %}

### Platform Services

### Service `fan.set_speed`

Set the fan speed/operation mode.

| Service data attribute    | Optional | Description                                                         |
|---------------------------|----------|---------------------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.                      |
| `speed`                   |       no | Fan speed. Valid values are 'Auto', 'Silent', 'Favorite' and 'Idle' |

### Service `xiaomi_miio.fan_set_buzzer_on` (Air Purifier Pro excluded)

Turn the buzzer on.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |

### Service `xiaomi_miio.fan_set_buzzer_off` (Air Purifier Pro excluded)

Turn the buzzer off.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |

### Service `xiaomi_miio.fan_set_led_on` (Air Purifiers only)

Turn the LED on.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |

### Service `xiaomi_miio.fan_set_led_off` (Air Purifiers only)

Turn the LED off.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |

### Service `xiaomi_miio.fan_set_child_lock_on`

Turn the child lock on.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |

### Service `xiaomi_miio.fan_set_child_lock_off`

Turn the child lock off.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |

### Service `xiaomi_miio.fan_set_led_brightness` (Air Purifier 2S and Air Purifier Pro excluded)

Set the LED brightness. Supported values are 0 (Bright), 1 (Dim), 2 (Off).

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |
| `brightness`              |       no | Brightness, between 0 and 2.                            |

### Service `xiaomi_miio.fan_set_favorite_level` (Air Purifiers only)

Set the favorite level of the operation mode "favorite".

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |
| `level`                   |       no | Level, between 0 and 16.                                |

### Service `xiaomi_miio.fan_set_fan_level` (Air Purifiers only)

Set the fan level for "fan" operation mode.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi MiOT fan entity.          |
| `level`                   |       no | Level, between 1 and 3.                                 |

### Service `xiaomi_miio.fan_set_auto_detect_on` (Air Purifier 2S and Air Purifier Pro only)

Turn the auto detect on.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |

### Service `xiaomi_miio.fan_set_auto_detect_off` (Air Purifier 2S and Air Purifier Pro only)

Turn the auto detect off.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |

### Service `xiaomi_miio.fan_set_learn_mode_on` (Air Purifier 2 only)

Turn the learn mode on.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |

### Service `xiaomi_miio.fan_set_learn_mode_off` (Air Purifier 2 only)

Turn the learn mode off.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |

### Service `xiaomi_miio.fan_set_volume` (Air Purifier Pro only)

Set the sound volume.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |
| `volume`                  |       no | Volume, between 0 and 100.                              |

### Service `xiaomi_miio.fan_reset_filter` (Air Purifier 2 only)

Reset the filter lifetime and usage.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |

### Service `xiaomi_miio.fan_set_extra_features` (Air Purifier only)

Set the extra features.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |
| `features`                |       no | Integer, known values are 0 and 1.                      |

### Service `xiaomi_miio.fan_set_target_humidity` (Air Humidifier only)

Set the target humidity.

| Service data attribute    | Optional | Description                                                     |
|---------------------------|----------|-----------------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.                  |
| `humidity`                |       no | Target humidity. Allowed values are 30, 40, 50, 60, 70 and 80   |

### Service `fan.xiaomi_miio_set_dry_on` (Air Humidifier CA and CB)

Turn the dry mode on.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |

### Service `fan.xiaomi_miio_set_dry_off` (Air Humidifier CA and CB)

Turn the dry mode off.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.          |

### Service `xiaomi_miio.fan_set_motor_speed` (Air Humidifier CA4)

Set motor speed RPM.

| Service data attribute    | Optional | Description                                              |
|---------------------------|----------|----------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO fan entity.           |
| `motor_speed`             |       no | Motor speed RPM. Allowed values are between 200 and 2000 |

### Troubleshooting `Unable to find device` error messages

Check if the device is in the same subnet as the Home Assistant instance. Otherwise, you should configure your router/firewall to put this device in the same VLAN as the Home Assistant instance.

If it's not possible to use VLANs for some reason, your last resort may be using NAT translation, between the IPs.

## Xiaomi Air Quality Index Monitor

The `xiaomi_miio` sensor platform is observing your Xiaomi Mi Air Quality Monitor (PM2.5) and reporting the air quality index.

Currently, the supported features are:

- Air Quality Index (AQI)
- Attributes
  - power
  - charging
  - battery
  - time_stat

Please follow the instructions on [Retrieving the Access Token](/integrations/xiaomi_miio/#retrieving-the-access-token) to get the API token.

### Configuration

To add a Xiaomi Mi Air Quality Monitor to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: xiaomi_miio
    host: IP_ADDRESS
    token: YOUR_TOKEN
```

{% configuration %}
host:
  description: The IP address of your miio device.
  required: true
  type: string
token:
  description: The API token of your miio device.
  required: true
  type: string
name:
  description: The name of your miio device.
  required: false
  type: string
  default: Xiaomi Miio Sensor
{% endconfiguration %}

## Xiaomi Mi Air Quality Monitor

The `xiaomi_miio` sensor platform is observing your Xiaomi Mi Air Quality Monitor and reporting the air quality values.

Currently, the supported features are:

- Particulate matter 2.5
- Attributes
  - carbon_dioxide_equivalent
  - total_volatile_organic_compounds
  - temperature
  - humidity

Please follow the instructions on [Retrieving the Access Token](/integrations/xiaomi_miio/#retrieving-the-access-token) to get the API token.

### Configuration

To add a Xiaomi Mi Air Quality Monitor to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
air_quality:
  - platform: xiaomi_miio
    host: IP_ADDRESS
    token: YOUR_TOKEN
```

{% configuration %}
host:
  description: The IP address of your miio device.
  required: true
  type: string
token:
  description: The API token of your miio device.
  required: true
  type: string
name:
  description: The name of your miio device.
  required: false
  type: string
  default: Xiaomi Miio Air Quality Monitor
{% endconfiguration %}

## Xiaomi IR Remote

The `xiaomi miio` remote platform allows you to send IR commands from your Xiaomi IR Remote (ChuangmiIr).

### Setup

Please follow the instructions on [Retrieving the Access Token](/integrations/xiaomi_miio/#retrieving-the-access-token) to get the API token to use in the `configuration.yaml` file.

### Configuring the Platform

To add a Xiaomi IR Remote to your installation, add the following to your `configuration.yaml` file:

```yaml
remote:
  - platform: xiaomi_miio
    host: 192.168.42.42
    token: YOUR_TOKEN
```

{% configuration %}
host:
  description: The IP of your remote.
  required: true
  type: string
token:
  description: The API token of your remote.
  required: true
  type: string
name:
  description: The name of your remote.
  required: false
  type: string
slot:
  description: The slot used to save learned command.
  required: false
  type: integer
  default: 1
timeout:
  description: Timeout for learning a new command.
  required: false
  type: integer
  default: 30
commands:
  description: A list of commands
  required: false
  type: map
  keys:
    command:
      description: A list of commands as [raw (learned command)](/integrations/xiaomi_miio/#raw) or [pronto hex code](/integrations/xiaomi_miio/#pronto-hex-code).
      required: true
      type: list
{% endconfiguration %}

### Full Configuration

```yaml
remote:
  - platform: xiaomi_miio
    name: "bathroom remote"
    host: 192.168.42.42
    token: YOUR_TOKEN
    slot: 1
    timeout: 30
    commands:
      activate_towel_heater:
        command:
          - raw:base64:[optional_frequency]
      read_bad_poem:
        command:
          - raw:base64:[optional_frequency]
          - pronto:pronto_hex:[optional_repeat]
```

### Add command as entity button in Lovelace UI

```yaml
type: entity-button
tap_action:
  action: call-service
  service: remote.send_command
  service_data:
    command: activate_towel_heater
    entity_id: remote.xiaomi_miio_ir
hold_action:
  action: more-info
show_icon: true
show_name: true
entity: remote.xiaomi_miio_ir
icon: 'mdi:radiator'
name: Activate Towel Heater
```

### Use named commands to create UI buttons

```yaml
script:
  towel_heater:
    sequence:
      - service: remote.send_command
        target:
          entity_id: "remote.bathroom_remote"
        data:
          command:
            - 'activate_towel_heater'
  please_cover_your_ears:
    sequence:
      - service: remote.send_command
        target:
          entity_id: "remote.bathroom_remote"
        data:
          command:
            - 'read_bad_poem'
```

### Command Types

The Xiaomi IR Remote Platform currently supports two different formats for IR codes.

### Raw

A raw command is a command learned from [`xiaomi_miio.remote_learn_command`](/integrations/xiaomi_miio/#xiaomi_miioremote_learn_command).

A raw command is defined as in the following example:

```bash
raw:Z6UFANEAAAAjAQAAAwkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQIAE=
```

with an optional last parameter of frequency:

```bash
raw:Z6UFANEAAAAjAQAAAwkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQIAE=:38400
```

### Pronto Hex Code

A pronto hex code is a hex code often supplied by the device manufacturer.

A pronto hex code is defined as in the following example:

```bash
pronto:0000 006C 0022 0002 015B 00AD 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0016 0016 0016 0016 0041 0016 0016 0016 0041 0016 0016 0016 0016 0016 0016 0016 0016 0016 0041 0016 0016 0016 0041 0016 0016 0016 0041 0016 0041 0016 0041 0016 0041 0016 0623 015B 0057 0016 0E6E
```

with an optional last parameter of repeats (required by some devices):

```bash
pronto:0000 006C 0022 0002 015B 00AD 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0041 0016 0016 0016 0016 0016 0041 0016 0016 0016 0041 0016 0016 0016 0016 0016 0016 0016 0016 0016 0041 0016 0016 0016 0041 0016 0016 0016 0041 0016 0041 0016 0041 0016 0041 0016 0623 015B 0057 0016 0E6E:2
```

Note there are at least 4 versions of the Xiaomi IR Remote (ChuangmiIr) which can be recognized by their default hostname:

- `chuangmi.ir.v2`
- `chuangmi.remote.h102a03`
- `chuangmi.remote.v2`
- `chuangmi.remote.h102c01`

For now, pronto hex codes only work on the first version (`chuangmi.ir.v2`).

### Platform Services

The Xiaomi IR Remote Platform registers four services.

### `remote.send_command`

Allows sending either named commands using an identifier or sending commands as one of the two types defined in [Command Types](/integrations/xiaomi_miio/#command-types).

### `xiaomi_miio.remote_learn_command`

Used to learn new commands.

Use the entity_id of the Xiaomi IR Remote to start a learning process.

`slot` and `timeout` can be specified, but multiple commands learned to the same slot can still be sent using [`remote.send_command`](/integrations/xiaomi_miio/#remotesend_command) even if they are overwritten.

After learning the command the base64 string can be found as a notification in Overview, the string can be copied by left clicking on the string and choose the copy option.

### `xiaomi_miio.remote_set_led_on`

Used to turn remote's blue LED on.

### `xiaomi_miio.remote_set_led_off`

Used to turn remote's blue LED off.

## Xiaomi Mi Robot Vacuum

The `xiaomi_miio` vacuum platform allows you to control the state of your [Xiaomi Mi Robot Vacuum](https://www.mi.com/roomrobot/).

Please follow the instructions on [Retrieving the Access Token](/integrations/xiaomi_miio/#retrieving-the-access-token) to get the API token to use during configuration flow setup.

Currently supported services are:

- `start`
- `pause`
- `stop`
- `return_to_base`
- `locate`
- `clean_spot`
- `set_fan_speed`
  Fan speeds: `Silent`, `Standard`, `Medium`, `Turbo` and `Gentle` (exclusively for mopping).
- `remote_control_*` (of your robot)
- `xiaomi_clean_zone`

### Configuration

To add a vacuum to your installation, click Configuration in the sidebar, then click Integrations and then click the + icon in the lower right and find xiaomi_miio. You will then be presented with a form in which you will need to fill in the “IP address” and 32 characters “token”. After you click submit, you will have the opportunity to select the area that your devices are located.

### Platform Services

In addition to all of the services provided by the `vacuum` integration (`start`, `pause`, `stop`, `return_to_base`, `locate`, `set_fan_speed` and `send_command`), the `xiaomi_miio` platform introduces specific services to access the remote control mode of the robot. These are:

- `xiaomi_miio.vacuum_remote_control_start`
- `xiaomi_miio.vacuum_remote_control_stop`
- `xiaomi_miio.vacuum_remote_control_move`
- `xiaomi_miio.vacuum_remote_control_move_step`
- `xiaomi_miio.vacuum_clean_zone`

### Service `xiaomi_miio.vacuum_remote_control_start`

Start the remote control mode of the robot. You can then move it with `remote_control_move`; when done, call `remote_control_stop`.

| Service data attribute    | Optional | Description                                       |
|---------------------------|----------|---------------------------------------------------|
| `entity_id`               |       no | Only act on a specific robot                      |

### Service `xiaomi_miio.vacuum_remote_control_stop`

Exit the remote control mode of the robot.

| Service data attribute    | Optional | Description                                       |
|---------------------------|----------|---------------------------------------------------|
| `entity_id`               |       no | Only act on a specific robot                      |

### Service `xiaomi_miio.vacuum_remote_control_move`

Remote control the robot. Please ensure you first set it in remote control mode with `remote_control_start`.

| Service data attribute    | Optional | Description                                               |
|---------------------------|----------|-----------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific robot                              |
| `velocity`                |       no | Speed: between -0.29 and 0.29                             |
| `rotation`                |       no | Rotation: between -179 degrees and 179 degrees            |
| `duration`                |       no | The number of milliseconds that the robot should move for |

### Service `xiaomi_miio.vacuum_remote_control_move_step`

Enter remote control mode, make one move, stop, and exit remote control mode.

| Service data attribute    | Optional | Description                                               |
|---------------------------|----------|-----------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific robot                              |
| `velocity`                |       no | Speed: between -0.29 and 0.29                             |
| `rotation`                |       no | Rotation: between -179 degrees and 179 degrees            |
| `duration`                |       no | The number of milliseconds that the robot should move for |

### Service `xiaomi_miio.vacuum_clean_zone`

Start the cleaning operation in the areas selected for the number of repeats indicated.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific robot                          |
| `zone`                    |       no | List of zones. Each zone is an array of four integer values. These values represent two sets of x- and y-axis coordinates that describe the beginning and ending points of a square or rectangle cleaning zone. For example, `[[23510,25311,25110,26361]]` creates a box that starts in one corner at the 23510, 25311 (x- and y-axis) coordinates and then is expanded diagonally to the 25110, 26361 coordinates to create a rectangular cleaning zone. |
| `repeats`                 |       no | Number of cleaning repeats for each zone between 1 and 3. |

Example of `xiaomi_miio.vacuum_clean_zone` use:

Inline array:
{% raw %}

```yaml
automation:
  - alias: "Test vacuum zone3"
    trigger:
    - event: start
      platform: homeassistant
    condition: []
    action:
    - service: xiaomi_miio.vacuum_clean_zone
      target:
        entity_id: vacuum.xiaomi_vacuum
      data:
        repeats: "{{states('input_number.vacuum_passes')|int}}"
        zone: [[30914,26007,35514,28807], [20232,22496,26032,26496]]
```

{% endraw %}

Array with inline zone:
{% raw %}

```yaml
automation:
  - alias: "Test vacuum zone3"
    trigger:
    - event: start
      platform: homeassistant
    condition: []
    action:
    - service: xiaomi_miio.vacuum_clean_zone
      target:
        entity_id: vacuum.xiaomi_vacuum
      data:
        repeats: "{{states('input_number.vacuum_passes')|int}}"
        zone:
        - [30914,26007,35514,28807]
        - [20232,22496,26032,26496]
```

{% endraw %}

Array mode:

```yaml
automation:
  - alias: "Test vacuum zone3"
    trigger:
    - event: start
      platform: homeassistant
    condition: []
    action:
    - service: xiaomi_miio.vacuum_clean_zone
      target:
        entity_id: vacuum.xiaomi_vacuum
      data:
        repeats: 1
        zone:
        - - 30914
          - 26007
          - 35514
          - 28807
        - - 20232
          - 22496
          - 26032
          - 26496
```

### Service `xiaomi_miio.vacuum_goto`

Go the specified coordinates

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific robot                          |
| `x_coord`                 |       no | X-coordinate, integer value. The dock is located at x-coordinate 25500. |
| `y_coord`                 |       no | Y-coordinate, integer value. The dock is located at y-coordinate 25500. |

### Service `xiaomi_miio.vacuum_clean_segment`

Clean the specified segment/room. A room is identified by a number. Instructions on how to find the valid room numbers and determine what rooms they map to, read the section [Retrieving room numbers](#retrieving-room-numbers).

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific robot                          |
| `segments`                |       no | List of segment numbers or one single segment number. |

Example of `xiaomi_miio.vacuum_clean_segment` use:

Multiple segments:
```yaml
automation:
  - alias: "Vacuum kitchen and living room"
    trigger:
    - event: start
      platform: homeassistant
    condition: []
    action:
    - service: xiaomi_miio.vacuum_clean_segment
      target:
        entity_id: vacuum.xiaomi_vacuum
      data:
        segments: [1,2]
```

Single segment:

```yaml
automation:
  - alias: "Vacuum kitchen"
    trigger:
    - event: start
      platform: homeassistant
    condition: []
    action:
    - service: xiaomi_miio.vacuum_clean_segment
      target:
        entity_id: vacuum.xiaomi_vacuum
      data:
        segments: 1
```

### Attributes

In addition to [all of the attributes provided by the `vacuum` component](/integrations/vacuum/#attributes),
(`battery_icon`, `cleaned_area`, `fan_speed`, `fan_speed_list`, and `params`), the `xiaomi` platform introduces specific attributes. These are:

- `cleaning_time`
- `do_not_disturb`
- `main_brush_left`
- `side_brush_left`
- `filter_left`
- `sensor_dirty_left`
- `cleaning_count`
- `total_cleaned_area`
- `total_cleaning_time`
- `clean_start`
- `clean_end`
- `mop_attached`

The following table shows the units of measurement for each attribute:

| Attribute                 | Unit of measurement | Description                                                    |
|---------------------------|---------------------|----------------------------------------------------------------|
| `do_not_disturb`          |                     | DND mode on / off                                              |
| `cleaning_time`           | minutes             | Last / actual cleaning time in minutes                         |
| `cleaned_area`            | square meter        | Last / actual cleaned area in square meters                    |
| `main_brush_left`         | hours               | Hours left until a change of the main brush is needed          |
| `side_brush_left`         | hours               | Hours left until a change of the side brush is needed          |
| `filter_left`             | hours               | Hours left until a change of the filter is needed              |
| `sensor_dirty_left`       | hours               | Hours left until the wall and cliff sensors should be cleaned  |
| `cleaning_count`          |                     | Number of total cleaning cycles                                |
| `total_cleaned_area`      | square meter        | Total cleaned area in square meters                            |
| `total_cleaning_time`     | minutes             | Total cleaning time in minutes                                 |
| `clean_start`             | datetime            | The last date/time the vacuum started cleaning (offset naive)  |
| `clean_stop`              | datetime            | The last date/time the vacuum finished cleaning (offset naive) |
| `mop_attached`            |                     | A mop and water box are attached / not attached                |

### Example on how to clean a specific room

Example script using [`vacuum.send_command`](/integrations/vacuum/) to clean a specific room:

```yaml
vacuum_kitchen:
  alias: "Clean the kitchen"
  sequence:
    - service: vacuum.send_command
      target:
        entity_id: vacuum.xiaomi_vacuum_cleaner
      data:
        command: app_segment_clean
        params: [18]
```

Where params specify room numbers, for multiple rooms, params can be specified like `[17,18]`. Instructions on how to find the valid room numbers and determine what rooms they map to, read the section [Retrieving room numbers](#retrieving-room-numbers).

### Example on how to reset maintenance hours (brushes, filter, sensors)

The vacuum entity stores attribute values for when brushes, filters and sensors need to be
cleaned or replaced (`main_brush_left`, `side_brush_left`, `filter_left` and
`sensor_dirty_left`).  The values are measured in hours. Once the parts are cleaned
or replaced you can then reset those values on the vacuum.  Here is an example script using
[`vacuum.send_command`](/integrations/vacuum/) to reset the hours for the main brush:

```yaml
reset_main_brush_left:
  alias: "Reset hours for main brush replacement"
  sequence:
    - service: vacuum.send_Command
      target:
        entity_id: vacuum.xiaomi_vacuum_cleaner
      data:
        command: reset_consumable
        params: ['main_brush_work_time']
```

Allowed `params` for the `reset_consumable` command:

- `['main_brush_work_time']`
- `['side_brush_work_time']`
- `['filter_work_time']`
- `['sensor_dirty_time']`

### Retrieving Zoned Cleaning Coordinates

### Using FloleVac (Android)

1. Download [FloleVac](https://play.google.com/store/apps/details?id=de.flole.xiaomi)
2. Login with your Xiaomi credentials
3. Open Map (make sure you're on the same network as your vacuum cleaner)
4. Select "Zone cleanup" and draw a box around the zone you'd like to clean
5. Long press "Cleanup" and the zone coordinates will be copied to your clipboard

### Using RoboRock Control Center (requires Valetudo firmware)

[RRCC](https://github.com/LazyT/rrcc) supports both rooted and non-rooted Vacuums and acts as a mostly fully featured replacement for Mi Home that works locally without the cloud. If you have installed the rooted firmware [Valetudo](https://github.com/Hypfer/Valetudo) you are able to SSH into your Vacuum and enable MQTT plus use map functions with no cloud requirement.

Using the map editor you are able to acquire the co-ordinates required for zoned clean up. Here is an example script for zoned clean up:

```yaml
vacuum_kitchen:
  alias: "vacuum kitchen"
  sequence:
    - service: vacuum.send_command
      target:
        entity_id: "vacuum.xiaomi_vacuum_cleaner"
      data:
        command: app_zoned_clean
        params: [[23084,26282,27628,29727,1]]
```

### Retrieving Room numbers

Valid room numbers can be retrieved using miio command-line tool:

```bash
miiocli vacuum --ip <ip of the vacuum> --token <your vacuum token> get_room_mapping
```

It will return the full mapping of room numbers to user-defined names as a list of (number,name) tuples.
Alternatively, one can just test the clean_segment service with a number and see which room it cleans.

It seems to be the case that Numbers 1..15 are used to number the intitial segmentation done by the vacuum cleaner itself. Numbers 16 and upwards numbers rooms from the users manual editing.

## Xiaomi Philips Light

The `xiaomi_miio` platform allows you to control the state of your Xiaomi Philips LED Ball Lamp, Xiaomi Philips Zhirui LED Bulb E14 Candle Lamp, Xiaomi Philips Zhirui Downlight, Xiaomi Philips LED Ceiling Lamp, Xiaomi Philips Eyecare Lamp 2, Xiaomi Philips Moonlight Bedside Lamp and Philips Zhirui Desk Lamp.

### Features

### Philips LED Ball Lamp, Philips Zhirui LED Candle Lamp and Philips Zhirui Downlight

Supported models: `philips.light.bulb`, `philips.light.candle`, `philips.light.candle2`, `philips.light.downlight`

- Power (on, off)
- Brightness
- Color temperature (175...333 mireds)
- Scene (1, 2, 3, 4)
- Delayed turn off (Resolution in seconds)
- Attributes
  - model
  - scene
  - delayed_turn_off

### Philips LED Ceiling Lamp

Supported models: `philips.light.ceiling`, `philips.light.zyceiling`

- Power (on, off)
- Brightness
- Color temperature (175...370 mireds)
- Scene (1, 2, 3, 4)
- Night light mode (on, off)
- Delayed turn off (Resolution in seconds)
- Attributes
  - model
  - scene
  - delayed_turn_off
  - night_light_mode
  - automatic_color_temperature

### Philips Eyecare Smart Lamp 2

Supported models: `philips.light.sread1`

- Eyecare light (on, off)
- Ambient light (on, off)
- Brightness (of each light)
- Scene (1, 2, 3, 4)
- Night light mode (on, off)
- Delayed turn off (Resolution in seconds)
- Eye fatigue reminder / notification (on, off)
- Eyecare mode (on, off)
- Attributes
  - model
  - scene
  - delayed_turn_off
  - night_light_mode
  - reminder
  - eyecare_mode

### Philips Zhirui Desk Lamp

Supported models: `philips.light.mono1`

- Power (on, off)
- Brightness
- Scene (1, 2, 3, 4)
- Delayed turn off (Resolution in seconds)
- Attributes
  - model
  - scene
  - delayed_turn_off

### Philips Moonlight Bedside Lamp

Supported models: `philips.light.moonlight`

- Power (on, off)
- Brightness
- Color
- Color temperature (153...588 mireds)
- Scene (1, 2, 3, 4, 5, 6)
- Attributes
  - model
  - scene
  - sleep_assistant
  - sleep_off_time
  - total_assistant_sleep_time
  - brand_sleep
  - brand

Please follow the instructions on [Retrieving the Access Token](/integrations/xiaomi_miio/#retrieving-the-access-token) to get the API token to use in the `configuration.yaml` file.

To add a Xiaomi Philips Light to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entries
light:
  - platform: xiaomi_miio
    name: Xiaomi Philips Smart LED Ball
    host: 192.168.130.67
    token: YOUR_TOKEN
    model: philips.light.bulb
```

{% configuration %}
host:
  description: The IP address of your miio light.
  required: true
  type: string
token:
  description: The API token of your miio light.
  required: true
  type: string
name:
  description: The name of your miio light.
  required: false
  type: string
  default: Xiaomi Philips Light
model:
  description: The model of your light. Valid values are `philips.light.sread1`, `philips.light.ceiling`, `philips.light.zyceiling`, `philips.light.moonlight`, `philips.light.bulb`, `philips.light.candle`, `philips.light.candle2`, `philips.light.mono1` and `philips.light.downlight`. This setting can be used to bypass the device model detection and is recommended if your device isn't always available.
  required: false
  type: string
{% endconfiguration %}

### Platform Services

### Service `xiaomi_miio.light_set_scene`

Set one of the 4 available fixed scenes.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO light entity.      |
| `scene`                   |       no | Scene, between 1 and 4.                               |

### Service `xiaomi_miio.light_set_delayed_turn_off`

Delayed turn off.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO light entity.      |
| `time_period`             |       no | Time period for the delayed turn off.                 |

### Service `xiaomi_miio.light_reminder_on` (Eyecare Smart Lamp 2 only)

Enable the eye fatigue reminder/notification.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO light entity.      |

### Service `xiaomi_miio.light_reminder_off` (Eyecare Smart Lamp 2 only)

Disable the eye fatigue reminder/notification.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO light entity.      |

### Service `xiaomi_miio.light_night_light_mode_on`  (Eyecare Smart Lamp 2 only)

Turn the smart night light mode on.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO light entity.      |

### Service `xiaomi_miio.light_night_light_mode_off`  (Eyecare Smart Lamp 2 only)

Turn the smart night light mode off.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO light entity.      |

### Service `xiaomi_miio.light_eyecare_mode_on`  (Eyecare Smart Lamp 2 only)

Turn the eyecare mode on.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO light entity.      |

### Service `xiaomi_miio.light_eyecare_mode_off`  (Eyecare Smart Lamp 2 only)

Turn the eyecare mode off.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO light entity.      |

## Xiaomi Smart WiFi Socket and Smart Power Strip

The `xiaomi_miio` switch platform allows you to control the state of your Xiaomi Smart WiFi Socket aka Plug, Xiaomi Smart Power Strip and Xiaomi Chuangmi Plug V1.

Please follow the instructions on [Retrieving the Access Token](/integrations/xiaomi_miio/#retrieving-the-access-token) to get the API token to use during configuration flow setup.

### Configuration

To add a plug to your installation, click Configuration in the sidebar, then click Integrations and then click the + icon in the lower right and find xiaomi_miio. You will then be presented with a form in which you will need to fill in the “IP address” and 32 characters “token”. After you click submit, you will have the opportunity to select the area that your devices are located.

### Features

### Xiaomi Smart WiFi Socket

Supported models: `chuangmi.plug.m1`, `chuangmi.plug.m3`, `chuangmi.plug.v2`, `chuangmi.plug.hmi205`, `chuangmi.plug.hmi206`

- Power (on, off)
- Attributes
  - Temperature

### Xiaomi Chuangmi Plug V1

Supported models: `chuangmi.plug.v1`, `chuangmi.plug.v3`, `chuangmi.plug.hmi208`

- Power (on, off)
- USB (on, off)
- Attributes
  - Temperature

### Xiaomi Smart Power Strip

Supported models: `qmi.powerstrip.v1`, `zimi.powerstrip.v2`

- Power (on, off)
- Wifi LED (on, off)
- Power Price (0...999)
- Power Mode (green, normal) (Power Strip V1 only)
- Attributes
  - Temperature
  - Current
  - Load power
  - Wifi LED
  - Mode (Power Strip V1 only)

### Xiaomi Air Conditioning Companion V3

Supported models: `lumi.acpartner.v3` (the socket of the `acpartner.v1` and `v2` isn't switchable!)

- Power (on, off)
- Attributes
  - Load power

### Platform Services

### Service `xiaomi_miio.switch_set_wifi_led_on` (Power Strip only)

Turn the wifi LED on.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO switch entity.       |

### Service `xiaomi_miio.switch_set_wifi_led_off` (Power Strip only)

Turn the wifi LED off.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO switch entity.       |

### Service `xiaomi_miio.switch_set_power_price` (Power Strip)

Set the power price.

| Service data attribute    | Optional | Description                                             |
|---------------------------|----------|---------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO switch entity.       |
| `price`                   |       no | Power price, between 0 and 999.                         |

### Service `xiaomi_miio.switch_set_power_mode` (Power Strip V1 only)

Set the power mode.

| Service data attribute    | Optional | Description                                                   |
|---------------------------|----------|---------------------------------------------------------------|
| `entity_id`               |       no | Only act on a specific Xiaomi miIO switch entity.             |
| `mode`                    |       no | Power mode, valid values are 'normal' and 'green'             |
