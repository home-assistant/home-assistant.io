---
title: ScorpionTrack
description: Instructions on how to integrate ScorpionTrack shared vehicle locations and speeds into Home Assistant.
ha_category:
  - Device tracker
ha_release: 2026.8
ha_iot_class: Cloud Polling
ha_domain: scorpiontrack
ha_platforms:
  - device_tracker
  - sensor
ha_config_flow: true
ha_integration_type: hub
ha_codeowners:
  - '@Herbertmt978'
ha_quality_scale: bronze
---

The **ScorpionTrack** {% term integration %} lets Home Assistant follow the location and speed of vehicles that have been shared through a public ScorpionTrack location-share link.

This integration is intentionally focused on the share-link workflow. It does not use your private ScorpionTrack account credentials. Instead, it reads the shared vehicle feed exposed by ScorpionTrack and creates location and speed entities from that data. The vehicle location appears on the Home Assistant map.

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

The **ScorpionTrack** integration creates one device for each vehicle included in the share. Each device provides:

- A {% term "device tracker" %} entity that represents the vehicle on the Home Assistant map and in zone logic, using the latest GPS location reported through the ScorpionTrack share
- A **Speed** sensor entity that shows the latest vehicle speed reported through the share

The tracker name uses the vehicle registration when available, and otherwise falls back to the vehicle name from the ScorpionTrack share.

The **Speed** sensor initially uses the unit selected for the ScorpionTrack share. You can choose a different display unit in the entity settings.

## Data updates

The **ScorpionTrack** integration {% term polling polls %} ScorpionTrack every 2 minutes for the latest shared vehicle position.

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
