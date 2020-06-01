---
title: "Xiaomi Mi Robot Vacuum"
description: "Instructions on how to integrate your Xiaomi Mi Robot Vacuum within Home Assistant."
ha_category:
  - Vacuum
ha_release: 0.51
ha_iot_class: Local Polling
ha_domain: xiaomi_miio
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
  Fan speeds: `Silent`, `Standard`, `Medium`, `Turbo` and `Gentle` (exclusively for mopping).
- `remote_control_*` (of your robot)
- `xiaomi_clean_zone`

## Configuration

Please follow [Retrieving the Access Token](/integrations/vacuum.xiaomi_miio/#retrieving-the-access-token) to retrieve the API token used in
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

## Platform Services

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
| `zone`                    |       no | List of zones. Each zone is an array of 4 integer value. Example: [[23510,25311,25110,26361]] |
| `repeats`                 |       no | Number of cleaning repeats for each zone between 1 and 3. |

Example of `xiaomi_miio.vacuum_clean_zone` use:

Inline array:
{% raw %}

```yaml
automation:
  - alias: Test vacuum zone3
    trigger:
    - event: start
      platform: homeassistant
    condition: []
    action:
    - service: xiaomi_miio.vacuum_clean_zone
      data_template:
        entity_id: vacuum.xiaomi_vacuum
        repeats: '{{states('input_number.vacuum_passes')|int}}'
        zone: [[30914,26007,35514,28807], [20232,22496,26032,26496]]
```

{% endraw %}

Array with inline zone:
{% raw %}

```yaml
automation:
  - alias: Test vacuum zone3
    trigger:
    - event: start
      platform: homeassistant
    condition: []
    action:
    - service: xiaomi_miio.vacuum_clean_zone
      data_template:
        entity_id: vacuum.xiaomi_vacuum
        repeats: '{{states('input_number.vacuum_passes')|int}}'
        zone:
        - [30914,26007,35514,28807]
        - [20232,22496,26032,26496]
```

{% endraw %}

Array mode:

```yaml
automation:
  - alias: Test vacuum zone3
    trigger:
    - event: start
      platform: homeassistant
    condition: []
    action:
    - service: xiaomi_miio.vacuum_clean_zone
      data:
        entity_id: vacuum.xiaomi_vacuum
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

## Attributes

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
| `clean_end`               | datetime            | The last date/time the vacuum finished cleaning (offset naive) |

## Retrieving the Access Token

### Xiaomi Home app (Xiaomi Aqara Gateway, android?)

1. Install the Xiaomi Home app.
2. Sign In/make an account.
3. Make sure you set your region to: Mainland China (Seems to be the longest line with Chines characters) under settings -> Region (language can later be set on English).
4. Select your Gateway in Xiaomi Home app.
5. Then the 3 dots at the top right of the screen.
6. Then click on about.
7. Tap the version number (Plug-in version 2.77.1 as of January 2020) at the bottom of the screen repeatedly.
8. You should now see 2 extra options listed in English, this means you enabled developer mode. [if not, try all steps again!].
9. Under "Hub info" there is quite some text in JSON format, this includes the "token" that you need.

Note: If you have multiple devices needing a token, e.g., Xiaomi Mi Robot Vacuum and a Xiaomi IR Remote, the above method may not work. The Xiaomi Home app will display a token, though it isn't the correct one. The alternative method using "Mi Home v5.4.49" will provide the correct token. 

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
This token (32 hexadecimal characters) is required for the Xiaomi Mi Robot Vacuum, Mi Robot 2 (Roborock) Vacuum, Xiaomi Philips Lights and Xiaomi IR Remote. The Xiaomi Gateway uses another security method and requires a `key` (16 alphanumeric chars), which can be obtained easily via a hidden menu item at the Mi-Home app or using the `miio` command line tool.
</div>

### Android (not rooted)

> If using an Android device to retrieve the Access Token only `v5.4.49` of Mi Home is confirmed working (December 2019).

1. To begin, set up your Robovac with the latest version of Mi Home on your primary Android device as you normally would.
2. Using `v5.4.49` of Mi Home locate a text file under the `Smarthome/logs` folder where the 32 character token is stored.
3. There will likely be several text files in this directory, search all of them for the word 'token' and you should find it there. Be advised that the latest version of Mi Home does not store the token in clear text.

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
2. Using iTunes, create an unencrypted backup of your iPhone.
3. Install [iBackup Viewer](https://www.imactools.com/iphonebackupviewer/), open it, and open your backup.
4. Open the "Raw Data" module.
5. Navigate to `com.xiaomi.mihome`.
6. Search for a file that looks like this: `123456789_mihome.sqlite` (Note: `_mihome.sqlite` is *not* the correct file. Most likely, you will find this file in the `Documents` folder.)
7. Save this file to your filesystem.
8. Install [DB Browser for SQLite](https://sqlitebrowser.org/).
9. Open DB Browser and load the `.sqlite` file you saved from your backup.
10. Click on the `Execute SQL` tab.
11. Input and run this query:

    ```sql
    SELECT ZTOKEN FROM ZDEVICE WHERE ZMODEL LIKE "%vacuum%"
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
3. Set up [Mi Home version 5.0.30](https://www.apkmirror.com/apk/xiaomi-inc/mihome/mihome-5-0-30-release/) in BlueStacks and login to synchronize devices.
4. Use [BlueStacks Tweaker](https://forum.xda-developers.com/general/general/bluestacks-tweaker-2-tool-modifing-t3622681) to access the filesystem and retrieve the token.
5. Copy `/data/data/com.xiaomi.smarthome/databases/miio2.db` file to your computer using the Bluestacks Tweakers filesystem tool.
6. Install [DB Browser for SQLite](https://sqlitebrowser.org/).
7. Open the DB Browser and load the `miio2.db` from your computer.
8. Select `Browse Data` tab from the DB Browser and switch to table called `devicerecord`
9. This will display all the connected devices information with the token.

### Miio command line tool

Use of Miio should be done before the Vacuum is connected to Mi Home. If you already connected to the app you will need to delete it and then join the ad-hoc Wi-Fi network the Vacuum creates. If the vacuum is already paired it's likely this method will only return `???` as your token.

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


## Example on how to clean a specific room

Example script using [`vacuum.send_command`](/integrations/vacuum/) to clean a specific room:

```yaml
vacuum_kitchen:
  alias: "Clean the kitchen"
  sequence:
    - service: vacuum.send_command
      data:
        entity_id: vacuum.xiaomi_vacuum_cleaner
        command: app_segment_clean
        params: [18]
```

Where params specify room numbers, for multiple rooms, params can be specified like `[17,18]`.

Valid room numbers can be retrieved using miio command-line tool. It will only give room numbers and not the room names. To get the room names, one can just test the app_segment_clean command and see which room it cleans.

```bash
miio protocol call <ip of the vacuum> get_room_mapping
```

## Example on how to reset maintenance hours (brushes, filter, sensors)

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
      data:
        entity_id: vacuum.xiaomi_vacuum_cleaner
        command: reset_consumable
        params: ['main_brush_work_time']
```

Allowed `params` for the `reset_consumable` command:
* `['main_brush_work_time']`
* `['side_brush_work_time']`
* `['filter_work_time']`
* `['sensor_dirty_time']`

## Retrieving Zoned Cleaning Coordinates

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
      data:
        entity_id: 'vacuum.xiaomi_vacuum_cleaner'
        command: app_zoned_clean
        params: [[23084,26282,27628,29727,1]]
```
