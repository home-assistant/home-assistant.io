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
ha_integration_type: service
ha_quality_scale: platinum
---

This {% term integration %} allows adding an [Immich](https://immich.app/) user account to Home Assistant.

## Prerequisites

You need to [obtain the API key](https://immich.app/docs/features/command-line-interface#obtain-the-api-key) for your user account in your Immich instance.

### API key permissions

Enable the following permissions when creating your API key. Without these permissions, the integration may not work properly. The "admin-only" permissions are only available when your API key belongs to an administrative user.

- `asset.download`
- `asset.upload`
- `asset.read`
- `asset.view`
- `album.read`
- `albumAsset.create`
- `person.read`
- `server.about`
- `server.statistics` (_admin-only_)
- `server.storage`
- `server.versionCheck`
- `tag.read`
- `user.read`

{% important %}
Before immich server version 1.138.0 the `all` permission is necessary for your API key.
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

### Search

The search is not a simple filename search. It is contextual and requires the [Smart Search](https://docs.immich.app/features/searching) feature to be enabled on your Immich server. Because it is context-aware, the results depend on where you start your search. For example, starting from the albums overview will return only assets in albums, while searching from a specific person's overview will return only assets related to that person.

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

{% include integrations/actions.md %}

## Troubleshooting

In any case, when reporting an issue, please enable [debug logging](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics), restart the integration, and as soon as the issue re-occurs, stop the debug logging again (_download of debug log file will start automatically_). Further, if still possible, please also download the [diagnostics](/integrations/diagnostics/) data. If you have collected the debug log and the diagnostics data, provide them with the issue report.

## Known limitations

There are no known limitations.

## Removing the integration

{% include integrations/remove_device_service.md %}

If the API key is not used anymore, you can remove it from your Immich instance.
