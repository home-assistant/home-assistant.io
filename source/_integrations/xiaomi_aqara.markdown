---
title: Xiaomi Gateway (Aqara)
description: Instructions for how to integrate the Xiaomi Gateway (Aqara) within Home Assistant.
ha_category:
  - Hub
ha_release: 0.57
ha_iot_class: Local Push
ha_codeowners:
  - '@danielhiversen'
  - '@syssi'
ha_domain: xiaomi_aqara
ha_config_flow: true
ha_zeroconf: true
ha_platforms:
  - binary_sensor
  - cover
  - light
  - lock
  - sensor
  - switch
ha_integration_type: integration
---

The `xiaomi_aqara` integration allows you to integrate [Xiaomi](https://www.mi.com/en/) Aqara-compatible devices into Home Assistant.

Please note, there are two versions of the hub: v1 and v2. v1 can be used with Home Assistant without any problems, however, v2 might be less straight forward when it comes to enabling the local API, and might even require you to open up your device in order to do so. Xiaomi has suggested this is in the pipeline.

## Supported Devices

- Aqara Air Conditioning Companion (lumi.acpartner.v3)
- Aqara Intelligent Door Lock (lock.aq1)
- Aqara Wall Switch (Double)
- Aqara Wall Switch (Single)
- Aqara Wall Switch LN (Double)
- Aqara Wall Switch LN (Single)
- Aqara Wireless Switch (Double)
- Aqara Wireless Switch (Single)
- Battery
- Button 1st generation (Single, Double, Long Click)
- Button 2nd generation (Single, Double)
- Cube
- Door and Window Sensor (1st and 2nd generation)
- Gas Leak Detector (reports alarm and density)
- Gateway (Light, Illumination Sensor, Ringtone play)
- Intelligent Curtain
- Motion Sensor (1st and 2nd generation)
- Plug aka Socket (Zigbee version, reports power consumed, power load, state and if the device is in use)
- Smoke Detector (reports alarm and density)
- Temperature and Humidity Sensor (1st and 2nd generation)
- Vibration Sensor
- Wall Plug (reports power consumed, power load, and state)
- Water Leak Sensor
- Xiaomi Mijia Gateway (lumi.gateway.v2, lumi.gateway.v3)

## Unsupported Devices

- Xiaomi Aqara Gateway (lumi.gateway.aqhm01), as it is not possible to activate dev mode in the Mi Home App.
- Gateway Radio
- Gateway Button
- Xiaomi Mi Air Conditioning Companion (lumi.acpartner.v2)
- Aqara Intelligent Air Conditioner Controller Hub (lumi.acpartner.v1)
- Decoupled mode of the Aqara Wall Switches (Single & Double)
- Additional alarm events of the Gas and Smoke Detector: Analog alarm, battery fault alarm (smoke detector only), sensitivity fault alarm, I2C communication failure

## Setup

Follow the setup process using your phone and Mi-Home app. From here you will be able to retrieve the key (password) from within the app following [this tutorial](https://www.domoticz.com/wiki/Xiaomi_Gateway_(Aqara)#Adding_the_Xiaomi_Gateway_to_Domoticz).

To enable {{ page.title }} in your installation, go to **Settings** -> **Devices & Services**. Xiaomi Aqara gateways should be discovered automatically and should show up in the overview. Hit configure and go through the steps to specify the optional settings. If your aqara gateway does not show up automatically, click the + icon in the lower right. Then search for "xiaomi_aqara" and enter the setup. Multiple gateways can be configured by simply repeating the setup multiple times.

{% configuration %}
interface:
  description: Which network interface to use.
  required: false
  type: string
  default: any
key:
  description: The key of your gateway. *Optional if only using sensors and/or binary sensors.*
  required: false
  type: string
name:
  description: Name of the Gateway
  required: false
  type: string
{% endconfiguration %}

### Services

The gateway provides the following services:

#### Service `xiaomi_aqara.play_ringtone`

Play a specific ringtone. The version of the gateway firmware must be `1.4.1_145` at least. Take a look at the examples below.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `gw_mac`                  |       no | MAC address of the Xiaomi Aqara Gateway               |
| `ringtone_id`             |       no | One of the allowed ringtone ids                       |
| `ringtone_vol`            |      yes | The volume in percent                                 |

Allowed values of the `ringtone_id` are:

- Alarms
  - 0 - Police car 1
  - 1 - Police car 2
  - 2 - Accident
  - 3 - Countdown
  - 4 - Ghost
  - 5 - Sniper rifle
  - 6 - Battle
  - 7 - Air raid
  - 8 - Bark
- Doorbells
  - 10 - Doorbell
  - 11 - Knock at a door
  - 12 - Amuse
  - 13 - Alarm clock
- Alarm clock
  - 20 - MiMix
  - 21 - Enthusiastic
  - 22 - GuitarClassic
  - 23 - IceWorldPiano
  - 24 - LeisureTime
  - 25 - ChildHood
  - 26 - MorningStreamLiet
  - 27 - MusicBox
  - 28 - Orange
  - 29 - Thinker
- Custom ringtones (uploaded by the Mi Home app) starting from 10001

#### Service `xiaomi_aqara.stop_ringtone`

Stops a playing ringtone immediately.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `gw_mac`                  |       no | MAC address of the Xiaomi Aqara Gateway               |

#### Service `xiaomi_aqara.add_device`

Enables the join permission of the Xiaomi Aqara Gateway for 30 seconds. A new device can be added afterwards by pressing the pairing button once.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `gw_mac`                  |       no | MAC address of the Xiaomi Aqara Gateway               |

#### Service `xiaomi_aqara.remove_device`

Removes a specific device. The removal is required if a device shall be paired with another gateway.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `gw_mac`                  |       no | MAC address of the Xiaomi Aqara Gateway               |
| `device_id`               |       no | Hardware address of the device to remove              |

## Examples

### Long Press on Smart Button 1st Generation

This example plays the sound of a dog barking when the button is held down and stops the sound when the button is pressed once. Only works for the round button of the 1st generation.

*Note: The sound will stop playing automatically when it has ended.*

```yaml
- alias: "Let a dog bark on long press"
  trigger:
    platform: event
    event_type: xiaomi_aqara.click
    event_data:
      entity_id: binary_sensor.switch_158d000xxxxxc2
      click_type: long_click_press
  action:
    service: xiaomi_aqara.play_ringtone
    data:
      gw_mac: xxxxxxxxxxxx
      ringtone_id: 8
      ringtone_vol: 8

- alias: "Stop barking immediately on single click"
  trigger:
    platform: event
    event_type: xiaomi_aqara.click
    event_data:
      entity_id: binary_sensor.switch_158d000xxxxxc2
      click_type: single
  action:
    service: xiaomi_aqara.stop_ringtone
    data:
      gw_mac: xxxxxxxxxxxx
```

### Double Click on Smart Button

This example toggles the living room lamp on a double click of the button.

```yaml
- alias: "Double Click to toggle living room lamp"
  trigger:
    platform: event
    event_type: xiaomi_aqara.click
    event_data:
      entity_id: binary_sensor.switch_158d000xxxxxc2
      click_type: double
  action:
    service: light.toggle
    target:
      entity_id: light.living_room_lamp
```

## Troubleshooting

### Initial setup problem

If you run into trouble initializing the gateway with your app, try another smartphone. E.g., it didn't work on an OnePlus 3, but it worked with a Nexus 5.

### Connection problem

```bash
2017-08-20 16:51:19 ERROR (SyncWorker_0) [homeassistant.components.xiaomi] No gateway discovered
2017-08-20 16:51:20 ERROR (MainThread) [homeassistant.setup] Setup failed for xiaomi: Component failed to initialize.
```

That means that Home Assistant is not getting any response from your Xiaomi gateway. Might be a local network problem or your firewall.

- Make sure you have [enabled LAN access](https://www.domoticz.com/wiki/Xiaomi_Gateway_(Aqara)#Adding_the_Xiaomi_Gateway_to_Domoticz).
- Turn off the firewall on the system where Home Assistant is running.
- Ensure your router supports multicast as this is a requirement of the Xiaomi Gateway.
- Try to disable and then enable LAN access.
- Hard reset the gateway: Press the button of the gateway 30 seconds and start again from scratch.
- If you are using Home Assistant in [Docker](/docs/installation/docker/), make sure to use `--net=host`.
- If you receive an `{"error":"Invalid key"}` in your log while trying to control the gateway light
  - You should generate the key again using an Android Phone or alternatively an emulator such as [bluestacks](https://www.bluestacks.com). In some instances, there is an issue with keys being generated using the iOS application.
  - You need to make sure to have multicast support on your network. If you are running Home Assistant in a virtual machine (like Proxmox), try `echo 0 >/sys/class/net/vmbr0/bridge/multicast_snooping` on the host and restart the service or reboot the host.
- If the required library "PyXiaomiGateway" cannot be installed you will need to install some missing system dependencies `python3-dev`, `libssl-dev`, `libffi-dev` manually (e.g., `$ sudo apt-get install python3-dev libssl-dev libffi-dev`).

If your gateway's MAC address starts with `04:CF:8C` or `7C:49:EB`, there is a good chance that the required port `9898` is closed on your gateway and thus, this method doesn't work. There are workarounds available online, however this requires soldering and working with electricity.
