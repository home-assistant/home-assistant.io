---
title: "Browse media"
action: media_player.browse_media
domain: media_player
description: "Browses the media available on a media player."
related_actions:
  - media_player.search_media
  - media_player.play_media
---

Use this action to browse the media tree provided by a media player, similar to browsing media in the media player UI. It is handy in automations or scripts that need to find media by a specific category before playing it.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To browse media from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the media player you want to browse.
6. From the actions shown for that target, select **Browse media**.
7. Set the content options if you want to browse a specific part of the tree.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Content type:
  description: The type of content to browse, such as music, playlist, or video. The available types depend on the media player.
  required: false
Content ID:
  description: The content to browse into. The available IDs depend on the media player. Leave empty to return the top level of the browse tree.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_player.browse_media`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: media_player.browse_media
  target:
    entity_id: media_player.living_room
  response_variable: top_level
{% endexample %}

This returns the top level of the browse tree for `media_player.living_room`.

### Options in YAML

{% options_yaml %}
media_content_type:
  description: The type of content to browse, such as music, playlist, or video. The available types depend on the media player.
  required: false
  type: string
media_content_id:
  description: The content to browse into. The available IDs depend on the media player. Leave empty to return the top level of the browse tree.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Response data

The action returns a media tree object that you can store in a response variable. The response includes the following fields:

- `title`: Display name of the current level.
- `media_class`: Type of the current item, such as directory, music, or video.
- `media_content_type`: Content type identifier.
- `media_content_id`: Content ID, specific to the media player.
- `children_media_class`: Types of the items in the children array.
- `children`: List of child items, each with similar properties.

The structure and content types vary between media players. Content IDs are often URL-encoded.

The following example browses a specific artist on a Sonos device. The format of `media_content_id` (`A:ALBUMARTIST/artist_name`) is specific to Sonos:

{% example %}
action: |
  action: media_player.browse_media
  target:
    entity_id: media_player.living_room
  data:
    media_content_id: A:ALBUMARTIST/Beatles
    media_content_type: album
  response_variable: albums
{% endexample %}

A shortened example of the response looks like this:

```yaml
media_player.living_room:
  title: Beatles
  media_class: album
  media_content_type: album
  media_content_id: A:ALBUMARTIST/Beatles
  children_media_class: directory
  children:
    - title: A Hard Day's Night
      media_class: album
      media_content_type: album
      media_content_id: A:ALBUMARTIST/Beatles/A%20Hard%20Day's%20Night
    - title: Abbey Road
      media_class: album
      media_content_type: album
      media_content_id: A:ALBUMARTIST/Beatles/Abbey%20Road
```

## Good to know

- This action only works with media players that support browsing media. The structure of the response depends on the media player.

{% include actions/stuck.md %}

{% include actions/related.md %}
