---
title: Media Source
description: Instructions on how to access your media with Home Assistant.
ha_category:
  - Media Source
ha_release: 0.115
ha_domain: media_source
ha_codeowners:
  - '@hunterjm'
ha_quality_scale: internal
---

The Media Source integration platform allows integrations to expose media for
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

## Local Media

By default, the integration looks for media in a specified folder.
If other `media_dirs` are not declared you need to use `/media/local` path for
example in companion app notification.

For Home Assistant OS, Supervised and Container users, this folder is by default
configured in the path `/media`.

Home Assistant OS and Supervised users can access this folder by using,
for example, the Samba add-on. Users of Home Assistant Container can
mount a volume of their choice to `/media`.

If you are a Home Assistant Core user, the default directory called is called
`media` under the configuration path (where your `configuration.yaml` is located).

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

Please note, that the folder must be accessible locally. Home Assistant
cannot connect to external or remote network shares using this configuration
option.

## Playing media from a Media Source

To play media from a media source via a service call, use the uri
scheme `media-source://media_source/<media_dir>/<path>`.
Default `media_dir` is `local`.

<div class="note">
Web browsers and Google Cast media players have very limited video container
and codec support. The Media Source integration does not do any transcoding of
media, meaning media files must be natively supported by your media player or
web browser (for playing in the frontend).

If a video file is not supported by
your media player or web browser it will fail to play. Please check the
documentation of your media player or web browser for lists
of supported video formats.
</div>

Example:

```yaml
service: media_player.play_media
target:
  entity_id: media_player.living_room_tv
data:
  media_content_type: "video/mp4"
  media_content_id: "media-source://media_source/local/videos/favourites/Epic Sax Guy 10 Hours.mp4"
```

[basic-configuration]: /docs/configuration/basic/#media_dirs
