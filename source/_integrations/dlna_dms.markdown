---
title: DLNA Digital Media Server
description: Instructions on how to access media stored on a DLNA DMS device with Home Assistant.
ha_category:
  - Media source
ha_release: 2022.3
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@chishm'
ha_domain: dlna_dms
ha_ssdp: true
ha_integration_type: integration
---

The DLNA Digital Media Server integration allows you to browse and play media from a [DLNA Digital Media Server](https://www.dlna.org/). Configured DMS devices act as a [Media Source](/integrations/media_source/) and can be browsed in the Media panel.

{% include integrations/config_flow.md %}

## Renaming

The name/title of the DMS device is the same as the title of the config entry. It can be changed on the Integrations Configuration page from the three-dot menu.

## Media source URIs

Media source URIs for DLNA DMS look like `media-source://dlna_dms/<source_id>/<media_identifier>`.

Here `<source_id>` is the slugified name of the DMS device. For example, "DLNA Server" becomes "dlna_server". If multiple DMS devices have the same name, an underscore and a unique number will be appended to the end of some of them, e.g., "server", "server_1", "server_2".

The `<media_identifier>` can have one of three forms:

- `path/to/file` or `/path/to/file`: Slash-separated path through the Content Directory. This must refer to a unique media item.
- `:ObjectID`: Colon followed by a server-assigned ID for an object.
- `?query`: Question mark followed by a query string to search for, see [DLNA ContentDirectory SearchCriteria](https://openconnectivity.org/wp-content/uploads/2015/11/UPnP-av-ContentDirectory-v4-Service.pdf) (part 5.3.16 "A_ARG_TYPE_SearchCriteria" on page 65 and part D.5 "Searching" on page 269) for the syntax. The first result found will be used.

URIs generated while browsing will look like the Object ID form above. However, all three forms will work with the [media_player.play_media](/integrations/media_player/#action-media_playerplay_media) action.

### Examples

Using a path URI:

```yaml
action: media_player.play_media
target:
  entity_id: media_player.living_room_tv
data:
  media_content_id: "media-source://dlna_dms/my_server/videos/favourites/Epic Sax Guy 10 Hours.mp4"
```

Using a query URI:

```yaml
action: media_player.play_media
target:
  entity_id: media_player.living_room_tv
data:
  media_content_id: 'media-source://dlna_dms/my_server/?dc:title="Big Buck Bunny"'
```
