---
title: "Play sound"
action: icloud.play_sound
domain: icloud
description: "Plays the Lost device sound on an Apple device."
related_actions:
  - icloud.display_message
  - icloud.lost_device
  - icloud.update
---

The **Play sound** action plays the Lost device sound on one of your Apple devices.

This is useful for finding a misplaced device. The device rings even when it is set to **Mute** or **Do not disturb**.

{% include actions/ui_header.md %}

To play the sound from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Apple iCloud: Play sound**.
6. Enter the **Account** and the **Device name** of the device to ring.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Account:
  description: The Apple Account username (email) the device belongs to.
  required: true
Device name:
  description: The name of the Apple device to ring, as it appears in Find My.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `icloud.play_sound`. A basic example looks like this:

{% example %}
action: |
  action: icloud.play_sound
  data:
    account: "steve@apple.com"
    device_name: "Bob's iPhone"
{% endexample %}

This rings the given device.

### Options in YAML

{% options_yaml %}
account:
  description: >
    The Apple Account username (email) the device belongs to.
  required: true
  type: string
device_name:
  description: >
    The name of the Apple device to ring, as it appears in Find My.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: ring your phone when you press a button

Use a button helper to ring your phone whenever you misplace it around the house.

- **Trigger**: A button helper is pressed
- **Action**: Apple iCloud: Play sound

{% details "YAML example for ringing a phone from a button" %}

{% example %}
automation: |
  alias: "Find my phone"
  triggers:
    - trigger: state
      entity_id: input_button.find_my_phone
  actions:
    - action: icloud.play_sound
      data:
        account: "steve@apple.com"
        device_name: "Bob's iPhone"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
