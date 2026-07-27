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
  - camera
ha_integration_type: hub
---

The **Bosch Smart Home Camera** {% term integration %} connects [Bosch Smart Home](https://www.bosch-smarthome.com/) cameras to Home Assistant through the Bosch cloud API. It provides a still-image snapshot camera entity per camera, showing the latest motion-triggered image plus an on-demand refresh.

{% include integrations/config_flow.md %}

## Prerequisites

- A Bosch account (Bosch SingleKey ID) with at least one Bosch Smart Home camera registered to it.
- One or more of the supported camera models below, added to your Bosch account through the Bosch Smart Home app.

## Supported devices

- Eyes Outdoor (first generation, model `SVO-1601-220`)
- 360° Indoor (first generation, model `SVI-1609-5`)
- Eyes Outdoor II (second generation)
- Eyes Indoor II (second generation)

## Configuration

During setup, a browser opens to sign in with your Bosch SingleKey ID through Bosch's standard OAuth flow.

Only one Bosch Smart Home Camera account can be configured per Home Assistant instance.

If your Bosch Cloud token expires and can't be refreshed automatically, Home Assistant starts a re-authentication flow. Follow the same login step; all existing entities and options are preserved.

## Supported functionality

### Camera

Each camera is exposed as a {% term camera %} entity showing the latest motion-triggered snapshot, refreshed periodically and on demand. This is a still-image camera: it does not provide a live video stream. Snapshots are fetched primarily via the Bosch cloud API; for camera models whose cloud snapshot endpoint intermittently rejects requests, the integration automatically falls back to fetching the snapshot directly from the camera over the local network, using Digest credentials the cloud API itself issues (not a separate undocumented local API).

## Options

The integration's options (**Settings** > **Devices & services** > **Bosch Smart Home Camera** > **Configure**) let you toggle whether the camera entity is created, and migrate to the newer OSS OAuth client if your installation still uses the legacy one.

## Known limitations

- This integration relies primarily on Bosch's cloud API; Bosch does not currently offer a documented local-only API for these cameras (the automatic LAN snapshot fallback still authenticates through cloud-issued credentials).
- No live video stream — snapshot images only.
- A camera newly added to your Bosch account after the integration is set up is not picked up automatically; reload the config entry (or restart Home Assistant) to detect it.

## Troubleshooting

### Token expired / repeated re-authentication prompts

If the integration reports that your token has expired and cannot be refreshed, use the re-authentication flow from the integration's card on the Devices & services page. This repeats the login step without affecting your existing entities or options.

If re-authentication does not resolve a persistent authorization error, this can indicate an account-side permission issue with your Bosch account (for example, an incomplete camera registration) rather than a login problem. Check the official Bosch Smart Home app for any outstanding registration or terms-of-service prompt on your account.

### Camera shows as unavailable

Confirm the camera is online and reachable in the Bosch Smart Home app first.

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
