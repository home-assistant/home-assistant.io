---
title: "Play specified media"
action: media_player.play_media
domain: braviatv
description: "Opens an app or switches to a TV channel on a Sony Bravia TV."
---

Use this action to open an app or switch to a TV channel on a Sony Bravia TV.

{% include actions/ui_header.md %}

To open an app or channel from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Bravia TV media player.
6. From the actions shown for that target, select **Play specified media**.
7. Enter the app or channel in **Media content ID** and set **Media content type** to `app` or `channel`.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Media content ID:
  description: The app or channel to open. You can use a channel number, an exact app or channel name, part of an app or channel name, or a URI string.
Media content type:
  description: The media type. Use `app` for an app or `channel` for a TV channel.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_player.play_media`. A basic example looks like this:

{% example %}
action: |
  action: media_player.play_media
  target:
    entity_id: media_player.bravia_tv
  data:
    media_content_id: "YouTube"
    media_content_type: app
{% endexample %}

This opens YouTube on `media_player.bravia_tv`.

### Options in YAML

{% options_yaml %}
media_content_id:
  description: The app or channel to open. You can use a channel number, an exact app or channel name, part of an app or channel name, or a URI string.
  required: true
  type: string
media_content_type:
  description: The media type. Use `app` for an app or `channel` for a TV channel.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Good to know

The TV selects the best matching application or channel according to the media content ID. Matches can use a channel number, exact app or channel name, part of an app or channel name, or a URI string.

{% include actions/stuck.md %}

{% include actions/related.md %}
