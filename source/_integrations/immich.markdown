---
title: Immich
description: Instructions on how to integrate an Immich user account into Home Assistant.
ha_category:
  - Media source
  - Multimedia
  - Sensor
  - Update
ha_release: 2025.6
ha_config_flow: true
ha_iot_class: Local Polling
ha_domain: immich
ha_platforms:
  - diagnostics
  - sensor
  - update
ha_codeowners:
  - '@mib1185'
ha_integration_type: integration
ha_quality_scale: silver
---

This integration allows adding an [Immich](https://immich.app/) user account to Home Assistant.

## Prerequisites

You need to [obtain the API key](https://immich.app/docs/features/command-line-interface#obtain-the-api-key) for your user account in your Immich instance.

### API key permissions

Enable the following permissions when creating your API key. Without these permissions, the integration may not work properly. The "admin-only" permissions are only available when your API key belongs to an administrative user.

- `album.read`
- `albumAsset.create`
- `asset.download`
- `asset.upload`
- `asset.view`
- `person.read`
- `server.about`
- `server.statistics` (_admin-only_)
- `server.storage`
- `server.versionCheck`
- `tag.read`
- `user.read`

{% important %}
Prior to immich server version 1.138.0 the `all` permission is necessary for your API key.
{% endimportant %}

{% include integrations/config_flow.md %}

{% configuration_basic %}
URL:
  description: "The URL of your Immich instance. (_e.g. `https://immich.example.com`_)."
API key:
  description: "API key of your user account to connect to your Immich instance."
Verify SSL certificate:
  description: "Whether to verify the SSL certificate when SSL encryption is used to connect to your Immich instance."
{% endconfiguration_basic %}

## Data fetching

The integration polls data every 60 seconds.

## Media source

A [media source](/integrations/media_source/) is provided for your [Immich](https://immich.app/) albums. It shows only the assets you own or that are shared with you. If you have multiple Immich integrations in Home Assistant (_one integration for each Immich user_), only the assets for that specific user are shown. The assets are grouped by albums, people, and tags.

## Sensors

The following {% term sensors %} are created. For some of those the API key needs to have admin rights.

| Entity | Description | Default enabled |
| --- | --- | --- |
| **Disk size** | Overall size of the disk | ✅ |
| **Disk available** | Free space on the disk  | ✅ |
| **Disk used** | Used space on the disk | ❌ |
| **Disk usage** | Usage of the disk in percentage | ❌ |
| **Photos count** | Count of stored photos (_admin only_) | ✅ |
| **Videos count** | Count of stored videos (_admin only_) | ✅ |
| **Disk used by photos** | Used disk space by photos (_admin only_) | ❌ |
| **Disk used by videos** | Used disk space by videos (_admin only_) | ❌ |

## Update entity

An {% term update %} entity is created to inform about a new available Immich server version (_requires Immich server v1.134.0_).

## Actions

### Upload file

This action allows you to upload a media file to your Immich instance. It takes the following arguments:

{% configuration_basic %}
Immich instance:
  description: The config entry of the Immich instance where to upload the file.
File:
  description: Use the [MediaSelector](/docs/blueprint/selectors/#media-selector) to define the file to be uploaded.
  keys:
    media_content_id:
      description: The [media source](/integrations/media_source) URL.
    media_content_type:
      description: The MIME type of the file to be uploaded.
Album ID:
  description: The album in which the file should be placed after uploading. To get the album ID, open the Immich instance web UI in a browser and navigate to the corresponding album, the album ID can now be found in the URL `https://your-immich-instance/albums/<ALBUM-ID>`
{% endconfiguration_basic %}

#### Example script

Take a snapshot of a camera entity via the [`camera.snapshot`](/integrations/camera/#action-snapshot) action, use the [local media](/integrations/media_source/#local-media) path to store the snapshot and upload it to the Immich instance in a specific album.

{% raw %}

```yaml
sequence:
  - variables:
      file_name: camera.yourcamera_{{ now().strftime("%Y%m%d-%H%M%S") }}.jpg
  - action: camera.snapshot
    data:
      filename: "/media/{{ file_name }}"
    target:
      entity_id: camera.yourcamera
  - action: immich.upload_file
    data:
      config_entry_id: 01JVJ0RA387MWA938VE8HGXBMJ
      file:
        media_content_id: "media-source://media_source/local/{{ file_name }}",
        media_content_type: "image/jpeg",
      album_id: f2de0ede-d7d4-4db3-afe3-7288f4e65bb1
```

{% endraw %}

## Troubleshooting

In any case, when reporting an issue, please enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), restart the integration, and as soon as the issue re-occurs, stop the debug logging again (_download of debug log file will start automatically_). Further, if still possible, please also download the [diagnostics](/integrations/diagnostics/) data. If you have collected the debug log and the diagnostics data, provide them with the issue report.

## Remove the integration

{% include integrations/remove_device_service.md %}

If the API key is not used anymore, you can remove it from your Immich instance.
