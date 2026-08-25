---
title: Camera
description: Instructions on how to integrate cameras within Home Assistant.
ha_category:
  - Camera
  - Media source
ha_release: 0.7
ha_quality_scale: internal
ha_domain: camera
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
ha_platforms:
  - diagnostics
---

The **Camera** {% term integration %} allows you to use IP cameras with Home Assistant.

{% include integrations/building_block_integration.md %}

## Streaming video

If your camera supports it, and the [`stream`](/integrations/stream) integration is set up, you will be able to stream your cameras in the frontend and on supported media players.

The `Preload stream` option will start the camera feed on Home Assistant startup and continue to keep the stream alive. This will result in reduced latency when opening the stream in the frontend, as well as when using the `play_stream` action or Google Assistant integration. It does, however, utilize more resources on your machine, so it is recommended to check CPU usage if you plan to use this feature.

<p class='img'>
  <img src='/images/integrations/camera/preload-stream.png' alt='Screenshot showing Preload Stream option in Home Assistant front end.'>
  Example showing the Preload Stream option in the camera dialog.
</p>

## The state of a camera

A camera can have the following states. Not all camera integrations support all states.

- **Streaming**: The camera transmits a live play-back of the video data it is recording.
- **Recording**: The camera is currently capturing video content.
- **Idle**: The camera is not currently capturing video content.
- **Unavailable**: The entity is currently unavailable.
- **Unknown**: The state is not yet known.

{% include integrations/actions.md %}

## Test if it works

A way to test if you have set up your `camera` platform correctly, is to use **Actions** from the **Tools**. Choose your action from the dropdown menu **Action**, enter something like the sample below into the **data** field, and select **Perform action**.

```yaml
entity_id: camera.living_room_camera
```
