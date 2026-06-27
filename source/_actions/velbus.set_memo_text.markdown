---
title: "Set memo text"
action: velbus.set_memo_text
domain: velbus
description: "Shows memo text on the display of Velbus modules."
related_actions:
  - velbus.sync_clock
  - velbus.scan
  - velbus.clear_cache
---

Use this action to show memo text on the display of Velbus modules like the VMBGPO, VMBGPOD, and VMBELO. Make sure the module pages are configured to display the memo text.

{% include actions/ui_header.md %}

To set the memo text from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Velbus: Set memo text**.
6. Select the **Config entry**, enter the module **Address**, and the **Memo text** to display.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Config entry:
  description: The Velbus connection to send the command to.
  required: true
Address:
  description: The module address in decimal format. The decimal addresses are shown in front of the modules listed on the integration page.
  required: true
Memo text:
  description: The text to display, limited to 64 characters. When left empty, the memo text is cleared.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `velbus.set_memo_text`:

{% example %}
action: |
  action: velbus.set_memo_text
  data:
    config_entry: "01JGE8XB3MNPZFA836TTZ3KZ46"
    address: 65
    memo_text: "It's trash day"
{% endexample %}

This displays the text on the module with address 65.

### Options in YAML

{% options_yaml %}
config_entry:
  description: The Velbus connection to send the command to.
  required: true
  type: string
address:
  description: The module address in decimal format. The decimal addresses are shown in front of the modules listed on the integration page.
  required: true
  type: integer
memo_text:
  description: The text to display, limited to 64 characters. When left empty, the memo text is cleared.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
