---
title: "Dismiss notification"
action: ntfy.clear
domain: ntfy
description: "Dismiss a message from a ntfy topic by marking it as read."
since: "2026.2"
related_actions:
  - ntfy.publish
  - ntfy.delete
---

The **Dismiss notification** action marks a previously sent message in a **ntfy** topic as read without deleting it. This is useful when the notification no longer requires attention but should remain available for later review or reference.

To dismiss a notification, you must provide its message ID or sequence ID. The sequence ID can be specified when sending a notification.

{% include actions/ui_header.md %}

To send a notification from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **ntfy: Dismiss notification**.
6. Under **Targets**, select the topic of the notification you want to dismiss (see [Targets](#targets)).
7. Under **Sequence ID**, enter the sequence ID or message ID of the notification you want to dismiss.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Sequence ID:
  description: The sequence ID or message ID of the notification to dismiss.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ntfy.clear`. A basic example looks like this:

{% example %}
action: |
  action: ntfy.clear
  target:
    entity_id: notify.mytopic
  data:
    sequence_id: "motion-detected"
{% endexample %}

### Options in YAML

{% options_yaml %}
sequence_id:
  description: >
    The sequence ID or message ID of the notification to dismiss.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="notify" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: dismiss notification when motion is cleared

When motion in the backyard is cleared, a previously sent motion-detected notification is automatically dismissed. The notification remains available for later review.

- **Trigger**: Motion cleared
  - **Target**: Backyard area
- **Action**: ntfy: Dismiss notification
  - **Target**: ntfy topic `mytopic`

{% details "YAML example for dismissing a notification when motion is cleared" %}
{% example %}
automation: |
  triggers:
    - trigger: motion.cleared
      target:
        area_id: backyard
  actions:
    - action: ntfy.clear
      data:
        sequence_id: "motion-detected"
      target:
        entity_id: notify.mytopic
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
