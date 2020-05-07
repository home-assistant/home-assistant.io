---
title: Panasonic Viera
description: Instructions on how to integrate a Panasonic Viera TV with Home Assistant.
ha_category:
  - Media Player
ha_release: 0.17
ha_iot_class: Local Polling
ha_domain: panasonic_viera
ha_codeowners:
  - '@joogps'
ha_config_flow: true
---

The `panasonic_viera` platform allows you to control a Panasonic Viera TV.

## Configuration

To configure your Panasonic Viera TV, head to the **Configuration > Integrations** page. Click on the plus (+) button to add a new integration.

Once the integration is loaded, with your TV turned on and connected to your local network, enter the IP address of your TV and a name of your choice.

If your TV needs to be paired, you will be prompted to type the PIN code that will be displayed on it.

## Manual configuration

If you prefer to use YAML to set up your Panasonic Viera TV, you can still do it. It also allows for some extra settings.

```yaml
# Example configuration.yaml entry
panasonic_viera:
  host: YOUR_TV_IP
```

{% configuration %}
host:
  description: The IP address of your Panasonic Viera TV, e.g., `192.168.1.10`.
  required: true
  type: string
name:
  description: The name you would like to give to the TV entity.
  required: false
  default: Panasonic Viera TV
  type: string
port:
  description: The port number of your Panasonic Viera TV.
  required: false
  default: 55000
  type: integer
listen_port:
  description: The port number where the HTTP server will listen for state updates.
  required: false
  default: 55000
  type: integer
turn_on_action:
  description: Defines an action to turn the TV on. If not specified, a power key signal will try to be sent to the TV. Be aware that it might not work properly with some models.
  required: false
  type: list
{% endconfiguration %}

When you restart Home Assistant, make sure the TV is turned on and connected to your local network. If your TV needs to be paired, you'll need to go to **Configuration > Integrations** to type the PIN code that will be displayed on it and finish the setup.

### Example `turn_on_action`

```yaml
# Example turn_on_action configuration.yaml entry with Wake-on-LAN
panasonic_viera:
  host: YOUR_TV_IP
  name: Living Room TV
  turn_on_action:
    - service: wake_on_lan.send_magic_packet
      data:
        mac: "AA:BB:CC:DD:99:1A"
```

### Example `play_media` script

The `play_media` function can be used to open web pages and other media types (images, movies) via URLs in the TV web browser.

```yaml
# Example play_media script
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
          media_content_id: YOUR_URL
      - delay:
        seconds: 5
      - service: media_player.media_stop
        data:
          entity_id: media_player.living_room_tv
```

### Currently known supported models

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
- TX-55EXW604S
- TX-65EXW784
- TX-L42ET50
- TX-P42STW50
- TX-P50GT30Y
- TX-P50GT60E
- TH-32ES500
- TX-42AS650
- TX55ASW654
- TX-55FZ802B
- TX-55ASM655

If your model is not on the list, give it a test. If everything works correctly, then add it to the list on [GitHub](https://github.com/home-assistant/home-assistant.io/blob/current/source/_integrations/panasonic_viera.markdown).
