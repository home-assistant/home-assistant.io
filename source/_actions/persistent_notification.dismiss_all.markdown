---
title: Dismiss all notifications
action: persistent_notification.dismiss_all
domain: persistent_notification
description: "Removes all persistent notifications from the Home Assistant frontend."
related_actions:
  - persistent_notification.create
  - persistent_notification.dismiss
---

The **Dismiss all notifications** action removes every persistent notification from the Home Assistant frontend at once. Use it to clear the list in a single step instead of dismissing notifications one by one.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Persistent notification: Dismiss all**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `persistent_notification.dismiss_all`. A basic example looks like this:

{% example %}
action: |
  action: persistent_notification.dismiss_all
{% endexample %}

This removes all persistent notifications.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
