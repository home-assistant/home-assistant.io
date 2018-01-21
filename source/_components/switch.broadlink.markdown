---
layout: page
title: "Broadlink RM Switch"
description: "Instructions how to have Broadlink RM switches."
date: 2016-11-22 22:41
sidebar: true
comments: false
sharing: true
footer: true
logo: broadlink.png
ha_category: Switch
ha_release: 0.35
ha_iot_class: "Local Polling"
---

This `Broadlink` switch platform allow to you control Broadlink [devices](http://www.ibroadlink.com/rm/).

To enable it, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
switch:
  - platform: broadlink
    host: IP_ADDRESS
    mac: 'MAC_ADDRESS'
```

Configuration variables:

- **host** (*Required*): The hostname/IP address to connect to.
- **mac** (*Required*):  Device MAC address.
- **timeout** (*Optional*): Timeout in seconds for the connection to the device.
- **friendly_name** (*Optional*): The name used to display the switch in the frontend.
- **type** (*Required for some models*): Switch type. Choose one from: `rm`, `rm2`, `rm_mini`, `rm_pro_phicomm`, `rm2_home_plus`, `rm2_home_plus_gdt`, `rm2_pro_plus`, `rm2_pro_plus2`, `rm2_pro_plus_bl`, `rm_mini_shate`, `sp1`, `sp2`, `honeywell_sp2`, `sp3`, `spmini2`, `spminiplus` or `mp1`.
- **switches** (*Optional*): The array that contains all switches.
  - **identifier** (*Required*): Name of the command switch as slug. Multiple entries are possible.
    - **friendly_name** (*Optional*): The name used to display the switch in the frontend.
    - **command_on** (*Required*): Base64 encoded packet from RM device to take for on.
    - **command_off** (*Required*): Base64 encoded packet from RM device to take for off.
- **slots** (*Optional*): Friendly names of 4 slots of MP1 power strip. If not configured, slot name will be `switch's friendly_name + 'slot {slot_index}'`. e.g 'MP1 slot 1'
  - **slot_1** (*Optional*)
  - **slot_2** (*Optional*)
  - **slot_3** (*Optional*)
  - **slot_4** (*Optional*)

Information about how to install on Windows can be found [here](https://home-assistant.io/components/sensor.broadlink/#microsoft-windows-installation)


### {% linkable_title How to obtain IR/RF packets? %}

Choose Call Service from the Developer Tools. Choose the service `switch.broadlink_learn_command` from the list of **Available services:** and hit **CALL SERVICE**. Press the button on your remote with in 20 seconds. The packet will be printed as a persistent notification in the States page of the web interface.

Example config for `rm`, `rm2`, `rm_mini`, `rm_pro_phicomm`, `rm2_home_plus`, `rm2_home_plus_gdt`, `rm2_pro_plus`, `rm2_pro_plus2`, `rm2_pro_plus_bl` and `rm_mini_shate` devices:

```yaml
switch:
  - platform: broadlink
    host: 192.168.1.2
    mac: 'B4:43:0D:CC:0F:58'
    timeout: 15
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
 
Example config for `sp1`, `sp2`, `honeywell_sp2`, `sp3`, `spmini2` and `spminiplus` devices:

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
    friendly_name: 'Humidifier'
``` 

Example config for `mp1` device:

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

### {% linkable_title Service `broadlink_send_packet` %}

You can use the service `switch.broadlink_send_packet` to directly send IR packets without the need to assign a switch entity for each command.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `packet` | no | String or list of strings that contain the packet data.

Example:

```yaml
script:
  tv_select_source:
    sequence:
      - service: switch.broadlink_send_packet_192_168_0_107
        data:
          packet: 
            - "JgCMAJSSFDYUNhQ2FBEUERQRFBEUERQ2FDYUNhQRFBEUERQRFBEUERQRFDYUERQRFBEUERQRFDYUNhQRFDYUNhQ2FDYUNhQABfWUkhQ2FDYUNhQRFBEUERQRFBEUNhQ2FDYUERQRFBEUERQRFBEUERQ2FBEUERQRFBEUERQ2FDYUERQ2FDYUNhQ2FDYUAA0FAAAAAAAAAAAAAAAA"
            - "JgBGAJSTFDUUNhM2ExITEhMSExITEhM2EzYTNhQRFBEUERQRFBEUNRQ2ExITNhMSExITNhMSExITEhM2ExITNhQ1FBEUNhMADQUAAA=="
``` 

### {% linkable_title Using E-Control Remotes %}

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

    Run `pip install simplejson`. You must install simplejson in the same python version you will use to run the scripts. You can ensure that the current version is installed by attempting to install again and confirming that you see "Requirement already satisfied".

5. Get the data from the device

    Navigate to the folder you downloaded and run `python getBroadlinkSharedData.py`. Follow the steps on screen. NOTE: These scripts were only tested with Python 2.7.

6. Install python-broadlink library:

  1. `git clone https://github.com/mjg59/python-broadlink.git`
  2. `cd python-broadlink`
  3. `sudo python setup.py install`

7. Test the codes
Use the `sendcode` script you have already downloaded to test the codes you got from the device.
You need to edit the script with your RM Pro IP Address and MAC Address and with the code in HEX format.
When run the script, you know the code works when get message .
Code sent...
Not every code works.

8. Convert the HEX codes to base64
Use [this](http://tomeko.net/online_tools/hex_to_base64.php?lang=en1) tool to convert the hex codes to base64 for use with Home Assistant.
