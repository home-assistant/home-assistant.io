---
title: Xthings Cloud
description: Connect and control Xthings Cloud smart home devices with Home Assistant.
ha_release: "2026.3"
ha_category:
  - Switch
  - Light
  - Lock
  - Camera
  - Sensor
ha_iot_class: Cloud Push
ha_config_flow: true
ha_codeowners:
  - '@XthingsJacobs'
ha_domain: xthings_cloud
ha_integration_type: hub
ha_platforms:
  - camera
  - light
  - lock
  - sensor
  - switch
ha_quality_scale: bronze
---

The **Xthings Cloud** {% term integration %} allows you to control and monitor your [Xthings](https://xthings.com) smart home devices through the Xthings Cloud service. Xthings provides a range of smart home products including smart switches, plugs, lights, locks, and cameras under the **U-tec**, **Ultraloq** and **Ulticam** brands.

Use case: Monitor and control all your Xthings devices from a single Home Assistant dashboard, receive real-time status updates via WebSocket push, and view live camera feeds through WebRTC.

## Supported devices

The following device types are supported:

- **Smart switches** — on/off control, optional brightness
- **Smart plugs** — on/off control
- **Smart lights** — on/off, brightness, HS color, color temperature
- **Smart locks** — lock/unlock, jam detection, battery level
- **Cameras** — WebRTC live video, snapshot push

## Prerequisites

Before setting up the integration, make sure you have:

1. A **Xthings Cloud** account. You can create one in the **Xthings** mobile app.
2. At least one device added and online in the **Xthings** app.
3. If your account has two-factor authentication (2FA) enabled, have access to your registered email or phone to receive verification codes.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Email:
    description: "The email address used to register your Xthings Cloud account."
Password:
    description: "Your Xthings Cloud account password. The password is only used during login and is not stored."
Verification code:
    description: "The 6-digit verification code sent to your email or phone. Only required if your account has 2FA enabled."
{% endconfiguration_basic %}

## Supported functionality

The **Xthings Cloud** integration provides the following entities.

### Switches

- **Smart switch / Smart plug**
  - **Description**: On/off control for switches and plugs without brightness support.
  - **Available for devices**: US01 (switch), UP01 (plug)

### Lights

- **Smart light**
  - **Description**: On/off, brightness (0–100%), HS color, and color temperature (2000–6500K) control.
  - **Available for devices**: A19-C1 (light), US01/UP01 with brightness support
  - **Remarks**: Devices with brightness in their status are automatically registered as lights instead of switches.

### Locks

- **Smart lock**
  - **Description**: Lock and unlock control with jam detection.
  - **Available for devices**: U-Bolt-Pro-WiFi

### Sensors

- **Battery**
  - **Description**: Battery level percentage for lock devices.
  - **Available for devices**: U-Bolt-Pro-WiFi
  - **Remarks**: Displayed as a separate sensor entity under the lock device.

### Cameras

- **Camera**
  - **Description**: Live video streaming via WebRTC and snapshot image push from the cloud.
  - **Available for devices**: iCam-B15W, IQ-2K
  - **Remarks**: WebRTC requires a browser that supports it (Chrome recommended). Snapshots are updated in real-time via WebSocket push.

## Data updates

The **Xthings Cloud** integration uses a combination of push and polling for data updates:

- **WebSocket push** (primary): The integration maintains a persistent WebSocket connection to the Xthings Cloud. Device status changes, online/offline events, and camera snapshots are pushed in real-time, typically within 1–2 seconds.
- **Polling** (fallback): As a safety net, the integration polls the cloud API every 30 minutes to ensure data consistency in case of missed WebSocket messages.

## Known limitations

- Camera WebRTC live video requires Home Assistant 2024.1 or later. On older versions, only snapshot images are available.
- The integration communicates with devices through the Xthings Cloud service. If the cloud service is unavailable, devices cannot be controlled.
- Lock operations (lock/unlock) may take a few seconds to complete due to cloud-to-device communication latency.
- Camera live video uses AWS Kinesis Video Streams (KVS) for WebRTC signaling. Network firewalls that block WebRTC traffic may prevent live video from working.

## Troubleshooting

### Unable to connect during setup

#### Symptom: "Unable to connect to Xthings Cloud"

The setup form shows the error "Unable to connect to Xthings Cloud."

#### Resolution

1. Check your internet connection.
2. Verify that `api.cloud.xthings.com` is reachable from your network.
3. If you are behind a corporate firewall or proxy, ensure HTTPS traffic to `api.cloud.xthings.com` is allowed.

### Incorrect password

#### Symptom: "Incorrect password"

The setup form shows the error "Incorrect password."

#### Resolution

1. Double-check your password in the Xthings mobile app.
2. If you have forgotten your password, use the "Forgot Password" feature in the app to reset it.

### Devices not showing up

After successful setup, some or all devices are missing.

#### Resolution

1. Make sure the devices are added and online in the Xthings mobile app.
2. Go to **Settings** > **Devices & services** > **Xthings Cloud** > **⋮** > **Reload** to refresh.
3. Check the Home Assistant logs for any error messages from `custom_components.xthings_cloud`.

### Camera shows no video

#### Resolution

1. Ensure the camera is online and has the latest firmware.
2. Use a WebRTC-compatible browser (Chrome recommended).
3. Make sure your Home Assistant version is 2024.1 or later.
4. Check that your network does not block WebRTC/UDP traffic.

## Removing the integration

This integration follows standard integration removal. 

{% include integrations/remove_device_service.md %}
