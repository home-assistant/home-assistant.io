---
title: reCamera Pro
description: Instructions on how to integrate Seeed Studio reCamera Pro devices into Home Assistant.
category:
  - Camera
ha_release: "2026.12"
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - "@zhousizhao"
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

{% configuration_basic %}
IP address:
  description: The IPv4/IPv6 address or hostname of the reCamera Pro (filled automatically when discovered via Zeroconf `_recamera._tcp.local.`).
Device username:
  description: The camera login username (default is `admin`).
Device password:
  description: The camera login password.
{% endconfiguration_basic %}

## Configuration options

The integration provides the following configuration options under **Configure**:

{% configuration_basic %}
Visual recognition:
  description: Configure confidence threshold, confirmation time, detection state hold time, and event cooldown.
Sound recognition:
  description: Configure sound detection confidence threshold and event cooldown.
Detection classes:
  description: Select which discovered visual classes are tracked.
{% endconfiguration_basic %}

## Supported functionality

The **reCamera Pro** integration provides the following entities.

### Cameras

- **Sub stream**
  - **Description**: Low-bandwidth RTSP camera stream (640×480), enabled by default. Supports live viewing via WebRTC/HLS, on-demand snapshots, and `camera.turn_on` / `camera.turn_off` stream toggling.
- **Main stream**
  - **Description**: High-resolution RTSP camera stream (4K), disabled by default. Supports live viewing via WebRTC/HLS, on-demand snapshots, and `camera.turn_on` / `camera.turn_off` stream toggling.
  - **Remarks**: When RTSP streaming is turned off for a stream, the camera entity remains available (with attribute `rtsp_enabled: false`) and displays an offline placeholder image so automations can turn it back on via `camera.turn_on`.

{% include integrations/actions.md %}

## reCamera Pro automation examples

Here is an example to get you started with device-native capture automations.

{% include docs/paste_yaml_tip.md %}

### Automation: Record a 30-second clip when motion is detected

Automatically record an MP4 clip directly to the camera's `/mnt` storage when a motion sensor triggers.

- **Trigger**: State changed
  - **Entity**: Front door motion sensor
  - **To**: Detected
- **Action**: Start device recording (`recamera_pro.start_device_recording`)
  - **Target**: reCamera Pro camera entity
  - **Duration**: `30` seconds

{% details "YAML example for recording a 30-second clip on motion" %}

{% example %}
automation: |
  alias: "Record reCamera Pro clip on front door motion"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door_motion
      to: "on"
  actions:
    - action: recamera_pro.start_device_recording
      target:
        entity_id: camera.recamera_pro_sub_stream
      data:
        duration: 30
{% endexample %}

{% enddetails %}

## Troubleshooting

{% details "Authentication failed after changing the device password" %}

### Symptom: Integration reports authentication error

Home Assistant prompts you to reauthenticate the **reCamera Pro** integration or fails to connect to the camera.

#### Description

If the login password on the reCamera Pro device is changed, existing credentials stored in Home Assistant are rejected by the camera.

#### Resolution

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select **Reconfigure** or **Reauthenticate** on the **reCamera Pro** integration card.
3. Enter the updated device username and password and submit the form.

{% enddetails %}

{% details "Camera shows an offline placeholder image" %}

### Symptom: Live stream shows an offline placeholder

The camera entity is available, displays an offline placeholder image, and its `rtsp_enabled` attribute is `false`.

#### Description

RTSP streaming for that stream was turned off on the camera or via the `camera.turn_off` action.

#### Resolution

1. Call the `camera.turn_on` action targeting the affected camera entity, or toggle the stream back on from the camera's controls.
2. Wait a few seconds for the RTSP stream to reconnect and refresh the live view.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
