---
title: "Search media"
action: overseerr.search_media
domain: overseerr
description: "Searches for media in Seerr."
---

The **Search media** action searches for movies and series in Seerr. The results include the media ID that you need to create a media request with the [Request media](/actions/overseerr.request_media/) action.

This action returns its result in a response variable, which you can use in later steps, for example to request the first matching result.

{% include actions/ui_header.md %}

To search for media from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Seerr: Search media**.
6. Select the **Seerr instance** and enter the **Query** to search for.
7. In the **Response variable** field, enter a name to store the data in, such as `search_results`.
8. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Seerr instance:
  description: The Seerr instance to search.
  required: true
Query:
  description: "The search query, for example a movie or series name."
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `overseerr.search_media`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: overseerr.search_media
  data:
    config_entry_id: YOUR_CONFIG_ENTRY_ID
    query: "The Matrix"
  response_variable: search_results
{% endexample %}

This searches Seerr for media matching "The Matrix".

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: The Seerr instance to search.
  required: true
  type: string
query:
  description: "The search query, for example a movie or series name."
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The response contains a `results` list. Each item describes a matching movie or series, including its media type and the media ID that you can use with the [Request media](/actions/overseerr.request_media/) action.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
