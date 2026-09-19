---
title: Immich Frames
description: Instructions on how to integrate Immich photo frames into Home Assistant.
ha_category:
  - Button
  - Image
  - Sensor
  - Switch
ha_iot_class: Local Polling
ha_release: 2026.10
ha_domain: immich_frames
ha_codeowners:
  - '@jtenniswood'
ha_config_flow: true
ha_platforms:
  - button
  - diagnostics
  - image
  - sensor
  - switch
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

During setup, select the existing Immich account, give the frame a name, and choose a source:

- **All photos** uses the account's image library.
- **Albums** lets you choose one or more Immich albums.
- **Keywords** uses Immich Smart Search.

The frame's options let you choose the portrait pairing mode, image orientation, rolling time range, portrait pairing window, output shape, photo fitting, and rotation interval. The initial defaults are All photos, Single portrait photos only, Mixed orientations, all time, a 2-day pairing window, Landscape (1280 × 800), Show full photo, and a 30-second rotation interval. The output shapes are exact dimensions: 1280 × 800 landscape, 800 × 1280 portrait, or 720 × 720 square.

{% include integrations/option_flow.md %}

## Entities

Each frame creates one device with the following entities:

### Image

The **Image** entity contains the rendered frame image. Its state is the timestamp of the last rendered image. When Immich is temporarily unavailable, the last verified image remains available from the local cache.

The image entity includes an **Open in Immich** link for the primary displayed asset when that link is available.

### Buttons

- **Next photo** selects and renders another photo.
- **Previous photo** returns to the previous rendered photo when history is available.
- **Refresh photo** requests an immediate update.
- **Clear cache** removes the locally stored frame image. The next successful update creates a new cache.

### Switch

The **Slideshow** switch pauses or resumes automatic rotation.

### Sensors

The integration provides **Photo date**, **Photo location**, **Photo people**, **Matching photos**, and **Frame status** sensors. Photo date, Photo location, and Photo people are disabled by default and can be enabled from the entity registry when they are useful for a particular dashboard or automation. Matching photos and Frame status are enabled by default.

## Data updates and offline behavior

The frame polls Immich at the configured rotation interval. A successful update selects eligible assets, downloads the required preview, renders the configured output dimensions, and stores an atomic cache entry.

The cache is tied to the Immich account, frame settings, output shape, and photo-fitting mode. A frame does not show an image from a different account or incompatible configuration. Authentication failures require the Immich integration to be repaired. After a network update fails, the coordinator keeps the last cached image available and reports the failure through the Frame status sensor.

## Supported displays and image behavior

The integration renders these exact output sizes:

| Shape | Output |
| --- | --- |
| Landscape | 1280 × 800 |
| Portrait | 800 × 1280 |
| Square | 720 × 720 |

Photos can be cropped to fill the frame or shown in full with padding. Portrait photos can be displayed individually or paired side by side according to the selected mode and pairing window. The integration requests Immich's preview asset for rendering.

## Automation examples

Pause a frame while a room is occupied:

```yaml
action: switch.turn_off
target:
  entity_id: switch.living_room_slideshow
```

Show another image from an automation:

```yaml
action: button.press
target:
  entity_id: button.living_room_next_photo
```

Entity IDs depend on the frame name chosen during setup. Use the entity picker in the automation editor to select the generated entity.

## Troubleshooting

Enable debug logging for `homeassistant.components.immich_frames` and `aioimmich`, reproduce the problem, then disable debug logging again. Download the integration diagnostics and include them in an issue report. Diagnostics redact the API key and do not include image bytes.

### No photos are displayed

Check that the selected Immich account has image assets matching the source, orientation, time-range, and pairing settings. For an album or keyword source, verify that the selected albums still exist and that Smart Search is available on the Immich server.

### The frame shows an old image

The last cached image is intentionally retained while Immich is unavailable. Check the parent Immich integration for authentication or connectivity errors, then use **Refresh** after the connection is restored.

### The image dimensions are unexpected

Check the frame's **Screen shape** and **Photo fitting** options. The rendered output uses the exact dimensions listed above; the selected fit determines whether the photo is cropped or padded.

## Removing the integration

Remove the Immich Frames config entry from **Settings** > **Devices & services**. This removes the frame's entities and device. The separate Immich account entry is not removed. The cached image is no longer used by Home Assistant and can be removed from the Home Assistant storage directory if manual cleanup is required.
