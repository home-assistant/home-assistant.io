---
title: "Get warnings"
action: geosphere_austria_warnings.get_warnings
domain: geosphere_austria_warnings
description: "Retrieves all active and advance weather warnings for a GeoSphere Austria location."
---

Use this action to retrieve the full details of every weather warning GeoSphere Austria currently publishes for one of your locations, including the warning text, the expected impacts, and the recommended actions.

The **Warning level** and **Advance warning level** sensors only describe the single most severe warning. Use this action when you want all of them, for example to list every warning in a notification or on a dashboard.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get warnings from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **GeoSphere Austria Warnings: Get warnings**.
6. Select the **Location** to get the warnings for.
7. In the **Response variable** field, enter a name to store the data in, such as `warnings`.
8. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Location:
  description: The monitored municipality to get the warnings for.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `geosphere_austria_warnings.get_warnings`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: geosphere_austria_warnings.get_warnings
  data:
    config_entry: 1b4ba1c4d8f5e3a29c6e7d2f0a3b8c91
  response_variable: warnings
{% endexample %}

This stores the warnings for the selected municipality in `warnings`.

### Options in YAML

{% options_yaml %}
config_entry:
  description: >
    The monitored municipality to get the warnings for.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The response contains two lists:

- `active_warnings`: Warnings that have already started and have not ended yet.
- `advance_warnings`: Warnings that GeoSphere Austria has issued but that start later.

A list with no warnings is empty. Both lists are sorted by severity, with the most severe warning first. Warnings of equal severity are sorted by start time, earliest first.

Each warning contains the following fields:

- `warning_id`, `change_id`, `course_id`: The identifiers GeoSphere Austria assigns to the warning.
- `type`: The kind of weather event. One of `storm`, `rain`, `snow`, `black_ice`, `thunderstorm`, `heat`, or `cold`.
- `level`: The severity. One of `yellow`, `orange`, or `red`.
- `start` and `end`: When the warning starts and ends, in ISO 8601 format.
- `text`: A summary of the warning.
- `impacts`: The effects to expect.
- `recommendations`: What GeoSphere Austria advises you to do.
- `meteo_text`: Additional meteorological detail.
- `update_reason`: Why the warning was last updated. Empty when it has not been updated.

```yaml
active_warnings:
  - warning_id: 4149
    change_id: 6
    course_id: 12
    type: storm
    level: orange
    start: "2023-03-27T08:00:00+00:00"
    end: "2023-03-27T18:00:00+00:00"
    text: Orange storm warning from Mon, 27.03.2023 08:00 until Mon, 27.03.2023 18:00
    impacts: "* Branches may fall and objects may be thrown around."
    recommendations: "* Be careful in forests, parks and avenues!"
    meteo_text: Strong northwest winds with gusts between 60 and 80 km/h.
    update_reason: ""
advance_warnings: []
```

The values are read from the data the integration already holds, so calling this action does not contact GeoSphere Austria.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
