---
title: "Send a notification message"
action: notify.send_message
domain: notify
description: "Sends a notification message to one or more notify entities."
related_actions:
  - notify.persistent_notification
  - notify.notify
---

The **Send a notification message** action sends a message to one or more notify {% term entities %}. Use it when you want an automation or script to send a message to a phone, browser, speaker, or another notification target that provides a notify entity.

This is the recommended action for notify entities. It lets you choose targets the same way you choose other Home Assistant entities: by entity, device, area, floor, or label.

{% include actions/ui_header.md %}

To send a notification from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), pick the notify entity, device, area, floor, or label that should receive the message.
6. From the actions shown for that target, select **Send a notification message**.
7. In **Message**, enter the notification text.
8. _Optional_: In **Title**, enter a title for the notification if the selected notify entity supports titles.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Message:
  description: Your notification message.
  required: true
Title:
  description: Title for your notification message. This field is shown only for notify entities that support notification titles.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `notify.send_message`. A basic example looks like this:

{% example %}
action: |
  action: notify.send_message
  target:
    entity_id: notify.my_device
  data:
    message: "The garage door has been open for 10 minutes."
{% endexample %}

This sends the message to `notify.my_device`.

### Options in YAML

{% options_yaml %}
message:
  description: >
    Your notification message.
  required: true
  type: string
title:
  description: >
    Title for your notification message. This field is used only by notify entities that support notification titles.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- The action targets notify entities. If an integration still provides only a legacy notify action, use that integration's action instead.
- The **Title** field is available only for notify entities that support titles. If the target does not support titles, Home Assistant sends the message without a title.
- After a message is sent, the notify entity state is updated to the date and time when the message was last sent.
- To show a notification in the Home Assistant interface instead, use [Send a persistent notification](/actions/notify.persistent_notification/).

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: send a notification when the garage door stays open

If the garage door stays open for 10 minutes, send a message to your phone.

- **Trigger**: State
  - **Entity**: Garage door (`binary_sensor.garage_door`)
  - **To**: On
  - **For**: 00:10:00
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Message**: The garage door has been open for 10 minutes.

{% details "YAML example for a garage door notification" %}

{% example %}
automation: |
  alias: "Notify when the garage door stays open"
  triggers:
    - trigger: state
      entity_id: binary_sensor.garage_door
      to: "on"
      for: "00:10:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          The garage door has been open for 10 minutes.
{% endexample %}

{% enddetails %}

### Automation: send a notification when someone arrives home

When a person arrives home after dark, send a short message to your device.

- **Trigger**: State
  - **Entity**: Paulus (`person.paulus`)
  - **To**: Home
- **Condition**: Sun is below horizon
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)
  - **Message**: Paulus arrived home.

{% details "YAML example for an arrival notification" %}

{% example %}
automation: |
  alias: "Notify when Paulus arrives home after dark"
  triggers:
    - trigger: state
      entity_id: person.paulus
      to: home
  conditions:
    - condition: sun
      after: sunset
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: "Paulus arrived home."
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
