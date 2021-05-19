---
title: Sony Bravia TV
description: Instructions on how to integrate a Sony Bravia TV into Home Assistant.
ha_category:
  - Media Player
  - Remote
ha_release: 0.23
ha_iot_class: Local Polling
ha_codeowners:
  - '@bieniu'
ha_domain: braviatv
ha_config_flow: true
ha_platforms:
  - media_player
  - remote
---

The `braviatv` platform allows you to control a [Sony Bravia TV](https://www.sony.com/).

Almost all [Sony Bravia TV 2013 and newer](https://info.tvsideview.sony.net/en_ww/home_device.html#bravia) are supported. A more generic method for older TVs connected to a Raspberry Pi with HDMI-CEC is explained further [below](#for-tvs-older-than-2013).

{% include integrations/config_flow.md %}

## Common Issues

### Previous Configurations

To ensure a clean re-configuration, please perform the following steps:

- Ensure that all braviatv entries in `configuration.yaml` have been removed and `bravia.conf` does not exist in your `.homeassistant` folder.
- Remove the entities you are reconfiguring from Home Assistant.
- Restart Home Assistant.
- Perform the [TV does not generate new pin](#tv-does-not-generate-new-pin) steps.
- Retry [configuration](#configuration).

### TV does not generate new pin:

If you have previously set up your TV with any Home Assistant instances, you must remove Home Assistant from your TV in order for your TV to generate a new pin. To do this, you must do **one** of the following:

- On your TV, go to: **Settings** -> **Network** -> **Remote device settings** -> **Deregister remote device**. Disable and re-enable the **Control remotely** after. Menu titles may differ slightly between models. If needed, refer to your specific model's [manual](https://www.sony.com/electronics/support/manuals) for additional guidiance.
- Reset your TV to factory condition.

## Configuration using YAML

<div class='note warning'>

New setups via `configuration.yaml` file are currently not supported.

</div>

If you are updating from a previous version of Home Assistant and have the following configuration in your `configuration.yaml` file in addition to a `bravia.conf` file it will be imported to the Integrations:

```yaml
# Example configuration.yaml entry
media_player:
  - platform: braviatv
    host: IP_ADDRESS
```

{% configuration %}
host:
  description: The IP of the Sony Bravia TV, e.g., 192.168.0.10
  required: true
  type: string
name:
  description: The name to use on the frontend.
  required: false
  default: Sony Bravia TV
  type: string
{% endconfiguration %}

## Remote

When the integration is configured, two entities will be created: a `media_player` and a `remote`. The remote allows you to send key commands to your TV with the `remote.send_command` service.

Some of the known valid key values are (may depend on your TV model):

- Num1
- Num2
- Num3
- Num4
- Num5
- Num6
- Num7
- Num8
- Num9
- Num0
- Num11
- Num12
- Enter
- GGuide
- ChannelUp
- ChannelDown
- VolumeUp
- VolumeDown
- Mute
- TvPower
- Audio
- MediaAudioTrack
- Tv
- Input
- TvInput
- TvAntennaCable
- WakeUp
- PowerOff
- Sleep
- Right
- Left
- SleepTimer
- Analog2
- TvAnalog
- Display
- Jump
- PicOff
- PictureOff
- Teletext
- Video1
- Video2
- AnalogRgb1
- Home
- Exit
- PictureMode
- Confirm
- Up
- Down
- ClosedCaption
- Component1
- Component2
- Wide
- EPG
- PAP
- TenKey
- BSCS
- Ddata
- Stop
- Pause
- Play
- Rewind
- Forward
- DOT
- Rec
- Return
- Blue
- Red
- Green
- Yellow
- SubTitle
- CS
- BS
- Digital
- Options
- Media
- Prev
- Next
- DpadCenter
- CursorUp
- CursorDown
- CursorLeft
- CursorRight
- ShopRemoteControlForcedDynamic
- FlashPlus
- FlashMinus
- DemoMode
- Analog
- Mode3D
- DigitalToggle
- DemoSurround
- AD
- AudioMixUp
- AudioMixDown
- PhotoFrame
- Tv_Radio
- SyncMenu
- Hdmi1
- Hdmi2
- Hdmi3
- Hdmi4
- TopMenu
- PopUpMenu
- OneTouchTimeRec
- OneTouchView
- DUX
- FootballMode
- iManual
- Netflix
- Assists
- FeaturedApp
- FeaturedAppVOD
- GooglePlay
- ActionMenu
- Help
- TvSatellite
- WirelessSubwoofer
- AndroidMenu

## Extra configuration for the integration

The integration allows you to change ignored TV sources from the front end. Enter which Sony Bravia TV integration you want to change options on and press the cog wheel.

### For TVs older than 2013

<div class='note warning'>
  
This is not part of the Bravia TV integration. Extra Configuration does not apply to the steps below.

</div>

Users of TVs older than 2013 have another option for controlling their TV via Home Assistant.

### Using HDMI-CEC

If you have a Raspberry Pi connected to your TV:


{% raw %}

```yaml
switch:
  - platform: command_line
    switches:
      tv_rpi:
        command_on: ssh root@[IP] "echo 'on 0' | cec-client -s"
        command_off: ssh root@[IP] "echo 'standby 0' | cec-client -s"
        command_state: ssh root@[IP] "echo 'pow 0' | cec-client -s |grep 'power status:'"
        value_template: '{{ value == "power status: on" }}'
```

{% endraw %}

Using `cec-client` is a great method to turn your TV off/on, however the trade off is if you're using Kodi, it will no longer be able to control your TV using the TV Remote.

This is because only one process can control the CEC functionality within the Raspberry Pi at a time and running the above commands terminates the functionality inside libCEC within Kodi. Kodi must be restarted for TV remove functionality to work again.

#### Workaround

If your desire is only to turn on your TV, the following "workaround" may be desirable:

Change the 'on' command to a restart for Kodi. This doesn't reboot the Kodi device.

Restarting Kodi will trigger a HDMI-CEC event to bring the TV out of standby. The following can replace your TV 'on' command.

```yaml
command_on: ssh root@[IP] "systemctl restart kodi"
```
