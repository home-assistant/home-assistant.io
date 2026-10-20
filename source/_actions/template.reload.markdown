---
title: "Reload template entities"
action: template.reload
domain: template
description: "Reloads template entities from the YAML configuration."
related_actions:
  - homeassistant.reload_all
  - homeassistant.reload_custom_templates
---

Use this action to load your [template](/integrations/template/) entities again, without restarting Home Assistant. Run it after you change template entities in YAML so the changes take effect right away.

Template helpers you create or edit in the UI are updated for you when you save them, so you don't need this action for those.

{% include actions/ui_header.md %}

To reload the template entities from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Template: Reload template entities**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `template.reload`. A basic example looks like this:

{% example %}
action: |
  action: template.reload
{% endexample %}

This reloads all template entities from your YAML configuration.

### Options in YAML

This action has no additional options in YAML.

## Good to know

- Reloading removes template entities you deleted from your configuration and adds the ones you added.
- Only administrators can run this action.
- If your YAML configuration can't be loaded, nothing is reloaded and your current template entities keep working. Check the logs to see what went wrong.
- When the reload is done, Home Assistant fires the `event_template_reloaded` event.
- To reload everything in one step, use [Reload all Home Assistant configuration](/actions/homeassistant.reload_all/).

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
