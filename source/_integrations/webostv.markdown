---
title: LG webOS Smart TV
description: Instructions on how to integrate a LG webOS Smart TV within Home Assistant.
logo: webos.png
ha_category:
  - Media Player
  - Notifications
ha_iot_class: Local Polling
ha_release: 0.18
ha_codeowners:
  - '@bendavid'
---

The `webostv` platform allows you to control a [LG](https://www.lg.com/) webOS Smart TV.

There is currently support for the following device types within Home Assistant:

- [Media Player](#media-player)
- [Notifications](#notifications)


To begin with enable *LG Connect Apps* feature in *Network* settings of the TV [instructions](https://www.lg.com/uk/support/product-help/CT00008334-1437131798537-others).

Once basic configuration is added to your `configuration.yaml` file. A notification should be visible in the frontend's **Notification** section. Follow the instructions and accept the pairing request on your TV.

Pairing information will be saved to a configuration file `webostv.conf` in the Home Assistant configuration directory. This process is IP address-sensitive, in case the IP address of your TV would change in future.

### Configuration

To add a TV to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
webostv:
```

{% configuration %}
host:
  description: "The IP of the LG webOS Smart TV, e.g., `192.168.0.10`."
  required: true
  type: string
name:
  description: The name you would like to give to the LG webOS Smart TV.
  required: false
  type: string
standby_connection:
  description: Keep connection alive when TV is in standby (this should be set to true if and only if the "Standby+" option is enabled in the TV UI.)
  required: false
  type: boolean
  default: false
turn_on_action:
  description: Defines an [action](/docs/automation/action/) to turn the TV on.
  required: false
  type: string
customize:
  description: List of options to customize.
  required: false
  type: map
  keys:
    sources:
      description: List of hardware and webOS App inputs.
      required: false
      type: list
{% endconfiguration %}

### Example

A full configuration example will look like the sample below:

```yaml
# Example configuration.yaml entry
webostv:
  host: 192.168.0.10
  name: Living Room TV
  standby_connection: true
  turn_on_action:
    service: persistent_notification.create
    data:
      message: "Turn on action"
  customize:
    sources:
      - livetv
      - youtube
      - makotv
      - netflix
        
media_player:

notify:
```

Avoid using `[ ]` in the `name:` of your device.

### Turn on action

Home Assistant is able to turn on a LG webOS Smart TV if you specify an action, like HDMI-CEC or WakeOnLan.

Common for webOS 3.0 and higher would be to use WakeOnLan feature. To use this feature your TV should be connected to your network via Ethernet rather than Wireless and you should enable *LG Connect Apps* feature in *Network* settings of the TV [instructions](https://www.lg.com/uk/support/product-help/CT00008334-1437131798537-others) (or *Mobile App* in *General* settings for older models) (*may vary by version).

On newer models (2017+), WakeOnLan may need to be enabled in the TV settings by going to Settings > General > Mobile TV On > Turn On Via WiFi [instructions](https://support.quanticapps.com/hc/en-us/articles/115005985729-How-to-turn-on-my-LG-Smart-TV-using-the-App-WebOS-).

```yaml
# Example configuration.yaml entry
wake_on_lan: # enables `wake_on_lan` domain

webostv:
  host: 192.168.0.10
  #other settings
  turn_on_action:
    service: wake_on_lan.send_magic_packet
    data:
      mac: "B4:E6:2A:1E:11:0F"

media_player:

notify:
```

Any other [actions](/docs/automation/action/) to power on the device can be configured.

### Sources

To obtain complete list of available sources currently configured on the TV, once the webOS TV is configured and linked, while its powered on head to the **Developer Tools** > **States**, find your `media_player.<name>` and use the sources listed in `source_list:` remembering to split them per line into your `sources:` configuration.

### Change channel through play_media service

The `play_media` service can be used in a script to switch to the specified tv channel. It selects the best matching channel according to the `media_content_id` parameter:

 1. Channel number *(i.e. '1' or '6')*
 2. Exact channel name *(i.e. 'France 2' or 'CNN')*
 3. Substring in channel name *(i.e. 'BFM' in 'BFM TV')*

```yaml
# Example action entry in script to switch to channel number 1
service: media_player.play_media
data:
  entity_id: media_player.lg_webos_smart_tv
  media_content_id: 1
  media_content_type: "channel"

# Example action entry in script to switch to channel including 'TF1' in its name
service: media_player.play_media
data:
  entity_id: media_player.lg_webos_smart_tv
  media_content_id: "TF1"
  media_content_type: "channel"
```

### Next/Previous buttons

The behaviour of the next and previous buttons is different depending on the active source:

 - if the source is 'LiveTV' (television): next/previous buttons act as channel up/down
 - otherwise: next/previous buttons act as next/previous track

### Generic commands and buttons

Available services: `button`, `command`

#### Service `webostv.button`

| Service data attribute | Optional | Description                                             |
|------------------------|----------|---------------------------------------------------------|
| `entity_id`            |       no | Target a specific webostv media player.                 |
| `button`               |       no | Name of the button. Known possible values are `LEFT`, `RIGHT`, `DOWN`, `UP`, `HOME`, `BACK`, `ENTER`, `DASH`, `INFO`, `ASTERISK`, `CC`, `EXIT`, `MUTE`, `RED`, `GREEN`, `BLUE`, `VOLUMEUP`, `VOLUMEDOWN`, `CHANNELUP`, `CHANNELDOWN`, `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9` |
        
#### Service `webostv.command`

| Service data attribute | Optional | Description                                             |
|------------------------|----------|---------------------------------------------------------|
| `entity_id`            |       no | Target a specific webostv media player.                 |
| `command`              |       no | Endpoint for the command, e.g. `media.controls/rewind`.  The full list of known endpoints is available at https://github.com/bendavid/aiopylgtv/blob/master/aiopylgtv/endpoints.py |
        
#### Example

```yaml
script:
  home_button:
    sequence:
      - service: webostv.button
        data:
          entity_id:  media_player.lg_webos_smart_tv
          button: "HOME"

  rewind_command:
    sequence:
      - service: webostv.command
        data:
          entity_id:  media_player.lg_webos_smart_tv
          command: "media.controls/rewind"
```

## Notifications

The `webostv` notify platform allows you to send notifications to a LG webOS Smart TV.

The icon can be overridden for individual notifications by providing a path to an alternative icon image to use:

```yaml
automation:
  - alias: Front door motion
    trigger:
      platform: state
      entity_id: binary_sensor.front_door_motion
      to: 'on'
    action:
      service: notify.livingroom_tv
      data:
        message: "Movement detected: Front Door"
        data:
          icon: "/home/homeassistant/images/doorbell.png"
```
