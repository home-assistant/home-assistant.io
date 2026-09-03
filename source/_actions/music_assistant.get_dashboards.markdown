---
title: "Get dashboards"
action: music_assistant.get_dashboards
domain: music_assistant
description: "Returns all display devices that can show a Music Assistant dashboard, including their active session."
related_actions:
  - music_assistant.show_dashboard
  - music_assistant.hide_dashboard
---

Use this action to list the display devices connected to a Music Assistant server, such as Chromecasts, Fully Kiosk browsers, and open Music Assistant web clients. The main use of this action is to find the `dashboard_id` of the device you want to target with the [Show dashboard](/actions/music_assistant.show_dashboard/) or [Hide dashboard](/actions/music_assistant.hide_dashboard/) actions.

This action returns its result in a response variable, which you can use in later steps of the same automation or script. It does not change anything on a player.

{% include actions/ui_header.md %}

To get the list of display devices from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Music Assistant: Get dashboards**.
6. Fill in the options you want to use.
7. In the **Response variable** field, enter a name to store the data in, such as `dashboards`.
8. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. You select the Music Assistant instance through the **Music Assistant instance** option instead.

### Options in the UI

{% options_ui %}
Music Assistant instance:
  description: The Music Assistant instance to get the dashboards from.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `music_assistant.get_dashboards`. A basic example looks like this:

{% example %}
action: |
  action: music_assistant.get_dashboards
  data:
    config_entry_id: 01JEXNDHT21V0BHJXM7A5SZANV
  response_variable: dashboards
{% endexample %}

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: The ID of the Music Assistant instance to get the dashboards from. Select the instance from the dropdown in the visual editor, then switch to YAML to read the value.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The action returns a `dashboards` list. Each item describes one display device and includes the following fields:

- `dashboard_id`: The ID of the display device. Use this value in the [Show dashboard](/actions/music_assistant.show_dashboard/) and [Hide dashboard](/actions/music_assistant.hide_dashboard/) actions.
- `name`: The name of the display device.
- `supported_dashboards`: The dashboard types this device can show. One or more of `party`, `now_playing`, or `music_quiz`.
- `active_session`: The dashboard currently shown on the device, or `null` when nothing is shown. When set, it includes:
  - `dashboard`: The dashboard type that is currently visible.
  - `player`: The entity ID of the player the dashboard is showing, or `null` when the dashboard isn't tied to a specific player.

A shortened example of the response looks like this:

```yaml
dashboards:
  - dashboard_id: chromecast_kitchen
    name: Kitchen Display
    supported_dashboards:
      - now_playing
      - party
    active_session:
      dashboard: now_playing
      player: media_player.kitchen_speaker
  - dashboard_id: fully_kiosk_office
    name: Office Tablet
    supported_dashboards:
      - music_quiz
      - now_playing
      - party
    active_session: null
  - dashboard_id: web_client_a1b2c3
    name: Web Client
    supported_dashboards:
      - music_quiz
      - now_playing
      - party
    active_session: null
```

## Good to know

- This action requires a recent Music Assistant server. On an older server, the action fails with an error stating that dashboards aren't supported.

{% include actions/stuck.md %}

{% include actions/related.md %}