---
title: Remove doorbell text
action: unifiprotect.remove_doorbell_text
domain: unifiprotect
description: "Removes a custom message from a UniFi Protect doorbell."
related_actions:
  - unifiprotect.add_doorbell_text
---

With this action, you can remove a custom message from the list of texts available on your UniFi Protect doorbells. Use it to clean up messages you added earlier and no longer need.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **UniFi Protect: Remove doorbell text**.
6. Select a device from the UniFi Protect instance you want to change.
7. In the **Custom message** field, enter the exact text you want to remove.
8. Select **Save**.

### Options in the UI

{% options_ui %}
UniFi Protect NVR:
  description: Any device from the UniFi Protect instance you want to change. This matters when you have more than one Protect instance.
Custom message:
  description: The existing custom message to remove. It must match the message exactly.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `unifiprotect.remove_doorbell_text`. A basic example looks like this:

{% example %}
action: |
  action: unifiprotect.remove_doorbell_text
  data:
    device_id: 1234567890abcdef1234567890abcdef
    message: "Come in"
{% endexample %}

This removes the message "Come in" from the doorbell text options for that UniFi Protect instance.

### Options in YAML

{% options_yaml %}
device_id:
  description: The ID of any device from the UniFi Protect instance you want to change.
  required: true
  type: string
message:
  description: The existing custom message to remove. It must match the message exactly.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- The message you provide must match an existing doorbell text exactly, otherwise nothing is removed.
- Because the action targets the whole UniFi Protect instance, you only need to pick any one device from that instance.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: remove a temporary message at the end of the day

Pair this with [Add doorbell text](/actions/unifiprotect.add_doorbell_text/) to show a message during the day and remove it in the evening.

- **Trigger**: A scheduled time
- **Action**: UniFi Protect: Remove doorbell text

{% details "YAML example for removing a doorbell message on a schedule" %}

{% example %}
automation: |
  alias: "Remove the morning doorbell message"
  triggers:
    - trigger: time
      at: "18:00:00"
  actions:
    - action: unifiprotect.remove_doorbell_text
      data:
        device_id: 1234567890abcdef1234567890abcdef
        message: "Leave parcels next door"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
