---
title: "Get transit times"
action: google_travel_time.get_transit_times
domain: google_travel_time
description: "Retrieves route alternatives and travel times between two locations using public transit."
related_actions:
  - google_travel_time.get_travel_times
---

The **Get transit times** action retrieves route alternatives and travel times between two locations using public transit. You can set a preferred transit mode and routing preference, and choose either a departure time or an arrival time.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get transit times from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Google Maps Travel Time: Get transit times**.
6. Select the **Config entry**, then enter the **Origin** and **Destination**. Set any of the other options you need.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Config entry:
  description: The config entry to use for this action.
  required: true
Origin:
  description: The origin of the route. You can use an address, GPS coordinates, or an entity ID.
  required: true
Destination:
  description: The destination of the route. You can use an address, GPS coordinates, or an entity ID.
  required: true
Units:
  description: "Which unit system to use. One of metric or imperial. Defaults to metric."
Language:
  description: The language to use for the response.
Transit mode:
  description: "The preferred transit mode. One of bus, subway, train, tram, or rail."
Transit routing preference:
  description: "The transit routing preference. One of less_walking or fewer_transfers."
Departure time:
  description: "The desired departure time, as a time string such as 08:00:00."
Arrival time:
  description: "The desired arrival time, as a time string such as 08:00:00."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `google_travel_time.get_transit_times`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: google_travel_time.get_transit_times
  data:
    config_entry_id: 6b4be47a1fa7c3764f14cf756dc9899d
    origin: device_tracker.my_phone
    destination: "Gare du Nord, Paris"
    transit_mode: train
  response_variable: transit_times
{% endexample %}

This fetches the public transit routes from your phone's location to Gare du Nord, preferring trains.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: The config entry to use for this action.
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
  description: "Which unit system to use. One of metric or imperial."
  required: false
  type: string
  default: metric
language:
  description: The language to use for the response.
  required: false
  type: string
transit_mode:
  description: "The preferred transit mode. One of bus, subway, train, tram, or rail."
  required: false
  type: string
transit_routing_preference:
  description: "The transit routing preference. One of less_walking or fewer_transfers."
  required: false
  type: string
departure_time:
  description: "The desired departure time, as a time string such as 08:00:00."
  required: false
  type: string
arrival_time:
  description: "The desired arrival time, as a time string such as 08:00:00."
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- You can set either a departure time or an arrival time, but not both.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
