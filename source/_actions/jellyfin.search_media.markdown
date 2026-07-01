---
title: "Search media"
action: media_player.search_media
domain: jellyfin
description: "Searches a Jellyfin library from a Jellyfin media player."
related_actions:
  - jellyfin.play_media_shuffle
---

Use this action to search your Jellyfin library from an automation or script. Searching helps you find the media content ID of the item you want to play.

{% include actions/ui_header.md %}

To search Jellyfin media from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select a Jellyfin media player.
6. From the actions shown for that target, select **Search media**.
7. Enter the search query.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Search query:
  description: The term to search for in your Jellyfin library.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_player.search_media`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: media_player.search_media
  target:
    entity_id: media_player.jellyfin
  data:
    search_query: "star"
  response_variable: jellyfin_search
{% endexample %}

This searches the Jellyfin library for `star` and stores the response in `jellyfin_search`.

### Options in YAML

{% options_yaml %}
search_query:
  description: The term to search for in your Jellyfin library.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Response data

The action returns search results that you can store in a response variable. For Jellyfin, each result can include a title, media class, media content type, media content ID, and whether it can be played or expanded.

## Good to know

- The media player target is required. Jellyfin uses it to know which library content the player is allowed to view and can play.
- Search results are specific to your Jellyfin server and the selected player.

{% include actions/stuck.md %}

{% include actions/related.md %}
