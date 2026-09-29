---
title: "Send a notification"
action: notify.notify
domain: notify
description: "Sends a notification message to selected targets."
related_actions:
  - notify.send_message
  - notify.persistent_notification
---

The **Send a notification** action sends a message through the legacy notify action. Use it when a notify integration has not moved to notify entities yet, or when an existing automation still uses the generic `notify.notify` action.

When possible, choose a specific notify entity and use [Send a notification message](/actions/notify.send_message/) instead. Specific targets make it clearer where the message goes.

{% include actions/ui_header.md %}

To send a notification from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Send a notification**.
6. In **Message**, enter the notification text.
7. _Optional_: In **Title**, enter a title for the notification.
8. _Optional_: Use **Target** or **Data** if the notify integration supports those fields.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Message:
  description: Message body of the notification.
  required: true
Title:
  description: Title for your notification.
  required: false
Target:
  description: Some integrations allow you to specify which recipients receive the notification. Support and accepted values depend on the notify integration.
  required: false
Data:
  description: Additional data for integrations that provide extended notification features. Support and accepted values depend on the notify integration.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `notify.notify`. A basic example looks like this:

{% example %}
action: |
  action: notify.notify
  data:
    message: "The garage door has been open for 10 minutes."
{% endexample %}

This sends a message through the first notify action Home Assistant can find.

### Options in YAML

{% options_yaml %}
message:
  description: >
    Message body of the notification.
  required: true
  type: string
title:
  description: >
    Title for your notification.
  required: false
  type: string
target:
  description: >
    Optional recipient targets. Support and accepted values depend on the notify integration.
  required: false
  type: list
data:
  description: >
    Additional data for integrations that provide extended notification features. Support and accepted values depend on the notify integration.
  required: false
  type: map
{% endoptions_yaml %}

## Good to know

- `notify.notify` is shorthand for the first notify action Home Assistant can find. It might not send the message to the place you expect.
- Prefer a specific action, such as `notify.send_message` with a notify entity, when one is available.
- The `target` and `data` fields are integration-specific. Check the documentation for the notify integration you use before adding them.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: send a generic reminder notification

Send a reminder through the generic notify action every weekday morning.

- **Trigger**: Time: 08:00
- **Condition**: Day of the week is Monday to Friday
- **Action**: Send a notification
  - **Message**: Remember to check today's calendar.

{% details "YAML example for a weekday reminder notification" %}

{% example %}
automation: |
  alias: "Send a weekday reminder notification"
  triggers:
    - trigger: time
      at: "08:00:00"
  conditions:
    - condition: time
      weekday:
        - mon
        - tue
        - wed
        - thu
        - fri
  actions:
    - action: notify.notify
      data:
        message: "Remember to check today's calendar."
{% endexample %}

{% enddetails %}

### Automation: send a generic notification when motion is detected

Send a notification when motion is detected while nobody is home.

- **Trigger**: State
  - **Entity**: Hall motion (`binary_sensor.hall_motion`)
  - **To**: On
- **Condition**: State
  - **Entity**: Paulus (`person.paulus`)
  - **State**: Not home
- **Action**: Send a notification
  - **Title**: Motion detected
  - **Message**: Hall motion was detected while nobody was home.

{% details "YAML example for a motion notification" %}

{% example %}
automation: |
  alias: "Send a motion notification when nobody is home"
  triggers:
    - trigger: state
      entity_id: binary_sensor.hall_motion
      to: "on"
  conditions:
    - condition: state
      entity_id: person.paulus
      state: not_home
  actions:
    - action: notify.notify
      data:
        title: "Motion detected"
        message: "Hall motion was detected while nobody was home."
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
