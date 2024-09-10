---
title: Broadlink
description: Instructions on setting up Broadlink within Home Assistant.
ha_category:
  - Climate
  - Light
  - Remote
  - Sensor
  - Switch
ha_release: 0.35
ha_iot_class: Local Polling
ha_codeowners:
  - '@danielhiversen'
  - '@felipediel'
  - '@L-I-Am'
  - '@eifinger'
ha_domain: broadlink
ha_config_flow: true
ha_platforms:
  - climate
  - light
  - remote
  - select
  - sensor
  - switch
  - time
ha_dhcp: true
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **Broadlink** {% term integration %} allows you to control and monitor Broadlink universal remotes, smart plugs, power strips, switches and sensors.

The manufacturer's app is required in order to connect new devices to the network.

The following devices are supported:

- Thermostats: `Hysen HY02B05H` and `Floureon HY03WE`
- Power Strips: `MP1-1K3S2U` and `MP1-1K4S`
- Sensors: `e-Sensor`
- Smart Plugs: `SP mini`, `SP mini+`, `SP mini 3`, `SP1`, `SP2`, `SP2-CL`, `SP2-UK/BR/IN`, `SP3`, `SP3-EU`, `SP3S-EU`, `SP3S-US`, `SP4L-EU` and `SP4M-US`
- Universal Remotes: `RM mini`, `RM mini 3`, `RM pro`, `RM pro+`, `RM plus`, `RM4 mini`, `RM4 pro`, `RM4C mini` and `RM4 TV mate`
- Wi-Fi Controlled Switches: `BG1`, `SC1`
- Smart Light Bulbs: `LB1`,`LB2`

{% include integrations/config_flow.md %}

## Entities and subdomains

There is no more need to set up platforms, except for custom IR/RF switches. Once the device is configured, all entities will be created automatically.

The {% term entities %} have the same name as the device by default. To change the name, icon or entity id, select the entity on the frontend and select the settings icon in the upper right. You can also disable the entity there if you don't think it is useful. Don't forget to select **Update** to save your changes when you're done.

The {% term entities %} are divided into four subdomains:

