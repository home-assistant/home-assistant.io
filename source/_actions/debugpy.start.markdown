---
title: Start the remote Python debugger
action: debugpy.start
domain: debugpy
description: "Inject and start the remote Python debugger at runtime."
---

The **Start** action injects and starts the remote Python debugger while Home Assistant is running.

It is meant for the case where you loaded the [Remote Python Debugger](/integrations/debugpy/) integration with the `start` option set to `false`. The debugger then stays out of the way until you need it, and this action turns it on without a restart. This keeps the performance and memory cost of the debugger off your system until the moment you want to attach to it.

{% important %}
Only users with administrator privileges can run this action.
{% endimportant %}

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Remote Python Debugger: Start**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `debugpy.start`:

{% example %}
action: |
  action: debugpy.start
{% endexample %}

This injects and starts the debugger using the host and port from your integration configuration.

### Options in YAML

This action has no additional options in YAML.

## Good to know

- Once the debugger is started, there is no action to stop it again. To stop it, restart Home Assistant.
- The host and port the debugger listens on come from the [integration configuration](/integrations/debugpy/), not from this action.
- Anyone who can reach the debugger port can run code on your Home Assistant instance, so only start it on a network you trust.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
