---
title: "Eufy Security"
description: "Instructions on how to integrate Eufy Security cameras into Home Assistant."
logo: eufy.png
ha_category:
  - Camera
ha_config_flow: true
ha_release: 2025.1
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@ptarjan'
---

The `eufy_security` integration allows you to view and stream your [Eufy Security](https://www.eufylife.com/security) cameras in Home Assistant.

## Prerequisites

You will need your Eufy Security account credentials (email and password) that you use in the Eufy Security app.

<div class='note'>
This integration is for Eufy Security cameras and doorbells. For Eufy smart home devices like lights and switches, see the <a href="/components/eufy/">Eufy</a> integration.
</div>

## Configuration

To add Eufy Security to your Home Assistant instance, go to **Settings** -> **Devices & Services** and click the **+ Add Integration** button. Search for **Eufy Security** and follow the configuration steps.

During setup, you will be prompted to enter:

- **Email**: The email address associated with your Eufy Security account
- **Password**: Your Eufy Security account password

<div class='note'>
If Eufy's servers require CAPTCHA verification during login, you will be prompted to complete the CAPTCHA challenge in the configuration flow.
</div>

## Streaming

The integration supports live streaming from your Eufy Security cameras. When RTSP credentials are configured on your camera, the integration prefers local RTSP streaming for better performance and reduced latency. If local streaming is not available, it will fall back to cloud streaming.

### Snapshots

Camera snapshots are supported via ffmpeg. To prevent overwhelming your cameras, snapshots are throttled to one request per 60 seconds.

## Reauthentication

If your credentials change or become invalid, Home Assistant will prompt you to reauthenticate through the integration's configuration flow. Go to **Settings** -> **Devices & Services**, find the Eufy Security integration, and follow the reauthentication prompts.

## Supported devices

This integration supports Eufy Security cameras and video doorbells that are compatible with the Eufy Security app.
