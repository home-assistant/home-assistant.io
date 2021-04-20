---
title: Panasonic Viera
description: Instructions on how to integrate a Panasonic Viera TV with Home Assistant.
ha_category:
  - Media Player
  - Remote
ha_release: 0.17
ha_iot_class: Local Polling
ha_domain: panasonic_viera
ha_config_flow: true
ha_platforms:
  - remote
---

The `panasonic_viera` platform allows you to control a Panasonic Viera TV.

There is currently support for the following device types within Home Assistant:

- Media Player
- [Remote](#remote)

{% include integrations/config_flow.md %}

If your TV needs to be paired, you will be prompted to type the PIN code that will be displayed on it.

To allow your TV to be turned on or controlled while off, enable `Powered On By Apps` in your settings (if available): **Network > TV Remote App Settings**

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
        target:
          entity_id: media_player.living_room_tv
      - service: media_player.play_media
        target:
          entity_id: media_player.living_room_tv
        data:
          media_content_type: "url"
          media_content_id: YOUR_URL
      - delay:
        seconds: 5
      - service: media_player.media_stop
        target:
          entity_id: media_player.living_room_tv
```

### Remote

When the integration is configured, two entities will be created: a `media_player` and a `remote`. The remote allows you to send key commands to your TV with the `remote.send_command` service.

Some of the known valid key values are:

- `up`
- `down`
- `left`
- `right`
- `select`
- `home`
- `back`
- `power`

The list with all known valid keys can be found [here](https://github.com/florianholzapfel/panasonic-viera/blob/521cefadc8e1543514ce41d3d49e9218d1c2302d/panasonic_viera/__init__.py#L35). Additionally, you can also send custom commands, such as `"NRC_HOME-ONOFF"` (which is the same as `home`). Two further undocumented commands are `"NRC_CHG_HDMI1-ONOFF"` and `"NRC_CHG_HDMI1-ONOFF"` for selecting HDMI inputs.

### Currently known supported models

- TC-P50ST50
- TC-P55ST50
- TC-P60S60
- TC-P60ST50 (can't power on)
- TC-P65VT30
- TH-32ES500
- TH-P60ST50A
- TX-32AS520E
- TX-32DSX609
- TX-40CXE720
- TX-40DX600
- TX-40DX700B
- TX-42AS650
- TX-49DX650B
- TX-50DX700B
- TX-55ASM655
- TX-55ASW654
- TX-55CX680B
- TX-55CX700E
- TX-55EXW584
- TX-55EXW604S
- TX-55FX680W
- TX-55FZ802B
- TX-58AX802B
- TX-58DX700B
- TX-65CX800E
- TX-65EXW784
- TX-65FX720W
- TX-L42ET50
- TX-L47ET60E (can't power on)
- TX-P42STW50
- TX-P42VT30E
- TX-P50GT30Y
- TX-P50GT60E

If your model is not on the list, give it a test. If everything works correctly, then add it to the list on [GitHub](https://github.com/home-assistant/home-assistant.io/blob/current/source/_integrations/panasonic_viera.markdown).
