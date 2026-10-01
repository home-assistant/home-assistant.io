---
title: "Reload dashboard resources"
action: lovelace.reload_resources
domain: lovelace
description: "Reloads dashboard resources from the YAML configuration."
related_actions:
  - frontend.reload_themes
---

Use this action to load your [dashboard resources](/dashboards/dashboards/#adding-yaml-dashboards) from YAML again, without restarting Home Assistant. Resources are the extra JavaScript and CSS files, such as custom cards, that your dashboards load. Run this action after you change the `resources` list under `lovelace:` in your {% term "`configuration.yaml`" %} file.

This action is only available when you load resources from YAML, with `resource_mode: yaml`. If you manage resources in the UI, under {% my lovelace_dashboards title="**Settings** > **Dashboards**" %} in the three dots {% icon "mdi:dots-vertical" %} menu under **Resources**, you don't need this action.

{% include actions/ui_header.md %}

To reload the dashboard resources from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Reload dashboard resources**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lovelace.reload_resources`. A basic example looks like this:

{% example %}
action: |
  action: lovelace.reload_resources
{% endexample %}

This reloads the dashboard resources from your YAML configuration.

### Options in YAML

This action has no additional options in YAML.

## Good to know

- Only administrators can run this action.
- You can also reload the resources from a dashboard: select the three dots {% icon "mdi:dots-vertical" %} menu in the top-right corner, and select **Reload resources**.
- If your YAML configuration can't be loaded, nothing is reloaded and the action fails with an error. Check the logs to see what went wrong.
- After the reload, refresh your browser to load the new resources in an open dashboard.

## Try it yourself

To test this action, open {% my developer_services title="**Settings** > **Tools** > **Actions**" %}, search for **Reload dashboard resources**, and select **Perform action**. Refresh your browser to load the reloaded resources.

{% include actions/stuck.md %}

{% include actions/related.md %}
