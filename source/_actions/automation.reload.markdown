---
title: "Reload automations"
action: automation.reload
domain: automation
description: "Reloads the automation configuration."
related_actions:
  - automation.turn_on
  - automation.trigger
---

Use this action to load your automations again, without restarting Home Assistant. Run it after you change your automations in YAML so the changes take effect right away.

Automations you create or edit in the UI are reloaded for you when you save them, so you don't need this action for those.

{% include actions/ui_header.md %}

To reload the automations from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Automation: Reload automations**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. Only users with administrator rights can run this action.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `automation.reload`. A basic example looks like this:

{% example %}
action: |
  action: automation.reload
{% endexample %}

This reloads all your automations.

## Good to know

- Reloading stops the actions that automations are running at that moment.
- Automations you removed from your configuration disappear, and the ones you added show up.
- To reload everything that supports it in one step, use [Reload all](/actions/homeassistant.reload_all/).

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
