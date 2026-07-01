---
title: "Dynamic text"
action: lcn.dyn_text
domain: lcn
description: "Sends dynamic text to LCN-GTxD displays."
related_actions:
  - lcn.pck
---

This action sends a line of text to an LCN-GTxD display. The display supports four rows, and you can set each row independently with up to 60 characters encoded in UTF-8.

{% include actions/ui_header.md %}

To send dynamic text from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **LCN: Dynamic text**.
6. Select the LCN module or group in the **Device** field, choose the **Row**, and enter the **Text**.
7. Select **Save**.

This action does not support targets. Instead, you select the LCN module or group in the **Device** field.

### Options in the UI

{% options_ui %}
Device:
  description: The LCN module or group to send the command to.
  required: true
Row:
  description: The text row to set, from 1 to 4.
  required: true
Text:
  description: The text to send for the specified row, up to 60 characters.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lcn.dyn_text`. A basic example looks like this:

{% example %}
action: |
  action: lcn.dyn_text
  data:
    device_id: 91aa039a2fb6e0b9f9ec7eb219a6b7d2
    row: 1
    text: "Text in row 1"
{% endexample %}

This sets the first row of the display to "Text in row 1".

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The device ID of the LCN module or group.
  required: true
  type: string
row:
  description: >
    The text row to set, from 1 to 4.
  required: true
  type: integer
text:
  description: >
    The text to send for the specified row, up to 60 characters.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
