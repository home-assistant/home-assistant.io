---
layout: page
title: "LG webOS Smart TV"
description: "Instructions on how to integrate a LG webOS Smart TV within Home Assistant."
date: 2016-04-18 23:24
sidebar: true
comments: false
sharing: true
footer: true
logo: webos.png
ha_category: Media Player
ha_iot_class: "Local Polling"
ha_release: 0.18
---

The `webostv` platform allows you to control a [LG](http://www.lg.com/) webOS
Smart TV.

### {% linkable_title Setup %}

To begin with enable *LG Connect Apps* feature in *Network* settings of the TV
[instructions](http://www.lg.com/uk/support/product-help/CT00008334-1437131798537-others).

Once basic configuration is added to your `configuration.yaml` *Configuration*
card should prompt on your Home Assistants's states.
Follow the instructions and accept pairing request on your TV.

Pairing information will be saved to the `filename:` provided in configuration;
this process is IP sensitive,
in case the IP address of your TV would change in future.

### {% linkable_title Configuration %}

To add a TV to your installation,
add the following to your `configuration.yaml` file:

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
  description: >
    "The filename where the pairing key with the TV should be stored.
    This path is relative to Home Assistant's config directory. **NOTE**:
    When using multiple TVs each TV will need its own unique file."
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

If you do not specify `host:`, all LG webOS Smart TVs within your network will
be auto-discovered.

### {% linkable_title Example %}

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

### {% linkable_title Turn on action %}

Home Assistant is able to turn on a LG webOS Smart TV if you specify an action,
like HDMI-CEC or WakeOnLan.

Common for webOS 3.0 and higher would be to use WakeOnLan feature. To use this
feature your TV should be connected to your network via Ethernet rather than
Wireless and you should enable *LG Connect Apps* feature in *Network* settings
of the TV
[instructions](http://www.lg.com/uk/support/product-help/CT00008334-1437131798537-others)
(or *Mobile App* in *General* settings for older models).

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
        mac: "B4-E6-2A-1E-11-0F"
```

Any other [actions](/docs/automation/action/) to power on the device can be
configured.

### {% linkable_title Sources %}

To obtain complete list of available sources currently configured on the TV,
once the webOS TV is configured and linked, while its powered on head to the
**Developer Tools** > **States**,
find your `media_player.<name>` and use the sources listed in `source_list:`
remembering to split them per line into your `sources:` configuration.

### {% linkable_title Change channel through play_media service %}

The `play_media` service can be used in a script to switch to the specified tv
channel. It selects the best matching cannel according to the `media_content_id`
parameter:

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

### {% linkable_title Next/Previous buttons %}

The behaviour of the next and previsous buttons is different depending on the
active source:

 - if the source is 'LiveTV' (television): next/previous buttons act as channel up/down
 - otherwise: next/previous buttons act as next/previous track
