---
title: Geolocation
description: Show events such as earthquakes and bush fires near your home on a map, and use them in automations.
ha_category:
  - Geolocation
ha_release: 0.78
ha_domain: geo_location
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_integration_type: entity
---

The **Geolocation** {% term integration %} provides entities for real-world events near your home, such as weather events, bush fires, or earthquakes. Each entity has coordinates and a distance to the location the integration watches, which is usually your home. This lets you see it on a map and react to it in automations.

{% include integrations/building_block_integration.md %}

## About geolocation entities

Each geolocation entity stands for one event in the feed of an integration, such as one earthquake or one bush fire. Geolocation entities are temporary, so you can't select a specific one in advance. For example, an earthquake that hasn't happened yet has no entity. Geolocation entities also don't belong to a device, so you won't find them on a device page.

To select geolocation entities, you use the source of the integration instead: a short name that the integration adds to all of its geolocation entities. The Map card and the Geolocation trigger use the source to select all events of one integration at once. For the source of each integration, refer to [Integrations that provide geolocation entities](#integrations-that-provide-geolocation-entities).

## Showing geolocation events on a dashboard

To see the events on a map, add an integration that provides geolocation entities. The events appear on the **Map** dashboard, and you can also show them on your own dashboard with a Map card.

1. Add an integration from the list in [Integrations that provide geolocation entities](#integrations-that-provide-geolocation-entities).
   - You add GDACS, GeoJSON, and GeoNet NZ Quakes in {% my integrations title="**Settings** > **Devices & services**" %}.
   - The other integrations are set up in your {% term "`configuration.yaml`" %} file. Follow the steps on the integration's page.
2. During setup, choose which events you want to see, for example, by setting a radius around your home. The available filters depend on the integration.
3. To see the events, in the sidebar, select **Map**.
   - Result: The map shows the events that match your filters.
   - When a new event appears in the feed, the integration creates an entity for it, and it appears on the map. When the event is no longer in the feed, the integration removes the entity.
   - If there are no matching events, the map shows no events.
4. Optional: To show the events on your own dashboard, add a Map card:
   1. [Add a Map card](/dashboards/map/#adding-the-map-card-to-a-dashboard) to your dashboard.
   2. In the card settings, under **Geolocation sources**, select the source of the integration.
      - You can find the source of each integration in [Integrations that provide geolocation entities](#integrations-that-provide-geolocation-entities).
      - The list only shows the sources of events that exist right now. If the source isn't listed, enter it yourself.
   3. Select **Save**.

## Getting notified about events near your home

To get a notification when an event, such as an earthquake, happens in an area you choose, for example, near your home, create an automation that uses the Geolocation trigger.

1. Add an integration that provides geolocation entities, as described in [Showing geolocation events on a dashboard](#showing-geolocation-events-on-a-dashboard).
2. Create the zone you want to watch in {% my zones title="**Settings** > **Areas, labels & zones**" %}. To keep the zone from affecting where people and devices are shown, turn on **Passive**.
3. Create an automation with the [Geolocation trigger](/triggers/geo_location/). Enter the source of the integration, select the zone, and under **Event**, keep **Enter**.
4. Optional: To react only to some events, add a [Template condition](/docs/scripts/conditions/#template-condition) that checks the attributes of the event.
5. Add an action that sends a notification, and save the automation.
   - For a complete automation, refer to the [bush fire example](/triggers/geo_location/#automation-get-a-notification-about-a-bush-fire-near-your-home).

## Integrations that provide geolocation entities

The following integrations create geolocation entities. Each item shows the integration, followed by its source:

- [Global Disaster Alert and Coordination System (GDACS)](/integrations/gdacs/): `gdacs`
- [GeoJSON](/integrations/geo_json_events/): `geo_json_events`
- [GeoNet NZ Quakes](/integrations/geonetnz_quakes/): `geonetnz_quakes`
- [IGN Sismología](/integrations/ign_sismologia/): `ign_sismologia`
- [NSW Rural Fire Service Incidents](/integrations/nsw_rural_fire_service_feed/): `nsw_rural_fire_service_feed`
- [Queensland Bushfire Alert](/integrations/qld_bushfire/): `qld_bushfire`
- [U.S. Geological Survey Earthquake Hazards (USGS)](/integrations/usgs_earthquakes_feed/): `usgs_earthquakes_feed`

## Geolocation states

The state of a geolocation entity is the distance from the event to the location the integration watches, rounded to one decimal place, for example, `12.3`. By default, this is your home location. The integration decides the unit. Most integrations use kilometers, and some switch to miles if your Home Assistant uses the US customary unit system.

In addition, the entity can have the following states. Each item shows the interface label, followed by the stored state:

- **Unavailable** (`unavailable`): The entity is currently unavailable.
- **Unknown** (`unknown`): The distance is not known.

### Geolocation attributes

Each geolocation entity has the following attributes. Each item shows the label you see in the Home Assistant interface, followed by the attribute name as Home Assistant stores it:

- **Source** (`source`): The source of the integration that created the entity, for example, `gdacs`.
- **Latitude** (`latitude`): The latitude of the event, rounded to five decimal places.
- **Longitude** (`longitude`): The longitude of the event, rounded to five decimal places.

Many integrations add their own attributes, such as the type or status of an incident. To react only to some events, check these attributes in a [Template condition](/docs/scripts/conditions/#template-condition).

{% include integrations/triggers.md %}
