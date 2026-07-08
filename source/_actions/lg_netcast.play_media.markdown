---
title: "Play specified media"
action: media_player.play_media
domain: lg_netcast
description: "Changes the TV channel on an LG Netcast TV."
related_actions:
  - media_player.play_media
---

Use this action to change the channel on an LG Netcast TV from an automation or script.

{% include actions/ui_header.md %}

To change the channel from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the LG Netcast media player.
6. From the actions shown for that target, select **Play specified media**.
7. Set **Media content ID** to the channel number and **Media content type** to `channel`.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Media content ID:
  description: The channel number to switch to.
Media content type:
  description: Set to `channel`.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_player.play_media`. A basic example looks like this:

{% example %}
action: |
  action: media_player.play_media
  target:
    entity_id: media_player.lg_tv
  data:
    media_content_id: "15"
    media_content_type: channel
{% endexample %}

### Options in YAML

{% options_yaml %}
media_content_id:
  description: The channel number to switch to.
  required: true
  type: string
media_content_type:
  description: Set to `channel`.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Good to know

- The `media_content_id` value selects the major channel number.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: change to a news channel in the morning

Switch the TV to channel 15 at 07:00.

- **Trigger**: Time, 07:00
- **Action**: Play specified media
  - **Target**: LG TV
  - **Media content ID**: 15
  - **Media content type**: channel

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Change LG TV to the morning channel"
  triggers:
    - trigger: time
      at: "07:00:00"
  actions:
    - action: media_player.play_media
      target:
        entity_id: media_player.lg_tv
      data:
        media_content_id: "15"
        media_content_type: channel
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
