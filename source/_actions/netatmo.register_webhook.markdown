---
title: "Register webhook"
action: netatmo.register_webhook
domain: netatmo
description: "Manually registers the Netatmo webhook with the Netatmo backend."
related_actions:
  - netatmo.unregister_webhook
---

Use this action to manually register the Netatmo webhook with the Netatmo backend. The webhook lets Netatmo push instant events to Home Assistant. Home Assistant normally registers it for you, so you only need this action to recover from a connection issue.

{% include actions/ui_header.md %}

To register the webhook from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Netatmo: Register webhook**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `netatmo.register_webhook`. A basic example looks like this:

{% example %}
action: |
  action: netatmo.register_webhook
{% endexample %}

This registers the webhook with the Netatmo backend.

## Good to know

- Home Assistant registers the webhook automatically. Use this action only to recover after a connection problem, such as when events stop arriving.
- The webhook needs your Home Assistant instance to be reachable from the internet. For more details, see the [Netatmo integration documentation](/integrations/netatmo/).

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
