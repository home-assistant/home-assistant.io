---
title: DLNA Digital Media Server
description: Instructions on how to access media stored on a DLNA DMS device with Home Assistant.
ha_category:
  - Media Source
ha_release: 2022.3
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@chishm'
ha_domain: dlna_dms
ha_platforms:
  - media_source
ha_ssdp: true
---

The `dlna_dms` integration allows you to browse and play media from a [DLNA Digital Media Server](https://www.dlna.org/). Configured DMS devices act as a [Media Source](/integrations/media_source/) and can be browsed in the Media panel.

{% include integrations/config_flow.md %}

## Options

Options for DLNA DMS devices can be set going to **Configuration** -> **Devices & Services** -> **DLNA Digital Media Source** -> **Configure**.

{% configuration_basic %}
Source ID:
  description: "Akin to an entity_id, refers to the DMS device in media-source URIs."
{% endconfiguration_basic %}

## Media source URIs

Media source URIs for DLNA DMS look like `media-source://dlna_dms/<source_id>/<media_identifier>`. Here `<source_id>` is the Source ID set in the device configuration and `<media_identifier>` can have one of three forms:
* `path/to/file` or `/path/to/file`: Slash-separated path through the Content Directory. This must refer to a unique media item.
* `:ObjectID`: Colon followed by a server-assigned ID for an object.
* `?query`: Question mark followed by a query string to search for, see [DLNA ContentDirectory SearchCriteria](http://www.upnp.org/specs/av/UPnP-av-ContentDirectory-v1-Service.pdf) for the syntax. The first result found will be used.

URIs generated while browsing will look like the Object ID form above. However, all three forms will work with the [media_player.play_media service](integrations/media_player/#service-media_playerplay_media). 

### Examples

Using a path URI:

```yaml
service: media_player.play_media
target:
  entity_id: media_player.living_room_tv
data:
  media_content_id: "media-source://dlna_dms/my_server/videos/favourites/Epic Sax Guy 10 Hours.mp4"
```

Using a query URI:

```yaml
service: media_player.play_media
target:
  entity_id: media_player.living_room_tv
data:
  media_content_id: 'media-source://dlna_dms/my_server/?dc:title="Big Buck Bunny"'
```

