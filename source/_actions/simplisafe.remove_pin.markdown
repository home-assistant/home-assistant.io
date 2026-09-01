---
title: "Remove PIN"
action: simplisafe.remove_pin
domain: simplisafe
description: "Removes a SimpliSafe PIN by its label or value."
related_actions:
  - simplisafe.set_pin
  - simplisafe.set_system_properties
---

The **Remove PIN** action deletes a PIN from your SimpliSafe system. You can identify the PIN to remove either by the label it shows in the SimpliSafe app or by the PIN value itself.

This is handy for cleaning up access automatically, for example removing a guest's temporary PIN once their stay ends.

{% include actions/ui_header.md %}

To remove a PIN from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **SimpliSafe: Remove PIN**.
6. Choose the **System** to remove the PIN from, and enter the **Label/PIN** to remove.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
System:
  description: The SimpliSafe system to remove the PIN from.
  required: true
Label/PIN:
  description: The label or value of the PIN to remove.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `simplisafe.remove_pin`. A basic example looks like this:

{% example %}
action: |
  action: simplisafe.remove_pin
  data:
    device_id: a1b2c3d4e5f6
    label_or_pin: "Guest"
{% endexample %}

This removes the PIN labeled `Guest` from the selected system.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The SimpliSafe system to remove the PIN from.
  required: true
  type: string
label_or_pin:
  description: >
    The label or value of the PIN to remove.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
