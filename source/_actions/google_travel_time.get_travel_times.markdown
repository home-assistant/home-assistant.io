---
title: "Get travel times"
action: google_travel_time.get_travel_times
domain: google_travel_time
description: "Retrieves route alternatives and travel times between two locations."
related_actions:
  - google_travel_time.get_transit_times
---

The **Get travel times** action retrieves route alternatives and travel times between two locations for driving, walking, or bicycling. You can fine-tune the result with options such as the units, the traffic model, and features to avoid.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get travel times from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Google Maps Travel Time: Get travel times**.
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
Travel mode:
  description: "The mode of transportation. One of driving, walking, or bicycling. Defaults to driving."
Units:
  description: "Which unit system to use. One of metric or imperial. Defaults to metric."
Language:
  description: The language to use for the response.
Avoid:
  description: "Features to avoid when calculating the route. One of tolls, highways, ferries, or indoor."
Traffic model:
  description: "The traffic model to use when calculating driving routes. One of best_guess, pessimistic, or optimistic."
Departure time:
  description: "The desired departure time, as a time string such as 08:00:00."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `google_travel_time.get_travel_times`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: google_travel_time.get_travel_times
  data:
    config_entry_id: 6b4be47a1fa7c3764f14cf756dc9899d
    origin: device_tracker.my_phone
    destination: "Eiffel Tower, Paris"
    mode: driving
  response_variable: travel_times
{% endexample %}

This fetches the driving routes from your phone's location to the Eiffel Tower.

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
mode:
  description: "The mode of transportation. One of driving, walking, or bicycling."
  required: false
  type: string
  default: driving
units:
  description: "Which unit system to use. One of metric or imperial."
  required: false
  type: string
  default: metric
language:
  description: The language to use for the response.
  required: false
  type: string
avoid:
  description: "Features to avoid when calculating the route. One of tolls, highways, ferries, or indoor."
  required: false
  type: string
traffic_model:
  description: "The traffic model to use when calculating driving routes. One of best_guess, pessimistic, or optimistic."
  required: false
  type: string
departure_time:
  description: "The desired departure time, as a time string such as 08:00:00."
  required: false
  type: string
{% endoptions_yaml %}

## Response data

The response contains the route alternatives and travel times between the two locations.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
