---
title: "Get travel times"
action: waze_travel_time.get_travel_times
domain: waze_travel_time
description: "Retrieves route alternatives and travel times between two locations."
---

The **Get travel times** action retrieves route alternatives and travel times between two locations.

This is useful when you want an automation or script to look up live travel times on demand, for example to decide when to leave or to find the exact street names along a route.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. Instead, you provide the origin, destination, and route preferences.

{% include actions/ui_header.md %}

To get travel times from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Waze Travel Time: Get travel times**.
6. Enter the **Origin**, **Destination**, and **Region**, then optionally set the other options.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Origin:
  description: The origin of the route. Accepts coordinates, an address, or an entity such as a person or zone.
  required: true
Destination:
  description: The destination of the route. Accepts coordinates, an address, or an entity such as a person or zone.
  required: true
Region:
  description: The region, which controls which Waze server is used. One of US, North America, Europe, Israel, or Australia.
  required: true
Realtime travel time?:
  description: Use real-time data instead of statistical data. Defaults to off.
  required: false
Vehicle type:
  description: The vehicle to use. One of car, taxi, or motorcycle. Defaults to car.
  required: false
Units:
  description: The unit system to use. Either metric or imperial. Defaults to metric.
  required: false
Avoid toll roads?:
  description: Avoid toll roads. Defaults to off.
  required: false
Avoid roads needing a vignette / subscription?:
  description: Avoid roads that need a vignette or subscription. Defaults to off.
  required: false
Avoid ferries?:
  description: Avoid ferries. Defaults to off.
  required: false
Streets to include:
  description: An exact street name that must be part of the selected route. The match is case-sensitive and must include spaces and special characters.
  required: false
Streets to exclude:
  description: An exact street name that must not be part of the selected route. The match is case-sensitive and must include spaces and special characters.
  required: false
Time delta:
  description: A time offset from now to calculate the route for. Positive values are in the future, negative values are in the past.
  required: false
Base coordinates:
  description: When Waze finds multiple matching locations for an address, it selects the one closest to these coordinates.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `waze_travel_time.get_travel_times`. Because this action returns data, use `response_variable` to capture the result. A basic example looks like this:

{% example %}
action: |
  action: waze_travel_time.get_travel_times
  data:
    origin: "51.330436, 3.802043"
    destination: "51.445677, 3.749929"
    region: eu
  response_variable: routes
{% endexample %}

This looks up the routes and stores the result in the `routes` variable.

### Options in YAML

{% options_yaml %}
origin:
  description: >
    The origin of the route. Accepts coordinates, an address, or an
    entity such as a person or zone.
  required: true
  type: string
destination:
  description: >
    The destination of the route. Accepts coordinates, an address, or an
    entity such as a person or zone.
  required: true
  type: string
region:
  description: >
    The region, which controls which Waze server is used. One of `us`
    (United States), `na` (North America), `eu` (Europe), `il` (Israel),
    or `au` (Australia).
  required: true
  type: string
realtime:
  description: >
    Use real-time data instead of statistical data.
  required: false
  type: boolean
  default: false
vehicle_type:
  description: >
    The vehicle to use. One of `car`, `taxi`, or `motorcycle`.
  required: false
  type: string
  default: car
units:
  description: >
    The unit system to use. Either `metric` or `imperial`.
  required: false
  type: string
  default: metric
avoid_toll_roads:
  description: >
    Avoid toll roads.
  required: false
  type: boolean
  default: false
avoid_subscription_roads:
  description: >
    Avoid roads that need a vignette or subscription.
  required: false
  type: boolean
  default: false
avoid_ferries:
  description: >
    Avoid ferries.
  required: false
  type: boolean
  default: false
incl_filter:
  description: >
    One or more exact street names that must be part of the selected
    route. The match is case-sensitive and must include spaces and
    special characters.
  required: false
  type: list
excl_filter:
  description: >
    One or more exact street names that must not be part of the selected
    route. The match is case-sensitive and must include spaces and
    special characters.
  required: false
  type: list
time_delta:
  description: >
    A time offset from now to calculate the route for. Positive values
    are in the future, negative values are in the past.
  required: false
  type: map
base_coordinates:
  description: >
    When Waze finds multiple matching locations for an address, it
    selects the one closest to these coordinates.
  required: false
  type: map
{% endoptions_yaml %}

## Response data

The action returns a `routes` list. Each route includes:

- `name`: a short description of the route, usually a main road along the way.
- `distance`: the distance of the route, in the selected unit system.
- `duration`: the travel time of the route, in minutes.
- `street_names`: the list of street names along the route.

For the example above, the response looks similar to this:

{% example %}
output: |
  routes:
    - duration: 16.15
      distance: 13.942
      name: B455 - Boelckestraße Wiesbaden
      street_names:
        - Eleonorenstraße
        - Wiesbadener Straße
        - Otto-Suhr-Ring
        - Boelckestraße
    - duration: 16.9
      distance: 15.319
      name: L3482 - Wiesbadener Landstraße Wiesbaden
      street_names:
        - Eleonorenstraße
        - Wiesbadener Landstraße
        - Kasteler Straße
{% endexample %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