- [Climate](#climate)
- [Remote](#remote)
- [Select](#select)
- [Sensor](#sensor)
- [Switch](#switch)
- [Light](#light)
- [Time](#time)

## Climate

The `climate` entities allow you to monitor and control Broadlink thermostats.

## Remote

The `remote` {% term entities %} allow you to learn and send codes with universal remotes. They are created automatically when you configure devices with IR/RF capabilities.

### Learning commands

Use `remote.learn_command` to learn IR and RF codes. These codes are grouped by device and stored as commands in the [storage folder](#learned-codes-storage-location). They can be sent with the `remote.send_command` action later.

| Data attribute | Optional | Description                           |
| ---------------------- | -------- | ------------------------------------- |
| `entity_id`            | no       | ID of the remote.                     |
| `device`               | no       | Name of the device to be controlled.  |
| `command`              | no       | Names of the commands to be learned.  |
| `command_type`         | yes      | Command type. `ir` (default) or `rf`. |
| `alternative`          | yes      | Toggle command indicator.             |

#### Learning IR codes

To learn IR codes, call `remote.learn_command` with the device name and command to be learned:

```yaml
# Example configuration.yaml entry
script:
  learn_tv_power:
    sequence:
      - action: remote.learn_command
        target:
          entity_id: remote.bedroom
        data:
          device: television
          command: power
```

When the LED blinks, point the remote at the Broadlink device and press the button you want to learn.

After this, you can call `remote.send_command` with the same data to send the code. You can also access the code in the storage folder to build a custom IR/RF switch or send it with the prefix `b64:`.

#### Learning RF codes

Learning RF codes takes place in two steps. First call `remote.learn_command` with the `command_type: rf` option:

```yaml
# Example configuration.yaml entry
script:
  learn_car_unlock:
    sequence:
      - action: remote.learn_command
        target:
          entity_id: remote.garage
        data:
          device: car
          command: unlock
          command_type: rf
```

When the LED blinks for the first time, press and hold the button to sweep the frequency. Then wait for the LED to blink again and press the button a second time to capture the code.

The codes will be stored in the same way as the IR codes. You don't need to specify `command_type` to send them because this information is stored in the first byte of the code.

_Tip:_ Click Notifications in the sidebar after using the action and follow the instructions to make sure you are pressing the button at the right time.

#### Learning a sequence of commands

In order to streamline the learning process, you may want to provide a list of commands to be learned sequentially:

```yaml
# Example configuration.yaml entry
script:
  learn_tv_commands:
    sequence:
      - action: remote.learn_command
        target:
          entity_id: remote.bedroom
        data:
          device: television
          command:
            - turn on
            - turn off
            - volume up
            - volume down
```

After using this action, you will be prompted to press the buttons in the same order as provided. Check the notifications to stay on track and make sure you are pressing the right button at the right time.

#### Learning an alternative code

Some protocols require a toggle bit to distinguish one button press from another. In such cases, learning an alternative code will significantly increase the response rate of the device.

The toggle bit is common when a button is used for multiple purposes, such as the power button, which can turn the television on and off, and the volume button, which can be used with a short press or a long press.

If the code works sometimes, and sometimes it doesn't, you can try to relearn it with the `alternative: true` option:

```yaml
# Example configuration.yaml entry
script:
  learn_tv_power_button:
    sequence:
      - action: remote.learn_command
        target:
          entity_id: remote.bedroom
        data:
          device: television
          command: power
          alternative: true
```

When the LED blinks for the first time, press the button you want to learn. Then wait for the LED to blink again and press the same button. By doing so, two different codes will be learned for the same command, and they will be sent alternately at each call.

#### Learned codes storage location

The learned codes are stored in `/config/.storage/` in a JSON file called `broadlink_remote_MACADDRESS_codes`. You can open this file with a text editor and copy the codes to set up [custom IR/RF switches](#setting-up-custom-irrf-switches) or to send them as [base64 codes](#sending-a-base64-code), but beware: the files in the .storage folder _should never be edited manually_.

### Sending commands

After learning IR and RF codes with the `remote.learn_command` action, you can use `remote.send_command` to send them. You can also use this action to send base64 codes taken from elsewhere.

| Data attribute | Optional | Description                                                            |
| ---------------------- | -------- | ---------------------------------------------------------------------- |
| `entity_id`            | no       | ID of the remote.                                                      |
| `command`              | no       | Names of the commands to be sent or base64 codes prefixed with `b64:`. |
| `device`               | yes      | Name of the device to be controlled (optional for base64 codes).       |
| `num_repeats`          | yes      | Number of times to repeat the commands.                                |
| `delay_secs`           | yes      | Interval in seconds between one send and another.                      |

#### Sending a command

To send a command that you've learned, call `remote.send_command` with the device name and the command to be sent:

```yaml
# Example configuration.yaml entry
script:
  tv_power:
    sequence:
      - action: remote.send_command
        target:
          entity_id: remote.bedroom
        data:
          device: television
          command: power
```

#### Sending a command repeatedly

Use `num_repeats:` to send the same command multiple times:

```yaml
# Example configuration.yaml entry
script:
  turn_up_tv_volume_20:
    sequence:
      - action: remote.send_command
        target:
          entity_id: remote.bedroom
        data:
          device: television
          command: volume up
          num_repeats: 20
```

#### Sending a sequence of commands

You can provide a list of commands to be sent sequentially:

```yaml
# Example configuration.yaml entry
script:
  turn_on_ac:
    sequence:
      - action: remote.send_command
        target:
          entity_id: remote.bedroom
        data:
          device: air conditioner
          command:
            - turn on
            - turn off display
```

#### Sending a base64 code

Sometimes you may want to send a base64 code obtained elsewhere. Use the `b64:` prefix for this:

```yaml
# Example configuration.yaml entry
script:
  turn_on_tv:
    sequence:
      - action: remote.send_command
        target:
          entity_id: remote.bedroom
        data:
          command: b64:JgAcAB0dHB44HhweGx4cHR06HB0cHhwdHB8bHhwADQUAAAAAAAAAAAAAAAA=
```

#### Sending a sequence of base64 codes

You can send a sequence of base64 codes just like normal commands:

```yaml
# Example configuration.yaml entry
script:
  turn_on_ac:
    sequence:
      - action: remote.send_command
        target:
          entity_id: remote.bedroom
        data:
          command:
            - b64:JgAcAB0dHB44HhweGx4cHR06HB0cHhwdHB8bHhwADQUAAAAAAAAAAAAAAAA=
            - b64:JgAaABweOR4bHhwdHB4dHRw6HhsdHR0dOTocAA0FAAAAAAAAAAAAAAAAAAA=
```

#### Mixing commands and base64 codes

You can mix commands and base64 codes:

```yaml
# Example configuration.yaml entry
script:
  turn_on_ac:
    sequence:
      - action: remote.send_command
        target:
          entity_id: remote.bedroom
        data:
          device: television
          command:
            - turn on
            - b64:JgAaABweOR4bHhwdHB4dHRw6HhsdHR0dOTocAA0FAAAAAAAAAAAAAAAAAAA=
```

### Deleting commands

You can use `remote.delete_command` to remove commands that you've learned with the `remote.learn_command` action.

| Data attribute | Optional | Description                          |
| ---------------------- | -------- | ------------------------------------ |
| `entity_id`            | no       | ID of the remote.                    |
| `device`               | no       | Name of the device.                  |
| `command`              | no       | Names of the commands to be deleted. |

#### Deleting a command

To delete a command, call `remote.delete_command` with the device name and the command to be deleted:

```yaml
# Example configuration.yaml entry
script:
  delete_tv_power:
    sequence:
      - action: remote.delete_command
        target:
          entity_id: remote.bedroom
        data:
          device: television
          command: power
```

#### Deleting multiple commands

You can provide a list of commands to be deleted:

```yaml
# Example configuration.yaml entry
script:
  delete_tv_commands:
    sequence:
      - action: remote.delete_command
        target:
          entity_id: remote.bedroom
        data:
          device: television
          command:
            - power
            - source
            - menu
```

## Select

The `select` {% term entities %} allow you to control the weekday of your Broadlink devices. These entities are created automatically when you configure supported devices.

## Sensor

The `sensor` {% term entities %} allow you to monitor Broadlink sensors. These entities are created automatically when you configure a device that has sensors.

## Light

The `light` {% term entities %} allow you to control Broadlink lights. You can turn them on and off, change brightness, adjust the color or set a color temperature. These entities are created automatically when you configure a device that has lights.

## Time

The `time` {% term entities %} allow you to control the time of Broadlink devices. These entities are created automatically when you configure supported devices.

## Switch

The `switch` {% term entities %} allow you to control and monitor Broadlink smart plugs, power strips and switches. You can turn them on and off, and you can monitor their state and power consumption, when available. These entities are created automatically when you configure a device that has switches.

You can also define custom IR/RF switches to be controlled with universal remote devices.

### Setting up custom IR/RF switches

The first step is to configure the device normally via the configuration flow. Then add these lines to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
switch:
  - platform: broadlink
    mac: MAC_ADDRESS
    switches:
      - name: Philips TV
        command_on: JgAcAB0dHB44HhweGx4cHR06HB0cHhwdHB8bHhwADQUAAAAAAAAAAAAAAAA=
        command_off: JgAaABweOR4bHhwdHB4dHRw6HhsdHR0dOTocAA0FAAAAAAAAAAAAAAAAAAA=
```

The above example creates `switch.philips_tv`, which sends IR/RF codes using the universal remote with the MAC address provided.

{% configuration %}
mac:
  description: The MAC address of the universal remote.
  required: true
  type: string
switches:
  description: The list that contains all custom switches.
  required: true
  type: list
  keys:
    name:
      description: The name of the switch.
      required: true
      type: string
    command_on:
      description: A base64 code to be sent as "turn on" command.
      required: false
      type: string
    command_off:
      description: A base64 code to be sent as "turn off" command.
      required: false
      type: string
{% endconfiguration %}

You can configure multiple switches for the same remote:

```yaml
# Example configuration.yaml entry
switch:
  - platform: broadlink
    mac: MAC_ADDRESS
    switches:
      - name: Philips TV
        command_on: JgAcAB0dHB44HhweGx4cHR06HB0cHhwdHB8bHhwADQUAAAAAAAAAAAAAAAA=
        command_off: JgAaABweOR4bHhwdHB4dHRw6HhsdHR0dOTocAA0FAAAAAAAAAAAAAAAAAAA=
      - name: LG TV
        command_on: JgBYAAABIJISExETETcSEhISEhQQFBETETcROBESEjcRNhM1EjcTNRMTERISNxEUERMSExE2EjYSNhM2EhIROBE3ETcREhITEgAFGwABH0oSAAwzAAEfShEADQU=
        command_off: JgBYAAABIJISExETETcSEhISEhQQFBETETcROBESEjcRNhM1EjcTNRMTERISNxEUERMSExE2EjYSNhM2EhIROBE3ETcREhITEgAFGwABH0oSAAwzAAEfShEADQU=
```

The above example creates `switch.philips_tv` and `switch.lg_tv`, which are related to the same universal remote.

__IMPORTANT__: Always use unique names for your switches. A good choice is to prefix the name with the area in which the device is located, e.g. Bedroom TV.

### Using e-Control remotes

If you already have your remotes learned on e-Control app you can use this method to "copy" them to Home Assistant.

First get or learn all the remotes you want to add to Home Assistant in e-Control

1. Download

    Get the script from [here](https://github.com/clach04/Broadlink-e-control-db-dump).

2. Dump the data from the app

    Open the e-Control app on your mobile device. On the left side menu choose "Share" and then "Share to other phones in WLAN". It will generate the files you will need for the script.

3. Get data from your Android device

    Connect your Android device to your computer and browse the SD card/External Storage folder "/broadlink/newremote/SharedData/". You need to get the following files and put them in the same folder as this script:

    jsonSubIr
    jsonButton
    jsonIrCode

4. Install Requirements

    Run `pip install simplejson`. You must install `simplejson` in the same Python version you will use to run the scripts. You can ensure that the current version is installed by attempting to install again and confirming that you see "Requirement already satisfied".

5. Get the data from the device

    Navigate to the folder you downloaded and run `python getBroadlinkSharedData.py`. Follow the steps on screen. NOTE: These scripts were only tested with Python 2.7.

6. Install python-broadlink library:

    ```bash
    git clone https://github.com/mjg59/python-broadlink.git
    cd python-broadlink
    sudo python setup.py install
    ```

7. Test the codes
    Use the `sendcode` script you have already downloaded to test the codes you got from the device.
    You need to edit the script with your RM Pro IP Address and MAC Address and with the code in HEX format.
    When run the script, you know the code works when get message.
    Code sent...
    Not every code works.

8. Convert the HEX codes to base64.
    Use [this](https://tomeko.net/online_tools/hex_to_base64.php?lang=en1) tool to convert the hex codes to base64 for use with Home Assistant.

### Using iOS and Windows to obtain codes

1. Use the e-Control app to learn the codes from all of your suitable remotes. Depending on the remote, try to add useful names for the buttons and/or the remotes. This will mean that you should only have to run this process once and will help with getting them quickly into Home Assistant. Dump the files in the app by navigating to the hamburger icon, select `share and select`, then choose `Share to other phones on WLAN`.

2. Install Requirements

   - Download and install Python 2.7 on your windows PC.
   - Run `pip install simplejson`. You must install `simplejson` in the same Python version you will use to run the scripts. You can ensure that the current version is installed by attempting to install again and confirming that you see "Requirement already satisfied".
   - Download and install [iBackup Viewer](https://www.imactools.com/iphonebackupviewer/).
   - Download [these](https://github.com/NightRang3r/Broadlink-e-control-db-dump) GitHub files. Make sure you place them in the \Python27 path in Windows. Be sure that the getBroadlinkSharedData.py from the download is in this directory.

3. Plug your iPhone into your Windows PC, open iTunes and create a non-encrypted backup of your device.

4. Open iBackup viewer then select the iOS backup that you created. Navigate to the App icon and then scroll until you find e-control.app, select this. Select and extract the files jsonButton, jsonIrCode and jsonSublr; they will be located in the Documents/SharedData section. Put these in the same location as the getBroadlinkSharedData.py.

5. Now open a Command Prompt and navigate to the directory where the aforementioned files are located e.g., `C:\Python27`. Now run the command `python getBroadlinkSharedData.py`, you should see something like this:

    ```bash
    C:\Python27>python getBroadlinkSharedData.py
    ID: 1 | Name: TV
    ID: 2 | Name: Upstairs
    ID: 3 | Name: Sort in order
    ID: 4 | Name: Soundbar
    ID: 5 | Name: TV
    ID: 6 | Name: Xbox One
    ID: 7 | Name: User-Defined Aircon
    ID: 8 | Name: Sort in order
    ID: 9 | Name: User-Defined Aircon
    ID: 10 | Name: Kids Fan
    ID: 11 | Name: Downstairs
    ID: 12 | Name: Ceiling Fan
    ID: 13 | Name: Samsung TV
    ID: 14 | Name: Xbox One
    ID: 15 | Name: SONY SoundBar
    ID: 16 | Name: Fire TV
    ID: 17 | Name: New RF Remote
    ```

   Select the remote ID you would like to extract:

    ```bash
    Select accessory ID: 5
    [+] You selected:  TV
    [+] Dumping codes to TV.txt
    ```

6. Now there should be a file with the name of the remote you chose in the same directory ending in `.txt`. Open that up and it will contain the Base64 code required for Home Assistant. To ensure these codes work correctly you may need to add `==` to the end of the code in your {% term "`configuration.yaml`" %} file (or wherever you have your switches).

### Using Windows to obtain codes with Broadlink Manager

1. Install Broadlink Manager from this SourceForge link [here](https://sourceforge.net/projects/broadlink-manager/).
2. Open the application and hit "scan" to activate your broadlink device.
3. Hit "Learn New Command" and follow instructions on screen.
4. The "OnRawData Base64" is the value to be used with Home Assistant.

### Using Node-RED to obtain codes

1. Install the Broadlink Control palette in Node-RED (click the Hamburger menu at top right corner> Settings> Palette> Install and type Broadlink. Click install on the node-red-contrib-broadlink-control.
2. Once installed, verify that the new palette titled broadlink is available in the nodes menu.
3. Drag the RM node to an empty flow and double click to configure the node.

   ```bash
   a. give your RM device a name for easy identification
   b. click on the pencil to edit the device information
   c. enter the MAC address of the Broadlink RM PRO or RM Mini
   d. enter the IP address of the Broadlink RM PRO or RM mini
   e. leave the Catalog field empty.
   ```

4. Click Update, and the device field should show the MAC address of the newly added device. If not, just select it.
5. In the Action field, select Learn, then click Done.
6. Drag an Inject node to the left of the RM node and link them. The type of inject doesn't matter. Leave it to the defaults.
7. Drag a Template node on the Flow to the right of the RM node and link it to the RM node.
8. Double click the Template node to edit it, select:

   {% raw %}

   ```bash
   Property: msg.payload
   Format: Mustache template
   Template field: enter '{{payload.data}}'.
   Output as: Plain text
   ```

   {% endraw %}

9. Drag a Debug node to the right of the Template node and link them.
10. Show the debug messages, deploy the flow and click on the inject button.
11. A message will show in the debug window:

    ```bash
    3/23/2019, 9:56:53 AMnode: RM_Mini1
    msg : string[47]
    "Please tap the remote button within 30 seconds."
    ```

12. Point the IR remote control at the RM device and click the desired button for about 2 seconds. An array of numbers will show in the debug window. For example:

    ```bash
    '38,0,132,3,19,18,19,18,19,18,19,17,20,54,20,54,20,54,19,18,19,18,19,18,19,17,20,17,20,17,20,54,20,17,19,18,19,18,19,18,19,17,20,17,20,54,20,17,20,54,19,55,19,54,20,54,20,54,19,55,19,0,6,6,150,146,20,54,20,54,20,54,19,18,19,18,19,18,19,17,20,17,20,54,20,54,19,55,19,18,19,17,20,17,20,17,20,17,20,17,20,54,19,18,19,18,19,18,19,17,20,17,20,17,20,54,19,18,19,55,19,54,20,54,20,54,20,54,19,55,19,0,6,6,150,146,20,54,20,54,19,55,19,18,19,17,20,17,20,17,20,17,20,54,19,55,19,54,20,17,20,17,20,17,20,17,20,17,19,18,19,55,19,17,20,17,20,17,20,17,20,17,19,18,19,55,19,18,19,54,20,54,20,54,19,55,19,54,20,54,20,0,6,5,150,146,20,54,20,54,20,54,19,18,19,18,19,18,19,17,20,17,20,54,20,54,19,55,19,18,19,17,20,17,20,17,20,17,20,17,20,54,19,18,19,18,19,18,19,17,20,17,20,17,20,54,19,18,19,55,19,54,20,54,20,54,19,55,19,54,20,0,6,6,149,147,20,54,19,55,19,54,20,17,20,17,20,17,20,17,20,17,19,55,19,54,20,54,20,17,20,17,20,17,19,18,19,18,19,18,19,54,20,17,20,17,20,17,20,17,19,18,19,18,19,54,20,17,20,54,20,54,20,54,19,...'
    ```

This is the code we need to transmit again to replicate the same remote function.

### Using Node-RED to transmit codes

1. Drag another RM node on the same flow we created earlier. The RM node should be configured to the RM device created earlier by default.
2. In the Action field, select - Set from msg.payload -.
3. Drag an Inject node and give it a meaningful name relevant to the remote control button function, like "TV On" or "TV Source".
4. Drag a template node and double click it to configure:

   ```bash
   Property: msg.payload
   Format: Mustache template
   Template: enter the following:
   '{
      "action" : "send",
      "data" : [ 38, 0, 34, 1, 40, 15, 40, 15 ] // Here you must enter the entire code from point 12 above, without the trailing "."
   }'
   In the Output as field, "select Parsed JSON".
   ```

5. Click Done.
6. Drag a debug node and connect it to the output of the RM node.
7. Connect the Inject node to the Template node, and the template node to the RM node.
8. Click Deploy to activate the flow, and then click the inject button. The debug window should show a debug message. For example:

   ```bash
   {"action":"send","data":   [38,0,152,0,0,1,39,148,19,18,18,19,18,55,19,18,18,19,18,19,18,19,18,55,18,56,18,19,18,55,18,19,18,56,18,18,19,55,18,19,18,19,18,18,18,56,18,19,18,18,19,55,18,56,18,18,19,18,18,19,18,19,18,55,19,18,18,19,18,19,18,19,18,18,18,19,18,19,18,55,19,55,18,19,18,19,18,18,19,18,18,56,18,19,18,18,19,55,18,56,18,18,19,18,18,19,18,19,18,19,18,18,19,18,18,56,18,55,18,19,18,19,18,19,18,18,19,55,18,19,18,55,19,18,18,56,18,19,18,18,19,18,18,19,18,19,18,19,18,18,18,56,18,0,13,5],"status":"OK"}
   ```

The "status" : "OK" at the end is a feedback that the Broadlink RM device is connected and has transmitted the payload.

Now you can add as many template nodes, each having a specific code, and add any type of input nodes to activate the template and transmit the code.

### Using broadlink_cli to obtain codes

It is also possible to obtain codes using `broadlink_cli` from [python-broadlink](https://github.com/mjg59/python-broadlink) project.

First use discovery to find your Broadlink device:

```bash
$ ./broadlink_discovery
Discovering...
###########################################
RM2
# broadlink_cli --type 0x2787 --host 192.168.1.137 --mac 34ea34b45d2c
Device file data (to be used with --device @filename in broadlink_cli) :
0x2787 192.168.1.137 34ea34b45d2c
temperature = 27.1
```

Then use this info in a cli-command. IR and RF learning are supported.

#### Learning IR codes

Use `--learn` to obtain IR codes:

```bash
./broadlink_cli --learn --device "0x2787 192.168.1.137 34ea34b45d2c"
Learning...
```

Press a button on the remote and you get the code:

```txt
260058000001219512131114113910141114111411141114103911391114103911391139103911391039113911141039111411391015103911141114113910141139111410391114110005250001274b11000c520001274b11000d05
Base64: b'JgBYAAABIZUSExEUETkQFBEUERQRFBEUEDkROREUEDkRORE5EDkRORA5ETkRFBA5ERQRORAVEDkRFBEUETkQFBE5ERQQOREUEQAFJQABJ0sRAAxSAAEnSxEADQU='
```

#### Learning RF codes

Use `--rfscanlearn` to obtain RF codes:

```bash
$ ./broadlink_cli --rfscanlearn --device "0x2787 192.168.1.137 34ea34b45d2c"
Learning RF Frequency, press and hold the button to learn...
```

Press and hold a button on the remote.

You will know it succeeded when you see the following text:
```txt
Found RF Frequency - 1 of 2!
You can now let go of the button
Press enter to continue...
```

If the attempt fails, you will see the error:
```txt
RF Frequency not found
```
If a failure occurs, you may need to simply keep pressing the button during the `Learning RF Frequency` step, as some remotes appear to not continuously transmit when buttons are held.

After a success, do one of the following two options:

1. To learn a single button press RF code, press enter and follow the prompt:
    ```txt
    To complete learning, single press the button you want to learn
    ```
    Short press the button and you get the code:
    ```txt
    Found RF Frequency - 2 of 2!
    b2002c0111211011211121112111212110112122101121112111202210211121112110221011211121112121102210112121111021112221101121211100017b10211111211121102111212210112121111121102111212210211121102210211111211121102122102111112121101121112122101121211000017c10211111211022102111212210112121111022102112202210211121102210221011211022102122102210112121101122102122101121211100017b10211111211121102210212210112122101121102210212210221021112110221011211121112121102210112121111121102122101121221000017b1121101121112111211121211110212210112111211121211121102210211121101121112111212111211011222110112111212111112121100005dc000000000000000000000000
    Base64: b'sgAsAREhEBEhESERIREhIRARISIQESERIREgIhAhESERIRAiEBEhESERISEQIhARISERECERIiEQESEhEQABexAhEREhESEQIREhIhARISERESEQIREhIhAhESEQIhAhEREhESEQISIQIRERISEQESERISIQESEhEAABfBAhEREhECIQIREhIhARISERECIQIRIgIhAhESEQIhAiEBEhECIQISIQIhARISEQESIQISIQESEhEQABexAhEREhESEQIhAhIhARISIQESEQIhAhIhAiECERIRAiEBEhESERISEQIhARISERESEQISIQESEiEAABexEhEBEhESERIREhIREQISIQESERIREhIREhECIQIREhEBEhESERISERIRARIiEQESERISERESEhEAAF3AAAAAAAAAAAAAAAAA=='
    ```

2. To learn a button hold RF code, hold the button you wish to learn for 1-2 seconds then immediately press enter.  
    - You will see the same prompts for a short press as shown above. You should see it return a different base64 code.
    - Test the base64 code to ensure it performs the button 'hold' command as expected, rather than the button 'press' command.
    - This might take some trial and error to get the hold timing right before hitting enter to scan for the code.

### Conversion of codes from other projects

For old/awkward devices another possibility is to try to get codes by using data gathered by the LIRC project.

Assuming that your (or similar) device is in one of these databases:

- <https://sourceforge.net/p/lirc-remotes/code/ci/master/tree/>
- <https://github.com/probonopd/irdb/tree/master/>

You can grab `irdb2broadlinkha.sh` from [irdb2broadlinkha](https://github.com/molexx/irdb2broadlinkha) project and try to convert codes to format suitable for Home Assistant.
