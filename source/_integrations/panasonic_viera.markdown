---
title: Panasonic Viera TV
description: Instructions on how to integrate a Panasonic Viera TV into Home Assistant.
ha_category:
  - Media Player
ha_release: 0.17
ha_iot_class: Local Polling
ha_domain: panasonic_viera
---

The `panasonic_viera` platform allows you to control a Panasonic Viera TV.

Currently known supported models:

- TC-P50ST50
- TC-P60S60
- TC-P65VT30
- TX-32AS520E
- TX-32DSX609
- TX-49DX650B
- TX-50DX700B
- TX-55CX700E
- TX-55CX680B
- TX-55EXW584
- TX-65EXW784
- TX-L42ET50
- TX-P42STW50
- TX-P50GT30Y
- TX-P50GT60E
- TH-32ES500
- TX-42AS650
- TX55ASW654

If your model is not on the list then give it a test, if everything works correctly then add it to the list on [GitHub](https://github.com/home-assistant/home-assistant.io/blob/current/source/_integrations/panasonic_viera.markdown).

Some Panasonic Viera TVs allow Home Assistant to turn them on, if you specify the MAC address with `mac:`.

Note that your TV has to reside in the same network as your Home Assistant instance for this platform to work. If you have multiple network interfaces on your Home Assistant instance, you may need to specify the `broadcast_address`.

To add a TV to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: panasonic_viera
    host: 192.168.0.10
```

{% configuration %}
host:
  description: The IP of the Panasonic Viera TV, e.g., `192.168.0.10`.
  required: true
  type: string
port:
  description: The port number of your Panasonic Viera TV.
  required: false
  default: 55000
  type: integer
mac:
  description: The MAC address of your Panasonic Viera TV, e.g., `AA:BB:CC:DD:99:1A`.
  required: false
  type: string
broadcast_address:
  description: The broadcast address on which to send the Wake-On-Lan packet.
  required: false
  default: 255.255.255.255
  type: string
app_power:
  description: Set to `true` if your Panasonic Viera TV supports "Turn on via App".
  required: false
  default: false
  type: boolean
name:
  description: The name you would like to give to the Panasonic Viera TV.
  required: false
  default: Panasonic Viera TV
  type: string
{% endconfiguration %}

### Example `play_media` script

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
