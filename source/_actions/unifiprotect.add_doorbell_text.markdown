---
title: Add doorbell text
action: unifiprotect.add_doorbell_text
domain: unifiprotect
description: "Adds a custom message that can be shown on a UniFi Protect doorbell."
related_actions:
  - unifiprotect.remove_doorbell_text
---

With this action, you can add a custom message to the list of texts available on your UniFi Protect doorbells. Once added, you can select the message on the doorbell so visitors see it on the screen.

Messages must be shorter than 30 characters.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **UniFi Protect: Add doorbell text**.
6. Select a device from the UniFi Protect instance you want to change.
7. In the **Custom message** field, enter the text to add.
8. Select **Save**.

### Options in the UI

{% options_ui %}
UniFi Protect NVR:
  description: Any device from the UniFi Protect instance you want to change. This matters when you have more than one Protect instance.
Custom message:
  description: The custom message to add. Must be shorter than 30 characters.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `unifiprotect.add_doorbell_text`. A basic example looks like this:

{% example %}
action: |
  action: unifiprotect.add_doorbell_text
  data:
    device_id: 1234567890abcdef1234567890abcdef
    message: "Come in"
{% endexample %}

This adds the message "Come in" to the doorbell text options for that UniFi Protect instance.

### Options in YAML

{% options_yaml %}
device_id:
  description: The ID of any device from the UniFi Protect instance you want to change.
  required: true
  type: string
message:
  description: The custom message to add. Must be shorter than 30 characters.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- The message is added to the list of available texts. You still select which message to show on the doorbell separately.
- Because the action targets the whole UniFi Protect instance, you only need to pick any one device from that instance.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: show a welcome message when you leave for work

Add a friendly doorbell message in the morning so deliveries see it while you are out.

- **Trigger**: A scheduled time
- **Action**: UniFi Protect: Add doorbell text

{% details "YAML example for adding a doorbell message on a schedule" %}

{% example %}
automation: |
  alias: "Add a morning doorbell message"
  triggers:
    - trigger: time
      at: "08:00:00"
  actions:
    - action: unifiprotect.add_doorbell_text
      data:
        device_id: 1234567890abcdef1234567890abcdef
        message: "Leave parcels next door"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
