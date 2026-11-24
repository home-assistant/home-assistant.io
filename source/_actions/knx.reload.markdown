---
title: "Reload"
action: knx.reload
domain: knx
description: "Reloads the KNX integration, including its YAML configuration."
related_actions:
  - homeassistant.reload_all
---

Use this action to reload the [KNX integration](/integrations/knx/) without restarting Home Assistant. It reads the `knx:` section of your YAML configuration again, so run it after you change KNX entities or exposures in YAML to make the changes take effect right away.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **KNX: Reload**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `knx.reload`:

{% example %}
action: |
  action: knx.reload
{% endexample %}

### Options in YAML

This action has no additional options in YAML.

## Good to know

- The whole integration reloads, not only the YAML part. Home Assistant closes the connection to your KNX bus, opens it again, and sets up all KNX entities again, including the ones you created in the KNX panel. They are unavailable for a moment.
- You can also reload KNX from {% my tools_yaml title="**Settings** > **Tools** > **YAML**" %}, where you can check your configuration first.
- When the reload is done, Home Assistant fires the `event_knx_reloaded` event.
- To reload everything in one step, use [Reload all Home Assistant configuration](/actions/homeassistant.reload_all/). It reloads KNX too, but only when your configuration has no errors.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
