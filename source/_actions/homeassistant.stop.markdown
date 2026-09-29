---
title: "Stop Home Assistant"
action: homeassistant.stop
domain: homeassistant
description: "Stops the Home Assistant instance."
related_actions:
  - homeassistant.restart
---

Use this action to stop Home Assistant. Once stopped, Home Assistant must be started again from the host device. A common use is to shut Home Assistant down cleanly as part of powering off the host.

Only users with administrator rights can run this action.

{% caution %}
After this action runs, Home Assistant is no longer running and cannot start itself again. You need access to the host device to start it back up.
{% endcaution %}

{% include actions/ui_header.md %}

To stop Home Assistant from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Stop Home Assistant**.
6. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homeassistant.stop`. A basic example looks like this:

{% example %}
action: |
  action: homeassistant.stop
{% endexample %}

### Options in YAML

This action has no options.

## Good to know

- To restart instead of stopping, use the [Restart Home Assistant](/actions/homeassistant.restart/) action.

{% include actions/stuck.md %}

{% include actions/related.md %}
