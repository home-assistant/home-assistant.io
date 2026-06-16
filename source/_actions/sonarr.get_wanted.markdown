---
title: "Get wanted"
action: sonarr.get_wanted
domain: sonarr
description: "Retrieves wanted (missing) episodes that Sonarr is searching for."
related_actions:
  - sonarr.get_series
  - sonarr.get_episodes
  - sonarr.get_upcoming
---

Use this action to retrieve the wanted (missing) episodes that Sonarr is searching for.

This action returns its result in a response variable, which you can use in later steps of the same automation or script, for example to track how many episodes are still missing from your library.

{% include actions/ui_header.md %}

To get the wanted episodes from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Sonarr: Get wanted**.
6. Select the **Sonarr entry** to query and optionally set **Max items**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Sonarr entry:
  description: The Sonarr config entry to query.
  required: true
Max items:
  description: The maximum number of wanted episodes to return. Use 0 for no limit. The maximum is 500.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `sonarr.get_wanted`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: sonarr.get_wanted
  data:
    entry_id: "01234567890abcdef1234567890abcde"
    max_items: 100
  response_variable: wanted_data
{% endexample %}

This fetches up to 100 wanted episodes.

### Options in YAML

{% options_yaml %}
entry_id:
  description: The Sonarr config entry to query.
  required: true
  type: string
max_items:
  description: The maximum number of wanted episodes to return. Use 0 for no limit. The maximum is 500.
  required: false
  default: 0
  type: integer
{% endoptions_yaml %}

## Response data

The response contains an `episodes` key with a mapping of wanted episodes keyed by series title and episode identifier, for example `Westworld S00E62`. Each episode includes the following fields:

- `id`: Internal episode ID.
- `series_id`: Internal Sonarr series ID.
- `season_number`: Season number.
- `episode_number`: Episode number.
- `episode_identifier`: Formatted identifier, such as `S01E01`.
- `title`: Episode title.
- `air_date`: Air date in local time.
- `air_date_utc`: Air date in UTC.
- `overview`: Episode overview or description.
- `has_file`: Whether the episode file exists.
- `monitored`: Whether the episode is monitored.
- `runtime`: Episode runtime in minutes.
- `tvdb_id`: Episode TheTVDB ID.
- `series_title`: Series title.
- `series_year`: Series premiere year.
- `series_tvdb_id`: Series TheTVDB ID.
- `series_imdb_id`: Series IMDb ID.
- `series_status`: Series status.
- `network`: Network the series airs on.
- `images`: Mapping of series image URLs by type, including poster, banner, fanart, and clearlogo.

A shortened example of the response looks like this:

```yaml
episodes:
  "Westworld S00E62":
    id: 1346
    series_id: 3
    season_number: 0
    episode_number: 62
    episode_identifier: "S00E62"
    title: "Westworld: Original Movie"
    air_date: "1973-11-21 00:00:00"
    air_date_utc: "1973-11-22 02:00:00+00:00"
    overview: "In the then-future year of 1983, a high-tech, highly realistic adult amusement park called Delos features three themed worlds."
    has_file: false
    monitored: true
    runtime: 88
    tvdb_id: 11348391
    series_title: "Westworld"
    series_year: 2016
    series_status: "ended"
    network: "HBO"
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
