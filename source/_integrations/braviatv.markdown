---
title: Sony Bravia TV
description: Instructions on how to integrate a Sony Bravia TV into Home Assistant.
ha_category:
  - Button
  - Media player
  - Remote
ha_release: 0.23
ha_iot_class: Local Polling
ha_codeowners:
  - '@bieniu'
  - '@Drafteed'
ha_domain: braviatv
ha_config_flow: true
ha_platforms:
  - button
  - diagnostics
  - media_player
  - remote
ha_ssdp: true
ha_integration_type: device
---

The **Bravia TV** {% term integration %} allows you to control a [Sony Bravia TV](https://www.sony.com/).

Almost all [Sony Bravia TV 2013 and newer](https://info.tvsideview.sony.net/en_ww/home_device.html#bravia) are supported. For older TVs see more generic methods to control your device [below](#for-tvs-older-than-2013).

{% include integrations/config_flow.md %}

## Authentication

The Bravia TV integration supports two types of authentication:

- **PSK (Pre-Shared-Key)** is a user-defined secret key used for access control. This authentication method is recommended as more reliable and stable. To set up and enable PSK on your TV, go to: **Settings -> Network -> Home Network Setup -> IP Control**.
- **PIN Code** authentication is easier and does not require additional settings. [See this guide](#tv-does-not-generate-new-pin) if your TV does not show the PIN code.

For more information, see [IP Control Authentication](https://pro-bravia.sony.net/develop/integrate/ip-control/index.html#ip-control-authentication).

## Media browser

Using the media browser, you can view a list of all installed applications and TV channels and launch them. You can access the media browser from the **Media** section in the Home Assistant side menu or by selecting the **Browse media** button on the media player card.

## Using with Google Cast

The Bravia TV {% term integration %} provides information about the power status of the device, current source, and volume. It gives you the ability to control playback, run applications, and send remote control commands. Unfortunately, due to limitations of the Bravia REST API, it does not provide information about the currently playing content in applications (app name, media title, duration, play/pause state, etc.). In turn, the [Google Cast](/integrations/cast/) integration does not provide reliable information about the power status of the device (for example on Home Screen) and does not allow you to control playback in Android apps without [MediaSession](https://developer.android.com/reference/android/media/session/MediaSession) support. However, it can display full information about the content being played in supported apps. If your TV runs on Android or Google TV, you can use the Google Cast integration together with the Bravia TV integration. For convenience, you can combine two media players into one using [Universal Media Player](/integrations/universal/). Universal Media Player will automatically select the appropriate active media player entity.

{% details "Example YAML configuration" %}

Replace `media_player.sony_tv_native` with your Bravia TV integration media player {% term entity %} ID. Replace `media_player.sony_tv_cast` with your Google Cast integration media player {% term entity %} ID.

{% raw %}

```yaml
media_player:
  - platform: universal
    name: Sony TV
    unique_id: sony_tv_combined
    device_class: tv
    children:
      - media_player.sony_tv_native
      - media_player.sony_tv_cast
    active_child_template: >
      {% if state_attr('media_player.sony_tv_native', 'media_content_id') %}
         media_player.sony_tv_native
      {% endif %}
    attributes:
      source: media_player.sony_tv_native|source
      source_list: media_player.sony_tv_native|source_list
    browse_media_entity: media_player.sony_tv_native
    commands:
      turn_off:
        action: media_player.turn_off
        data:
          entity_id: media_player.sony_tv_native
      turn_on:
        action: media_player.turn_on
        data:
          entity_id: media_player.sony_tv_native
      select_source:
        action: media_player.select_source
        data:
          entity_id: media_player.sony_tv_native
          source: "{{ source }}"
      media_play:
        action: media_player.media_play
        target:
          entity_id: media_player.sony_tv_native
      media_pause:
        action: media_player.media_pause
        target:
          entity_id: media_player.sony_tv_native
      media_play_pause:
        action: media_player.media_play_pause
        target:
          entity_id: media_player.sony_tv_native
      media_previous_track:
        action: media_player.media_previous_track
        target:
          entity_id: media_player.sony_tv_native
      media_next_track:
        action: media_player.media_next_track
        target:
          entity_id: media_player.sony_tv_native
```

{% endraw %}

{% enddetails %}

## Play media action

The `play_media` {% term action %} can be used in an {% term automation %} or {% term script %} to switch to a specified application or TV channel. It selects the best matching application or channel according to the `media_content_id`:

 1. Channel number *(i.e., '1' or '6')*
 2. Exact app or channel name *(i.e., 'Google Play' or 'CNN')*
 3. Substring in app or channel name *(i.e., 'BFM' in 'BFM TV')*
 4. URI-string of app or channel *(i.e., 'tv:dvbt?trip=9999.441.41104&srvName=BBC HD')*

**Example to open YouTube app:**

```yaml
action: media_player.play_media
target:
  entity_id: media_player.bravia_tv
data:
  media_content_id: "YouTube"
  media_content_type: "app"
```

**Example to switch to channel number 11:**

```yaml
action: media_player.play_media
target:
  entity_id: media_player.bravia_tv
data:
  media_content_id: 11
  media_content_type: "channel"
```

**Example to switch to channel including 'news' in its name:**

```yaml
action: media_player.play_media
target:
  entity_id: media_player.bravia_tv
data:
  media_content_id: "news"
  media_content_type: "channel"
```

## Remote

The {% term integration %} supports `remote` {% term platform %}. It allows you to send remote control commands to your TV with the `remote.send_command` action.

The commands that can be sent to the TV depend on the model of your TV. To display a list of supported commands for your TV, call the {% term action %} `remote.send_command` with non-valid command (e.g. `Test`). A list of available commands will be displayed in [Home Assistant System Logs](https://my.home-assistant.io/redirect/logs).

**Example to send `Down` key command:**

```yaml
action: remote.send_command
target:
  entity_id: remote.bravia_tv
data:
  command: "Down"
```

{% details "Some commonly used commands" %}

- Up
- Down
- Left
- Right
- Confirm
- Return
- Home
- Exit
- Rewind
- Forward
- ActionMenu
- SyncMenu
- Num0
- Num1
- Num2
- Num3
- Num4
- Num5
- Num6
- Num7
- Num8
- Num9

{% enddetails %}

## Buttons

The {% term integration %} supports `button` {% term platform %} and allows you to reboot the device or terminate all running applications.

## Limitations and known issues

### TV does not generate new PIN

If you have previously set up your TV with any Home Assistant instances via PIN code, you must remove Home Assistant from your TV in order for your TV to generate a new PIN. On your TV, go to: **Settings** > **Network** > **Remote device settings** > **Deregister remote device**. Menu titles may differ slightly between models. If needed, refer to your specific model's [manual](https://www.sony.com/electronics/support/manuals) for additional guidance.

### Sometimes, the integration displays an error in the logs and does not respond to commands

Unfortunately, the system service application (WebApiCore) on the TV that provides Sony Bravia REST API does not work very well and has many problems. The service may begin to reboot spontaneously or freeze, especially when the TV has not been rebooted for a long time or a heavy application is running. Perhaps sometimes the process is killed by Android TV itself due to lack of memory. When the service is being rebooted (about 30 seconds), the API will be unavailable, and any interaction with the {% term integration %} may result in an error in the logs.

If you encounter this, you must completely reboot your TV. To do this, hold down the **Power** button on the remote control and select **Restart**. In addition, we recommend periodically completely restarting your TV. You can also create an {% term automation %} that will automatically restart the TV (for example, every night if the TV is turned off).

If this happens very often, you can try to reset **WebApiCore** service. On your TV, go to: **Settings** > **Apps** > **See all aps** > Find **WebApiCore** > Press **Clear data**.

### Integration shows 'Smart TV' instead of the name of the running application

See [Using with Google Cast](#using-with-google-cast) section for more details.

### Power consumption ~15 W when the TV in standby mode while integration is enabled

The Bravia TV is [local pulling integration](https://www.home-assistant.io/blog/2016/02/12/classifying-the-internet-of-things/#polling-the-local-device). Even if the TV is turned off, its status is constantly polled to determine the current state, so the TV's network interface remains enabled. This is normal behavior. If you are concerned about this, you can disable polling for updates in the integration **System options** menu, but the TV status will no longer update automatically and you will have to force the {% term entity %} update by calling `homeassistant.update_entity` {% term action %} manually.

Please note that this behavior can be caused not only by the integration, but also by some applications installed on the TV.

### For TVs older than 2013

Users of TVs older than 2013 can control their devices using [HDMI-CEC](/integrations/hdmi_cec/), [Broadlink](/integrations/broadlink/) or [Kodi](/integrations/kodi/) integrations.
