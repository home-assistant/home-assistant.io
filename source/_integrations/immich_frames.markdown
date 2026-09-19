---
title: Immich Frames
description: Instructions on how to integrate Immich photo frames into Home Assistant.
ha_category:
  - Image
ha_iot_class: Local Polling
ha_release: 2026.10
ha_domain: immich_frames
ha_codeowners:
  - '@jtenniswood'
ha_config_flow: true
ha_platforms:
  - diagnostics
  - image
ha_integration_type: service
ha_quality_scale: bronze
---

The **Immich Frames** {% term integration %} creates a Home Assistant image entity that displays a rotating selection of photos from an [Immich](https://immich.app/) account. It is designed for wall displays and other clients that can show a Home Assistant image entity.

This integration works with the existing [Immich integration](/integrations/immich/). Configure the Immich account first, then create one Immich Frames entry for each logical frame. A frame does not ask for the Immich server URL or API key again.

## Prerequisites

- Set up the [Immich integration](/integrations/immich/) and wait until it is available.
- The Immich API key must be able to read assets and albums when those sources are selected.
- The Immich server must be reachable from Home Assistant.

{% include integrations/config_flow.md %}

During setup, select the existing Immich account and choose a source. Home Assistant names the entry **Immich Frames**; you can rename it later from the integration settings:

- **All photos** uses the account's image library.
- **Albums** lets you choose one or more Immich albums.
- **Keywords** uses Immich Smart Search.

The frame's options let you choose the pairing mode, image orientation, rolling time range, pairing window, output shape, and photo fitting. The initial defaults are All photos, Single photos only, Mixed orientations, all time, a 2-day pairing window, Landscape (1280 × 800), and Show full photo. The integration polls at a fixed 30-second interval. The output shapes are exact dimensions: 1280 × 800 landscape, 800 × 1280 portrait, or 720 × 720 square.

{% include integrations/option_flow.md %}

## Entities

Each frame creates one device with one image entity:

### Image

The **Image** entity contains the rendered frame image. Its state is the timestamp of the last rendered image. When Immich is temporarily unavailable, the last verified image remains available from the local cache.

The image entity includes an **Open in Immich** link for the primary displayed asset when that link is available.

## Data updates and offline behavior

The frame polls Immich every 30 seconds. A successful update selects eligible assets, downloads the required preview, and renders the configured output dimensions. The durable atomic cache is refreshed at most every five minutes to limit storage writes while keeping the current image in memory. Each source query currently examines at most the first 2,000 matching assets; this bound keeps polling predictable for large libraries.

The cache is tied to the Immich account, frame settings, output shape, and photo-fitting mode. A frame does not show an image from a different account or incompatible configuration. Authentication failures start reauthentication for the parent Immich integration. After a network update fails, the coordinator keeps the last verified image in the local cache.

## Supported displays and image behavior

The integration renders these exact output sizes:

| Shape | Output |
| --- | --- |
| Landscape | 1280 × 800 |
| Portrait | 800 × 1280 |
| Square | 720 × 720 |

Photos can be cropped to fill the frame or shown in full with padding. Portrait photos can be displayed individually or paired side by side according to the selected mode and pairing window. The integration requests Immich's preview asset for rendering.

## Troubleshooting

Enable debug logging for `homeassistant.components.immich_frames` and `aioimmich`, reproduce the problem, then disable debug logging again. Download the integration diagnostics and include them in an issue report. Diagnostics redact the API key and do not include image bytes.

### No photos are displayed

Check that the selected Immich account has image assets matching the source, orientation, time-range, and pairing settings. For an album or keyword source, verify that the selected albums still exist and that Smart Search is available on the Immich server.

### The frame shows an old image

The last cached image is intentionally retained while Immich is unavailable, but the image entity is marked unavailable until a connection is restored. Check the parent Immich integration for authentication or connectivity errors; the image refreshes automatically after the connection is restored.

### The image dimensions are unexpected

Check the frame's **Screen shape** and **Photo fitting** options. The rendered output uses the exact dimensions listed above; the selected fit determines whether the photo is cropped or padded.

## Removing the integration

Remove the Immich Frames config entry from **Settings** > **Devices & services**. This removes the frame's entities and device, and deletes its private cached image. The separate Immich account entry is not removed.
