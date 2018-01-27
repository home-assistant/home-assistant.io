---
layout: page
title: "Panasonic Viera TV"
description: "Instructions on how to integrate a Panasonic Viera TV into Home Assistant."
date: 2016-03-17 13:04
sidebar: true
comments: false
sharing: true
footer: true
logo: panasonic.png
ha_category: Media Player
featured: false
ha_release: 0.17
ha_iot_class: "Local Polling"
---

The `panasonic_viera` platform allows you to control a Panasonic Viera TV.

Currently known supported models:

- TX-P42STW50
- TC-P65VT30
- TX-55CX700E
- TX-49DX650B
- TX-50DX700B
- TX-L42ET50
- TX-P50GT60E
- TX-65EXW784
- TX-32AS520E

If your model is not on the list then give it a test, if everything works correctly then add it to the list on [GitHub](https://github.com/home-assistant/home-assistant.io).

Some Panasonic Viera TVs allow Home Assistant to turn them on, if you specify the MAC address with `mac:`.

To add a TV to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: panasonic_viera
    host: 192.168.0.10
```

Configuration variables:

- **host** (*Required*): The IP of the Panasonic Viera TV, e.g. `192.168.0.10`.
- **port** (*Optional*): The port number of your Panasonic Viera TV. Defaults to `55000`.
- **mac** (*Optional*): The MAC address of your Panasonic Viera TV, e.g. `AA:BB:CC:DD:99:1A`.
- **name** (*Optional*): The name you would like to give to the Panasonic Viera TV.

### {% linkable_title Example `play_media` script %}

The `play_media` function can be used to open web pages and other media types (images, movies) in the TV web browser.

```yaml
# Example play_media script that can be triggered when someone is detected at the door
#
script:
  front_door_camera:
    alias: "Show who's at the door"
    sequence:
      - service: media_player.turn_on
        data:
          entity_id: media_player.living_room_tv
      - service: media_player.play_media
        data:
          entity_id: media_player.living_room_tv
          media_content_type: "url"
          media_content_id: "http://google.com"
      - delay:
        seconds: 5
      - service: media_player.media_stop
        data:
          entity_id: media_player.living_room_tv
```
