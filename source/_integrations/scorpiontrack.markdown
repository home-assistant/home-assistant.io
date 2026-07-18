---
title: ScorpionTrack
description: Instructions on how to add ScorpionTrack shared vehicle locations and sensors to Home Assistant.
ha_category:
  - Device tracker
ha_release: 2026.8
ha_iot_class: Cloud Polling
ha_domain: scorpiontrack
ha_platforms:
  - binary_sensor
  - device_tracker
  - sensor
ha_config_flow: true
ha_integration_type: hub
ha_codeowners:
  - '@Herbertmt978'
ha_quality_scale: silver
---

The **ScorpionTrack** {% term integration %} lets Home Assistant follow shared vehicles and view their latest reported speed, ignition state, heading, and report time.

This integration is intentionally focused on the share link workflow. It does not use your private ScorpionTrack account credentials. Instead, it reads the shared vehicle feed exposed by ScorpionTrack and creates a device with tracking and sensor entities for each vehicle in the share.

## Prerequisites

Before setting up the integration, you need:

- A valid ScorpionTrack shared-location link
- At least one vehicle included in that share

## Create a share link

Create the share in the ScorpionTrack customer portal:

1. Open the ScorpionTrack location share page at [app.scorpiontrack.com/customer/locationshare](https://app.scorpiontrack.com/customer/locationshare).
2. Create a new shared-location entry.
3. Add every vehicle you want Home Assistant to track.
4. Choose a suitable expiry time for the share.
5. Copy the generated share URL.

You can paste either the full shared-location URL or just the token from that URL.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Share URL or token:
  description: "Paste the full ScorpionTrack shared-location URL or only the token from that URL."
{% endconfiguration_basic %}

## Supported functionality

The **ScorpionTrack** integration creates one device for each vehicle included in the share. Each device provides the following entities:

- **Device tracker**: Represents the vehicle on the Home Assistant map and in zone logic, using the latest GPS location reported through the ScorpionTrack share. This is the only entity that supplies a map location.
- **Ignition**: Shows whether the vehicle ignition is running.
- **Speed**: Shows the latest reported vehicle speed. Its initial display unit follows the preference from the ScorpionTrack share. You can change the unit in the entity settings.
- **Last reported**: Shows the time of the latest vehicle position in the shared feed.
- **Heading**: Shows the latest reported vehicle direction in degrees. This entity is disabled by default.

The device name uses the vehicle registration when available, and otherwise falls back to the vehicle name from the ScorpionTrack share.

## Data updates

The **ScorpionTrack** integration uses one shared update for the tracker and all sensor entities. It {% term polling polls %} ScorpionTrack every 15 seconds while any vehicle in the share reports that its ignition is running, and every 60 seconds when no vehicle reports that its ignition is running.

After the last vehicle stops reporting a running ignition, the integration performs one more update 15 seconds later, then returns to updates every 60 seconds. If a scheduled update fails because of a connection problem, the integration retries after 60 seconds. ScorpionTrack may update the shared feed less often than Home Assistant polls it, so entity states remain unchanged until newer data is available.

## Known limitations

- This integration only supports ScorpionTrack shared-location links.
- If the share expires or is revoked, the entities will become unavailable until a valid share is configured again.
- The update speed is limited by the polling interval and by how often ScorpionTrack updates the shared feed itself.

## Troubleshooting

### The integration says the share is invalid

Make sure the shared-location link is still active in ScorpionTrack and that the token was copied correctly. If you pasted the full URL, verify that it is the actual share URL and not the customer portal page address.

### No vehicles appear after setup

Confirm that the ScorpionTrack share still includes vehicles and that the share has not expired. Home Assistant creates tracker entities for vehicles present in the share when the integration is set up or reloaded. If you add vehicles to the share later, reload or reconfigure the integration.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
