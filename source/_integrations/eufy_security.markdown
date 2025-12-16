---
title: Eufy Security
description: Instructions on how to integrate Eufy Security cameras into Home Assistant.
ha_category:
  - Camera
ha_release: 2025.1
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: eufy_security
ha_platforms:
  - camera
ha_integration_type: integration
ha_codeowners:
  - '@ptarjan'
---

The Eufy Security integration allows you to view and stream your [Eufy Security](https://www.eufylife.com/security) cameras and video doorbells in Home Assistant.

{% note %}
This integration is for Eufy Security cameras and doorbells. For Eufy smart home devices like lights and switches, see the [EufyHome](/integrations/eufy/) integration.
{% endnote %}

## How you can use this integration

The Eufy Security integration allows you to take the following actions:

- View live camera streams from your Eufy Security cameras and doorbells.
- Take snapshots with your cameras.
- Monitor camera status in your Home Assistant dashboards.
- Include camera feeds in automations and scripts.

## Prerequisites

Before setting up this integration, you need the following:

- A Eufy Security account (email and password) configured in the Eufy Security app.
- Your Eufy Security cameras or doorbells set up and working in the Eufy Security app.
- For local RTSP streaming (optional): RTSP credentials configured on your camera via the Eufy Security app.

{% include integrations/config_flow.md %}

{% configuration_basic %}

Email:
  description: The email address associated with your Eufy Security account.

Password:
  description: Your Eufy Security account password.

{% endconfiguration_basic %}

{% note %}
If Eufy's servers require CAPTCHA verification during login, you will be prompted to complete the CAPTCHA challenge in the configuration flow.
{% endnote %}

## Supported devices

The following Eufy Security device types are supported:

- **Cameras**: Indoor cameras, outdoor cameras, floodlight cameras.
- **Video doorbells**: Battery and wired video doorbells.

## Supported functionality

### Camera

The camera platform provides live streaming and snapshot capabilities for your Eufy Security cameras and doorbells.

#### Live streaming

The integration supports live streaming from your cameras. When RTSP credentials are configured on your camera through the Eufy Security app, the integration prefers local RTSP streaming for better performance and reduced latency. If local streaming is not available or not configured, it falls back to cloud streaming.

#### Snapshots

Camera snapshots are supported via FFmpeg. To prevent overwhelming your cameras and the Eufy API, snapshots are throttled to one request per 60 seconds per camera.

## Data updates

The Eufy Security integration communicates with Eufy's cloud API to retrieve camera information and stream URLs. The integration maintains a persistent session to minimize re-authentication requests.

When authentication tokens expire, the integration automatically refreshes them. If Eufy's API returns an alternative endpoint (domain switching), the integration will automatically adapt.

## Known limitations

### Cloud dependency

This integration requires communication with Eufy's cloud servers. If Eufy's servers are unavailable, the integration will not function.

### RTSP local streaming

Local RTSP streaming requires manual configuration of RTSP credentials in the Eufy Security app for each camera. Not all camera models support RTSP streaming.

### Snapshot throttling

Snapshots are limited to one per 60 seconds per camera to prevent excessive API calls and potential rate limiting.

## Troubleshooting

### Authentication issues

If you experience authentication failures:

1. Verify your credentials are correct by logging into the Eufy Security app.
2. Check if your account requires CAPTCHA verification.
3. Try removing and re-adding the integration.

### Streaming issues

If live streams are not working:

1. Check that your camera is online in the Eufy Security app.
2. For local RTSP streaming, verify RTSP credentials are configured in the Eufy Security app.
3. Ensure your Home Assistant instance can reach either the local camera (for RTSP) or Eufy's cloud servers.

### Reauthentication

If your credentials change or become invalid, Home Assistant will prompt you to reauthenticate. Go to {% my integrations title="**Settings** > **Devices & services**" %}, find the Eufy Security integration, and follow the reauthentication prompts.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
