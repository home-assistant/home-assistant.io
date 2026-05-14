---
title: "Dismiss a message"
action: mobile_app.dismiss_message
domain: mobile_app
description: "Dismisses a previously sent message via the Mobile App."
since: "2026.5"
related_actions:
  - notify.send_message
---

The **Dismiss a message** action removes a previously sent notification from your device. This is useful for clearing alerts that are no longer relevant. For example, you can automatically dismiss a "motion detected" notification after a certain period of time.

To dismiss a message, you must have sent it with a **tag**. The **tag** is an identifier that you can use to target that specific notification later.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Mobile App: Dismiss a message**.
6. Under **Targets**, choose what you want to target:
    - To target a specific device, select the entity or device.
    - To target every device in a room, select an area.
    - To target every device on a floor, select a floor.
    - To target devices sharing a tag, select a label.
7. Under **Tag**, enter the tag of the message you want to dismiss.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Tag:
  description: The tag of the message to dismiss.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `mobile_app.dismiss_message`. A basic example looks like this:

{% example %}
action: |
  action: mobile_app.dismiss_message
  target:
    entity_id: notify.my_device
  data:
    tag: backyard-motion-detected
{% endexample %}

### Options in YAML

{% options_yaml %}
tag:
  description: The tag of the message to dismiss.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="notify" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: clear a message when a window is closed

When the kitchen window is closed, a previously sent window opened notification message with the tag `kitchen-window` is dismissed.

{% details "YAML example for dismissing a message" %}

{% example %}
automation: |
  alias: "Dismiss window opened notification when closed"
  triggers:
    trigger: window.closed
    target:
      entity_id: binary_sensor.kitchen_window
  actions:
    - action: mobile_app.dismiss_message
      target:
        entity_id: notify.my_device
      data:
        tag: "kitchen-window"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
