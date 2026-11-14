---
title: "Get warnings"
action: geosphere_austria_warnings.get_warnings
domain: geosphere_austria_warnings
response: required
description: "Retrieves the active and advance weather warnings for a GeoSphere Austria Warnings location."
---

Use this action to retrieve the full details of all weather warnings for one of your GeoSphere Austria Warnings locations. It returns both the warnings that are currently active and the advance warnings that start later.

The warning sensors show the warning level and a few details of one selected warning. This action gives you every warning, including the warning text, the expected impacts, and the recommendations from GeoSphere Austria. For example, you can use the result to send a notification that explains what to expect and what to do.

{% include actions/ui_header.md %}

To get warnings from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **GeoSphere Austria Warnings: Get warnings**.
6. Under **Location**, select the location to get the warnings for.
7. In the **Response variable** field, enter a name to store the data in, such as `warnings`.
8. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Location:
  description: The GeoSphere Austria Warnings location to get the warnings for.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `geosphere_austria_warnings.get_warnings`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: geosphere_austria_warnings.get_warnings
  data:
    config_entry_id: YOUR_CONFIG_ENTRY_ID
  response_variable: warnings
{% endexample %}

This stores the warnings for the selected location in `warnings`.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The ID of the GeoSphere Austria Warnings location to get the warnings for.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

{% include actions/response.md %}

The response contains two lists:

- `active_warnings`: Warnings that have already started.
- `advance_warnings`: Warnings that GeoSphere Austria has issued, but that start later.

A list with no warnings is empty. Each item covers one time period of a warning. GeoSphere Austria can split a warning into several periods, for example when it lasts several days or its level changes over time. Such a warning appears once for each period, with the same `warning_id` and a different `course_id`.

Both lists use the same order as the warning sensors: warnings you can act on right now come first. Heat and cold warnings rank one severity tier below storm, rain, snow, black ice, and thunderstorm warnings. Among equally ranked warnings, the one that ends first comes first. So the first item of each list is the same warning that the matching sensor describes in its attributes.

Each item has the following fields:

- `warning_id`: The identifier GeoSphere Austria assigns to the warning.
- `change_id`: The change identifier GeoSphere Austria assigns to the warning.
- `course_id`: The identifier of this time period of the warning.
- `type`: The kind of weather event. One of `storm`, `rain`, `snow`, `black_ice`, `thunderstorm`, `heat`, or `cold`.
- `level`: The severity of the warning in this time period. One of `yellow`, `orange`, or `red`.
- `start`: When this time period starts, in ISO 8601 format.
- `end`: When this time period ends, in ISO 8601 format.
- `text`: A short summary of the warning.
- `impacts`: The expected impacts of the weather event.
- `recommendations`: What GeoSphere Austria recommends you do.
- `meteo_text`: A description of the weather situation.
- `update_reason`: The reason GeoSphere Austria gives for an update of the warning, if any.

Text fields that GeoSphere Austria did not provide are empty.

```yaml
active_warnings:
  - warning_id: 4149
    change_id: 6
    course_id: 12
    type: storm
    level: orange
    start: "2023-03-27T06:00:00+00:00"
    end: "2023-03-27T16:00:00+00:00"
    text: >
      Orange storm warning from Mon, 27.03.2023 08:00
      until Mon, 27.03.2023 18:00
    impacts: "* Branches may fall and objects may be thrown around."
    recommendations: "* Be careful in forests, parks and avenues!"
    meteo_text: "Strong northwest winds with gusts between 60 and 80 km/h."
    update_reason: ""
advance_warnings: []
```

## Good to know

- The action returns the warnings from the most recent update. It does not request new data from GeoSphere Austria. The integration updates the warnings every 5 minutes.
- If the most recent update failed, the action fails with the message **Weather warnings are unavailable because the last update failed.** At the same time, the warning sensors are unavailable. The action works again after the next successful update.
- The location must be loaded. If you disabled the location, or it failed to set up, the action fails.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: Explain what to do when a severe warning starts

The active warning level sensor tells you that a severe warning is active. Send a notification with what GeoSphere Austria expects and recommends.

The first item in the list is not always the most severe warning, because heat and cold warnings rank lower. So this example picks the first orange or red warning.

- **Trigger**: State changed
  - **Entity**: Innsbruck active warning level (`sensor.innsbruck_active_warning_level`)
  - **To**: Orange, Red
- **Action**: GeoSphere Austria Warnings: Get warnings
  - **Location**: Innsbruck
  - **Response variable**: `warnings`
- **Action**: Define variables
  - `warning`: the first active warning with the level orange or red
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Title**: `{{ warning.text }}`
  - **Message**: `{{ warning.impacts }} {{ warning.recommendations }}`

{% details "YAML example for explaining a severe warning" %}

{% example %}
automation: |
  alias: "Explain severe weather warning"
  triggers:
    - trigger: state
      entity_id: sensor.innsbruck_active_warning_level
      to:
        - orange
        - red
  actions:
    - action: geosphere_austria_warnings.get_warnings
      data:
        config_entry_id: YOUR_CONFIG_ENTRY_ID
      response_variable: warnings
    - variables:
        warning: >
          {{ warnings.active_warnings
             | selectattr('level', 'in', ['orange', 'red'])
             | first }}
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "{{ warning.text }}"
        message: >
          {{ warning.impacts }}
          {{ warning.recommendations }}
{% endexample %}

{% enddetails %}

### Automation: Morning summary of upcoming warnings

Every morning, get a list of all warnings that start later, so you can plan your day.

- **Trigger**: Time
  - **At**: 07:00
- **Action**: GeoSphere Austria Warnings: Get warnings
  - **Location**: Innsbruck
  - **Response variable**: `warnings`
- **Condition**: Template
  - **Value template**: `{{ warnings.advance_warnings | count > 0 }}`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Title**: `Upcoming weather warnings`
  - **Message**: The level, type, and start time of each warning, as shown in the YAML example.

{% details "YAML example for a morning summary of upcoming warnings" %}

{% example %}
automation: |
  alias: "Morning summary of upcoming weather warnings"
  triggers:
    - trigger: time
      at: "07:00:00"
  actions:
    - action: geosphere_austria_warnings.get_warnings
      data:
        config_entry_id: YOUR_CONFIG_ENTRY_ID
      response_variable: warnings
    - condition: template
      value_template: "{{ warnings.advance_warnings | count > 0 }}"
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        title: "Upcoming weather warnings"
        message: |
          {% for warning in warnings.advance_warnings -%}
          - {{ warning.level }} {{ warning.type }} warning, starts
            {{ warning.start | as_datetime | as_local }}
          {% endfor %}
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
