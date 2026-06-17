---
title: "Get transit times"
action: google_travel_time.get_transit_times
domain: google_travel_time
description: "Retrieves route alternatives and travel times between two locations using public transit."
related_actions:
  - google_travel_time.get_travel_times
---

The **Get transit times** action retrieves route alternatives and travel times between two locations using public transit, and returns them as response data. For driving, walking, or bicycling, use the [Get travel times](/actions/google_travel_time.get_travel_times/) action instead.

This action does not target an entity. Instead, you select which Google Maps Travel Time configuration entry to use, and provide the origin and destination.

{% include actions/ui_header.md %}

To get transit times from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Google Maps Travel Time: Get transit times**.
6. Select the **Config entry** to use, enter the **Origin** and **Destination**, and set any of the options you need.
7. In the **Response variable** field, enter a name to store the result, for example, `transit_times`.
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
Units:
  description: Which unit system to use, either metric or imperial.
  required: false
Language:
  description: The language to use for the response.
  required: false
Transit mode:
  description: The preferred transit mode, either bus, subway, train, tram, or rail.
  required: false
Transit routing preference:
  description: The transit routing preference, either less walking or fewer transfers.
  required: false
Departure time:
  description: The desired departure time, as a time string such as `08:00:00`.
  required: false
Arrival time:
  description: The desired arrival time, as a time string such as `08:00:00`.
  required: false
Response variable:
  description: The name of the variable where the result will be stored. If not provided, the result won't be stored.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `google_travel_time.get_transit_times`. A basic example looks like this:

{% example %}
action: |
  action: google_travel_time.get_transit_times
  data:
    config_entry_id: "013713c172577bada2874a32dbe44feb"
    origin: "1600 Amphitheatre Parkway, Mountain View, CA"
    destination: "1 Infinite Loop, Cupertino, CA"
  response_variable: transit_times
{% endexample %}

This retrieves the transit times and stores them in the `transit_times` response variable.

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
units:
  description: "Which unit system to use. One of `metric` or `imperial`."
  required: false
  type: string
  default: metric
language:
  description: The language to use for the response.
  required: false
  type: string
transit_mode:
  description: >
    The preferred transit mode. One of `bus`, `subway`, `train`, `tram`, or
    `rail`.
  required: false
  type: string
transit_routing_preference:
  description: >
    The transit routing preference. One of `less_walking` or
    `fewer_transfers`.
  required: false
  type: string
departure_time:
  description: The desired departure time, as a time string such as `08:00:00`.
  required: false
  type: string
arrival_time:
  description: The desired arrival time, as a time string such as `08:00:00`.
  required: false
  type: string
response_variable:
  description: >
    The name of the variable where the result will be stored.
    If not provided, the result won't be stored.
  required: false
  type: string
{% endoptions_yaml %}

{% note %}
You can set a departure time or an arrival time, but not both in the same action call.
{% endnote %}

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
