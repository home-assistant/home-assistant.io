---
title: "Request media"
action: overseerr.request_media
domain: overseerr
description: "Creates a media request in Seerr."
---

The **Request media** action creates a new media request in Seerr, for example to request a movie or series directly from an automation or script. You can find the media ID of the movie or series with the [Search media](/actions/overseerr.search_media/) action or in the Seerr URL of the media.

This action returns its result in a response variable, which you can use in later steps, for example to notify yourself about the created request.

{% include actions/ui_header.md %}

To request media from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Seerr: Request media**.
6. Select the **Seerr instance**, the **Media type**, and enter the **Media ID**. For series, you can optionally enter the **Seasons** to request.
7. In the **Response variable** field, enter a name to store the data in, such as `request`.
8. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Seerr instance:
  description: The Seerr instance to create the request on.
  required: true
Media type:
  description: "The type of media to request. One of **Movie** or **TV**."
  required: true
Media ID:
  description: "The TMDB ID or TVDB ID of the media to request. You can find it with the [Search media](/actions/overseerr.search_media/) action."
  required: true
Seasons:
  description: "For TV requests: the seasons to request, for example `[1, 2, 4]`. If omitted, all seasons are requested."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `overseerr.request_media`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: overseerr.request_media
  data:
    config_entry_id: YOUR_CONFIG_ENTRY_ID
    media_type: tv
    media_id: 1396
    seasons:
      - 1
      - 2
  response_variable: request
{% endexample %}

This requests the first two seasons of the series with the TMDB ID `1396`.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: The Seerr instance to create the request on.
  required: true
  type: string
media_type:
  description: "The type of media to request. One of `movie` or `tv`."
  required: true
  type: string
media_id:
  description: "The TMDB ID or TVDB ID of the media to request. You can find it with the [Search media](/actions/overseerr.search_media/) action."
  required: true
  type: integer
seasons:
  description: "For TV requests: the seasons to request, as a list of integers (for example, `[1, 2, 4]`). If omitted, all seasons are requested."
  required: false
  type: list
{% endoptions_yaml %}

## Response data

The response contains a `request` object that describes the created media request, including its ID and status.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
