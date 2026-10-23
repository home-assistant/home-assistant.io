---
title: Media source
description: Instructions on how to access your media with Home Assistant.
ha_release: 0.115
ha_domain: media_source
ha_categories:
  - media_entertainment
ha_codeowners:
  - '@hunterjm'
ha_quality_scale: internal
ha_integration_type: system
related:
  - docs: /more-info/local-media/setup-media/
    title: Setting up local media sources
  - docs: /more-info/local-media/add-media/
    title: Adding your media to Home Assistant
  - docs: /integrations/media_player/
    title: Media player
  - docs: /actions/media_player.play_media/
    title: Play specified media action
  - docs: /integrations/radio_browser/
    title: Radio Browser
  - docs: /integrations/homeassistant/#media_dirs
    title: Media directories configuration
---

The **Media source** {% term integration %} platform allows integrations to expose media for
use inside Home Assistant through the Media Browser panel or through supported
media players like Google Cast.

## Configuration

This integration is configured automatically
through `default_config` or if another integration implements a media source.

If your configuration does not contain any of the above, you can add the below
to your configuration file:

```yaml
# Example configuration.yaml entry
media_source:
```

## Local media

By default, the integration looks for media in a specified folder.
If other `media_dirs` are not declared you need to use `/media/local` path for
example in companion app notification.

On {% term "Home Assistant Operating System" %} and {% term "Home Assistant Container" %}, this folder is `/media` by default.

Home Assistant OS users can access this folder by using,
for example, the **Samba share** app. Users of Home Assistant Container can
mount a volume of their choice to `/media`.

Files served from `media` are protected by Home Assistant authentication
unlike those served from `www`.

## Using custom or additional media folders

It is also possible to set up custom and additional media directories. To do
so, you'll need to adjust the [core configuration][basic-configuration].

This example makes two different folders available to the integration:

```yaml
# Example configuration.yaml
homeassistant:
  media_dirs:
    local: /media
    recording: /mnt/recordings
```

The folders under `media_dirs` replace the default media folder. To keep your `/media` folder in the media browser, add it too, like `local: /media` in the example above.

{% tip %}
If you want to use media from a network storage, the network storage must be connected first. Refer to [these instructions on how to connect network storage](/common-tasks/os/#network-storage).
The media from the network storage is then automatically added to the local media browser.
{% endtip %}

## Browsing your media

The media browser shows your own media, such as the files in your `/media` folder. It also shows media from other integrations, such as stations from [Radio Browser](/integrations/radio_browser/). To add your own files, refer to [Adding your media to Home Assistant](/more-info/local-media/add-media/).

1. In the sidebar, go to {% my media_browser title="**Media**" %}.
2. In the bottom-right corner, open the list of players, and select where you want to open your media. What the media browser lists depends on the player:
   - To see all your media, and to view or play it in your browser, select **Web browser**.
   - To play media on a media player, such as a Sonos speaker, select that player. The media browser then only lists what that player can play, such as audio files and the player's favorites.
   - If a player is missing from the list or grayed out, refer to [Troubleshooting](#troubleshooting).
3. Select a media source, such as **My media**, and open a folder to browse its files.
4. Select an item to view or play it.

## Playing media from a media source

To play media from a media source via an action, use the uri
scheme `media-source://media_source/<media_dir>/<path>`.
Default `media_dir` is `local`.

{% note %}
Web browsers and Google Cast media players have very limited video container
and codec support. The media source integration does not do any transcoding of
media, meaning media files must be natively supported by your media player or
web browser (for playing in the frontend).

If a video file is not supported by
your media player or web browser it will fail to play. Please check the
documentation of your media player or web browser for lists
of supported video formats.
{% endnote %}

Example:

```yaml
action: media_player.play_media
target:
  entity_id: media_player.living_room_tv
data:
  media_content_type: "video/mp4"
  media_content_id: "media-source://media_source/local/videos/favourites/Epic Sax Guy 10 Hours.mp4"
```

[basic-configuration]: /integrations/homeassistant/#media_dirs

### Identifying a media source from the media browser

If you wish to use the `media-source://` URI for an action, and the media is already available in the media browser (either as locally stored on the Home Assistant machine, or mapped using network storage) the following steps can help to determine the `media-source` uri.

1. Select **Media** in the sidebar.
2. Navigate to the folder containing the media you wish to play.\
  *In this example, we will go **My media** > **NAS_Media**. This folder is a network share containing a collection of .mp3 files. One of which is named `my-music.mp3`.*
3. Copy the current URL from the URL bar.\
  *for example: `https://home-assistant.local/media-browser/browser/app%2Cmedia-source%3A%2F%2Fmedia_source/%2Cmedia-source%3A%2F%2Fmedia_source%2Flocal%2FNAS_Media`*
4. Search for an online URL Decoder, paste in the copied text and decode.\
  *`https://home-assistant.local/media-browser/browser/app,media-source://media_source/,media-source://media_source/local/NAS_Media`*

The last media source, in this case `media-source://media_source/local/NAS_Media` makes up the first part of the path, with the complete path being:
`media-source://media_source/local/NAS_Media/my-music.mp3`

## Troubleshooting

### Symptom: A player is missing from the list of players

You want to open your media on a media player, such as a speaker, but the player isn't in the list of players in the bottom-right corner of the media browser.

#### Description

The list of players shows **Web browser** first. After that, it only shows media players that let Home Assistant browse their media. Whether a player supports this depends on its integration. The list also leaves out players whose entity is hidden or disabled.

#### Resolution

Check which of the following situations applies to the player:

- The entity of the player is hidden.
  - To show it again, turn on **Visible** in its settings. For the steps, refer to [Hiding an entity](/docs/configuration/customizing-devices/#hiding-an-entity).
- The entity of the player is disabled.
  - To enable it, refer to [Disabling or enabling an entity](/docs/configuration/customizing-devices/#disabling-or-enabling-an-entity).
- The player is visible and enabled, but still missing from the list.
  - The player doesn't support browsing its media. You can still play media on it, for example, with the [**Play specified media**](/actions/media_player.play_media/) action.

### Symptom: A player is grayed out in the list of players

The player is in the list of players, but it's grayed out, and you can't select it.

#### Description

The player is unavailable. Home Assistant can't reach it right now. For example, the speaker is unplugged, or it lost its network connection.

#### Resolution

1. Check that the player is turned on and connected to your network.
   - Result: When the player is available again, you can select it in the list.
2. If the player stays unavailable, check the troubleshooting section of the documentation of its integration.
