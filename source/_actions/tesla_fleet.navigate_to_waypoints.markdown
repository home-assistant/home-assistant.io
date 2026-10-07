---
title: "Navigate to waypoints"
action: tesla_fleet.navigate_to_waypoints
domain: tesla_fleet
description: "Sends an ordered trip to your Tesla vehicle using Google Place IDs."
related_actions:
  - tesla_fleet.navigate_to_destination
  - tesla_fleet.navigate_to_coordinates
---

The **Navigate to waypoints** action sends an ordered list of places to your Tesla vehicle's navigation. The last place is the final destination. All earlier places are intermediate stops.

Use [Google Place IDs](https://developers.google.com/maps/documentation/places/web-service/place-id) to identify the places. You can find an ID with Google's [Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder).

{% include actions/ui_header.md %}

To send a trip from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Tesla Fleet: Navigate to waypoints**.
6. Select the **Vehicle** to send the trip to.
7. Enter each **Place ID** in travel order. Put the final destination last.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Vehicle:
  description: The vehicle to send the trip to.
Place IDs:
  description: Google Place IDs in travel order. Enter the bare IDs, without the `refId:` prefix. The last ID is the final destination.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `tesla_fleet.navigate_to_waypoints`. A basic example looks like this:

{% example %}
action: |
  action: tesla_fleet.navigate_to_waypoints
  data:
    device_id: 0d462c0c4c0b064b1a91cdbd1ffcbd31
    place_ids:
      - ChIJVTPokywQkFQRmtVEaUZlJRA
      - ChIJQWCmo89rkFQRZQfQ6oJUz7o
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The ID of the vehicle to send the trip to.
  required: true
  type: string
place_ids:
  description: >
    A nonempty list of bare Google Place IDs in travel order. The last ID is the final destination.
  required: true
  type: list
{% endoptions_yaml %}

## Good to know

- Supply the complete trip, including the final destination, in this action.
- The vehicle is woken up if needed, and the **Vehicle Commands** scope is required.
- The action sends the IDs you supply. It does not look up addresses or coordinates, or check the IDs with Google.
- Place IDs can change. Google recommends refreshing stored IDs older than 12 months. Update your saved IDs if a place moves or an ID stops working.
- Repeated IDs are forwarded unchanged.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
