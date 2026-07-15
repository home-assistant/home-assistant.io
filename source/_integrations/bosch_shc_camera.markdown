---
title: Bosch Smart Home Camera
description: Connect Bosch Smart Home cameras to Home Assistant.
ha_category:
  - Camera
ha_release: '2026.9' # pending merge — placeholder, will be set to the actual release version
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@mosandlt'
ha_domain: bosch_shc_camera
ha_platforms:
  - binary_sensor
  - button
  - camera
  - image
  - light
  - number
  - select
  - sensor
  - switch
  - update
ha_integration_type: hub
---

The **Bosch Smart Home Camera** {% term integration %} connects [Bosch Smart Home](https://www.bosch-smarthome.com/) cameras to Home Assistant through the Bosch cloud API. It provides live streaming, motion/person event sensors, and controls for privacy mode, camera lights, notifications, and other camera settings.

{% include integrations/config_flow.md %}

## Prerequisites

- A Bosch account (Bosch SingleKey ID) with at least one Bosch Smart Home camera registered to it.
- One or more of the supported camera models below, added to your Bosch account through the Bosch Smart Home app.

## Supported devices

- Eyes Outdoor (first generation, model `SVO-1601-220`)
- 360° Indoor (first generation, model `SVI-1609-5`)
- Eyes Outdoor II (second generation)
- Eyes Indoor II (second generation)

Second-generation cameras expose additional capabilities over the Bosch cloud API (for example glass-break and smoke/fire-alarm sound detection, and higher-resolution snapshots), which show up as extra entities on those cameras. Not every entity type described below is available on every camera model; the camera's own reported feature set determines which entities are created.

## Configuration

During setup, choose one of two login methods:

- **Automatic login** (recommended): opens a browser to sign in with your Bosch SingleKey ID through Bosch's standard OAuth flow.
- **Manual login**: use this if automatic login doesn't work, for example inside the Home Assistant mobile app. You're shown a login URL to open in an external browser; after signing in, the browser lands on an error page (this is expected). Copy the full URL from the browser's address bar and paste it back into Home Assistant to finish setup. The pasted URL must be used within about 60 seconds, since the authorization code it contains expires quickly.

Only one Bosch Smart Home Camera account can be configured per Home Assistant instance.

If your Bosch Cloud token expires and can't be refreshed automatically, Home Assistant starts a re-authentication flow. Follow the same automatic or manual login steps; all existing entities, automations, and options are preserved.

## Supported functionality

### Camera

Each camera is exposed as a {% term camera %} entity providing a live stream. The integration prefers a direct local-network (LAN) connection to the camera when Home Assistant and the camera are on the same network, and automatically falls back to a Bosch cloud relay connection when a direct connection isn't available. Live video is delivered as WebRTC where supported (through Home Assistant's built-in go2rtc), with an HLS fallback.

A separate [Image](#image) entity shows the most recent motion-triggered snapshot.

### Binary sensor

- **Motion**: on while a motion event is active.
- **Person detected**: on while a person-detection event is active.
- **Audio alarm**: on while an audio-alarm event is active.
- **LAN reachable**: reflects whether the camera currently answers on the local network.

The motion, person, and audio sensors stay on for a configurable window after each event (see [Options](#options)).

### Sensor

Diagnostic and status sensors including camera status, WiFi signal strength, firmware version, events/movement events counted today, last event and last event type, unread event count, stream status and stream URLs, RCP protocol version, and (on supported cameras) alarm state, motion zones, privacy masks, and IVA (intelligent video analytics) status. An AI snapshot description sensor is available when the optional AI description feature is enabled (see [Options](#options)).

### Switch

Switches for live stream on/off, stream audio, privacy mode, camera light, motion detection, notifications, and (model-dependent) siren/alarm controls, intrusion and glass-break/smoke-alarm detection, ambient and front lighting, image rotation, and intercom (two-way audio, disabled by default).

### Light

Light entities for the camera's front light and, on supported models, top/bottom status LEDs.

### Number

Numeric controls such as stream/microphone/speaker volume, LED brightness, siren duration, pre-alarm and alarm activation delay, intrusion detection sensitivity/range, and (on the 360° Indoor camera) pan position.

### Select

Selectable options including stream connection mode (local/remote/auto), video quality, motion sensitivity, detection mode, and (on the 360° Indoor camera) pan presets.

### Button

Buttons to refresh a snapshot on demand, restart the camera, and perform a factory reset.

### Image

An image entity showing the latest saved snapshot for the camera.

### Update

A firmware update entity reports the camera's current and latest available firmware version.

## Options

The integration's options (**Settings** > **Devices & services** > **Bosch Smart Home Camera** > **Configure**) are grouped into sections:

- **Polling intervals**: how often the integration polls the Bosch cloud for status and events.
- **Features**: toggle which entity types (sensors, binary sensors, switches/buttons, snapshots) are created, and the active window for motion/audio binary sensors.
- **Live stream**: default stream connection type, whether to use go2rtc for WebRTC, and player buffering behavior.
- **Push notifications**: enable Firebase Cloud Messaging (FCM) push for near-real-time event delivery (falls back to polling automatically), and configure notify services for text, snapshot, and video-clip alert steps.
- **Event storage**: optionally save event snapshots/clips locally and/or upload them to an SMB or FTP network share.
- **Mini-NVR**: optional continuous local recording of a camera's LAN stream to disk, with pre-roll/post-roll buffering for motion-triggered clips.
- **PTZ controls**: show pan-preset controls for cameras that support pan.
- **External RTSP endpoints**: optional credential-free RTSP endpoints for external recorders such as Frigate.
- **Webhook delivery**: optionally POST a JSON payload to an external HTTP endpoint on every motion/audio/person/intrusion event.
- **AI Snapshot Description**: optionally use a configured AI Task integration to generate a natural-language description of a camera snapshot.
- **Authentication**: force a fresh browser login.

{% include integrations/actions.md %}

## Known limitations

- This integration only supports Bosch's cloud API; Bosch does not currently offer a documented local-only API for these cameras, so the integration is cloud-polling (`cloud_polling`) even for entities served over the LAN.
- Bosch imposes a session-based limit on how long a single live-stream connection can stay open. The integration handles this transparently by restarting the stream session automatically; a brief reconnect may be visible when this happens.
- A camera newly added to your Bosch account after the integration is set up is not picked up automatically; reload the config entry (or restart Home Assistant) to detect it.

## Troubleshooting

### Token expired / repeated re-authentication prompts

If the integration reports that your token has expired and cannot be refreshed, use the re-authentication flow from the integration's card on the Devices & services page. This repeats the login step without affecting your existing entities, automations, or options.

If re-authentication does not resolve a persistent authorization error, this can indicate an account-side permission issue with your Bosch account (for example, an incomplete camera registration) rather than a login problem. Check the official Bosch Smart Home app for any outstanding registration or terms-of-service prompt on your account.

### Camera shows as offline or unavailable

Confirm the camera is online and reachable in the Bosch Smart Home app first. If it is, check your Home Assistant network connectivity to the camera (for local/LAN streaming) and to the internet (for cloud communication) — both paths are used by this integration.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
