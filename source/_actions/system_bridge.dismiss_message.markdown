---
title: "Dismiss message"
action: system_bridge.dismiss_message
domain: system_bridge
description: "Closes a notification sent to a System Bridge computer."
related_actions:
  - system_bridge.send_message
---

The **System Bridge: Dismiss message** action closes an open notification on a computer running Linux. Use it with the `id` returned by [Send message](/actions/system_bridge.send_message/).

{% include actions/ui_header.md %}

To close a notification from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the System Bridge notify entity that sent the notification.
6. From the actions shown for that target, select **Dismiss message**.
7. Enter the notification ID.
8. Select **Save**.

### Options in the UI

{% options_ui %}
ID:
  description: The ID returned by the **Send message** action.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `system_bridge.dismiss_message`. Use the response from `system_bridge.send_message` to identify the notification to close:

{% example %}
action: |
  action: system_bridge.dismiss_message
  target:
    entity_id: notify.my_computer
  data:
    id: "{{ notification['notify.my_computer'].id }}"
{% endexample %}

### Options in YAML

{% options_yaml %}
id:
  description: The ID returned by the `system_bridge.send_message` action.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="notify" %}

## Good to know

- This action works on Linux only.
- The action fails on Windows and macOS, or if the notification is no longer open.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
