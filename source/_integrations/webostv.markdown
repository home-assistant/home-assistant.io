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
ha_integration_type: device
ha_quality_scale: platinum
---

The **LG webOS TV** {% term integration %} allows you to control a [LG](https://www.lg.com/) webOS TV.

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

{% include integrations/triggers.md %}

### Turning on the TV from Home Assistant

To turn on your TV from Home Assistant, you need to create an automation using the [Device is requested to turn on](/triggers/webostv.turn_on/) trigger. Without this automation, the TV will appear as unavailable when it is off.

If you want to use an automation to turn on an LG webOS TV, install an {% term integration %} such as [HDMI-CEC](/integrations/hdmi_cec/) or [Wake-on-LAN](/integrations/wake_on_lan/). They provide an action that can power on the TV.

A common setup for webOS 3.0 and higher is to use Wake-on-LAN. For this to work, your TV should be connected to your network through Ethernet instead of wireless, and you should enable **LG Connect Apps** in the TV network settings, or **Mobile App** in the general settings on older models. The exact setting name can vary by model and webOS version.

{% important %}
This usually only works if the TV is connected to the same network. Routing the Wake-on-LAN packet to a different subnet requires special configuration on your router or may not be possible.
{% endimportant %}

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

1. Go to {% my developer_states title="**Settings** > **Developer tools** > **States**" %}.
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

### [WakeOnLan](/integrations/wake_on_lan/) does not work

On newer models (2017+), WakeOnLan may need to be enabled in the TV settings by going to **Settings** > **General** > **Mobile TV On** > **Turn On Via WiFi** [instructions](https://support.quanticapps.com/hc/en-us/articles/115005985729-How-to-turn-on-my-LG-Smart-TV-using-the-App-WebOS-).
Other models have that setting under **Settings** > **Support** > **IP control settings** > **Wake on LAN**.

### Pairing fails when trying to add the TV

Make sure to enable *LG Connect Apps* feature in *Network* settings of the TV.

## Known limitations

- If Home Assistant and your TV are not on the same network, you need to create a firewall rule, which allows a connection on ports 3000 & 3001 with the TCP protocol from Home Assistant to your TV.
- Most newer TV firmware does not allow passing the `icon` parameter to the `notify` command, the TV will ignore the icon and only display the message.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
