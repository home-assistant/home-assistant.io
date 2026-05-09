---
title: "Dismiss message"
action: html5.dismiss_message
domain: html5
description: "Dismiss a message."
since: "2026.5"
related_actions:
  - html5.send_message
  - notify.send_message
---

The **Dismiss message** action removes messages previously delivered via HTML5 Push Notifications.

{% include actions/ui_header.md %}

To send a notification from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **HTML5 Push Notifications: Dismiss message**.
6. Under **Targets**, select the device to dismiss the message from (see [Targets](#targets)).
7. _Optional_: under **Tag**, enter the tag of the message you want to dismiss.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Tag:
  description: The tag of the notifications to dismiss. If not specified, all notifications to the selected devices will be dismissed.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `html5.dismiss_message`. A basic example looks like this:

{% example %}
action: |
  action: html5.dismiss_message
  target:
    entity_id: notify.my_desktop
  data:
    tag: "message-group-1"
{% endexample %}

### Options in YAML

{% options_yaml %}
tag:
  description: >
    The tag of the notifications to dismiss. If not specified, all notifications to the selected devices will be dismissed.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="notify" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: dismiss notification when motion is cleared

When motion in the backyard is cleared, a previously sent motion-detected notification is automatically dismissed.

- **Trigger**: Motion cleared
  - **Target**: Backyard area
- **Action**: HTML5 Push Notifications: Dismiss message
  - **Target**: My Desktop `notify.my_desktop`

{% example %}
automation: |
  triggers:
    - trigger: motion.cleared
      target:
        area_id: backyard
  actions:
    - action: html5.dismiss_message
      data:
        sequence_id: "motion-detected"
      target:
        entity_id: notify.my_desktop
{% endexample %}

{% include actions/stuck.md %}

{% include actions/related.md %}
