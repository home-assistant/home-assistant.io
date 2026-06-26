---
title: Imou
description: Integrate Imou smart devices into Home Assistant.
ha_category:
  - Button
  - Camera
  - Switch
ha_iot_class: Cloud Polling
ha_release: 2026.6
ha_config_flow: true
ha_domain: imou
ha_codeowners:
  - '@Imou-OpenPlatform'
ha_platforms:
  - button
  - camera
  - switch
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Imou** {% term integration %} connects to the [Imou Open Platform](https://open.imoulife.com/) using your App ID and App secret. Devices linked to your platform account are discovered automatically. Channel devices expose **Live view SD** and **Live view HD** camera entities, supported actions are exposed as button entities, and supported toggles are exposed as switch entities in Home Assistant.

## Supported devices

The integration supports Imou devices that are already added to your Imou Open Platform account and reported by the cloud API. Supported button and switch entities depend on each device type (for example, PTZ controls are only created when the device supports PTZ).

Add or remove devices in the Imou Open Platform or Imou app; new devices are picked up on the next data refresh.

## Prerequisites

Before using the Imou integration, create an Imou Open Platform application:

1. Visit [Imou Open Platform](https://open.imoulife.com/).
2. Register or log in to your Imou account, then open the **Control board**.
3. Go to **App Information** to obtain an **App ID** and **App secret**.
4. Add your Imou devices in the Imou Open Platform or Imou mobile app so they appear on your account.

## Configuration

{% include integrations/config_flow.md %}

{% configuration_basic %}
App ID:
  description: The App ID from your Imou Open Platform application.
App secret:
  description: The App secret from your Imou Open Platform application.
Server region:
  description: The API region for your account. Choose the region closest to where your account was registered.
{% endconfiguration_basic %}

When adding the integration, select **Server region** to match your Open Platform account:

- **Singapore (Asia-Pacific)** (`sg`)
- **Europe** (`eu`)
- **North America** (`na`)
- **China** (`cn`)

These regions correspond to the API endpoints used by the integration.

## API usage

Imou Open Platform API usage limits apply to your App ID:

1. Each App ID includes a monthly quota of 30,000 free API requests. Usage above the quota is billed at the [published unit price](https://open.imoulife.com/price).
2. API endpoints are split by region. Select the matching **Server region** during setup. For details, see the [development specification](https://open.imoulife.com/book/http/develop.html).
3. For additional API documentation, see the HTTP interface section in the [development documentation](https://open.imoulife.com/book/en).

## Supported functionality

### Camera

Each device channel with a camera feed exposes two camera entities:

- **Live view SD**: Standard-definition cloud live stream.
- **Live view HD**: High-definition cloud live stream.

Both are enabled by default. You can view a still image or start a live stream when the device is online.

### Buttons

The integration exposes button entities when the cloud API reports that the action is supported for a device:


- **PTZ up**, **PTZ down**, **PTZ left**, **PTZ right**: Move the camera lens in the corresponding direction. Each press moves the lens for a short interval. The device must support PTZ.
- **Mute**: Silence alarm audio on supported gateway devices.
- **Restart**: Remotely restart the device (shown with the restart device class when supported).

### Switches

The integration exposes switch entities when the cloud API reports that the toggle is supported for a device:

- **Motion detect**: Enable or disable motion detection on supported cameras.
- **Human detect**: Enable or disable human detection on supported cameras.
- **White light**: Turn the camera white light on or off on supported models.
- **Close camera**: Enable privacy mode that closes or disables the camera lens on supported models.
- **Abnormal sound alarm**: Enable or disable abnormal sound detection alarms.
- **Audio encode control**: Enable or disable audio encoding on supported devices.
- **Light**: Control an IoT light switch on supported smart plug or bulb devices.
- **Plug switch**: Control the main power switch on supported IoT socket devices.

## Data updates

The integration {% term polling polls %} Imou cloud APIs every 2 minutes to refresh the device list and online status. New devices on your account are added automatically; devices removed from your account are removed from Home Assistant.

## Security and privacy considerations

This integration communicates with Imou cloud services. Device control commands are sent through Imou servers. Review Imou's [privacy policy](https://open.imoulife.com/book/http/privacy.html) and terms of service before proceeding.

## Troubleshooting

### Invalid App ID or App secret

Verify that **App ID**, **App secret**, and **Server region** match your Imou Open Platform application and account region.

### API quota is used quickly

The integration polls the platform regularly to discover devices and refresh online status. API usage increases with the number of devices on your account. Review your usage on the Imou Open Platform.

### A button is unavailable

Buttons are unavailable when a device is offline or no longer on your account. Ensure the device has power and network connectivity and appears online in the Imou app.

### A switch is unavailable

Switches are unavailable when a device is offline or no longer on your account. Ensure the device has power and network connectivity and appears online in the Imou app.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
