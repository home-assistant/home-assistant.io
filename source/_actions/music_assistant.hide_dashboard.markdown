---
title: "Hide dashboard"
action: music_assistant.hide_dashboard
domain: music_assistant
description: "Hides the active Music Assistant dashboard on a display device."
related_actions:
  - music_assistant.get_dashboards
  - music_assistant.show_dashboard
---

Use this action to hide the dashboard currently shown on a display device, such as a Chromecast, a Fully Kiosk browser, or an open Music Assistant web client. Use the [Get dashboards](/actions/music_assistant.get_dashboards/) action first to find the `dashboard_id` of the device you want to target.

{% include actions/ui_header.md %}

To hide a dashboard from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Music Assistant: Hide dashboard**.
6. Fill in the options you want to use.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. You select the Music Assistant instance through the **Music Assistant instance** option instead.

### Options in the UI

{% options_ui %}
Music Assistant instance:
  description: The Music Assistant instance the display device belongs to.
Display device:
  description: "ID of the display device to hide the dashboard on. Use the Get dashboards action to list the available display devices and their IDs."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `music_assistant.hide_dashboard`. A basic example looks like this:

{% example %}
action: |
  action: music_assistant.hide_dashboard
  data:
    config_entry_id: 01JEXNDHT21V0BHJXM7A5SZANV
    dashboard_id: chromecast_a1b2c3
{% endexample %}

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: The ID of the Music Assistant instance the display device belongs to. Select the instance from the dropdown in the visual editor, then switch to YAML to read the value.
  required: true
  type: string
dashboard_id:
  description: "ID of the display device to hide the dashboard on. Use the Get dashboards action to list the available display devices and their IDs."
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- This action can only be used by administrator users.
- This action requires a recent Music Assistant server. On an older server, the action fails with an error stating that dashboards aren't supported.
- It's safe to call this action when nothing is shown on the display device, or when the display device is no longer connected. Display devices are connection-scoped, so a closed browser tab or a disconnected Chromecast simply drops off the list returned by [Get dashboards](/actions/music_assistant.get_dashboards/). Hiding a dashboard on a `dashboard_id` that no longer exists does not raise an error.

{% include actions/stuck.md %}

{% include actions/related.md %}