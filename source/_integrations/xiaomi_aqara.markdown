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

The **Xiaomi Gateway (Aqara)** {% term integration %} allows you to integrate [Xiaomi](https://www.mi.com/en/) Aqara-compatible devices into Home Assistant.

{% note %}
There are two versions of the hub: v1 and v2.

- v1 can be used with Home Assistant without any problems.
- v2 might be less straightforward when it comes to enabling the local API. It might even require you to open up your device to do so. Xiaomi has suggested this is in the pipeline. If you have a Hub 2 and are experiencing issues, check out the [troubleshooting](#troubleshooting) section.
{% endnote %}

## Supported devices

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

## Unsupported devices

- Xiaomi Aqara Gateway (lumi.gateway.aqhm01), as it is not possible to activate dev mode in the Mi Home App.
- Gateway Radio
- Gateway Button
- Xiaomi Mi Air Conditioning Companion (lumi.acpartner.v2)
- Aqara Intelligent Air Conditioner Controller Hub (lumi.acpartner.v1)
- Decoupled mode of the Aqara Wall Switches (Single & Double)
- Additional alarm events of the Gas and Smoke Detector: Analog alarm, battery fault alarm (smoke detector only), sensitivity fault alarm, I2C communication failure

## Setup

Follow the setup process using your phone and Mi-Home app. From here you will be able to retrieve the key (password) from within the app following [this tutorial](https://www.domoticz.com/wiki/Xiaomi_Gateway_(Aqara)#Adding_the_Xiaomi_Gateway_to_Domoticz).

To enable {{ page.title }} in your installation, go to **Settings** > **Devices & services**. Xiaomi Aqara gateways should be discovered automatically and should show up in the overview. Hit configure and go through the steps to specify the optional settings. If your Aqara gateway does not show up automatically, click the + icon in the lower right. Then, search for "xiaomi_aqara" and enter the setup. Multiple gateways can be configured by simply repeating the setup multiple times.

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

## Entities

The Xiaomi Gateway (Aqara) integration supports the following entities.

### Covers

The cover entity allows you to control connected Aquara covers. You can do the following:

- Open the cover.
- Close the cover.
- Stop the cover motion.
- Move the cover to a specific position.
- See the current position of the cover.

### Lights

The light entity allows you to control the internal light of the Xiaomi gateway. The entity is called `light.gateway_light_28ffffffffff`. You can do the following:

- Turn the light on and off.
- Set the brightness.
- Set the color using HS or RGB color coding.

The requirement is that you have setup [Xiaomi aqara](/integrations/xiaomi_aqara/).

### Locks

An Aqara lock cannot be controlled by Home Assistant. However, the lock entity allows you to view the following data:

- The property `changed_by` provides the user/key ID of the last successful unlock.

- If someone tries to unlock the device but fails more than 3 times, the `verified_wrong_times` attribute will be incremented. The counter resets on a successful unlock.

### Binary sensors

The binary sensor entities allow you to get data from your [Xiaomi](https://www.mi.com/en/) binary sensors.

#### Type of binary sensors supported

List of supported binary sensors, including the following properties (if available): name, model no., Zigbee entity, states, and, event, event, key, and event values.

- **Motion Sensor (1st gen)**
  - Model no.: RTCGQ01LM
  - Zigbee entity: motion
  - States: on, off
  - Event: `xiaomi_aqara.motion`

- **Motion Sensor (2nd gen)**
  - Model no.: RTCGQ11LM
  - Zigbee entity: sensor_motion.aq2
  - States: on, off
  - Event: `xiaomi_aqara.motion`

- **Xiaomi Door and Window Sensor (1st gen)**
  - Model no.: MCCGQ01LM
  - Zigbee entity: magnet
  - States: on, off

- **Aqara Door and Window Sensor (2nd gen)**
  - Model no.: MCCGQ11LM
  - Zigbee entity: sensor_magnet.aq2
  - States: on, off

- **Smoke Detector**
  - Model no.: JTYJ-GD-01LM/BW
  - Zigbee entity: smoke
  - States: on, off

- **Gas Leak Detector**
  - Model no.: JTQJ-BF-01LM/BW
  - Zigbee entity: natgas
  - States: on, off

- **Water Leak Sensor**
  - Model no.: SJCGQ11LM
  - Zigbee entity: sensor_wleak.aq1
  - States: on, off

- **Button (1st gen)**
  - Model no.: WXKG01LM
  - Zigbee entity: switch
  - States: on (through long_click_press), off
  - Event: `xiaomi_aqara.click`
  - Event key: `click_type`
  - Event values: `long_click_press`, `hold`, `single`, `double`

- **Button (2nd gen)**
  - Model no.: WXKG11LM
  - Zigbee entity: sensor_switch.aq2, remote.b1acn01
  - States: on (through long_click_press), off
  - Event: `xiaomi_aqara.click`
  - Event key: `click_type`
  - Event values: `single`, `double`, `long_click_press`, `hold`

- **Button (2nd gen, model b)**
  - Model no.: WXKG12LM
  - Zigbee entity: sensor_switch.aq3
  - States: off (always)
  - Event: `xiaomi_aqara.click`
  - Event key: `click_type`
  - Event values: `single`, `double`, `long_click_press`, `shake`

- **Aqara Wireless Switch (Single)**
  - Model no.: WXKG03LM
  - Zigbee entity: 86sw1
  - States: off (always)
  - Event: `xiaomi_aqara.click`
  - Event key: `click_type`
  - Event values: `single`

- **Aqara Wireless Switch (Double)**
  - Model no.: WXKG02LM
  - Zigbee entity: 86sw2
  - States: off (always)
  - Event: `xiaomi_aqara.click`
  - Event key: `click_type`
  - Event values: `single`, `both`

- **Aqara Wireless Switch (Single) (2nd gen)**
  - Model no.: WXKG03LM
  - Zigbee entity: remote.b186acn01
  - States: off (always)
  - Event: `xiaomi_aqara.click`
  - Event key: `click_type`
  - Event values: `single`, `double`, `long`

- **Aqara Wireless Switch (Double) (2nd gen)**
  - Model no.: WXKG02LM
  - Zigbee entity: remote.b286acn01
  - States: off (always)
  - Event: `xiaomi_aqara.click`
  - Event key: `click_type`
  - Event values: `single`, `double`, `long`, `both`, `double_both`, `long_both`

- **Cube**
  - Model no.: MFKZQ01LM
  - Zigbee entity: cube
  - States: off (always)
  - Event: `xiaomi_aqara.cube_action`
  - Event key: `action_type`, `action_value` (rotate)
  - Event values: `flip90`, `flip180`, `move`, `tap_twice`, `shake_air`, `swing`, `alert`, `free_fall`, `rotate` (degrees at action_value)

- **Vibration Sensor**
  - Model no.: DJT11LM
  - Zigbee entity: vibration
  - States: off (always)
  - Event: `xiaomi_aqara.movement`
  - Event key: `movement_type`
  - Event values: `vibrate`, `tilt`, `free_fall`

#### Automation examples for binary sensors

##### Motion

```yaml
- alias: "If there is motion and it's dark turn on the gateway light"
  triggers:
    - trigger: state
      entity_id: binary_sensor.motion_sensor_158d000xxxxxc2
      from: "off"
      to: "on"
  conditions:
    - condition: numeric_state
      entity_id: sensor.illumination_34ce00xxxx11
      below: 300
  actions:
    - action: light.turn_on
      target:
        entity_id: light.gateway_light_34ce00xxxx11
      data:
        brightness: 5
    - action: automation.turn_on
      target:
        entity_id: automation.MOTION_OFF
- alias: "If there no motion for 5 minutes turn off the gateway light"
  triggers:
    - trigger: state
      entity_id: binary_sensor.motion_sensor_158d000xxxxxc2
      from: "on"
      to: "off"
      for:
        minutes: 5
  actions:
    - action: light.turn_off
      target:
        entity_id: light.gateway_light_34ce00xxxx11
    - action: automation.turn_off
      target:
        entity_id: automation.Motion_off
```

##### Door and/or indow binary sensors

```yaml
- alias: "If the window is open turn off the radiator"
  triggers:
    - trigger: state
      entity_id: binary_sensor.door_window_sensor_158d000xxxxxc2
      from: "off"
      to: "on"
  actions:
    - action: climate.set_operation_mode
      target:
        entity_id: climate.livingroom
      data:
        operation_mode: "Off"
- alias: "If the window is closed for 5 minutes turn on the radiator again"
  triggers:
    - trigger: state
      entity_id: binary_sensor.door_window_sensor_158d000xxxxxc2
      from: "on"
      to: "off"
      for:
        minutes: 5
  actions:
    - action: climate.set_operation_mode
      target:
        entity_id: climate.livingroom
      data:
        operation_mode: "Smart schedule"
- alias: "Notify if door is opened when away"
  triggers:
    - trigger: state
      entity_id: binary_sensor.door_window_sensor_15xxxxxxc9xx6b
      from: "off"
      to: "on"
  conditions:
    - condition: state
      entity_id: group.family
      state: "not_home"
  actions:
    - action: notify.notify_person
      data:
        message: "The door has been opened"
```

#### Smoke

```yaml
- alias: "Send notification on fire alarm"
  triggers:
    - trigger: state
      entity_id: binary_sensor.smoke_sensor_158d0001574899
      from: "off"
      to: "on"
  actions:
    - action: notify.html5
      data:
        title: "Fire alarm!"
        message: "Fire/Smoke detected!"
    - action: xiaomi_aqara.play_ringtone
      data:
        gw_mac: xxxxxxxxxxxx
        ringtone_id: 2
        ringtone_vol: 100
```

#### Gas

{% raw %}

```yaml
- alias: "Send notification on gas alarm"
  triggers:
    - trigger: state
      entity_id: binary_sensor.natgas_sensor_158dxxxxxxxxxx
      from: "off"
      to: "on"
  actions:
    - action: notify.html5
      data:
        title: "Gas alarm!"
        message: "Gas with a density of {{ state_attr('binary_sensor.natgas_sensor_158dxxxxxxxxxx', 'density') }} detected."
```

{% endraw %}

#### Xiaomi Wireless Button

There are 3 versions of the Xiaomi Wireless button:

- For the round shaped button, the available events are `single`, `double`, `hold`, `long_click_press` and `long_click_release`.
- Aqara branded buttons are square shaped. Model WXKG11LM only supports `single`, `double`, `long_click_press`and `hold` events. WXKG12LM supports `single`, `double`, `long_click_press` and `shake` events.

For the Aqara versions, the delay between two clicks to generate a double-click must be larger than with the round button. Clicking too quickly generates a single-click event.

```yaml
- alias: "Toggle dining light on single press"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.click
      event_data:
        entity_id: binary_sensor.switch_158d000xxxxxc2
        click_type: single
  actions:
    - action: switch.toggle
      target:
        entity_id: switch.wall_switch_left_158d000xxxxx01
- alias: "Toggle couch light on double click"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.click
      event_data:
        entity_id: binary_sensor.switch_158d000xxxxxc2
        click_type: double
  actions:
    - action: switch.toggle
      target:
        entity_id: switch.wall_switch_right_158d000xxxxx01
- alias: "Let a dog bark on long press"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.click
      event_data:
        entity_id: binary_sensor.switch_158d000xxxxxc2
        click_type: long_click_press
  actions:
    - action: xiaomi_aqara.play_ringtone
      data:
        gw_mac: xxxxxxxxxxxx
        ringtone_id: 8
        ringtone_vol: 8
```

##### Xiaomi Cube

Available events are `flip90`, `flip180`, `move`, `tap_twice`, `shake_air`, `swing`, `alert`, `free_fall` and `rotate`. The integration stores the last action as the attribute `last_action`.

```yaml
- alias: "Cube event flip90"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.cube_action
      event_data:
        entity_id: binary_sensor.cube_15xxxxxxxxxxxx
        action_type: flip90
  actions:
    - action: light.turn_on
      target:
        entity_id: light.gateway_light_28xxxxxxxxxx
      data:
        color_name: "springgreen"
- alias: "Cube event flip180"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.cube_action
      event_data:
        entity_id: binary_sensor.cube_15xxxxxxxxxxxx
        action_type: flip180
  actions:
    - action: light.turn_on
      target:
        entity_id: light.gateway_light_28xxxxxxxxxx
      data:
        color_name: "darkviolet"
- alias: "Cube event move"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.cube_action
      event_data:
        entity_id: binary_sensor.cube_15xxxxxxxxxxxx
        action_type: move
  actions:
    - action: light.turn_on
      target:
        entity_id: light.gateway_light_28xxxxxxxxxx
      data:
        color_name: "gold"
- alias: "Cube event tap_twice"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.cube_action
      event_data:
        entity_id: binary_sensor.cube_15xxxxxxxxxxxx
        action_type: tap_twice
  actions:
    - action: light.turn_on
      target:
        entity_id: light.gateway_light_28xxxxxxxxxx
      data:
        color_name: "deepskyblue"
- alias: "Cube event shake_air"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.cube_action
      event_data:
        entity_id: binary_sensor.cube_15xxxxxxxxxxxx
        action_type: shake_air
  actions:
    - action: light.turn_on
      target:
        entity_id: light.gateway_light_28xxxxxxxxxx
      data:
        color_name: "blue"
```

##### Aqara Wireless Switch

The Aqara Wireless Switch is available as single-key and double-key version. Each key behaves like the Wireless Button limited to the click event `single`. The double key version adds a third device called `binary_sensor.wall_switch_both_158xxxxxxxxx12` which reports a click event called `both` if both keys are pressed.

{% raw %}

```yaml
- alias: "Decrease brightness of the gateway light"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.click
      event_data:
        entity_id: binary_sensor.wall_switch_left_158xxxxxxxxx12
        click_type: single
  actions:
    - action: light.turn_on
      target:
        entity_id: light.gateway_light_34xxxxxxxx13
      data:
        brightness: >-
          {% if state_attr('light.gateway_light_34xxxxxxxx13', 'brightness') %}
            {% if state_attr('light.gateway_light_34xxxxxxxx13', 'brightness') - 60 >= 10 %}
              {{state_attr('light.gateway_light_34xxxxxxxx13', 'brightness') - 60}}
            {% else %}
              {{state_attr('light.gateway_light_34xxxxxxxx13', 'brightness')}}
            {% endif %}
          {% else %}
            10
          {% endif %}

- alias: "Increase brightness of the gateway light"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.click
      event_data:
        entity_id: binary_sensor.wall_switch_right_158xxxxxxxxx12
        click_type: single
  actions:
    - action: light.turn_on
      target:
        entity_id: light.gateway_light_34xxxxxxxx13
      data:
        brightness: >-
          {% if state_attr('light.gateway_light_34xxxxxxxx13', 'brightness') %}
            {% if state_attr('light.gateway_light_34xxxxxxxx13', 'brightness') + 60 <= 255 %}
              {{state_attr('light.gateway_light_34xxxxxxxx13', 'brightness') + 60}}
            {% else %}
              {{state_attr('light.gateway_light_34xxxxxxxx13', 'brightness')}}
            {% endif %}
          {% else %}
            10
          {% endif %}

- alias: "Turn off the gateway light"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.click
      event_data:
        entity_id: binary_sensor.wall_switch_both_158xxxxxxxxx12
        click_type: both
  actions:
    - action: light.turn_off
      target:
        entity_id: light.gateway_light_34xxxxxxxx13
```

{% endraw %}

#### Vibration sensor

This automation toggles the living room lamp on vibration/tilt.

```yaml
- alias: "Turn on Living Room Lamp on vibration"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.movement
      event_data:
        entity_id: binary_sensor.vibration_xxxx000000
        movement_type: vibrate
  actions:
    - action: light.toggle
      target:
        entity_id: light.living_room_lamp
- alias: "Turn on Living Room Lamp on tilt"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.movement
      event_data:
        entity_id: binary_sensor.vibration_xxxx000000
        movement_type: tilt
  actions:
    - action: light.toggle
      target:
        entity_id: light.living_room_lamp
```

### Sensors

The sensor entity allows you to read data from your [Xiaomi](https://www.mi.com/en/) sensors.

The following sensor types are supported:

- Battery level (in percentage)
- Bed activity / vibration (in micrometers)
- Coordination
- Humidity (in percentage)
- Illumination (in lux)
- Power consumed (in kWh)
- Power load (in Watt)
- Pressure (in hPa)
- Temperature (depends on UI settings, Celsius or Fahrenheit)
- Tilt angle

## Switches

The switch entity allows you to get data from your [Xiaomi aqara](https://www.mi.com/en/) switches and to switch between states.

## Actions

The gateway provides the following actions:

### Action `xiaomi_aqara.play_ringtone`

Play a specific ringtone. The version of the gateway firmware must be `1.4.1_145` at least. Take a look at the examples below.

| Data attribute | Optional | Description                             |
| -------------- | -------- | --------------------------------------- |
| `gw_mac`       | no       | MAC address of the Xiaomi Aqara Gateway |
| `ringtone_id`  | no       | One of the allowed ringtone ids         |
| `ringtone_vol` | yes      | The volume in percent                   |

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

### Action `xiaomi_aqara.stop_ringtone`

Stops a playing ringtone immediately.

| Data attribute | Optional | Description                             |
| -------------- | -------- | --------------------------------------- |
| `gw_mac`       | no       | MAC address of the Xiaomi Aqara Gateway |

### Action `xiaomi_aqara.add_device`

Enables the join permission of the Xiaomi Aqara Gateway for 30 seconds. A new device can be added afterwards by pressing the pairing button once.

| Data attribute | Optional | Description                             |
| -------------- | -------- | --------------------------------------- |
| `gw_mac`       | no       | MAC address of the Xiaomi Aqara Gateway |

### Action `xiaomi_aqara.remove_device`

Removes a specific device. The removal is required if a device shall be paired with another gateway.

| Data attribute | Optional | Description                              |
| -------------- | -------- | ---------------------------------------- |
| `gw_mac`       | no       | MAC address of the Xiaomi Aqara Gateway  |
| `device_id`    | no       | Hardware address of the device to remove |

## Examples

### Long press on smart button 1st generation

This example plays the sound of a dog barking when the button is held down and stops the sound when the button is pressed once. Only works for the round button of the 1st generation.

*Note: The sound will stop playing automatically when it has ended.*

```yaml
- alias: "Let a dog bark on long press"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.click
      event_data:
        entity_id: binary_sensor.switch_158d000xxxxxc2
        click_type: long_click_press
  actions:
    - action: xiaomi_aqara.play_ringtone
      data:
        gw_mac: xxxxxxxxxxxx
        ringtone_id: 8
        ringtone_vol: 8

- alias: "Stop barking immediately on single click"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.click
      event_data:
        entity_id: binary_sensor.switch_158d000xxxxxc2
        click_type: single
  actions:
    - action: xiaomi_aqara.stop_ringtone
      data:
        gw_mac: xxxxxxxxxxxx
```

### Double click on smart button

This example toggles the living room lamp on a double click of the button.

```yaml
- alias: "Double Click to toggle living room lamp"
  triggers:
    - trigger: event
      event_type: xiaomi_aqara.click
      event_data:
        entity_id: binary_sensor.switch_158d000xxxxxc2
        click_type: double
  actions:
    - action: light.toggle
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
