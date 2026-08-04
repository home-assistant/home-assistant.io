---
title: "Display message"
action: icloud.display_message
domain: icloud
description: "Displays a message on an Apple device."
related_actions:
  - icloud.play_sound
  - icloud.lost_device
  - icloud.update
---

The **Display message** action shows a message on one of your Apple devices. It can also play a sound at the same time.

This is useful for getting a note to a device, for example to leave instructions on a lost device or to alert whoever has it.

{% include actions/ui_header.md %}

To display a message from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Apple iCloud: Display message**.
6. Enter the **Account**, the **Device name**, and the **Message** to show. Optionally, enable **Sound**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Account:
  description: The Apple Account username (email) the device belongs to.
  required: true
Device name:
  description: The name of the Apple device to show the message on, as it appears in Find My.
  required: true
Message:
  description: The content of the message to display.
  required: true
Sound:
  description: Play a sound when the message is displayed.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `icloud.display_message`. A basic example looks like this:

{% example %}
action: |
  action: icloud.display_message
  data:
    account: "steve@apple.com"
    device_name: "Bob's iPhone"
    message: "Time to head home!"
    sound: true
{% endexample %}

This shows the message on the device and plays a sound.

### Options in YAML

{% options_yaml %}
account:
  description: >
    The Apple Account username (email) the device belongs to.
  required: true
  type: string
device_name:
  description: >
    The name of the Apple device to show the message on, as it appears in
    Find My.
  required: true
  type: string
message:
  description: >
    The content of the message to display.
  required: true
  type: string
sound:
  description: >
    Play a sound when the message is displayed.
  required: false
  type: boolean
  default: false
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: remind a family member to come home for dinner

When dinner time arrives, show a message on a family member's phone.

- **Trigger**: A daily time trigger
- **Action**: Apple iCloud: Display message

{% details "YAML example for showing a dinner reminder" %}

{% example %}
automation: |
  alias: "Dinner reminder"
  triggers:
    - trigger: time
      at: "18:00:00"
  actions:
    - action: icloud.display_message
      data:
        account: "steve@apple.com"
        device_name: "Bob's iPhone"
        message: "Dinner is ready!"
        sound: true
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
