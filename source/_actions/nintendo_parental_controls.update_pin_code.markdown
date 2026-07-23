---
title: "Update PIN Code"
action: nintendo_parental_controls.update_pin_code
domain: nintendo_parental_controls
description: "Updates the PIN code for a Nintendo Switch."
---

The **Update PIN Code** action changes the parental controls override PIN for a Nintendo Switch.

This is useful when you want an automation or script to change the PIN at a specific time or after something else happens in Home Assistant.

This action does not support targets. In the UI, you are not prompted to choose an area, entity, or label. Instead, you select the Nintendo Switch to update through the **Device** option.

{% include actions/ui_header.md %}

To update the PIN from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Update PIN Code**.
6. Select what you want to control. This action does not use **By target** because the Nintendo Switch is selected in the **Device** option.
7. Choose the **Device**, then enter the new **PIN**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The Nintendo Switch to update.
  required: true
PIN:
  description: The new PIN code. Enter a 4- to 8-digit PIN between 0000 and 99999999.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `nintendo_parental_controls.update_pin_code`. A basic example looks like this:

{% example %}
action: |
  action: nintendo_parental_controls.update_pin_code
  data:
    device_id: 1b4a46c6d0f3406c80d275f5b0c6483b
    pin: "1234"
{% endexample %}

This changes the parental controls override PIN for the selected Nintendo Switch to `1234`.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The ID of the Nintendo Switch device to update.
  required: true
  type: string
pin:
  description: >
    The new PIN code. Enter a 4- to 8-digit PIN between 0000 and
    99999999.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- The **Device** option must be a Nintendo Switch device from the Nintendo Switch Parental Controls integration.
- The PIN must contain only digits and be 4 to 8 digits long.
- When changing the PIN, Nintendo sends you an email automatically. Home Assistant cannot disable this email. The email does not contain the PIN.
- Entering this PIN on the Nintendo Switch bypasses all parental control restrictions.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: Change the PIN from a toggle helper

This automation changes the PIN when a user-created toggle {% term helper %} turns on. Create this helper separately before using the example.

- **Trigger**: A toggle helper turns on
- **Action**: Update PIN Code
  - **Device**: The Nintendo Switch to update
  - **PIN**: `5678`

{% details "YAML example for changing the PIN from a toggle helper" %}

{% example %}
automation: |
  alias: "Change Nintendo Switch PIN from helper"
  triggers:
    - trigger: state
      entity_id: input_boolean.change_switch_pin
      to: "on"
  actions:
    - action: nintendo_parental_controls.update_pin_code
      data:
        device_id: 1b4a46c6d0f3406c80d275f5b0c6483b
        pin: "5678"
{% endexample %}

{% enddetails %}

### Automation: Restore the usual PIN each evening

This automation restores the usual PIN at 9:00 PM each day.

- **Trigger**: Time is 9:00 PM
- **Action**: Update PIN Code
  - **Device**: The Nintendo Switch to update
  - **PIN**: `1234`

{% details "YAML example for restoring the usual PIN each evening" %}

{% example %}
automation: |
  alias: "Restore Nintendo Switch PIN in the evening"
  triggers:
    - trigger: time
      at: "21:00:00"
  actions:
    - action: nintendo_parental_controls.update_pin_code
      data:
        device_id: 1b4a46c6d0f3406c80d275f5b0c6483b
        pin: "1234"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
