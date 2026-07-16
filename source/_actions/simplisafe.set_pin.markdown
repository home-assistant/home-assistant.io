---
title: "Set PIN"
action: simplisafe.set_pin
domain: simplisafe
description: "Sets or updates a SimpliSafe PIN."
related_actions:
  - simplisafe.remove_pin
  - simplisafe.set_system_properties
---

The **Set PIN** action adds a new PIN to your SimpliSafe system or updates an existing one. You give the PIN a label so it is easy to recognize in the SimpliSafe app, along with the PIN value people will use to arm and disarm the system.

This is handy for granting temporary access automatically, for example creating a guest PIN when a booking starts and removing it again when the stay ends.

{% include actions/ui_header.md %}

To set a PIN from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **SimpliSafe: Set PIN**.
6. Choose the **System**, then enter a **Label** and a **PIN** value.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
System:
  description: The SimpliSafe system to set the PIN on.
  required: true
Label:
  description: The label to show for this PIN in the SimpliSafe app.
  required: true
PIN:
  description: The PIN value to use.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `simplisafe.set_pin`. A basic example looks like this:

{% example %}
action: |
  action: simplisafe.set_pin
  data:
    device_id: a1b2c3d4e5f6
    label: "Guest"
    pin: "1256"
{% endexample %}

This creates or updates a PIN labeled `Guest` on the selected system.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The SimpliSafe system to set the PIN on.
  required: true
  type: string
label:
  description: >
    The label to show for this PIN in the SimpliSafe app.
  required: true
  type: string
pin:
  description: >
    The PIN value to use.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
