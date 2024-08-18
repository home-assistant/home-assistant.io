---
title: Philips TV
description: Instructions on how to add Philips TVs to Home Assistant.
ha_category:
  - Binary sensor
  - Light
  - Media player
  - Remote
ha_iot_class: Local Polling
ha_release: 0.34
ha_codeowners:
  - '@elupus'
ha_domain: philips_js
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - diagnostics
  - light
  - media_player
  - remote
  - switch
ha_integration_type: integration
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
| Ambilight Control  | Yes              | ?   | Yes                | ?                |
| Ambilight Styles   | No               | ?   | Yes                | Yes              |
| Ambilight Measure  | No               | No  | No                 | No               |


### Turn on device

The Philips TV does not always support turning on via the API. You can either turn it on via an IR blaster or on some models using Wake On LAN (WOL). To trigger this command from the entities, the integration exposes a `device trigger` that can be setup to execute when the `media_player` is asked to turn on.

### Remote

The integration provides a remote entity for sending remote key presses directly to the TV. The following list of commands are available for use with the `remote.send_command` action.

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

### Ambilight

The integration exposes a single light entity to control the mode of the ambilight on the TV. It allows setting a fixed background color or switching the TV to one of the lounge modes supported by the TV.

When the light entity is turned on, it is controlling the ambilights, when it is turned off the TV is in control of the ambilight in its standard video-based fashion.

Limits:
 - The integration does not expose current ambilight measured values since it would
overload the event bus in Home Assistant.
 - There is no support to control the standard, non-expert, styles of the TV.

#### Ambilight+Hue

Some TV's allow you to sync the processed ambilight color data to your Philips Hue bridge. This will make your Hue lights sync with the TV ambilight without the need to purchase a Hue Play HDMI Sync Box.
The integration exposes a "Ambilight+Hue" switch entity when your TV supports it which enables you to toggle this.


## Binary sensor

Some newer OS versions support live TV recording functions via the API.
For those TVs, this integration supports two entities:

- New recording available
- Recording ongoing
