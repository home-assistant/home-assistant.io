---
title: "Show dashboard view via Google Cast"
action: cast.show_lovelace_view
domain: cast
description: "Shows a dashboard view on a Google Cast device."
---

Use this action to show a specific dashboard view on a Google Cast device, such as putting your downstairs overview on the kitchen display. This is the Home Assistant Cast feature you trigger from an automation or script.

You pick the Cast device, the view to show, and optionally which dashboard the view belongs to.

## Prerequisites

- Only administrators can run this action.
- Home Assistant Cast requires your Home Assistant installation to be reachable over `https://`. If you use Home Assistant Cloud, this is already taken care of. Otherwise, configure your [`external_url`](/integrations/homeassistant/#external_url).
- Each dashboard view needs a `path` defined for the **View path** to work. See the [views documentation](/dashboards/views/#path).

{% include actions/ui_header.md %}

To show a dashboard view from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Google Cast: Show dashboard view via Google Cast**.
6. Select the Cast device in the **Entity** field, and enter the **View path** to show. Optionally, set a **Dashboard path** if the view is not on your default dashboard.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Entity:
  description: The Cast media player to show the dashboard view on.
  required: true
View path:
  description: The URL path of the dashboard view to show.
  required: true
Dashboard path:
  description: The URL path of the dashboard to show. Defaults to `lovelace` when not set.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `cast.show_lovelace_view`. A basic example looks like this:

{% example %}
action: |
  action: cast.show_lovelace_view
  data:
    entity_id: media_player.kitchen
    dashboard_path: lovelace-cast
    view_path: downstairs
{% endexample %}

This shows the `downstairs` view of the `lovelace-cast` dashboard on the kitchen Cast device.

### Options in YAML

{% options_yaml %}
entity_id:
  description: The Cast media player to show the dashboard view on.
  required: true
  type: string
view_path:
  description: The URL path of the dashboard view to show.
  required: true
  type: string
dashboard_path:
  description: The URL path of the dashboard to show. Defaults to `lovelace` when not set.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
