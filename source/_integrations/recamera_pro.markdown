---
title: reCamera Pro
description: Instructions on how to integrate Seeed Studio reCamera Pro devices into Home Assistant.
category:
  - Camera
ha_release: "2026.12"
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - "@yyling0101-a11y"
ha_domain: recamera_pro
ha_platforms:
  - camera
ha_zeroconf: true
ha_integration_type: device
---

The **reCamera Pro** {% term integration %} allows you to connect Seeed Studio reCamera Pro AI cameras to Home Assistant over your local network. It streams live RTSP video through Home Assistant's standard WebRTC and HLS pipelines and supports device-native snapshot and MP4 recording actions.

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
- When RTSP streaming is turned off for a stream, the camera entity remains available (with attribute `rtsp_enabled: false`) and displays an offline placeholder image so automations can turn it back on via `camera.turn_on`.

## Options

To adjust detection thresholds or tracked classes after setup, open the integration **Configure** menu:

- **Visual recognition**: Confidence threshold, confirmation time, detection state hold time, and event cooldown.
- **Sound recognition**: Confidence threshold and event cooldown.
- **Detection classes**: Select which discovered visual classes are tracked.

## Actions

Device capture actions run directly on the reCamera Pro hardware and save files to `/mnt` storage. They are independent of the main/sub RTSP stream state and share a single device capture slot (concurrent capture requests return `device_capture_busy`).

### Action: Take device snapshot (`recamera_pro.capture_device_snapshot`)

Capture one JPG snapshot and save it directly to `/mnt` storage on the reCamera Pro.

| Data attribute | Optional | Description |
| --- | --- | --- |
| `output` | Yes | Absolute `/mnt/` directory or `.jpg`/`.jpeg` file path on the device. Leave empty to use the active storage directory. |

### Action: Start device recording (`recamera_pro.start_device_recording`)

Record an MP4 clip directly to `/mnt` storage on the reCamera Pro.

| Data attribute | Optional | Description |
| --- | --- | --- |
| `output` | Yes | Absolute `/mnt/` directory or `.mp4` file path on the device. Leave empty to use the active storage directory. |
| `duration` | Yes | Recording duration in seconds (`1`–`3600`, default `30`). |

### Action: Stop device recording (`recamera_pro.stop_device_capture`)

Stop the active video recording started by Home Assistant and wait until the MP4 file is finalized on `/mnt` storage.

## Examples

### Record a 30-second clip when a person enters a zone

```yaml
automation:
  - alias: "Record reCamera Pro clip on front door motion"
    trigger:
      - trigger: state
        entity_id: binary_sensor.front_door_motion
        to: "on"
    action:
      - action: recamera_pro.start_device_recording
        target:
          entity_id: camera.recamera_pro_live_view
        data:
          duration: 30
```

## Troubleshooting

- If the device password changes, Home Assistant will automatically prompt you to reauthenticate.
- If a camera stream was turned off, re-enable it using `camera.turn_on`.

## Removing the integration

This integration follows standard Home Assistant removal steps. No extra manual cleanup is required.
{% include integrations/remove_device_service.md %}
