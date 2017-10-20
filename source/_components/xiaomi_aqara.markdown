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
ha_release: "0.50"
ha_iot_class: "Local Push"
redirect_from: /components/xiaomi/
---

The `xiaomi_aqara` component allows you to integrate [Xiaomi](http://www.mi.com/en/) Aqara-compatible devices into Home Assistant.

#### {% linkable_title Supported Devices %}

- Temperature and Humidity Sensor (1st and 2nd generation)
- Motion Sensor (1st and 2nd generation)
- Door and Window Sensor (1st and 2nd generation)
- Button (1st and 2nd generation)
- Plug aka Socket (Zigbee version, reports power consumed, power load, state and if device in use)
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

#### {% linkable_title Unsupported Devices %}

- Gateway Radio
- Gateway Button
- Aqara Air Conditioning Companion
- Aqara Intelligent Air Conditioner Controller Hub
- Decoupled mode of the Aqara Wall Switches (Single & Double)
- Additional alarm events of the Gas and Smoke Detector: Analog alarm, battery fault alarm (smoke detector only), sensitivity fault alarm, I2C communication failure

## Setup

Follow the setup process using your phone and Mi-Home app. From here you will be able to retrieve the key from within the app following [this tutorial](https://community.home-assistant.io/t/beta-xiaomi-gateway-integration/8213/1832).

To enable {{ page.title }} in your installation, add the following to your `configuration.yaml` file:

### {% linkable_title One Gateway %}

```yaml
# You can leave mac empty if you only have one gateway.
xiaomi_aqara:
  gateways:
    - mac:
      key: xxxxxxxxxxxxxxxx
```

### {% linkable_title Multiple Gateways %}

```yaml
# 12 characters mac can be obtained from the gateway.
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
  mac:
    description: The MAC address of your gateway. *Optional if only using one gateway.*
    required: false
    type: string
  key:
    description: The key of your gateway. *Optional if only using sensors and/or binary sensors.*
    required: false
    type: string
  discovery_retry:
    description: Number of times that Home Assistant should try to reconnect to the gateway.
    required: false
    type: int
    default: 3
  interface:
    description: Which network interface to use.
    required: false
    type: string
    default: any
  host:
    description: The host / ip address of the gateway. If this parameter is used the multicast discovery of the gateway is skipped.
    required: false
    type: string    
{% endconfiguration %}

### {% linkable_title Services %}

The gateway provides two services: `xiaomi_aqara.play_ringtone` and `xiaomi_aqara.stop_ringtone`. To play ringtones by Home Assistant, the version of the gateway firmware must be `1.4.1_145` at least. A `ringtone_id` and `gw_mac` must be supplied. The parameter `ringtone_vol` (percent) is optional. Allowed values of the `ringtone_id` are:

- alarm ringtones [0-8]
- doorbell ring [10-13]
- alarm clock [20-29]
- custom ringtones (uploaded by the Mi Home app) starting from 10001

## {% linkable_title Examples %}

### Long Press on Smart Button

This example plays the sound of a dog barking when the button is held down,
and stops the sound when the button is pressed once.
*Note: The sound will stop playing automatically when it has ended.*

```yaml
- alias: Let a dog bark on long press
  trigger:
    platform: event
    event_type: click
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
    event_type: click
    event_data:
      entity_id: binary_sensor.switch_158d000xxxxxc2
      click_type: single
  action:
    service: xiaomi_aqara.stop_ringtone
    data:
      gw_mac: xxxxxxxxxxxx
```

## {% linkable_title Troubleshooting %}

### {% linkable_title Initial setup problem %}

If you run into trouble initializing the gateway with your app, try another smartphone. I had trouble with the OnePlus 3, but it worked with a Nexus 5.

### {% linkable_title Connection problem %}

```bash
2017-08-20 16:51:19 ERROR (SyncWorker_0) [homeassistant.components.xiaomi] No gateway discovered
2017-08-20 16:51:20 ERROR (MainThread) [homeassistant.setup] Setup failed for xiaomi: Component failed to initialize.
```

That means that Home Assistant is not getting any response from your Xiaomi gateway. Might be a local network problem or your firewall.
- Make sure you have [enabled LAN access](https://community.home-assistant.io/t/beta-xiaomi-gateway-integration/8213/1832).
- Turn off the firewall on the system where Home Assistant is running.
- Ensure your router supports multicast as this is a requirement of the Xiaomi GW
- Try to leave the MAC address `mac:` blank.
- Try to set `discovery_retry: 10`.
- Try to disable and then enable LAN access.
- Hard reset the gateway: Press the button of the gateway 30 seconds and start again from scratch.
