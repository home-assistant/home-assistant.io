---
title: "Get series"
action: sonarr.get_series
domain: sonarr
description: "Retrieves all series in your Sonarr library with their details and statistics."
related_actions:
  - sonarr.get_episodes
  - sonarr.get_upcoming
  - sonarr.get_wanted
---

Use this action to retrieve the list of all series in your Sonarr library, together with their details and statistics.

This action returns its result in a response variable, which you can use in later steps of the same automation or script, for example to build a list of your monitored shows.

{% include actions/ui_header.md %}

To get the list of series from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Sonarr: Get series**.
6. Select the **Sonarr entry** to query.
7. In the **Response variable** field, enter a name to store the data in, such as `series_data`.
8. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Sonarr entry:
  description: The Sonarr config entry to query.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `sonarr.get_series`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: sonarr.get_series
  data:
    entry_id: "01234567890abcdef1234567890abcde"
  response_variable: series_data
{% endexample %}

This fetches all series in your Sonarr library.

### Options in YAML

{% options_yaml %}
entry_id:
  description: The Sonarr config entry to query.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The response contains a `shows` key with a mapping of series keyed by series title. Each series includes the following fields:

- `id`: Internal Sonarr series ID.
- `year`: Series premiere year.
- `tvdb_id`: TheTVDB ID.
- `imdb_id`: IMDb ID.
- `status`: Series status, such as `continuing` or `ended`.
- `monitored`: Whether the series is monitored.
- `episode_file_count`: Number of episode files downloaded.
- `episode_count`: Total number of episodes.
- `episodes_info`: Formatted string showing downloaded and total episodes.
- `images`: Mapping of image URLs by type, including poster, banner, fanart, and clearlogo.

A shortened example of the response looks like this:

```yaml
shows:
  "1923":
    id: 19
    year: 2022
    tvdb_id: 416491
    imdb_id: "tt18335752"
    status: "ended"
    monitored: true
    episode_file_count: 7
    episode_count: 7
    episodes_info: "7/7 Episodes"
    images:
      banner: "https://artworks.thetvdb.com/banners/416491/banner.jpg"
      poster: "https://artworks.thetvdb.com/banners/416491/poster.jpg"
      fanart: "https://artworks.thetvdb.com/banners/416491/fanart.jpg"
      clearlogo: "https://artworks.thetvdb.com/banners/416491/clearlogo.png"
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
