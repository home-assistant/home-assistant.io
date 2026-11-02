---
description: Instructions on how to access your media with Home Assistant.
ha_release: 0.115
ha_domain: media_source
ha_categories:
  - media_entertainment
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

The **Media source** {% term integration %} lets integrations share media with Home Assistant. You can browse this media in the media browser, and play it on supported media players, such as Google Cast devices.

## Configuration

Home Assistant sets up this integration automatically. It's part of `default_config`, and integrations that provide media load it too.

If your configuration doesn't use `default_config`, add the following to your {% term "configuration.yaml" %}:

```yaml
media_source:
```

## Local media

Your own media files are in your media folder. On {% term "Home Assistant Operating System" %} and {% term "Home Assistant Container" %}, this folder is `/media` by default. In the media browser, it's listed as **My media**.

- To set up the folder, refer to [Setting up local media sources](/more-info/local-media/setup-media/).
- To add files, refer to [Adding your media to Home Assistant](/more-info/local-media/add-media/).

Files in your media folder are only available to people who are logged in to Home Assistant. This is different from the [`www` folder](/integrations/http/#hosting-files), where files are available without a login.

To link to a file, for example, in a notification of the Companion app, use `/media/local/` followed by the path of the file. If you set up other media folders, use the name of that folder instead of `local`.

## Using custom or additional media folders

You can add more media folders, for example, from a network storage. For the steps, refer to [Adding additional media directories](/more-info/local-media/setup-media/#adding-additional-media-directories).

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

In an automation or a script, use the [**Play specified media**](/actions/media_player.play_media/) action. Under **Media**, select **Pick media**, and then select the file in the media browser.

In YAML, refer to a file with its media source ID: `media-source://media_source/<media_dir>/<path>`. The default `media_dir` is `local`. For example:

```yaml
action: media_player.play_media
target:
  entity_id: media_player.living_room_tv
data:
  media_content_type: "video/mp4"
  media_content_id: "media-source://media_source/local/videos/favorites/holiday.mp4"
```

{% note %}
Home Assistant doesn't convert media files. Your media player or web browser must support the format of the file. Web browsers and Google Cast media players support only a few video formats. If a video doesn't play, check the documentation of your media player or web browser for the formats it supports.
{% endnote %}

### Identifying a media source from the media browser

To use a file in YAML, you need its media source ID. The easiest way to find it is to pick the file in the UI, and then look at the YAML.

1. Go to {% my tools_actions title="**Settings** > **Tools** > **Actions**" %}.
2. In the **Action** dropdown list, select **Play specified media**.
3. Select **Add target**, and select a media player that supports browsing media.
4. Under **Media**, select **Pick media**, and then select the file in the media browser.
5. Select **YAML mode**.
   - Result: The YAML shows the media source ID of the file under `media_content_id`. For example, `media-source://media_source/local/NAS_Media/my-music.mp3`.

## Troubleshooting

### Symptom: A player is missing from the list of players

You want to open your media on a media player, such as a speaker, but the player isn't in the list of players in the bottom-right corner of the media browser.

#### Description

The list of players shows **Web browser** first. After that, it only shows media players that let Home Assistant browse their media. Whether a player supports this depends on its integration. The list also leaves out players whose entity is hidden or disabled.

#### Resolution

Check which of the following situations applies to the player:

- The entity of the player is hidden.
  - To show it again, turn on **Visible** in its settings. For the steps, refer to [Hiding an entity](/docs/configuration/customizing-entities/#hiding-an-entity).
- The entity of the player is disabled.
  - To enable it, refer to [Disabling or enabling an entity](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity).
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
