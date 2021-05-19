---
title: LG webOS Smart TV
description: Instructions on how to integrate a LG webOS Smart TV within Home Assistant.
ha_category:
  - Media Player
  - Notifications
ha_iot_class: Local Polling
ha_release: 0.18
ha_codeowners:
  - '@bendavid'
ha_domain: webostv
ha_platforms:
  - media_player
  - notify
---

The `webostv` platform allows you to control a [LG](https://www.lg.com/) webOS Smart TV.

There is currently support for the following device types within Home Assistant:

- [Media Player](#media-player)
- [Notifications](#notifications)

To begin with enable *LG Connect Apps* feature in *Network* settings of the TV [instructions](https://www.lg.com/uk/support/product-help/CT00008334-1437131798537-others).

Once basic configuration is added to your `configuration.yaml` file. A notification should be visible in the frontend's **Notification** section. Follow the instructions and accept the pairing request on your TV.

Pairing information will be saved to a configuration file `webostv.conf` in the Home Assistant configuration directory. This process is IP address-sensitive, in case the IP address of your TV would change in future.

## Configuration

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

### Full configuration example

A full configuration example will look like the sample below:

```yaml
# Example configuration.yaml entry
webostv:
  host: 192.168.0.10
  name: Living Room TV
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

### Using multiple TVs

It is also possible to use multiple TVs with this integration.

```yaml
# Example configuration.yaml entry with multiple TVs
webostv:
  - name: Living Room TV
    host: 192.168.1.100
  - name: Bedroom TV
    host: 192.168.1.101
```

Please note, the above provides a minimal example, however, all options are
available for each individual TV.

## Turn on action

Home Assistant is able to turn on a LG webOS Smart TV if you specify an action, like HDMI-CEC or WakeOnLan.

Common for webOS 3.0 and higher would be to use WakeOnLan feature. To use this feature your TV should be connected to your network via Ethernet rather than Wireless and you should enable *LG Connect Apps* feature in *Network* settings of the TV [instructions](https://www.lg.com/uk/support/product-help/CT00008334-1437131798537-others) (or *Mobile App* in *General* settings for older models) (*may vary by version).

On newer models (2017+), WakeOnLan may need to be enabled in the TV settings by going to Settings > General > Mobile TV On > Turn On Via WiFi [instructions](https://support.quanticapps.com/hc/en-us/articles/115005985729-How-to-turn-on-my-LG-Smart-TV-using-the-App-WebOS-).

<div class='note'>
This usually only works if the TV is connected to the same network. Routing the WakeOnLan packet to a different subnet requires special configuration on your router or may not be possible.
</div>

```yaml
# Example configuration.yaml entry
wake_on_lan: # enables `wake_on_lan` integration

webostv:
  host: 192.168.0.10
  #other settings
  turn_on_action:
    service: wake_on_lan.send_magic_packet
    data:
      mac: AA-BB-CC-DD-EE-FF
      broadcast_address: 11.22.33.44

media_player:

notify:
```

Any other [actions](/docs/automation/action/) to power on the device can be configured.

## Sources

To obtain complete list of available sources currently configured on the TV, once the webOS TV is configured and linked, while its powered on head to the **Developer Tools** > **States**, find your `media_player.<name>` and use the sources listed in `source_list:` remembering to split them per line into your `sources:` configuration. If you leave the `sources:` configuration empty, the `media_player` will offer all sources of the TV. If you list a subset of sources in the configuration, only those will be displayed.

Note: it is normal and expected behavior that for a switched-off TV only the Live TV source is offered in the `media_player`, even if you have configured other sources as well. These will show up as soon as the TV is switched on.

## Change channel through play_media service

The `play_media` service can be used in a script to switch to the specified TV channel. It selects the best matching channel according to the `media_content_id` parameter:

 1. Channel number *(i.e., '1' or '6')*
 2. Exact channel name *(i.e., 'France 2' or 'CNN')*
 3. Substring in channel name *(i.e., 'BFM' in 'BFM TV')*

```yaml
# Example action entry in script to switch to channel number 1
service: media_player.play_media
target:
  entity_id: media_player.lg_webos_smart_tv
data:
  media_content_id: 1
  media_content_type: "channel"

# Example action entry in script to switch to channel including 'TF1' in its name
service: media_player.play_media
target:
  entity_id: media_player.lg_webos_smart_tv
data:
  media_content_id: "TF1"
  media_content_type: "channel"
```

## Next/Previous buttons

The behavior of the next and previous buttons is different depending on the active source:

- if the source is 'LiveTV' (television): next/previous buttons act as channel up/down
- otherwise: next/previous buttons act as next/previous track

### Sound output

The current sound output of the TV can be found under the state attributes.
To change the sound output, the following service is available:

#### Service `webostv.select_sound_output`

| Service data attribute | Optional | Description                             |
| ---------------------- | -------- | --------------------------------------- |
| `entity_id`            | no       | Target a specific webostv media player. |
| `sound_output`         | no       | Name of the sound output to switch to.  |

### Generic commands and buttons

Available services: `button`, `command`

### Service `webostv.button`

| Service data attribute | Optional | Description                                                                                                                                                                                                                                                                            |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | Target a specific webostv media player.                                                                                                                                                                                                                                                |
| `button`               | no       | Name of the button. Known possible values are `LEFT`, `RIGHT`, `DOWN`, `UP`, `HOME`, `MENU`, `BACK`, `ENTER`, `DASH`, `INFO`, `ASTERISK`, `CC`, `EXIT`, `MUTE`, `RED`, `GREEN`, `BLUE`, `VOLUMEUP`, `VOLUMEDOWN`, `CHANNELUP`, `CHANNELDOWN`, `PLAY`, `PAUSE`, `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9` |

### Service `webostv.command`

| Service data attribute | Optional | Description                                                                                                                                                                          |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `entity_id`            | no       | Target a specific webostv media player.                                                                                                                                              |
| `command`              | no       | Endpoint for the command, e.g.,  `system.launcher/open`.  The full list of known endpoints is available at <https://github.com/bendavid/aiopylgtv/blob/master/aiopylgtv/endpoints.py> |
| `payload`             | yes      | An optional payload to provide to the endpoint in the format of key value pair(s). |

### Example

```yaml
script:
  home_button:
    sequence:
      - service: webostv.button
        target:
          entity_id:  media_player.lg_webos_smart_tv
        data:
          button: "HOME"

  open_google_command:
    sequence:
      - service: webostv.command
        target:
          entity_id:  media_player.lg_webos_smart_tv
        data:
          command: "system.launcher/open"
          payload:
            target: https://www.google.com
```

## Notifications

The `webostv` notify platform allows you to send notifications to a LG webOS Smart TV.

The icon can be overridden for individual notifications by providing a path to an alternative icon image to use:

```yaml
automation:
  - alias: "Front door motion"
    trigger:
      platform: state
      entity_id: binary_sensor.front_door_motion
      to: "on"
    action:
      service: notify.livingroom_tv
      data:
        message: "Movement detected: Front Door"
        data:
          icon: "/home/homeassistant/images/doorbell.png"
```

## Notes

If Home Assistant and your TV are not on the same network, you need to create a firewall rule, which allows a connection on port 3000 with the TCP protocol from Home Assistant to your TV.
