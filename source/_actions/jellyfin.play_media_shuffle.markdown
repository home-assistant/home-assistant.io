---
title: Play media shuffled
action: jellyfin.play_media_shuffle
domain: jellyfin
description: "Start playing a Jellyfin directory shuffled, replacing the current play queue."
---

Use this action to start playing a directory from your Jellyfin library shuffled, such as a full series, TV show, or season. The Jellyfin API supports shuffling a directory when playback begins. This immediately replaces the current play queue of the client with the shuffled media.

To play media without shuffling, use the [`media_player.play_media`](/integrations/media_player/) action instead.

{% include actions/ui_header.md %}

To shuffle play media from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Jellyfin players you want to play on.
6. From the actions shown for that target, select **Play media shuffled**.
7. Fill in the options you want to use.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Media:
  description: The media to play. Browse to the directory you want to shuffle, such as a series or a season.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `jellyfin.play_media_shuffle`. A basic example looks like this:

{% example %}
action: |
  action: jellyfin.play_media_shuffle
  target:
    entity_id: media_player.chrome
  data:
    media:
      media_content_id: 34361f3855c9c0ac39b0f7503fe86be0
{% endexample %}

This shuffle plays a full season of a TV show on the targeted Jellyfin client.

### Options in YAML

{% options_yaml %}
media:
  description: The media to play, given as a mapping that contains the `media_content_id` of the directory you want to shuffle.
  required: true
  type: map
{% endoptions_yaml %}

## Good to know

- To find the `media_content_id` of the content you want to play, browse or search your library with the [`media_player.browse_media`](/integrations/media_player/) and [`media_player.search_media`](/integrations/media_player/) actions.
- Shuffling works on directories, such as a series, TV show, or season.

{% include actions/targets.md domain="media_player" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
