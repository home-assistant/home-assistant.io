---
title: "Search media"
action: media_player.search_media
domain: media_player
description: "Searches the media available on a media player."
related_actions:
  - media_player.browse_media
  - media_player.play_media
---

Use this action to search the media available on a media player, for example to find a song or album by name before playing it.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To search media from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the media player you want to search.
6. From the actions shown for that target, select **Search media**.
7. Set the **Search query** and any other options you want to narrow the search.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Search query:
  description: The term to search for.
Content type:
  description: The type of content to search, such as music, playlist, or video. The available types depend on the media player.
  required: false
Content ID:
  description: The content to search within. The available IDs depend on the media player.
  required: false
Media class filter:
  description: A list of media classes to filter the search results by, such as album or artist.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_player.search_media`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: media_player.search_media
  target:
    entity_id: media_player.living_room
  data:
    search_query: Beatles
  response_variable: results
{% endexample %}

This searches `media_player.living_room` for the term Beatles.

### Options in YAML

{% options_yaml %}
search_query:
  description: The term to search for.
  required: true
  type: string
media_content_type:
  description: The type of content to search, such as music, playlist, or video. The available types depend on the media player.
  required: false
  type: string
media_content_id:
  description: The content to search within. The available IDs depend on the media player.
  required: false
  type: string
media_filter_classes:
  description: A list of media classes to filter the search results by, such as album or artist.
  required: false
  type: list
{% endoptions_yaml %}

{% include actions/targets.md %}

## Response data

The action returns the search results in a media tree object that you can store in a response variable. The response includes the following fields:

- `title`: Display name of the result.
- `media_class`: Type of the item, such as music or album.
- `media_content_type`: Content type identifier.
- `media_content_id`: Content ID, specific to the media player.
- `children_media_class`: Types of the items in the children array.
- `children`: List of matching items, each with similar properties.

The structure and content types vary between media players.

## Good to know

- This action only works with media players that support searching media. The structure of the response depends on the media player.

{% include actions/stuck.md %}

{% include actions/related.md %}
