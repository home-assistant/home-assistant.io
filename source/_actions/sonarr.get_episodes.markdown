---
title: "Get episodes"
action: sonarr.get_episodes
domain: sonarr
description: "Retrieves all episodes for a specific series in your Sonarr library."
related_actions:
  - sonarr.get_series
  - sonarr.get_upcoming
  - sonarr.get_wanted
---

Use this action to retrieve all episodes for a specific series. It's useful for displaying episode details, tracking watched status, or building episode lists.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get the episodes for a series from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Sonarr: Get episodes**.
6. Select the **Sonarr entry** to query, enter the **Series ID**, and optionally a **Season number** to filter by.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Sonarr entry:
  description: The Sonarr config entry to query.
  required: true
Series ID:
  description: The internal Sonarr series ID, as returned by the Get series action.
  required: true
Season number:
  description: Limit the results to a single season.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `sonarr.get_episodes`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: sonarr.get_episodes
  data:
    entry_id: "01234567890abcdef1234567890abcde"
    series_id: 19
    season_number: 1
  response_variable: episodes_data
{% endexample %}

This fetches the episodes of season 1 for the series with ID 19.

### Options in YAML

{% options_yaml %}
entry_id:
  description: The Sonarr config entry to query.
  required: true
  type: string
series_id:
  description: The internal Sonarr series ID, as returned by the Get series action.
  required: true
  type: integer
season_number:
  description: Limit the results to a single season.
  required: false
  type: integer
{% endoptions_yaml %}

## Response data

The response contains an `episodes` key with a mapping of episodes keyed by episode identifier, for example `S01E01`. Each episode includes the following fields:

- `id`: Internal episode ID.
- `series_id`: Internal Sonarr series ID.
- `tvdb_id`: Episode TheTVDB ID.
- `season_number`: Season number.
- `episode_number`: Episode number.
- `episode_identifier`: Formatted identifier, such as `S01E01`.
- `title`: Episode title.
- `air_date`: Air date in local time.
- `air_date_utc`: Air date in UTC.
- `overview`: Episode overview or description, if available.
- `has_file`: Whether the episode file exists.
- `monitored`: Whether the episode is monitored.
- `runtime`: Episode runtime in minutes.
- `episode_file_id`: ID of the episode file, or 0 if no file exists.
- `finale_type`: Finale type, if applicable, such as `series` or `season`.

A shortened example of the response looks like this:

```yaml
episodes:
  "S01E01":
    id: 1001
    series_id: 19
    tvdb_id: 8765432
    season_number: 1
    episode_number: 1
    episode_identifier: "S01E01"
    title: "1923"
    air_date: "2022-12-18 00:00:00"
    air_date_utc: "2022-12-18 05:00:00+00:00"
    overview: "The Dutton family's origin story begins in 1883..."
    has_file: true
    monitored: true
    runtime: 60
    episode_file_id: 5001
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
