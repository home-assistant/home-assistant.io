---
title: "LG webOS Smart TV"
description: "Instructions on how to integrate a LG webOS Smart TV within Home Assistant."
logo: webos.png
ha_category:
  - Media Player
  - Notifications
ha_iot_class: Local Polling
ha_release: 0.18
---

The `webostv` platform allows you to control a [LG](http://www.lg.com/) webOS Smart TV.

There is currently support for the following device types within Home Assistant:

- [Media Player](#media-player)
- [Notifications](#notifications)

## Media Player

To begin with enable *LG Connect Apps* feature in *Network* settings of the TV [instructions](http://www.lg.com/uk/support/product-help/CT00008334-1437131798537-others).

Once basic configuration is added to your `configuration.yaml` file. A notification should be visible in the frontend's **Notification** section. Follow the instructions and accept the pairing request on your TV.

Pairing information will be saved to the `filename:` provided in the configuration. This process is IP address-sensitive, in case the IP address of your TV would change in future.

### Configuration

To add a TV to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: webostv
```

{% configuration %}
host:
  description: "The IP of the LG webOS Smart TV, e.g., `192.168.0.10`."
  required: false
  type: string
name:
  description: The name you would like to give to the LG webOS Smart TV.
  required: false
  type: string
filename:
  description: "The filename where the pairing key with the TV should be stored. This path is relative to Home Assistant's config directory. **NOTE**: When using multiple TVs each TV will need its own unique file."
  required: false
  type: string
  default: webostv.conf
timeout:
  description: The timeout for communication with the TV in seconds.
  required: false
  type: time
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

If you do not specify `host:`, all LG webOS Smart TVs within your network will be auto-discovered.

### Example

A full configuration example will look like the sample below:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: webostv
    host: 192.168.0.10
    name: Living Room TV
    filename: webostv.conf
    timeout: 5
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
```

Avoid using `[ ]` in the `name:` of your device.

### Turn on action

Home Assistant is able to turn on a LG webOS Smart TV if you specify an action, like HDMI-CEC or WakeOnLan.

Common for webOS 3.0 and higher would be to use WakeOnLan feature. To use this feature your TV should be connected to your network via Ethernet rather than Wireless and you should enable *LG Connect Apps* feature in *Network* settings of the TV [instructions](http://www.lg.com/uk/support/product-help/CT00008334-1437131798537-others) (or *Mobile App* in *General* settings for older models) (*may vary by version).

On newer models (2017+), WakeOnLan may need to be enabled in the TV settings by going to Settings > General > Mobile TV On > Turn On Via WiFi [instructions](https://support.quanticapps.com/hc/en-us/articles/115005985729-How-to-turn-on-my-LG-Smart-TV-using-the-App-WebOS-).

```yaml
# Example configuration.yaml entry
wake_on_lan: # enables `wake_on_lan` domain

media_player:
  - platform: webostv
    host: 192.168.0.10
    #other settings
    turn_on_action:
      service: wake_on_lan.send_magic_packet
      data:
        mac: "B4:E6:2A:1E:11:0F"
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

### Launch application with content

The `play_media` service can be used to launch an application and play content. The `media_content_id` parameter value varies dependent on the application called in the `media_content_type` parameter. The `media_content_type` parameters currently supported are netflix, youtube and url. Examples can be found below:

```yaml
# Example to launch netflix and begin playing a video.
# The ID after watch/ can be found when viewing show in a browser or via a 3rd party database. 
# Unfortunately there is no public Netflix API to look this up on. 
service: media_player.play_media
data:
  entity_id: media_player.lg_webos_smart_tv
  media_content_id: "m=http://www.netflix.com/watch/80095697"
  media_content_type: "netflix"

# Example to launch youtube and being playing a video.
# media_content_id is the YouTube video ID.
service: media_player.play_media
data:
  entity_id: media_player.lg_webos_smart_tv
  media_content_id: "dQw4w9WgXcQ"
  media_content_type: "youtube"

# Example to launch browser and navigate to a URL.
service: media_player.play_media
data:
  entity_id: media_player.lg_webos_smart_tv
  media_content_id: "https://www.home-assistant.io"
  media_content_type: "url"
```

### Next/Previous buttons

The behaviour of the next and previsous buttons is different depending on the active source:

 - if the source is 'LiveTV' (television): next/previous buttons act as channel up/down
 - otherwise: next/previous buttons act as next/previous track

## Notifications

The `webostv` notify platform allows you to send notifications to a LG webOS Smart TV.

When the TV is first connected, you will need to accept Home Assistant on the TV to allow communication.

To add a TV to your installation, add the following to your `configuration.yaml` file and follow the configurator instructions:

```yaml
# Example configuration.yaml entry
notify:
  - platform: webostv
    host: 192.168.0.112
    name: livingroom_tv
    filename: webostv.conf
```

{% configuration %}
host:
  description: The IP of the LG webOS Smart TV, e.g., 192.168.0.10
  required: true
  type: string
name:
  description: The name you would like to give to the LG webOS Smart TV.
  required: true
  type: string
filename:
  description: "The filename where the pairing key with the TV should be stored. This path is relative to Home Assistant's config directory. **NOTE**: When using multiple TVs each TV will need its own unique file."
  required: false
  type: string
  default: webostv.conf
icon:
  description: The path to an image file to use as the icon in notifications.
  required: false
  type: [string, icon]
{% endconfiguration %}

A possible automation could be:

{% raw %}
```yaml
# Example configuration.yaml entry
automation:
  - alias: Open a window
    trigger:
      platform: numeric_state
      entity_id: sensor.netatmo_livingroom_co2
      above: 999
    action:
      service: notify.livingroom_tv
      data:
        message: "You should open a window! (Livingroom Co2: {{ states('sensor.netatmo_livingroom_co2') }}ppm)"
```
{% endraw %}

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
