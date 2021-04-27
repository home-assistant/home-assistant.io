---
title: Philips TV
description: Instructions on how to add Philips TVs to Home Assistant.
ha_category:
  - Media Player
  - Remote
ha_iot_class: Local Polling
ha_release: 0.34
ha_codeowners:
  - '@elupus'
ha_domain: philips_js
ha_config_flow: true
ha_platforms:
  - media_player
  - remote
---

The `philips_js` platform allows you to control Philips TVs which expose the [jointSPACE](http://jointspace.sourceforge.net/) JSON-API.

If your TV responds to `http://IP_ADDRESS_OF_TV:1925/system` then this integration can be used. In the response, you should also be able to see the version of the API the TV uses (`"api_version":{"Major":6...`).
For older TVs follow instructions on how to activate the API and if your model is supported [here](http://jointspace.sourceforge.net/download.html). Note that not all listed, jointSPACE-enabled devices will have JSON-interface running on port 1925. This is true at least for some models before year 2011.

Also, note that version 6 of the API needs to be authenticated by a PIN code displayed on your TV.

{% include integrations/config_flow.md %}

### Features

| Feature            | 1                | 5   | 6 (Android)        | 6 (Saphi)        |
| ------------------ | ---------------- | --- | ------------------ | ---------------- |
| Power On           | WOL / IR Blaster | ?   | Yes (if always on) | WOL / IR Blaster |
| Volume Detect      | Yes              | ?   | Yes (not over CEC) | Yes              |
| Volume Up/Down     | Yes              | ?   | Yes                | Yes              |
| Volume Set         | Yes              | ?   | Yes                | Yes              |
| Source Select      | Yes              | ?   | Yes                | No               |
| Source Detect      | Yes              | ?   | No                 | No               |
| Channel Select     | Yes              | ?   | Yes                | Yes              |
| Channel Detect     | Yes              | ?   | Yes                | No               |
| Channel Favorites  | No               | ?   | Yes                | Yes              |
| Application Select | No               | ?   | Yes                | No               |
| Application Detect | No               | ?   | Yes                | No               |
| Browse URL         | No               | No  | No                 | No               |
| Send Key           | No               | No  | No                 | Yes              |
| Ambilight Control  | No               | No  | No                 | No               |

### Turn on device

The Philips TV does not always support turning on via the API. You can either turn it on via IR blaster or on som models WOL. To trigger this command from the entities, the integration exposes a `device trigger` that can be setup to execute when the `media_player` is asked to turn on.

### Remote

The integration provides a remote entity for sending remote key presses directly to the TV. The following list of commands are available for use with the `remote.send_command` service.

| Command          | Comment                                   |
| ---------------- | ----------------------------------------- |
| Standby          |                                           |
| CursorUp         |                                           |
| CursorDown       |                                           |
| CursorLeft       |                                           |
| CursorRight      |                                           |
| Confirm          |                                           |
| Back             |                                           |
| Exit             |                                           |
| WatchTV          |                                           |
| Home             |                                           |
| Source           |                                           |
| List             |                                           |
| Find             |                                           |
| Options          |                                           |
| Adjust           |                                           |
| RedColour        |                                           |
| GreenColour      |                                           |
| YellowColour     |                                           |
| BlueColour       |                                           |
| Play             |                                           |
| PlayPause        | Mapped to same as Play on Android devices |
| Pause            |                                           |
| FastForward      |                                           |
| Stop             |                                           |
| Rewind           |                                           |
| Record           |                                           |
| ChannelStepUp    |                                           |
| ChannelStepDown  |                                           |
| Digit0           |                                           |
| Digit1           |                                           |
| Digit2           |                                           |
| Digit3           |                                           |
| Digit4           |                                           |
| Digit5           |                                           |
| Digit6           |                                           |
| Digit7           |                                           |
| Digit8           |                                           |
| Digit9           |                                           |
| Dot              |                                           |
| VolumeUp         |                                           |
| VolumeDown       |                                           |
| Mute             |                                           |
| Teletext         |                                           |
| Subtitle         |                                           |
| ClosedCaption    |                                           |
| TvGuide          |                                           |
| Info             |                                           |
| AmbilightOnOff   |                                           |
| Viewmode         |                                           |
| 3dFormat         |                                           |
| Multiview        |                                           |
| PictureStyle     |                                           |
| 3dDepth          |                                           |
| SoundStyle       |                                           |
| SurroundMode     |                                           |
| HeadphonesVolume |                                           |
| 2PlayerGaming    |                                           |
| Setup            |                                           |
| WhiteColour      |                                           |
| PowerOn          |                                           |
| PowerOff         | Mapped to same as Standby on Android      |
| Online           |                                           |
| SmartTV          |                                           |
| PhilipsMenu      |                                           |
