---
title: "Lost device"
action: icloud.lost_device
domain: icloud
description: "Puts an Apple device into Lost Mode."
related_actions:
  - icloud.play_sound
  - icloud.display_message
  - icloud.update
---

The **Lost device** action puts a compatible Apple device into Lost Mode. The device shows a message and a phone number so that whoever finds it can reach you.

This is useful when a device goes missing and you want to lock it and display a way to contact you.

{% include actions/ui_header.md %}

To put a device into Lost Mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Apple iCloud: Lost device**.
6. Enter the **Account**, the **Device name**, the **Number** to call, and the **Message** to display.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Account:
  description: The Apple Account username (email) the device belongs to.
  required: true
Device name:
  description: The name of the Apple device to set to lost, as it appears in Find My.
  required: true
Number:
  description: The phone number to call from the lost device. Include the country code.
  required: true
Message:
  description: The message to display on the lost device.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `icloud.lost_device`. A basic example looks like this:

{% example %}
action: |
  action: icloud.lost_device
  data:
    account: "steve@apple.com"
    device_name: "Bob's iPhone"
    number: "+33450020100"
    message: "Please call me to return this phone."
{% endexample %}

This puts the device into Lost Mode with the given message and phone number.

### Options in YAML

{% options_yaml %}
account:
  description: >
    The Apple Account username (email) the device belongs to.
  required: true
  type: string
device_name:
  description: >
    The name of the Apple device to set to lost, as it appears in Find My.
  required: true
  type: string
number:
  description: >
    The phone number to call from the lost device. Include the country code.
  required: true
  type: string
message:
  description: >
    The message to display on the lost device.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: set a tablet to lost when it leaves home

When a device has not been home for a while, put it into Lost Mode with your contact details.

- **Trigger**: A device stays away from home for an hour
- **Action**: Apple iCloud: Lost device

{% details "YAML example for setting a device to lost" %}

{% example %}
automation: |
  alias: "Mark tablet as lost"
  triggers:
    - trigger: state
      entity_id: device_tracker.family_ipad
      to: "not_home"
      for:
        hours: 1
  actions:
    - action: icloud.lost_device
      data:
        account: "steve@apple.com"
        device_name: "Family iPad"
        number: "+33450020100"
        message: "Please call me to return this iPad."
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
