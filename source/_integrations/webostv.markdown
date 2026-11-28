---
description: Instructions on how to integrate a LG webOS TV within Home Assistant.
ha_release: 0.18
ha_domain: webostv
---

The **LG webOS TV** {% term integration %} allows you to control a [LG](https://www.lg.com/) webOS TV.

There is currently support for the following device types within Home Assistant:

- [Media player](/integrations/media_player/)
- [Notifications](/integrations/notify/)
- [Switch](/integrations/switch/)

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

## Supported functionality

The **LG webOS TV** integration provides the following entities.

### Media players

- **TV media player**
  - **Description**: Controls your TV. Use it to turn the TV off, change the volume, switch the source or channel, and control playback.
  - **Remarks**: This entity takes the name of your TV.

### Switches

- **Screen** (disabled by default)
  - **Description**: Turns off the TV screen while the TV keeps running, so you can keep listening to the sound. Turn the switch back on to show the picture again. You have to [enable this entity](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity) before you can use it.
  - **Remarks**: This entity is unavailable when the TV is off, even if the TV media player remains available (for example, because you use the [**TV turn on requested**](/triggers/webostv.turn_on/) trigger). Not all TVs support turning the screen on or off. If your TV doesn't support it, you'll see an error the first time you use the switch, and the entity becomes unavailable from then on.

{% include integrations/triggers.md %}

### Turning on the TV from Home Assistant

To turn on your TV from Home Assistant, the integration uses Wake-on-LAN.
This works on webOS 3.0 and newer when Wake-on-LAN is enabled on the TV (see [Troubleshooting](#turning-on-the-tv-does-not-work)) and the TV has reported its <abbr title="Media Access Control">MAC</abbr> address.

If you have an automation that uses the [TV turn on requested](/triggers/webostv.turn_on/) trigger, it is used instead of the integration's Wake-on-LAN.
Use an automation when Wake-on-LAN doesn't work for your setup, for example, if your TV doesn't report a MAC address, is on a different subnet, or you want to turn it on using [HDMI-CEC](/integrations/hdmi_cec/) or [infrared](/integrations/lg_infrared/).

If a MAC address is known, the TV appears as **off** when it is off.
If Wake-on-LAN is disabled on the TV or the wake-up packet cannot reach it, the TV may stay off without Home Assistant reporting an error.
Enable Wake-on-LAN on the TV or create a turn-on automation to use another method.

If no MAC address is known and no turn-on automation exists, the TV appears as **unavailable** when it is off.

{% include integrations/actions.md %}

## Notifications

The `notify` platform allows you to send notifications to an LG webOS TV. Each TV gets its own action, named after the TV, such as `notify.livingroom_tv`. The action name selects which TV receives the notification, so you don't target an entity. You can override the icon for individual notifications by providing a path to an alternative icon image.

This notification action takes the following options:

- `message`: The message to display on the TV.
- `icon`: An optional icon to show with the notification. In YAML, pass it inside the nested `data:` block, as shown in the example below.

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

1. Go to {% my tools_states title="**Settings** > **Tools** > **States**" %}.
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

 1. Channel number *(for example, '1' or '6')*
 2. Exact channel name *(for example, 'France 2' or 'CNN')*
 3. Substring in channel name *(for example, 'BFM' in 'BFM TV')*

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

### Turning on the TV does not work

On newer models (2025+), Wake-on-LAN may need to be enabled in the TV settings by going to **Settings** > **Support** > **IP control settings** > **Wake on LAN**.
For other models (2017+) the same settings is under **Settings** > **General** > **Mobile TV On** > **Turn On Via WiFi**, see [these instructions](https://support.quanticapps.com/hc/en-us/articles/115005985729-How-to-turn-on-my-LG-Smart-TV-using-the-App-WebOS-).

Check that Home Assistant and the TV are on the same subnet.

If the TV still does not turn on, use an automation with the [TV turn on requested](/triggers/webostv.turn_on/) trigger to use another turn-on method.
This automation takes priority over the integration's Wake-on-LAN.

### Pairing fails when trying to add the TV

Make sure to enable *LG Connect Apps* feature in *Network* settings of the TV.

## Known limitations

{% important %}
For the integration's Wake-on-LAN to work, Home Assistant and the TV must be on the same subnet.
Routing the Wake-on-LAN packet to a different subnet requires special configuration on your router or may not be possible.
For these setups, use a turn-on automation.
{% endimportant %}

- If Home Assistant and your TV are not on the same network, you need to create a firewall rule, which allows a connection on ports 3000 & 3001 with the TCP protocol from Home Assistant to your TV.
- Most newer TV firmware does not allow passing the `icon` parameter to the `notify` command, the TV will ignore the icon and only display the message.
- On some TV firmware versions, passing the `icon` parameter to the `notify` command can prevent the notification from being shown.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
