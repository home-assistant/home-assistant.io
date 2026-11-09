---
description: Instructions on how to integrate cameras within Home Assistant.
ha_release: 0.7
ha_domain: camera
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

## Two-way audio

{% labs %}
Requires the **Two-way audio** Labs preview feature. Enable it at {% my labs title="**Settings** > **System** > **Labs**" %}.
{% endlabs %}

With two-way audio, you can talk to people near a camera or doorbell while you watch its live stream.
For example, you can answer a visitor at your front door from your phone.
Home Assistant sends the sound from your microphone to the speaker of the camera.
Your microphone is only used after you select **Start talking**, and never by default.

### Prerequisites

- The camera or doorbell supports two-way audio.
- The integration of the camera supports two-way audio, such as [Matter](/integrations/matter/) or [Reolink](/integrations/reolink/). Some integrations have extra requirements, so check the documentation of your camera's integration.
- Home Assistant can stream the camera using WebRTC.
- You open Home Assistant in one of these ways:
  - In a browser or a Home Assistant app, using an HTTPS address. Browsers only allow access to the microphone over a secure connection.
  - In the Home Assistant app on iPhone or iPad, version 2026.10.3 or later. The app also supports two-way audio over HTTP.

### To talk through a camera

1. Open the live stream of the camera.
   - For example, select the camera on your dashboard.
2. Below the live stream, select **Start talking**.
   - The first time you do this, your browser or app asks for permission to use the microphone. Allow access.
   - While the microphone is on, the button shows the level of the sound it picks up.
3. When you're done, select **Stop talking**.
   - The microphone also turns off when you close the live stream.

### Troubleshooting two-way audio

#### The Start talking button doesn't appear

The button only appears for cameras that support two-way audio.

1. Make sure the **Two-way audio** preview feature is enabled in {% my labs title="**Settings** > **System** > **Labs**" %}.
2. Check the documentation of the integration of your camera to see if it supports two-way audio.

#### The Start talking button can't be selected

To see why, hover over or tap the button.
The message that appears tells you what to change:

- **Your browser blocks the microphone because your connection to Home Assistant is not secured using HTTPS.**: Open Home Assistant using an HTTPS address, for example through [Home Assistant Cloud](/cloud/). If you use an iPhone or iPad, you can also update the Home Assistant app to version 2026.10.3 or later.
- **Talking to this camera is only possible when the stream uses WebRTC.**: The live stream uses another streaming method. Two-way audio needs WebRTC.
- **Microphone access was denied. Allow it in your browser settings to talk to this camera.**: Allow access to the microphone for Home Assistant in the settings of your browser or device, then try again.

## Camera states

A camera can have the following states. Not all camera integrations support all states. Each item shows the label you see in the Home Assistant interface, followed by the state as Home Assistant stores it. If you write templates or edit automations in YAML, use the stored state.

- **Recording** (`recording`): The camera reports that it is recording video. This state takes priority over streaming.
- **Streaming** (`streaming`): The camera reports that it is streaming live video, but not recording.
- **Idle** (`idle`): The camera reports that it is not recording or streaming. Cameras that don't report either always show this state, even while you watch their live feed.
- **Unavailable** (`unavailable`): The entity is currently unavailable.

{% include integrations/actions.md %}

## Test if it works

A way to test if you have set up your `camera` platform correctly, is to use **Actions** from the **Tools**. Choose your action from the dropdown menu **Action**, enter something like the sample below into the **data** field, and select **Perform action**.

```yaml
entity_id: camera.living_room_camera
```
