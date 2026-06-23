---
title: Add password
action: switchbot.add_password
domain: switchbot
description: "Adds a password to a SwitchBot Keypad Vision device."
---

The **Add password** action adds a password to a SwitchBot Keypad Vision device. After you add it, the password can be used to unlock the linked device on the keypad.

The password must be 6 to 12 digits long.

{% include actions/ui_header.md %}

To add a password from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **SwitchBot: Add password**.
6. Select the **Device** and enter the **Password**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The Keypad Vision device to add the password to.
  required: true
Password:
  description: A 6 to 12 digit password.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `switchbot.add_password`. A basic example looks like this:

{% example %}
action: |
  action: switchbot.add_password
  data:
    device_id: c2d01328efd261f586e56d914e3af07e
    password: "123456"
{% endexample %}

This adds the password `123456` to the selected Keypad Vision device.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The device ID of the Keypad Vision device to add the password to.
  required: true
  type: string
password:
  description: >
    A 6 to 12 digit password.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- This action is available on SwitchBot Keypad Vision devices.
- The password must be 6 to 12 digits long.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
