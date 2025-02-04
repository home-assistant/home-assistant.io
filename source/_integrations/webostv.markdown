---
title: LG webOS TV
description: Instructions on how to integrate a LG webOS TV within Home Assistant.
ha_category:
  - Media player
  - Notifications
ha_iot_class: Local Push
ha_release: 0.18
ha_codeowners:
  - '@thecode'
ha_domain: webostv
ha_config_flow: true
ha_ssdp: true
ha_platforms:
  - diagnostics
  - media_player
  - notify
ha_integration_type: integration
---

The `webostv` platform allows you to control a [LG](https://www.lg.com/) webOS TV.

There is currently support for the following device types within Home Assistant:

- [Media player](/integrations/media_player/)
- [Notifications](/integrations/notify/)

To begin with enable *LG Connect Apps* feature in *Network* settings of the TV.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "The Hostname or IP address of your TV. You can find it in your router."
{% endconfiguration_basic %}

## Configuration options

The integration provides the following configuration options:

{% configuration_basic %}
Sources:
  description: It is possible to select which sources will be available to the media player. When the TV is powered on press the **CONFIGURE** button in the {% term integration %} card and select the sources to enable. If you don't select any source the media player will offer all of the sources of the TV.
{% endconfiguration_basic %}

## Supported devices

LG webOS TV devices running webOS 2.0 and above.

## Actions

The integration provides the following actions.

### Action: Turn on

The `webostv.turn_on` action is used to create an automation to turn on the TV using the media player power button.

| Data attribute | Optional | Description                                          |
| ---------------------- | -------- | ---------------------------------------------------- |
| `entity_id`            |       no | Entity requested to turn on. For example `media_player.lg_webos_tv`|

If you want to use an automation to turn on an LG webOS TV, install an {% term integration %} such as the [HDMI-CEC](/integrations/hdmi_cec/) or [WakeOnLan](/integrations/wake_on_lan/). They provide an action that can be used for that.

Common for webOS 3.0 and higher would be to use WakeOnLan feature. To use this feature your TV should be connected to your network via Ethernet rather than Wireless and you should enable the *LG Connect Apps* feature in *Network* settings of the TV (or *Mobile App* in *General* settings for older models) (*may vary by version).

{% important %}
This usually only works if the TV is connected to the same network. Routing the WakeOnLan packet to a different subnet requires special configuration on your router or may not be possible.
{% endimportant %}

You can create an automation from the user interface, from the device create a new automation and select the  **Device is requested to turn on** automation.
Automations can also be created using an automation action:

```yaml
# Example configuration.yaml entry
wake_on_lan: # enables `wake_on_lan` integration

automation:
  - alias: "Turn On Living Room TV with WakeOnLan"
    triggers:
      - trigger: webostv.turn_on
        entity_id: media_player.lg_webos_tv
    actions:
      - action: wake_on_lan.send_magic_packet
        data:
          mac: aa:bb:cc:dd:ee:ff
```

Any other [actions](/docs/automation/action/) to power on the device can be configured.

### Action: Select sound output

The `webostv.select_sound_output` action is used to select the active sound output.
The current sound output of the TV can be found under the state attributes.

| Data attribute | Optional | Description                             |
| ---------------------- | -------- | --------------------------------------- |
| `entity_id`            | no       | Target a specific webostv media player. |
| `sound_output`         | no       | Name of the sound output to switch to.  |

### Action: Button press

The `webostv.button` action is used to simulate a button press.

| Data attribute | Optional | Description                                                                                                                                                                                                                                                                            |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | Target a specific webostv media player.                                                                                                                                                                                                                                                |
| `button`               | no       | Name of the button. Known possible values are `LEFT`, `RIGHT`, `DOWN`, `UP`, `HOME`, `MENU`, `BACK`, `ENTER`, `DASH`, `INFO`, `ASTERISK`, `CC`, `EXIT`, `MUTE`, `RED`, `GREEN`, `BLUE`, `YELLOW`, `VOLUMEUP`, `VOLUMEDOWN`, `CHANNELUP`, `CHANNELDOWN`, `PLAY`, `PAUSE`, `NETFLIX`, `GUIDE`, `AMAZON`, `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9` |

### Action: Generic command

The `webostv.command` action is used to send a generic command to the TV.

| Data attribute | Optional | Description                                                                                                                                                                          |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `entity_id`            | no       | Target a specific webostv media player.                                                                                                                                              |
| `command`              | no       | Endpoint for the command, e.g.,  `system.launcher/open`.  The full list of known endpoints is available at <https://github.com/bendavid/aiopylgtv/blob/master/aiopylgtv/endpoints.py> |
| `payload`             | yes      | An optional payload to provide to the endpoint in the format of key value pair(s). |

```yaml
script:
  home_button:
    sequence:
      - action: webostv.button
        target:
          entity_id:  media_player.lg_webos_tv
        data:
          button: "HOME"

  open_google_command:
    sequence:
      - action: webostv.command
        target:
          entity_id:  media_player.lg_webos_tv
        data:
          command: "system.launcher/open"
          payload:
            target: https://www.google.com
```

### Action: Notify

The `notify` platform allows you to send notifications to a LG webOS TV.
The icon can be overridden for individual notifications by providing a path to an alternative icon image to use:

| Data attribute | Optional | Description                             |
| ---------------------- | -------- | --------------------------------------- |
| `entity_id`            | no       | Target a specific webostv media player. |
| `message`         | no       | Message to be displayed on the TV.  |
| `icon`         | yes       | Optional icon to be shown with the notification.  |

```yaml
automation:
  - alias: "Front door motion"
    triggers:
      - trigger: state
        entity_id: binary_sensor.front_door_motion
        to: "on"
    actions:
      - action: notify.livingroom_tv
        data:
          message: "Movement detected: Front Door"
          data:
            icon: "/home/homeassistant/images/doorbell.png"
```

{% important %}
The icon has to be a local file accessible by Home Assistant, not a web URL. The icon does not need to be accessible by the TV. The integration sends the icon to the TV encoded inside the notification message.
{% endimportant %}

## Data updates

LG webOS TV devices are automatically pushing data to Home Assistant.

## Switching source with automation

Imagine you want your LG TV to automatically switch to a specific source when it turns on. Below is a simple automation example that launches `YouTube` after the TV is switched on.
It leverages `select_source` action from the [Media player](/integrations/media_player/) integration to launch a specific app installed on your LG TV.

To find available sources for your TV

1. Go to {% my developer_states title="**Developer Tools** > **States**" %}.
2. Find your TV's media_player entity.
3. Look for the `source_list` attribute which contains all available sources.

{% tip %}
Source list example: `source_list: ARD Mediathek, Apps, HDMI 1, Home Dashboard, JBL Bar 1300, Media Player, Netflix, Prime Video, Public Value, Spotify - Music and Podcasts, Timer, Web Browser, YouTube, ZDFmediathek`
{% endtip %}

The automation can be created entirely through the Home Assistant UI. When setting it up, you'll only need to manually enter the source name (for example, "YouTube") in the action configuration. Below is the YAML code generated as a result:

```yml
alias: Switch TV source to YouTube by Default
description: 'Regardless if started from TV remote or via wake-on-lan, the TV will switch to YouTube right after it is on'
triggers:
  - device_id: <TV DEVICE ID>
    domain: media_player
    entity_id: <TV MEDIA PLAYER ENTITY ID>
    type: turned_on
    trigger: device
conditions: []
actions:
  - action: media_player.select_source
    metadata: {}
    data:
      source: YouTube
    target:
      device_id: <TV DEVICE ID>
mode: single
```

## Change channel through play_media action

The `play_media` action can be used in a script to switch to the specified TV channel. It selects the best matching channel according to the `media_content_id` parameter:

 1. Channel number *(i.e., '1' or '6')*
 2. Exact channel name *(i.e., 'France 2' or 'CNN')*
 3. Substring in channel name *(i.e., 'BFM' in 'BFM TV')*

```yaml
# Example action entry in script to switch to channel number 1
action: media_player.play_media
target:
  entity_id: media_player.lg_webos_tv
data:
  media_content_id: 1
  media_content_type: "channel"

# Example action entry in script to switch to channel including 'TF1' in its name
action: media_player.play_media
target:
  entity_id: media_player.lg_webos_tv
data:
  media_content_id: "TF1"
  media_content_type: "channel"
```

## Next/Previous buttons

The behavior of the next and previous buttons is different depending on the active source:

- if the source is 'LiveTV' (television): next/previous buttons act as channel up/down
- otherwise: next/previous buttons act as next/previous track

## Troubleshooting

### Device is not automatically detected

This integration uses the [SSDP](/integrations/ssdp) integration, which must be enabled for device discovery to work.

### [WakeOnLan](/integrations/wake_on_lan/) does not work

On newer models (2017+), WakeOnLan may need to be enabled in the TV settings by going to **Settings** > **General** > **Mobile TV On** > **Turn On Via WiFi** [instructions](https://support.quanticapps.com/hc/en-us/articles/115005985729-How-to-turn-on-my-LG-Smart-TV-using-the-App-WebOS-).

### Pairing fails when trying to add the TV

Make sure to enable *LG Connect Apps* feature in *Network* settings of the TV.

## Known limitations

- If Home Assistant and your TV are not on the same network, you need to create a firewall rule, which allows a connection on ports 3000 & 3001 with the TCP protocol from Home Assistant to your TV.
- Most newer TV firmware does not allow passing the `icon` parameter to the `notify` command, the TV will ignore the icon and only display the message.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
