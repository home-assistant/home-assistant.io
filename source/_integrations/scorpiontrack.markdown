---
description: Instructions on how to integrate ScorpionTrack shared vehicle locations, speeds, and ignition states into Home Assistant.
ha_release: 2026.8
ha_domain: scorpiontrack
---

The **ScorpionTrack** {% term integration %} lets Home Assistant follow the location, speed, and ignition state of vehicles that have been shared through a public ScorpionTrack shared-location link.

This integration is intentionally focused on the share-link workflow. It does not use your private ScorpionTrack account credentials. Instead, it reads the shared vehicle feed exposed by ScorpionTrack and creates entities for location, speed, and ignition state from that data. The vehicle location appears on the Home Assistant map.

You can use the integration to:

- Find your vehicle's last reported location on the map and check the **Last reported** sensor to see how recent that position is.
- Use the vehicle tracker in a [zone automation](/docs/automation/trigger/#zone-trigger) to send a notification when the vehicle arrives at or leaves a location.
- Receive a notification in Home Assistant when the vehicle's ignition turns on, using the example below.

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

## Reconfigure the share

To check or update the link for an existing share:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select **ScorpionTrack**, then select the three dots {% icon "mdi:dots-vertical" %} menu for the share.
3. Select **Reconfigure** and enter the share URL or token.

Home Assistant checks the link before saving it and reloads the existing integration entry. The link must identify the same share. To use a different share, add it as a new integration entry.

Reconfiguration does not renew or restore a share in ScorpionTrack.

## Supported functionality

The **ScorpionTrack** integration creates one device for each vehicle included in the share. Each device provides:

- A {% term "device tracker" %} entity that represents the vehicle on the Home Assistant map and in zone logic, using the latest GPS location reported through the ScorpionTrack share.
- A **Speed** sensor entity that shows the latest vehicle speed reported through the share.
- A **Last reported** diagnostic sensor entity that shows when the vehicle last reported its position through the share.
- An **Ignition** binary sensor entity that shows the latest ignition state reported through the share.
- A **Heading** sensor entity that shows the bearing of the latest shared position in degrees. It is [disabled by default](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity).

The tracker name uses the vehicle registration when available, and otherwise falls back to the vehicle name from the ScorpionTrack share.

The **Speed** sensor initially uses the unit selected for the ScorpionTrack share. You can choose a different display unit in the entity settings.

## ScorpionTrack automation examples

{% include docs/paste_yaml_tip.md %}

### Automation: Notify when the ignition turns on

This automation creates a [persistent notification](/integrations/persistent_notification/) in Home Assistant when your vehicle's **Ignition** sensor changes from **Off** to **On**.

In the [automation editor](/docs/automation/editor/), use these settings:

- **Trigger**: State changed
  - **Entity**: Your vehicle's **Ignition** sensor
  - **From**: Off
  - **To**: On
- **Action**: Create persistent notification
  - **Title**: `Vehicle ignition`
  - **Message**: `Your vehicle's ignition is on.`

Setting both **From** and **To** prevents a notification when the sensor changes from **Unknown** or **Unavailable** to **On**. Notifications depend on the [polling interval and updates to the shared feed](#data-updates), so they are not immediate. Changes that happen between updates can be missed.

{% details "YAML example for an ignition notification" %}

Replace `binary_sensor.vehicle_ignition` with your vehicle's **Ignition** entity ID.

{% example %}
automation: |
  alias: "Notify when the vehicle ignition turns on"
  triggers:
    - trigger: state
      entity_id: binary_sensor.vehicle_ignition
      from: "off"
      to: "on"
  actions:
    - action: persistent_notification.create
      data:
        title: "Vehicle ignition"
        message: "Your vehicle's ignition is on."
{% endexample %}

{% enddetails %}

## Data updates

The **ScorpionTrack** integration {% term polling polls %} ScorpionTrack every 2 minutes for the latest location, speed, and ignition state of each shared vehicle.

## Known limitations

- This integration only supports ScorpionTrack shared-location links.
- If the share expires or is revoked, the entities will become unavailable until a valid share is configured again.
- The update speed is limited by the polling interval and by how often ScorpionTrack updates the shared feed itself.

## Troubleshooting

### The integration says the share is invalid

Make sure the shared-location link is still active in ScorpionTrack and that the token was copied correctly. If you pasted the full URL, verify that it is the actual share URL and not the customer portal page address.

### No vehicles appear after setup

Confirm that the ScorpionTrack share still includes vehicles and that the share has not expired. If you add vehicles to an existing share, Home Assistant creates their entities on the next successful update. You do not need to reload the integration.

### Download diagnostics

If you report a problem, you can [download diagnostics](/integrations/diagnostics/) from the ScorpionTrack integration. The download uses the most recent cached data and does not make another request to ScorpionTrack. Share tokens, names, registrations, addresses, and coordinates are redacted. Review the file before sharing it.

## Removing a vehicle

After a successful update confirms that a vehicle is no longer in the ScorpionTrack share, Home Assistant automatically removes its device and entities. Failed updates or missing location data do not remove a shared vehicle.

If you add the vehicle back to the share, Home Assistant creates its device and entities on the next successful update. You do not need to reload the integration.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
