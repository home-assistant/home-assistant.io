---
title: Bosch Smart Camera
description: Instructions on how to integrate Bosch cameras into Home Assistant.
ha_categories:
  - security_safety.cameras
ha_release: 2026.11
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: bosch_smart_camera
ha_codeowners:
  - "@mosandlt"
ha_platforms:
  - camera
ha_integration_type: hub
ha_quality_scale: bronze
---

The **Bosch Smart Camera** {% term integration %} connects your Bosch SingleKey ID account to Home Assistant. Each camera of the account is added as a camera entity that shows the latest available event image.

## Supported devices

The following cameras are supported with this account:

- Eyes Outdoor camera
- 360° Indoor camera
- Eyes Outdoor camera II
- Eyes Indoor camera II

## Prerequisites

You need a Bosch SingleKey ID account that has at least one camera registered in the Bosch Smart Camera app.

{% include integrations/config_flow.md %}

You are redirected to the Bosch login page to sign in with your SingleKey ID.

## Supported functionality

The integration adds one camera entity per camera of the account. The entity shows the latest available event image, for example a motion or person event. It is not a live image. The image is cached for 60 seconds, so dashboards and automations can request it often without extra load on the Bosch cloud.

Each camera is also added as a device, together with its model and firmware version. Cameras that are added to or removed from the account are added or removed in Home Assistant automatically.

### Live stream

The camera entity can show a live stream in dashboards and in the more-info dialog. Home Assistant opens the stream when you start watching and closes it when nobody is watching anymore. The camera manages stream sessions of up to 60 minutes, and Home Assistant renews the session automatically while the stream is in use.

Home Assistant must be able to reach the camera in your local network to show the stream.

## Data updates

The integration polls the Bosch cloud for the list of cameras every 5 minutes. The image of a camera is only retrieved when it is requested.

## Known limitations

### Event images

The image of the camera entity is the latest available event image, not a live image. A camera without any event image has no image to show.

### Live stream

The live stream uses the HLS format, so it is shown with a delay of a few seconds. WebRTC is not supported yet.

### Cloud connection

A cloud connection is required.

## Troubleshooting

### The login page does not return to Home Assistant

#### Symptom

After signing in, you are not sent back to Home Assistant.

#### Resolution

1. Make sure [My Home Assistant](https://my.home-assistant.io/) is configured with your instance URL in the same browser you use to sign in.
2. Start the setup again from {% my integrations title="**Settings** > **Devices & services**" %}.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
