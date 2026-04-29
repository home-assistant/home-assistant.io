---
title: "Delete notification"
action: ntfy.delete
domain: ntfy
description: "Delete a notification from a ntfy topic."
since: "2026.2"
related_actions:
  - ntfy.publish
  - ntfy.clear
---

The **Delete notification** action deletes a notification from a ntfy topic.

To delete a notification, you must provide it's message ID or sequence ID. The sequence ID can be specified when sending a notification.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **ntfy: Delete notification**.
6. Under **Targets**, select the topic of the notification you want to delete (see [Targets](#targets)).
7. Under **Sequence ID**, enter the sequence ID or message ID of the notification you want to delete.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Sequence ID:
  description: The sequence ID or message ID of the notification to delete.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ntfy.delete`. A basic example looks like this:

{% example %}
action: |
  action: ntfy.delete
  target:
    entity_id: notify.mytopic
  data:
    sequence_id: "motion-detected"
{% endexample %}

### Options in YAML

{% options_yaml %}
sequence_id:
  description: >
    The sequence ID or message ID of the notification to delete.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="notify" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: delete notification when motion is cleared

When motion in the backyard is cleared a previously sent motion-detected notification is deleted.

- **Trigger**: Motion cleared
  - **Target**: Backyard area
- **Action**: ntfy: Delete notification
  - **Target**: ntfy topic `mytopic`

{% details "YAML example for deleting a notification when motion is cleared" %}
{% example %}
automation: |
    triggers:
    - trigger: motion.cleared
      target:
        area_id: backyard
    actions:
    - action: ntfy.delete
      data:
        sequence_id: "motion-detected"
      target:
        entity_id: notify.mytopic
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
