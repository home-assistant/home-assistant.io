---
title: "Show dashboard"
action: music_assistant.show_dashboard
domain: music_assistant
description: "Shows a Music Assistant dashboard on a display device."
related_actions:
  - music_assistant.get_dashboards
  - music_assistant.hide_dashboard
---

Use this action to show a Music Assistant dashboard on a display device: a Chromecast, a Fully Kiosk browser, or an open Music Assistant web client. Available dashboards are party, now playing, and music quiz. Use the [Get dashboards](/actions/music_assistant.get_dashboards/) action first to find the `dashboard_id` of the device you want to target.

{% include actions/ui_header.md %}

To show a dashboard from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Music Assistant: Show dashboard**.
6. Fill in the options you want to use.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. You select the Music Assistant instance through the **Music Assistant instance** option instead.

### Options in the UI

{% options_ui %}
Music Assistant instance:
  description: The Music Assistant instance the display device belongs to.
Display device:
  description: "ID of the display device to show the dashboard on. Use the Get dashboards action to list the available display devices and their IDs."
Dashboard:
  description: The dashboard to show.
Player:
  description: The Music Assistant player to show. Required for the now playing dashboard.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `music_assistant.show_dashboard`. A basic example looks like this:

{% example %}
action: |
  action: music_assistant.show_dashboard
  data:
    config_entry_id: 01JEXNDHT21V0BHJXM7A5SZANV
    dashboard_id: chromecast_a1b2c3
    dashboard: party
{% endexample %}

This example shows the now playing dashboard for a specific player:

{% example %}
action: |
  action: music_assistant.show_dashboard
  data:
    config_entry_id: 01JEXNDHT21V0BHJXM7A5SZANV
    dashboard_id: chromecast_a1b2c3
    dashboard: now_playing
    player: media_player.kitchen_speaker
{% endexample %}

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: The ID of the Music Assistant instance the display device belongs to. Select the instance from the dropdown in the visual editor, then switch to YAML to read the value.
  required: true
  type: string
dashboard_id:
  description: "ID of the display device to show the dashboard on. Use the Get dashboards action to list the available display devices and their IDs."
  required: true
  type: string
dashboard:
  description: "The dashboard to show. One of: `party`, `now_playing`, or `music_quiz`."
  required: true
  type: string
player:
  description: The Music Assistant player entity to show. Required for the `now_playing` dashboard.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- This action requires a recent Music Assistant server. On an older server, the action fails with an error stating that dashboards aren't supported.
- The action fails if `dashboard_id` doesn't match a known display device, or if `player` isn't a Music Assistant player entity.
- The `now_playing` dashboard requires a `player`. Omitting it results in an error.

{% include actions/stuck.md %}

{% include actions/related.md %}