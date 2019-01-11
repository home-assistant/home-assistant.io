---
layout: page
title: "Xiaomi Gateway (Aqara)"
description: "Instructions for how to integrate the Xiaomi Gateway (Aqara) within Home Assistant."
date: 2017-07-21 16:34
sidebar: true
comments: false
sharing: true
footer: true
logo: xiaomi.png
ha_category: Hub
ha_release: "0.57"
ha_iot_class: "Local Push"
redirect_from: /components/xiaomi/
---

The `xiaomi_aqara` component allows you to integrate [Xiaomi](http://www.mi.com/en/) Aqara-compatible devices into Home Assistant.

#### {% linkable_title Supported Devices %}

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
- Plug aka Socket (Zigbee version, reports power consumed, power load, statem and if device in use)
- Smoke Detector (reports alarm and density)
- Temperature and Humidity Sensor (1st and 2nd generation)
- Vibration Sensor
- Wall Plug (reports power consumed, power load, and state)
- Water Leak Sensor
- Xiaomi Mijia Gateway (lumi.gateway.v2, lumi.gateway.v3)

#### {% linkable_title Unsupported Devices %}

- Xiaomi Aqara Gateway (lumi.gateway.aqhm01), as it is not possible to activate dev mode in the Mi Home App.
- Gateway Radio
- Gateway Button
- Xiaomi Mi Air Conditioning Companion (lumi.acpartner.v2)
- Aqara Intelligent Air Conditioner Controller Hub (lumi.acpartner.v1)
- Decoupled mode of the Aqara Wall Switches (Single & Double)
- Additional alarm events of the Gas and Smoke Detector: Analog alarm, battery fault alarm (smoke detector only), sensitivity fault alarm, I2C communication failure

## {% linkable_title Setup %}

Follow the setup process using your phone and Mi-Home app. From here you will be able to retrieve the key (password) from within the app following [this tutorial](https://www.domoticz.com/wiki/Xiaomi_Gateway_(Aqara)#Adding_the_Xiaomi_Gateway_to_Domoticz).

To enable {{ page.title }} in your installation, add the following to your `configuration.yaml` file:

### {% linkable_title One Gateway %}

```yaml
# You can leave MAC empty if you only have one gateway.
xiaomi_aqara:
  discovery_retry: 5
  gateways:
    - key: xxxxxxxxxxxxxxxx
```

### {% linkable_title Multiple Gateways %}

```yaml
# 12 characters MAC can be obtained from the gateway.
xiaomi_aqara:
  gateways:
    - mac: xxxxxxxxxxxx
      key: xxxxxxxxxxxxxxxx
    - mac: xxxxxxxxxxxx
      key: xxxxxxxxxxxxxxxx
```

### {% linkable_title Search for gateways on specific interface %}

```yaml
# 12 characters MAC can be obtained from the gateway.
xiaomi_aqara:
  interface: '192.168.0.1'
  gateways:
    - mac: xxxxxxxxxxxx
      key: xxxxxxxxxxxxxxxx
```

{% configuration %}
gateways:
  description: A list of gateways to set up.
  required: true
  type: map
  keys:
    mac:
      description: The MAC address of your gateway. Needs to be formatted without ":". *Optional if only using one gateway.*
      required: false
      type: string
    key:
      description: The key of your gateway. *Optional if only using sensors and/or binary sensors.*
      required: false
      type: string
    host:
      description: The host/IP address of the gateway. If this parameter is used the multicast discovery of the gateway is skipped.
      required: false
      type: string
    disable:
      description: Disable the gateway. This is only useful if you don't want to integrate a specific gateway.
      required: false
      type: boolean
      default: false
discovery_retry:
  description: Number of times that Home Assistant should try to reconnect to the gateway.
  required: false
  type: integer
  default: 3
interface:
  description: Which network interface to use.
  required: false
  type: string
  default: any
{% endconfiguration %}

### {% linkable_title Services %}

The gateway provides the following services:

#### {% linkable_title Service `xiaomi_aqara.play_ringtone` %}

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

#### {% linkable_title Service `xiaomi_aqara.stop_ringtone` %}

Stops a playing ringtone immediately.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `gw_mac`                  |       no | MAC address of the Xiaomi Aqara Gateway               |

#### {% linkable_title Service `xiaomi_aqara.add_device` %}

Enables the join permission of the Xiaomi Aqara Gateway for 30 seconds. A new device can be added afterwards by pressing the pairing button once.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `gw_mac`                  |       no | MAC address of the Xiaomi Aqara Gateway               |

#### {% linkable_title Service `xiaomi_aqara.remove_device` %}

Removes a specific device. The removal is required if a device shall be paired with another gateway.

| Service data attribute    | Optional | Description                                           |
|---------------------------|----------|-------------------------------------------------------|
| `gw_mac`                  |       no | MAC address of the Xiaomi Aqara Gateway               |
| `device_id`               |       no | Hardware address of the device to remove              |

## {% linkable_title Examples %}

### {% linkable_title Long Press on Smart Button 1st Generation %}

This example plays the sound of a dog barking when the button is held down and stops the sound when the button is pressed once. Only works for the round button of the 1st generation.

*Note: The sound will stop playing automatically when it has ended.*

```yaml
- alias: Let a dog bark on long press
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

- alias: Stop barking immediately on single click
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

### {% linkable_title Double Click on Smart Button %}

This example toggles the living room lamp on a double click of the button.

```yaml
- alias: Double Click to toggle living room lamp
  trigger:
    platform: event
    event_type: xiaomi_aqara.click
    event_data:
      entity_id: binary_sensor.switch_158d000xxxxxc2
      click_type: double
  action:
    service: light.toggle
    data:
      entity_id: light.living_room_lamp
```


## {% linkable_title Troubleshooting %}

### {% linkable_title Initial setup problem %}

If you run into trouble initializing the gateway with your app, try another smartphone. E.g., it didn't work on an OnePlus 3, but it worked with a Nexus 5.

### {% linkable_title Connection problem %}

```bash
2017-08-20 16:51:19 ERROR (SyncWorker_0) [homeassistant.components.xiaomi] No gateway discovered
2017-08-20 16:51:20 ERROR (MainThread) [homeassistant.setup] Setup failed for xiaomi: Component failed to initialize.
```

That means that Home Assistant is not getting any response from your Xiaomi gateway. Might be a local network problem or your firewall.
- Make sure you have [enabled LAN access](https://www.domoticz.com/wiki/Xiaomi_Gateway_(Aqara)#Adding_the_Xiaomi_Gateway_to_Domoticz).
- Turn off the firewall on the system where Home Assistant is running.
- Ensure your router supports multicast as this is a requirement of the Xiaomi Gateway.
- Try to leave the MAC address `mac:` blank.
- Try to set `discovery_retry: 10`.
- Try to disable and then enable LAN access.
- Hard reset the gateway: Press the button of the gateway 30 seconds and start again from scratch.
- If you are using Home Assistant in [Docker](/docs/installation/docker/), make sure to use `--net=host`.
- If you receive an `{"error":"Invalid key"}` in your log while trying to control the gateway light
  - You should generate the key again using an Android Phone or alternatively an emulator such as [bluestacks](https://www.bluestacks.com). In some instances there is an issue with keys being generated using the iOS application.
  - You need to make sure to have multicast support on your network. If you are running Home Assistant in a virtual machine (like Proxmox), try `echo 0 >/sys/class/net/vmbr0/bridge/multicast_snooping` on the host and restart the service or reboot the host.
- If the required library "PyXiaomiGateway" cannot be installed you will need to install some missing system dependencies `python3-dev`, `libssl-dev`, `libffi-dev` manually (e.g., `$ sudo apt-get install python3-dev libssl-dev libffi-dev`).
