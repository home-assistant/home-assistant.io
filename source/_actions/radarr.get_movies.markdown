---
title: "Get movies"
action: radarr.get_movies
domain: radarr
description: "Gets all movies in Radarr with their details and status."
related_actions:
  - radarr.get_queue
---

Use this action to get all movies in your Radarr library, including their details and status.

This action returns its result in a response variable, which you can use in later steps of the same automation or script, for example to build a notification listing your monitored movies.

{% include actions/ui_header.md %}

To get the movies from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Radarr: Get movies**.
6. Select the **Radarr entry** to get the movies from.
7. In the **Response variable** field, enter a name to store the movie data in, such as `movies`. You'll use this name to read the movies in later steps.
8. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Radarr entry:
  description: The Radarr config entry to get the movies from.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `radarr.get_movies`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: radarr.get_movies
  data:
    entry_id: 01234567890abcdef1234567890abcde
  response_variable: movies
{% endexample %}

This fetches all movies in your Radarr library.

### Options in YAML

{% options_yaml %}
entry_id:
  description: >
    The Radarr config entry to get the movies from.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The response contains a `movies` mapping, keyed by movie title. Each movie includes the following fields:

- `id`: The internal Radarr movie ID.
- `title`: The movie title.
- `year`: The release year.
- `tmdb_id`: The Movie Database (TMDB) ID.
- `imdb_id`: The Internet Movie Database (IMDb) ID.
- `status`: The movie status, such as `released` or `announced`.
- `monitored`: Whether the movie is monitored.
- `has_file`: Whether the movie file exists.
- `size_on_disk`: The size of the movie files in bytes.
- `path`: The path where the movie is stored.
- `movie_file_count`: The number of movie files.
- `images`: A mapping of image URLs by type, such as poster or fanart.

A shortened example of the response looks like this:

```yaml
movies:
  The Amateur:
    id: 3
    title: The Amateur
    year: 2025
    tmdb_id: 1087891
    imdb_id: tt0899043
    status: released
    monitored: true
    has_file: true
    size_on_disk: 0
    path: /data/media/movies/The Amateur (2025)
    movie_file_count: 0
    images:
      poster: https://www.example.com/poster.jpg
      fanart: https://www.example.com/fanart.jpg
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
