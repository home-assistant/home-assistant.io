---
title: "Unregister webhook"
action: netatmo.unregister_webhook
domain: netatmo
description: "Manually unregisters the Netatmo webhook from the Netatmo backend."
related_actions:
  - netatmo.register_webhook
---

Use this action to manually unregister the Netatmo webhook from the Netatmo backend. This stops Netatmo from pushing instant events to Home Assistant until you register the webhook again.

{% include actions/ui_header.md %}

To unregister the webhook from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Netatmo: Unregister webhook**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `netatmo.unregister_webhook`. A basic example looks like this:

{% example %}
action: |
  action: netatmo.unregister_webhook
{% endexample %}

This unregisters the webhook from the Netatmo backend.

## Good to know

- While the webhook is unregistered, devices that rely on instant events become less responsive, since their updates arrive through regular polling instead.
- Use the **Register webhook** action again to restore instant events.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
