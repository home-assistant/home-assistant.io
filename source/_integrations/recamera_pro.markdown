---
title: reCamera Pro
description: Instructions on how to integrate Seeed Studio reCamera Pro devices into Home Assistant.
ha_category:
  - Camera
  - Binary sensor
  - Event
  - Number
  - Select
  - Sensor
  - Switch
  - Update
ha_release: "2026.12"
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - "@yyling0101-a11y"
ha_domain: recamera_pro
ha_platforms:
  - binary_sensor
  - camera
  - diagnostics
  - event
  - number
  - select
  - sensor
  - switch
  - update
ha_zeroconf: true
ha_integration_type: device
---

The **reCamera Pro** {% term integration %} allows you to connect Seeed Studio reCamera Pro AI cameras to Home Assistant over your local network. It streams live RTSP video through Home Assistant's standard WebRTC (go2rtc) and HLS pipelines, receives real-time on-device AI visual, audio, and motion detection events via WebSocket, exposes stream and detection tuning controls, and supports device-native snapshot/MP4 recording and OTA firmware updates.

## Prerequisites

- A Seeed Studio reCamera Pro camera connected to the same local network as Home Assistant (Ethernet, Wi-Fi, or USB NCM).
- The device's login username (default: `admin`) and password.

{% include integrations/config_flow.md %}

### Automatic discovery

reCamera Pro advertises itself via Zeroconf (`_recamera._tcp.local.`). Home Assistant will automatically discover devices on your network and prompt you to enter the device credentials to verify hardware identity (serial number / MAC address).

### Manual setup

If automatic discovery is unavailable in your network topology, add the integration manually and provide:

- **IP address**: The IPv4/IPv6 address or hostname of the reCamera Pro.
- **Device username**: The camera login username.
- **Device password**: The camera login password.

## Supported features

### Cameras

- **Sub stream** (`camera`, enabled by default, 640×480) and **Main stream** (`camera`, disabled by default, 4K) RTSP camera entities supporting live streaming via Home Assistant WebRTC/HLS, on-demand snapshots, and `camera.turn_on` / `camera.turn_off` stream toggling.
- When RTSP streaming is turned off for a stream, the camera entity remains available (with attribute `rtsp_enabled: false`) and displays an offline placeholder image so automations can turn it back on via `camera.turn_on` or the corresponding RTSP switch.

### Events and sensors

- **Event entities** (`event`):
  - **Visual recognition event**: Fires on confirmed on-device visual AI detections.
  - **Sound recognition event**: Fires on confirmed on-device sound recognition events.
  - **Motion detected**: Fires when the on-device `motion-detect` App detects motion.
- **Binary sensors** (`binary_sensor`):
  - Per-class visual detection sensors for classes selected in **Configure** → **Detection classes**.
  - Motion active sensor (when the `motion-detect` App is installed).
- **Diagnostic sensors** (`sensor`):
  - Installed firmware version (enabled by default), plus optional diagnostic sensors (disabled by default): last detection, confidence, last event timestamp, and visual source status.

### Controls and updates

- **Switches** (`switch`):
  - **Sub stream RTSP** and **Main stream RTSP**: Independently enable or disable each RTSP stream (enabling RTSP automatically disables mutually exclusive protocols such as RTMP/ONVIF/Multicast on that stream).
  - **Motion detection function**: Start or stop the on-device `motion-detect` App.
- **Numbers and selects** (`number`, `select`): Configure visual/sound detection thresholds, confirmation/cooldown/hold timers, and on-device motion detection parameters (pixel difference threshold, minimum changed area, hold time, and sample rate).
- **Update** (`update`): Check for and install official reCamera Pro firmware updates with progress reporting.

## Options

To adjust detection thresholds, tracked classes, or display language after setup, open the integration **Configure** menu:

- **Visual recognition**: Confidence threshold, confirmation time, detection state hold time, and event cooldown.
- **Sound recognition**: Confidence threshold and event cooldown.
- **Detection classes**: Select which discovered visual classes create `binary_sensor` entities.
- **Motion detection**: On-device `motion-detect` sensitivity and timing parameters.
- **Compatibility**: Override entity and device display language (`auto`, `en`, `zh-Hans`).

## Actions

Device capture actions run directly on the reCamera Pro hardware and save files to `/mnt` storage. They are independent of the main/sub RTSP stream switches and share a single device capture slot (concurrent capture requests return `device_capture_busy`).

### Action `recamera_pro.capture_device_snapshot`

Capture one JPG snapshot and save it directly to `/mnt` storage on the reCamera Pro.

| Data attribute | Optional | Description |
| --- | --- | --- |
| `output` | Yes | Absolute `/mnt/` directory or `.jpg`/`.jpeg` file path on the device. Leave empty to use the active storage directory. |

### Action `recamera_pro.start_device_recording`

Record an MP4 clip directly to `/mnt` storage on the reCamera Pro.

| Data attribute | Optional | Description |
| --- | --- | --- |
| `output` | Yes | Absolute `/mnt/` directory or `.mp4` file path on the device. Leave empty to use the active storage directory. |
| `duration` | Yes | Recording duration in seconds (`1`–`3600`, default `30`). |

### Action `recamera_pro.stop_device_capture`

Stop the active video recording started by Home Assistant and wait until the MP4 file is finalized on `/mnt` storage.

## Diagnostics and troubleshooting

- Use **Download diagnostics** on the integration entry to export redacted device, stream, capture, and AI source health state.
- If the device password changes, Home Assistant will automatically prompt you to reauthenticate.
- If a camera stream was turned off, re-enable it using `camera.turn_on` or the **Sub stream RTSP** / **Main stream RTSP** switch.

## Removing the integration

This integration follows standard Home Assistant removal steps. No extra manual cleanup is required.
{% include integrations/remove_device_service.md %}
