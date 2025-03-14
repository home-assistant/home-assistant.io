---
title: Samsung Smart TV
description: Instructions on how to integrate a Samsung Smart TV into Home Assistant.
ha_category:
  - Media player
  - Remote
ha_release: 0.13
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@chemelli74'
  - '@epenet'
ha_domain: samsungtv
ha_ssdp: true
ha_platforms:
  - diagnostics
  - media_player
  - remote
ha_zeroconf: true
ha_dhcp: true
ha_integration_type: device
---

The `samsungtv` platform allows you to control a [Samsung Smart TV](https://www.samsung.com/uk/tvs/all-tvs/).

{% include integrations/config_flow.md %}

### Turn on action

If the integration knows the MAC address of the TV from discovery, it will attempt to wake it using wake on LAN when calling turn on. Wake on LAN must be enabled on the TV for this to work. If the TV is connected to a smart strip or requires a more complex turn-on process, a `turn_on` action can be provided that will take precedence over the built-in wake on LAN functionality.

You can create an automation from the user interface, from the device create a new automation and select the  **Device is requested to turn on** automation.
Automations can also be created using an automation action:

```yaml
# Example configuration.yaml entry
wake_on_lan: # enables `wake_on_lan` integration

automation:
  - alias: "Turn On Living Room TV with WakeOnLan"
    triggers:
      - trigger: samsungtv.turn_on
        entity_id: media_player.samsung_smart_tv
    actions:
      - action: wake_on_lan.send_magic_packet
        data:
          mac: aa:bb:cc:dd:ee:ff
```

Any other [actions](/docs/automation/action/) to power on the device can be configured.

### Usage

#### Changing channels

Changing channels can be done by calling the `media_player.play_media` action
with the following payload:

```yaml
entity_id: media_player.samsung_tv
media_content_id: 590
media_content_type: channel
```

#### Selecting a source

It's possible to switch between the 2 sources `TV` and `HDMI`.
Some older models also expose the installed applications through the WebSocket, in which case the source list is adjusted accordingly.

### Remote

The integration supports the `remote` platform. The remote allows you to send key commands to your TV with the `remote.send_command` action. The supported keys vary between TV models.

{% details "Full keycodes list" %}

**Power Keys**
Key|Description
---|-----------
KEY_POWEROFF|PowerOFF
KEY_POWERON|PowerOn
KEY_POWER|PowerToggle
____________

**Input Keys**
Key|Description
---|-----------
KEY_SOURCE|Source
KEY_COMPONENT1|Component1
KEY_COMPONENT2|Component2
KEY_AV1|AV1
KEY_AV2|AV2
KEY_AV3|AV3
KEY_SVIDEO1|SVideo1
KEY_SVIDEO2|SVideo2
KEY_SVIDEO3|SVideo3
KEY_HDMI|HDMI
KEY_FM_RADIO|FMRadio
KEY_DVI|DVI
KEY_DVR|DVR
KEY_TV|TV
KEY_ANTENA|AnalogTV
KEY_DTV|DigitalTV
KEY_AMBIENT|AmbientMode
_____________

**Number Keys**
Key|Description
---|-----------
KEY_1|Key1
KEY_2|Key2
KEY_3|Key3
KEY_4|Key4
KEY_5|Key5
KEY_6|Key6
KEY_7|Key7
KEY_8|Key8
KEY_9|Key9
KEY_0|Key0
___________

**Misc Keys**
Key|Description
---|-----------
KEY_PANNEL_CHDOWN|3D
KEY_ANYNET|AnyNet+
KEY_ESAVING|EnergySaving
KEY_SLEEP|SleepTimer
KEY_DTV_SIGNAL|DTVSignal
______________

**Channel Keys**
Key|Description
---|-----------
KEY_CHUP|ChannelUp
KEY_CHDOWN|ChannelDown
KEY_PRECH|PreviousChannel
KEY_FAVCH|FavoriteChannels
KEY_CH_LIST|ChannelList
KEY_AUTO_PROGRAM|AutoProgram
KEY_MAGIC_CHANNEL|MagicChannel
_____________

**Volume Keys**
Key|Description
---|-----------
KEY_VOLUP|VolumeUp
KEY_VOLDOWN|VolumeDown
KEY_MUTE|Mute
________________

**Direction Keys**
Key|Description
---|-----------
KEY_UP|NavigationUp
KEY_DOWN|NavigationDown
KEY_LEFT|NavigationLeft
KEY_RIGHT|NavigationRight
KEY_RETURN|NavigationReturn/Back
KEY_ENTER|NavigationEnter
KEY_EXIT|NavigationExit
____________

**Media Keys**
Key|Description
---|-----------
KEY_REWIND|Rewind
KEY_STOP|Stop
KEY_PLAY|Play
KEY_FF|FastForward
KEY_REC|Record
KEY_PAUSE|Pause
KEY_LIVE|Live
KEY_QUICK_REPLAY|fnKEY_QUICK_REPLAY
KEY_STILL_PICTURE|fnKEY_STILL_PICTURE
KEY_INSTANT_REPLAY|fnKEY_INSTANT_REPLAY
____________________

**Picture in Picture**
Key|Description
---|-----------
KEY_PIP_ONOFF|PIPOn/Off
KEY_PIP_SWAP|PIPSwap
KEY_PIP_SIZE|PIPSize
KEY_PIP_CHUP|PIPChannelUp
KEY_PIP_CHDOWN|PIPChannelDown
KEY_AUTO_ARC_PIP_SMALL|PIPSmall
KEY_AUTO_ARC_PIP_WIDE|PIPWide
KEY_AUTO_ARC_PIP_RIGHT_BOTTOM|PIPBottomRight
KEY_AUTO_ARC_PIP_SOURCE_CHANGE|PIPSourceChange
KEY_PIP_SCAN|PIPScan
_______

**Modes**
Key|Description
---|-----------
KEY_VCR_MODE|VCRMode
KEY_CATV_MODE|CATVMode
KEY_DSS_MODE|DSSMode
KEY_TV_MODE|TVMode
KEY_DVD_MODE|DVDMode
KEY_STB_MODE|STBMode
KEY_PCMODE|PCMode
____________

**Color Keys**
Key|Description
---|-----------
KEY_GREEN|Green
KEY_YELLOW|Yellow
KEY_CYAN|Cyan
KEY_RED|Red
__________

**Teletext**
Key|Description
---|-----------
KEY_TTX_MIX|TeletextMix
KEY_TTX_SUBFACE|TeletextSubface
______________

**AspectRatio**
Key|Description
---|-----------
KEY_ASPECT|AspectRatio
KEY_PICTURE_SIZE|PictureSize
KEY_4_3|AspectRatio4:3
KEY_16_9|AspectRatio16:9
KEY_EXT14|AspectRatio3:4(Alt)
KEY_EXT15|AspectRatio16:9(Alt)
______________

**Picture Mode**
Key|Description
---|-----------
KEY_PMODE|PictureMode
KEY_PANORAMA|PictureModePanorama
KEY_DYNAMIC|PictureModeDynamic
KEY_STANDARD|PictureModeStandard
KEY_MOVIE1|PictureModeMovie
KEY_GAME|PictureModeGame
KEY_CUSTOM|PictureModeCustom
KEY_EXT9|PictureModeMovie(Alt)
KEY_EXT10|PictureModeStandard(Alt)
_______

**Menus**
Key|Description
---|-----------
KEY_MENU|Menu
KEY_TOPMENU|TopMenu
KEY_TOOLS|Tools
KEY_HOME|Home
KEY_CONTENTS|Contents
KEY_GUIDE|Guide
KEY_DISC_MENU|DiscMenu
KEY_DVR_MENU|DVRMenu
KEY_HELP|Help
_____

**OSD**
Key|Description
---|-----------
KEY_INFO|Info
KEY_CAPTION|Caption
KEY_CLOCK_DISPLAY|ClockDisplay
KEY_SETUP_CLOCK_TIMER|SetupClock
KEY_SUB_TITLE|Subtitle
______

**Zoom**
Key|Description
---|-----------
KEY_ZOOM_MOVE|ZoomMove
KEY_ZOOM_IN|ZoomIn
KEY_ZOOM_OUT|ZoomOut
KEY_ZOOM1|Zoom1
KEY_ZOOM2|Zoom2
____________

**Other Keys**
Key|Description
---|-----------
KEY_WHEEL_LEFT|WheelLeft
KEY_WHEEL_RIGHT|WheelRight
KEY_ADDDEL|Add/Del
KEY_PLUS100|Plus100
KEY_AD|AD
KEY_LINK|Link
KEY_TURBO|Turbo
KEY_CONVERGENCE|Convergence
KEY_DEVICE_CONNECT|DeviceConnect
KEY_11|Key11
KEY_12|Key12
KEY_FACTORY|KeyFactory
KEY_3SPEED|Key3SPEED
KEY_RSURF|KeyRSURF
KEY_FF_|FF_
KEY_REWIND_|REWIND_
KEY_ANGLE|Angle
KEY_RESERVED1|Reserved1
KEY_PROGRAM|Program
KEY_BOOKMARK|Bookmark
KEY_PRINT|Print
KEY_CLEAR|Clear
KEY_VCHIP|VChip
KEY_REPEAT|Repeat
KEY_DOOR|Door
KEY_OPEN|Open
KEY_DMA|DMA
KEY_MTS|MTS
KEY_DNIe|DNIe
KEY_SRS|SRS
KEY_CONVERT_AUDIO_MAINSUB|ConvertAudioMain/Sub
KEY_MDC|MDC
KEY_SEFFECT|SoundEffect
KEY_PERPECT_FOCUS|PERPECTFocus
KEY_CALLER_ID|CallerID
KEY_SCALE|Scale
KEY_MAGIC_BRIGHT|MagicBright
KEY_W_LINK|WLink
KEY_DTV_LINK|DTVLink
KEY_APP_LIST|ApplicationList
KEY_BACK_MHP|BackMHP
KEY_ALT_MHP|AlternateMHP
KEY_DNSe|DNSe
KEY_RSS|RSS
KEY_ENTERTAINMENT|Entertainment
KEY_ID_INPUT|IDInput
KEY_ID_SETUP|IDSetup
KEY_ANYVIEW|AnyView
KEY_MS|MS
KEY_MORE|
KEY_MIC|
KEY_NINE_SEPERATE|
KEY_AUTO_FORMAT|AutoFormat
KEY_DNET|DNET
KEY_MINUS|Minus
_______________

**Auto Arc Keys**
Key|Description
---|-----------
KEY_AUTO_ARC_C_FORCE_AGING|
KEY_AUTO_ARC_CAPTION_ENG|
KEY_AUTO_ARC_USBJACK_INSPECT|
KEY_AUTO_ARC_RESET|
KEY_AUTO_ARC_LNA_ON|
KEY_AUTO_ARC_LNA_OFF|
KEY_AUTO_ARC_ANYNET_MODE_OK|
KEY_AUTO_ARC_ANYNET_AUTO_START|
KEY_AUTO_ARC_CAPTION_ON|
KEY_AUTO_ARC_CAPTION_OFF|
KEY_AUTO_ARC_PIP_DOUBLE|
KEY_AUTO_ARC_PIP_LARGE|
KEY_AUTO_ARC_PIP_LEFT_TOP|
KEY_AUTO_ARC_PIP_RIGHT_TOP|
KEY_AUTO_ARC_PIP_LEFT_BOTTOM|
KEY_AUTO_ARC_PIP_CH_CHANGE|
KEY_AUTO_ARC_AUTOCOLOR_SUCCESS|
KEY_AUTO_ARC_AUTOCOLOR_FAIL|
KEY_AUTO_ARC_JACK_IDENT|
KEY_AUTO_ARC_CAPTION_KOR|
KEY_AUTO_ARC_ANTENNA_AIR|
KEY_AUTO_ARC_ANTENNA_CABLE|
KEY_AUTO_ARC_ANTENNA_SATELLITE|
____________

**Panel Keys**
Key|Description
---|-----------
KEY_PANNEL_POWER|
KEY_PANNEL_CHUP|
KEY_PANNEL_VOLUP|
KEY_PANNEL_VOLDOW|
KEY_PANNEL_ENTER|
KEY_PANNEL_MENU|
KEY_PANNEL_SOURCE|
KEY_PANNEL_ENTER|
_______________

**Extended Keys**
Key|Description
---|-----------
KEY_EXT1|
KEY_EXT2|
KEY_EXT3|
KEY_EXT4|
KEY_EXT5|
KEY_EXT6|
KEY_EXT7|
KEY_EXT8|
KEY_EXT11|
KEY_EXT12|
KEY_EXT13|
KEY_EXT16|
KEY_EXT17|
KEY_EXT18|
KEY_EXT19|
KEY_EXT20|
KEY_EXT21|
KEY_EXT22|
KEY_EXT23|
KEY_EXT24|
KEY_EXT25|
KEY_EXT26|
KEY_EXT27|
KEY_EXT28|
KEY_EXT29|
KEY_EXT30|
KEY_EXT31|
KEY_EXT32|
KEY_EXT33|
KEY_EXT34|
KEY_EXT35|
KEY_EXT36|
KEY_EXT37|
KEY_EXT38|
KEY_EXT39|
KEY_EXT40|
KEY_EXT41|

Please note that some codes are different on the 2016+ TVs. For example, `KEY_POWEROFF` is `KEY_POWER` on the newer TVs.

The code list has been extracted from: https://github.com/kdschlosser/samsungctl and https://github.com/jaruba/ha-samsungtv-tizen/blob/master/Key_codes.md
{% enddetails %}

**Example to send sequence of commands:**

```yaml
action: remote.send_command
target:
  device_id: 72953f9b4c9863e28ddd52c87dcebe05
data:
  command:
    - KEY_MENU
    - KEY_RIGHT
    - KEY_UP
    - KEY_UP
    - KEY_ENTER

```

### Known issues and restrictions

#### Subnet/VLAN

Samsung SmartTV does not allow WebSocket connections across different subnets or VLANs. If your TV is not on the same subnet as Home Assistant this will fail.
It may be possible to bypass this issue by using IP masquerading or a proxy.

#### H and J models

Some televisions from the H and J series use an encrypted protocol and require manual pairing with the TV. This should be detected automatically when attempting to send commands using the WebSocket connection, and trigger the corresponding authentication flow.

#### Samsung TV keeps asking for permission

The default setting on newer televisions is to ask for permission on every connection attempt.
To avoid this behavior, please ensure that you adjust this to `First time only` in the `Device connection manager > Access notification` settings of your television.
It is also recommended to cleanup the previous attempts in `Device connection manager > Device list`
