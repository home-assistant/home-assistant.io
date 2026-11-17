---
title: "Clear keyboard text"
action: apple_tv.clear_keyboard_text
domain: apple_tv
description: "Clears the text in the currently focused text input field on an Apple TV."
related_actions:
  - apple_tv.set_keyboard_text
  - apple_tv.append_keyboard_text
---

Use this action to clear the text in the currently focused input field on an Apple TV. This is helpful for starting a fresh search from an automation or a script.

The on-screen keyboard must be focused on the Apple TV for this action to work.

{% include actions/ui_header.md %}

To clear keyboard text from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Apple TV: Clear keyboard text**.
6. Choose the **Apple TV** you want to clear the text on.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Apple TV:
  description: The Apple TV to clear the text on.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `apple_tv.clear_keyboard_text`. A basic example looks like this:

{% example %}
action: |
  action: apple_tv.clear_keyboard_text
  data:
    config_entry_id: YOUR_CONFIG_ENTRY_ID
{% endexample %}

This clears the text in the focused input field on the selected Apple TV.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: The config entry ID of the Apple TV to clear the text on.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- You can find the `config_entry_id` under {% my integrations title="**Settings** > **Devices & services**" %} > **Apple TV** > your device. It is the last part of the URL when viewing the device page.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
