---
title: "Play specified media"
action: media_player.play_media
domain: xbox
description: "Launches an app or returns to the dashboard on an Xbox console."
related_actions:
  - media_player.play_media
---

Use this action to launch an app on an Xbox console from Home Assistant. You can also use it to return the console to the Xbox dashboard.

{% include actions/ui_header.md %}

To launch an app from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Xbox media player.
6. From the actions shown for that target, select **Play specified media**.
7. Set **Media content ID** to `Home` or to an app product ID.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Media content ID:
  description: Use `Home` to return to the dashboard, or enter an app product ID.
Media content type:
  description: This value is not used by Xbox app launching. It can be left empty.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_player.play_media`. A basic example looks like this:

{% example %}
action: |
  action: media_player.play_media
  target:
    entity_id: media_player.xboxone
  data:
    media_content_id: "Home"
    media_content_type: ""
{% endexample %}

### Options in YAML

{% options_yaml %}
media_content_id:
  description: Use `Home` to return to the dashboard, or enter an app product ID.
  required: true
  type: string
media_content_type:
  description: This value is not used by Xbox app launching. It can be left empty.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Good to know

- You can find product IDs by listening to the `call_service` event in {% my developer_events title="**Settings** > **Developer tools** > **Events**" %}. In another browser tab, open the media browser for your console and select an app or game. The event data shows the product ID.
- The Netflix product ID is `9WZDNCRFJ3TJ`.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: return to the Xbox dashboard

Return the console to the dashboard when a helper is turned on. Create the {% term helper %} separately.

- **Trigger**: State, helper turns on
- **Action**: Play specified media
  - **Target**: Xbox media player
  - **Media content ID**: Home

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Return Xbox to the dashboard"
  triggers:
    - trigger: state
      entity_id: input_boolean.xbox_dashboard
      to: "on"
  actions:
    - action: media_player.play_media
      target:
        entity_id: media_player.xboxone
      data:
        media_content_id: "Home"
        media_content_type: ""
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
