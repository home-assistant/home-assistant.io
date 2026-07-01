---
title: "Browse media"
action: media_player.browse_media
domain: jellyfin
description: "Browses a Jellyfin library from a Jellyfin media player."
related_actions:
  - jellyfin.play_media_shuffle
---

Use this action to browse your Jellyfin library from an automation or script. Browsing helps you find the media content ID of the item you want to play.

{% include actions/ui_header.md %}

To browse Jellyfin media from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select a Jellyfin media player.
6. From the actions shown for that target, select **Browse media**.
7. Enter a content ID if you want to browse into a specific part of the library.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Content ID:
  description: The unique identifier of the content to browse into. Leave empty to browse from the root of the Jellyfin library.
  required: false
Content type:
  description: The type of content to browse. The available types depend on your Jellyfin library.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_player.browse_media`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: media_player.browse_media
  target:
    entity_id: media_player.jellyfin
  data:
    media_content_id: a656b907eb3a73532e40e44b968d0225
  response_variable: jellyfin_media
{% endexample %}

This browses into the selected Jellyfin library item and stores the response in `jellyfin_media`.

### Options in YAML

{% options_yaml %}
media_content_id:
  description: The unique identifier of the content to browse into. Leave empty to browse from the root of the Jellyfin library.
  required: false
  type: string
media_content_type:
  description: The type of content to browse. The available types depend on your Jellyfin library.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Response data

The action returns a media tree object that you can store in a response variable. For Jellyfin, this response includes media IDs, titles, classes, content types, and child items.

## Good to know

- The media player target is required. Jellyfin uses it to know which library content the player is allowed to view and can play.
- Content IDs are specific to your Jellyfin server.

{% include actions/stuck.md %}

{% include actions/related.md %}
