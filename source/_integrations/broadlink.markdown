---
title: Broadlink
description: Instructions on how to integrate Broadlink within Home Assistant.
logo: broadlink.png
ha_category:
  - Remote
  - Switch
  - Sensor
ha_release: 0.35
ha_iot_class: Local Polling
ha_codeowners:
  - '@danielhiversen'
  - '@felipediel'
---

There is currently support for the following device types within Home Assistant:

- [Remote](#remote)
- [Sensor](#sensor)
- [Switch](#switch)

## Remote

The `broadlink` remote platform allows you to interact with Broadlink remote control devices.

### Configuration

To enable it, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
remote:
  - platform: broadlink
    host: IP_ADDRESS
    mac: MAC_ADDRESS
```

{% configuration %}
host:
  description: The hostname/IP address to connect to.
  required: true
  type: string
mac:
  description: Device MAC address.
  required: true
  type: string
type:
  description: Device type.
  required: false
  type: integer
timeout:
  description: Timeout in seconds for the connection to the device.
  required: false
  default: 5
  type: integer
name:
  description: Name of the device.
  required: false
  default: Broadlink
  type: string
{% endconfiguration %}
  
### Learn command

Use the `remote.learn_command` service to learn new commands.

| Service data attribute | Optional | Description                               |
| ---------------------- | -------- | ----------------------------------------- |
| `entity_id`            | no       | ID of the remote.                         |
| `device`               | no       | Name of the device to control.            |
| `command`              | no       | Names of the commands to learn.           |
| `alternative`          | yes      | Toggle commands?                          |
| `timeout`              | yes      | Timeout in seconds to learn each command. |

Example 1: Learn a single command

```yaml
script:
  learn_mute_tv:
    sequence:
      - service: remote.learn_command
        data:
          entity_id: remote.bedroom
          device: television
          command: mute
```

Example 2: Learn a sequence of commands

```yaml
script:
  learn_tv_commands:
    sequence:
      - service: remote.learn_command
        data:
          entity_id: remote.bedroom
          device: television
          command:
            - turn on
            - turn off
            - volume up
            - volume down
```

Example 3: Learn a toggle command

The `alternative` flag is useful for capturing commands where the same button is used for more than one purpose, such as the power button, which can turn the television on and off.

```yaml
script:
  learn_tv_power_button:
    sequence:
      - service: remote.learn_command
        data:
          entity_id: remote.bedroom
          device: television
          command: power
          alternative: True
```

In the above example, two codes will be captured for the power command, and will be sent alternately each time the command is called.

#### Learned codes storage location

The learned commands are stored in folder `\configuration\.storage` in a file called `broadlink_remote_xxxxxxxxxxx_codes.json`. From here, you can copy the codes for use in e.g., a Broadlink switch. Warning: files in the .storage folder should never be edited manually, so just view the file.

### Send command

Use the `remote.send_command` service to send commands.

| Service data attribute | Optional | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            | no       | ID of the remote.                                    |
| `device`               | no       | Name of the device to control.                       |
| `command`              | no       | Names of the commands to send.                       |
| `num_repeats`          | yes      | Number of times to repeat the commands.              |
| `delay_secs`           | yes      | Interval in seconds between one command and another. |

Example 1: Send a single command

```yaml
script:
  mute_tv:
    sequence:
      - service: remote.send_command
        data:
          entity_id: remote.bedroom
          device: television
          command: mute
```

Example 2: Send a command repeatedly

```yaml
script:
  turn_up_tv_volume_20:
    sequence:
      - service: remote.send_command
        data:
          entity_id: remote.bedroom
          device: television
          command: volume up
          num_repeats: 20
```

Example 3: Send a sequence of commands

```yaml
script:
  turn_on_ac:
    sequence:
      - service: remote.send_command
        data:
          entity_id: remote.bedroom
          device: air conditioner
          command:
            - turn on
            - turn off display
```

### Troubleshooting

Many users are experiencing problems with Broadlink RM Mini 3 0x5f36 and the entire RM4 series.

If you have these devices, you need to follow these steps:
- Remove the device from Broadlink App
- Reset the device
- Add the device to your local network using the app
- Do not set up a cloud (not now, not ever)
- Use [Broadlink Manager](https://sourceforge.net/projects/broadlink-manager/) to get your device type
- Specify the device type in the configuration file

Example 1: Set up RM Mini 3 0x5f36 as a remote

```yaml
# Example configuration.yaml entry
remote:
  - platform: broadlink
    host: IP_ADDRESS
    mac: MAC_ADDRESS
    type: 0x5f36
```

Example 2: Set up RM Mini 3 0x5f36 as switch

```yaml
# Example configuration.yaml entry
switch:
  - platform: broadlink
    host: IP_ADDRESS
    mac: MAC_ADDRESS
    type: 'rm_mini3_5f36'
```

Example 3: Set up RM4 Mini as switch

```yaml
# Example configuration.yaml entry
switch:
  - platform: broadlink
    host: IP_ADDRESS
    mac: MAC_ADDRESS
    type: 'rm4_mini'
```

## Sensor

The `broadlink` sensor platform let you monitor data from an RM2 and A1 E-air. There is currently no support for the cloud API.

To enable it, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: broadlink
    host: IP_ADDRESS
    mac: 'MAC_ADDRESS'
    monitored_conditions:
      - 'temperature'
```

{% configuration %}
host:
  description: The hostname/IP address to connect to.
  required: true
  type: string
mac:
  description: "Device MAC address. Use the following format: `AA:BB:CC:DD:EE:FF`."
  required: true
  type: string
name:
  description: Sensor name.
  required: false
  default: Broadlink sensor
  type: string
scan_interval:
  description: Time in seconds to fetch data from sensors.
  required: false
  default: 300
  type: integer
timeout:
  description: Timeout in seconds for the connection to the device.
  required: false
  default: 10
  type: integer
monitored_conditions:
  description:
  required: true
  type: list
  keys:
    "'temperature'":
      description: Temperature
    "'humidity'":
      description: Humidity
    "'air_quality'":
      description: Air quality
    "'light'":
      description: Light
    "'noise'":
      description: Noise
{% endconfiguration %}

To set it up, add the following information to your `configuration.yaml` file:

Obtain sensor data from an A1:

```yaml
sensor:
  - platform: broadlink
    scan_interval: 60
    host: IP_ADDRESS
    mac: 'MAC_ADDRESS'
    monitored_conditions:
      - temperature
      - humidity
      - air_quality
      - light
      - noise
```

Obtain temperature data from an RM2:

```yaml
sensor:
  - platform: broadlink
    scan_interval: 60
    host: IP_ADDRESS
    mac: 'MAC_ADDRESS'
    monitored_conditions:
      - temperature
```

### Microsoft Windows installation

<div class='note'>

The pycrypto library needs to be available on your platform. On a typical windows sysytem `pip install pycrypto` will fail, as a compiler needs to be installed first.

</div>

The quickest way around this is to use a pre-built binary, e.g., from [https://github.com/sfbahr/PyCrypto-Wheels](https://github.com/sfbahr/PyCrypto-Wheels)

Be sure to get the correct 64 or 32-bit binary for your system, the full command line will look something like the sample below for a 64-bit system:

```bash
pip install --use-wheel --no-index --find-links=https://github.com/sfbahr/PyCrypto-Wheels/raw/master/pycrypto-2.6.1-cp35-none-win_amd64.whl pycrypto
```

## Switch

This `Broadlink` switch platform allow to you control Broadlink [devices](https://www.ibroadlink.com/).

### Configuration

To enable it, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
switch:
  - platform: broadlink
    host: IP_ADDRESS
    mac: 'MAC_ADDRESS'
```

{% configuration %}
host:
  description: The hostname/IP address to connect to.
  required: true
  type: string
mac:
  description: "Device MAC address. Use the following format: `AA:BB:CC:DD:EE:FF`."
  required: true
  type: string
timeout:
  description: Timeout in seconds for the connection to the device.
  required: false
  type: integer
retry:
  description: Retry times for fetch data if failed.
  required: false
  type: integer
  default: 2
friendly_name:
  description: The name used to display the switch in the frontend.
  required: false
  type: string
type:
  description: "Switch type. Choose one from: `rm`, `rm2`, `rm_mini`, `rm_pro_phicomm`, `rm2_home_plus`, `rm2_home_plus_gdt`, `rm2_pro_plus`, `rm2_pro_plus2`, `rm2_pro_plus_bl`, `rm_mini_shate`, `rm_mini3_5f36`, `rm4_mini`, `rm4_pro`, `sp1`, `sp2`, `honeywell_sp2`, `sp3`, `spmini2`, `spminiplus` or `mp1`. `SC1` devices can be registered as `sp2`."
  required: true
  type: string
switches:
  description: The array that contains all switches.
  required: false
  type: map
  keys:
    identifier:
      description: Name of the command switch as slug. Multiple entries are possible.
      required: true
      type: string
      keys:
        command_on:
          description: Base64 encoded packet from RM device to take for on.
          required: true
          type: string
        command_off:
          description: Base64 encoded packet from RM device to take for off.
          required: true
          type: string
        friendly_name:
          description: The name used to display the switch in the frontend.
          required: false
          type: string
slots:
  description: Friendly names of 4 slots of MP1 power strip. If not configured, slot name will be `switch's friendly_name + 'slot {slot_index}'`. e.g 'MP1 slot 1'
  required: false
  type: map
  keys:
    slot_1:
      description: Friendly names of slot 1
      required: false
      type: string
    slot_2:
      description: Friendly names of slot 2
      required: false
      type: string
    slot_3:
      description: Friendly names of slot 3
      required: false
      type: string
    slot_4:
      description: Friendly names of slot 4
      required: false
      type: string
{% endconfiguration %}

Information about how to install on Windows can be found [here](/integrations/broadlink#sensor#microsoft-windows-installation).

### How to obtain IR/RF packets

Choose Call Service from the Developer Tools. Choose the service `broadlink.learn` from the list of **Available services:**, write in "Service Data" JSON with 1 field "host":"your_broadlink_IP" and hit **CALL SERVICE**. Press the button on your remote with in 20 seconds. The packet will be printed as a persistent notification in the States page of the web interface.

Example configuration for `rm`, `rm2`, `rm_mini`, `rm_pro_phicomm`, `rm2_home_plus`, `rm2_home_plus_gdt`, `rm2_pro_plus`, `rm2_pro_plus2`, `rm2_pro_plus_bl` and `rm_mini_shate` devices:

```yaml
switch:
  - platform: broadlink
    host: 192.168.1.2
    mac: 'B4:43:0D:CC:0F:58'
    timeout: 15
    retry: 5
    switches:
      # Will work on most Phillips TVs:
      tv_phillips:
        friendly_name: "Phillips Tv Power"
        command_on: 'JgAcAB0dHB44HhweGx4cHR06HB0cHhwdHB8bHhwADQUAAAAAAAAAAAAAAAA='
        command_off: 'JgAaABweOR4bHhwdHB4dHRw6HhsdHR0dOTocAA0FAAAAAAAAAAAAAAAAAAA='
      # Will work on most LG TVs
      tv_lg:
        friendly_name: "LG Tv Power"
        command_on: 'JgBYAAABIJISExETETcSEhISEhQQFBETETcROBESEjcRNhM1EjcTNRMTERISNxEUERMSExE2EjYSNhM2EhIROBE3ETcREhITEgAFGwABH0oSAAwzAAEfShEADQU='
        command_off: 'JgBYAAABIJISExETETcSEhISEhQQFBETETcROBESEjcRNhM1EjcTNRMTERISNxEUERMSExE2EjYSNhM2EhIROBE3ETcREhITEgAFGwABH0oSAAwzAAEfShEADQU='
      tv_lg_hdmi1_hdmi2:
        friendly_name: "LG Tv HDMI12"
        command_on: 'JgBIAAABIZMRExITEjYSExMRERURExEUEDkRNxEUEjYSNhM3ETcSNxITETgSNhI2ExMQExE4ETYSNxIUERMSExE4ETcRFBETEQANBQ=='
        command_off: 'JgBQAAABJJMSEhISETgSEhITEBMSEhMSETcSNxMREjcSNxI3EjcSOBETERITNhM2EhITERM2EzcRNxI3ExISEhI3EjcRExETEgAFLQABJEoRAA0FAAAAAAAAAAA='
      tv_lg_hdmi3:
        friendly_name: "LG Tv HDMI3"
        command_on: 'JgBIAAABIZMSFBISETgRExEUERQQFBETEjcTNhMSETgRNxE3EjcROBM2ERMSFBE4ERMSNxM2EjUSFBE2ETgRExM2ExITEhATEwANBQ=='
      tv_lg_av1_av2:
        friendly_name: "LG Tv AV12"
        command_on: 'JgBIAAABIpQPFBITETgSEw8UEhQSEhEVDzgSOBAUETgQOQ84EjgRNxITETgSExA5EDgREhI3EhMROBMSEDkQFBETEjYTEhE4EQANBQ=='
        command_off: 'JgBIAAABH5YPFBETETgUERAUEBURFBATETgROBEUETcSNxE4ETcSOBISEBUQFREUEjUSFBA5ETcRNxE4ETkQOBAUEjcRFRAUEQANBQ=='
  - platform: broadlink
    host: 192.168.1.2
    mac: 'B4:43:0D:CC:0F:58'
    timeout: 15
    switches:
    # Will work on most Phillips TVs:
      tv:
        friendly_name: "Phillips Tv"
        command_on: 'JgAcAB0dHB44HhweGx4cHR06HB0cHhwdHB8bHhwADQUAAAAAAAAAAAAAAAA='
        command_off: 'JgAaABweOR4bHhwdHB4dHRw6HhsdHR0dOTocAA0FAAAAAAAAAAAAAAAAAAA='
```

Example configuration for `sp1`, `sp2`, `honeywell_sp2`, `sp3`, `spmini2` and `spminiplus` devices:

```yaml
switch:
  - platform: broadlink
    host: IP_ADDRESS
    mac: 'MAC_ADDRESS'
    type:  sp1
    friendly_name: 'Humidifier'
  - platform: broadlink
    host: IP_ADDRESS
    mac: 'MAC_ADDRESS'
    type:  sp2
    retry: 5
    friendly_name: 'Humidifier'
```

Example configuration for `mp1` device:

```yaml
switch:
  - platform: broadlink
    host: IP_ADDRESS
    mac: 'MAC_ADDRESS'
    type: mp1
    friendly_name: 'MP1'
    slots:
      # friendly name of slots - optional
      # if not set, slot name will be switch's friendly_name + 'slot {slot_index}'. e.g 'MP1 slot 1'
      slot_1: 'TV slot'
      slot_2: 'Xbox slot'
      slot_3: 'Fan slot'
      slot_4: 'Speaker slot'
```

### Service `broadlink.send`

You can use the service `broadlink.send` to directly send IR packets without the need to assign a switch entity for each command.

| Service data attribute | Optional | Description                                             |
| ---------------------- | -------- | ------------------------------------------------------- |
| `host`                 | no       | IP address to send command to.                          |
| `packet`               | no       | String or list of strings that contain the packet data. |

Example:

```yaml
script:
  tv_select_source:
    sequence:
      - service: broadlink.send
        data:
          host: 192.168.0.107
          packet:
            - "JgCMAJSSFDYUNhQ2FBEUERQRFBEUERQ2FDYUNhQRFBEUERQRFBEUERQRFDYUERQRFBEUERQRFDYUNhQRFDYUNhQ2FDYUNhQABfWUkhQ2FDYUNhQRFBEUERQRFBEUNhQ2FDYUERQRFBEUERQRFBEUERQ2FBEUERQRFBEUERQ2FDYUERQ2FDYUNhQ2FDYUAA0FAAAAAAAAAAAAAAAA"
            - "JgBGAJSTFDUUNhM2ExITEhMSExITEhM2EzYTNhQRFBEUERQRFBEUNRQ2ExITNhMSExITNhMSExITEhM2ExITNhQ1FBEUNhMADQUAAA=="
```

### Using E-Control remotes

If you already have your remotes learned on E-Control app you can use this method to "copy" them to Home Assistant.

First get or learn all the remotes you want to add to Home Assistant in E-Control

1. Download

    Get the script from [here](https://github.com/NightRang3r/Broadlink-e-control-db-dump).

2. Dump the data from the app

    Open the E-Control app on your mobile device. On the left side menu choose "Share" and then "Share to other phones in WLAN". It will generate the files you will need for the script.

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

1. Use the E-Control app to learn the codes from all of your suitable remotes. Depending on the remote, try to add useful names for the buttons and/or the remotes. This will mean that you should only have to run this process once and will help with getting them quickly into Home Assistant. Dump the files in the app by navigating to the hamburger icon, select `share and select`, then choose `Share to other phones on WLAN`.

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

6. Now there should be a file with the name of the remote you chose in the same directory ending in `.txt`. Open that up and it will contain the Base64 code required for Home Assistant. To ensure these codes work correctly you may need to add `==` to the end of the code in your `configuration.yaml` file (or wherever you have your switches).

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

   ```bash
   Property: msg.payload
   Format: Mustache template
   Template field: enter '{% raw %}{{payload.data}}{% endraw %}'.
   Output as: Plain text
   ```

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

### Using Node red to Transmit Codes

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
# broadlink_cli --type 0x2737 --host 192.168.1.137 --mac 36668342f7c8
Device file data (to be used with --device @filename in broadlink_cli) :
0x2737 192.168.1.137 36668342nnnn
temperature = 0.0
```

Then use this info in a cli-command:

```bash
./broadlink_cli  --learn --device "0x2737 192.168.1.137 36668342nnnn"
Learning...
```

Press a button on the remote and you get a code:

```txt
260058000001219512131114113910141114111411141114103911391114103911391139103911391039113911141039111411391015103911141114113910141139111410391114110005250001274b11000c520001274b11000d05
Base64: b'JgBYAAABIZUSExEUETkQFBEUERQRFBEUEDkROREUEDkRORE5EDkRORA5ETkRFBA5ERQRORAVEDkRFBEUETkQFBE5ERQQOREUEQAFJQABJ0sRAAxSAAEnSxEADQU='
```

### Conversion of codes from other projects

For old/awkward devices another possibility is to try to get codes by using data gathered by the LIRC project.

Assuming that your (or similar) device is in one of these databases:

- <https://sourceforge.net/p/lirc-remotes/code/ci/master/tree/>
- <https://github.com/probonopd/irdb/tree/master/>

You can grab `irdb2broadlinkha.sh` from [irdb2broadlinkha](https://github.com/molexx/irdb2broadlinkha) project and try to convert codes to format suitable for Home Assistant.
