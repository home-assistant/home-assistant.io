---
title: "Get travel times"
action: google_travel_time.get_travel_times
domain: google_travel_time
description: "Retrieves route alternatives and travel times between two locations."
related_actions:
  - google_travel_time.get_transit_times
---

The **Get travel times** action retrieves route alternatives and travel times between two locations, and returns them as response data. It covers driving, walking, and bicycling. For public transit, use the [Get transit times](/actions/google_travel_time.get_transit_times/) action instead.

This action does not target an entity. Instead, you select which Google Maps Travel Time configuration entry to use, and provide the origin and destination.

{% include actions/ui_header.md %}

To get travel times from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Google Maps Travel Time: Get travel times**.
6. Select the **Config entry** to use, enter the **Origin** and **Destination**, and set any of the options you need.
7. In the **Response variable** field, enter a name to store the result, for example, `travel_times`.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Config entry:
  description: The Google Maps Travel Time configuration entry to use for this action.
  required: true
Origin:
  description: The origin of the route. You can use an address, GPS coordinates, or an entity ID.
  required: true
Destination:
  description: The destination of the route. You can use an address, GPS coordinates, or an entity ID.
  required: true
Mode:
  description: The mode of transportation, either driving, walking, or bicycling.
  required: false
Units:
  description: Which unit system to use, either metric or imperial.
  required: false
Language:
  description: The language to use for the response.
  required: false
Avoid:
  description: A route feature to avoid, either tolls, highways, ferries, or indoor.
  required: false
Traffic model:
  description: The traffic model to use when calculating driving routes, either best guess, pessimistic, or optimistic.
  required: false
Departure time:
  description: The desired departure time, as a time string such as `08:00:00`.
  required: false
Response variable:
  description: The name of the variable where the result will be stored. If not provided, the result won't be stored.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `google_travel_time.get_travel_times`. A basic example looks like this:

{% example %}
action: |
  action: google_travel_time.get_travel_times
  data:
    config_entry_id: "013713c172577bada2874a32dbe44feb"
    origin: "1600 Amphitheatre Parkway, Mountain View, CA"
    destination: "1 Infinite Loop, Cupertino, CA"
  response_variable: travel_times
{% endexample %}

This retrieves the travel times and stores them in the `travel_times` response variable.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: The Google Maps Travel Time configuration entry to use for this action.
  required: true
  type: string
origin:
  description: The origin of the route. You can use an address, GPS coordinates, or an entity ID.
  required: true
  type: string
destination:
  description: The destination of the route. You can use an address, GPS coordinates, or an entity ID.
  required: true
  type: string
mode:
  description: >
    The mode of transportation. One of `driving`, `walking`, or
    `bicycling`.
  required: false
  type: string
  default: driving
units:
  description: "Which unit system to use. One of `metric` or `imperial`."
  required: false
  type: string
  default: metric
language:
  description: The language to use for the response.
  required: false
  type: string
avoid:
  description: >
    A route feature to avoid. One of `tolls`, `highways`, `ferries`, or
    `indoor`.
  required: false
  type: string
traffic_model:
  description: >
    The traffic model to use when calculating driving routes. One of
    `best_guess`, `pessimistic`, or `optimistic`.
  required: false
  type: string
departure_time:
  description: The desired departure time, as a time string such as `08:00:00`.
  required: false
  type: time
response_variable:
  description: >
    The name of the variable where the result will be stored.
    If not provided, the result won't be stored.
  required: false
  type: string
{% endoptions_yaml %}

## Response data

The response data is a mapping with a `routes` list. Each route has the following fields:

- `duration`: The travel time in seconds.
- `duration_text`: The travel time as readable text, such as `27 mins`.
- `static_duration_text`: The travel time without traffic, as readable text.
- `distance_meters`: The distance in meters.
- `distance_text`: The distance as readable text, such as `15.2 km`.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
