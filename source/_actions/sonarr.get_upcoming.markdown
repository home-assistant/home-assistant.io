---
title: "Get upcoming"
action: sonarr.get_upcoming
domain: sonarr
description: "Retrieves upcoming episodes from the Sonarr calendar."
related_actions:
  - sonarr.get_series
  - sonarr.get_episodes
  - sonarr.get_wanted
---

Use this action to retrieve upcoming episodes from the calendar. Episodes are returned when their air date falls between today and today plus the number of days you specify.

This action returns its result in a response variable, which you can use in later steps of the same automation or script, for example to send yourself a weekly overview of what's coming up.

{% include actions/ui_header.md %}

To get the upcoming episodes from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Sonarr: Get upcoming**.
6. Select the **Sonarr entry** to query and optionally set the number of **Days** to look ahead.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Sonarr entry:
  description: The Sonarr config entry to query.
  required: true
Days:
  description: The number of days to look ahead for upcoming episodes. The valid range is 1 to 30. The default is 1.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `sonarr.get_upcoming`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: sonarr.get_upcoming
  data:
    entry_id: "01234567890abcdef1234567890abcde"
    days: 7
  response_variable: upcoming_data
{% endexample %}

This fetches the episodes airing in the next 7 days.

### Options in YAML

{% options_yaml %}
entry_id:
  description: The Sonarr config entry to query.
  required: true
  type: string
days:
  description: The number of days to look ahead for upcoming episodes. The valid range is 1 to 30.
  required: false
  default: 1
  type: integer
{% endoptions_yaml %}

## Response data

The response contains an `episodes` key with a mapping of upcoming episodes keyed by series title and episode identifier, for example `Breaking Bad S01E01`. Each episode includes the following fields:

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
- `finale_type`: Finale type, if applicable, such as `series` or `season`.
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
  "The Rookie S08E03":
    id: 2008
    series_id: 50
    season_number: 8
    episode_number: 3
    episode_identifier: "S08E03"
    title: "The Red Place"
    air_date: "2026-01-20 00:00:00"
    air_date_utc: "2026-01-21 03:00:00+00:00"
    overview: "Nolan makes a quiet arrest, and Lucy and Celina race to rescue a kidnapping victim."
    has_file: false
    monitored: true
    runtime: 0
    series_title: "The Rookie"
    series_year: 2018
    series_status: "continuing"
    network: "ABC (US)"
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
