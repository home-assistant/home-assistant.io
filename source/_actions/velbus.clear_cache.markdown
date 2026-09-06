---
title: "Clear cache"
action: velbus.clear_cache
domain: velbus
description: "Clears the Velbus cache and starts a new scan."
related_actions:
  - velbus.sync_clock
  - velbus.scan
  - velbus.set_memo_text
---

Use this action to clear the Velbus cache and start a new scan. Run it when you make changes to your configuration with the VelbusLink software. You can clear the cache for a single module or for all modules.

{% include actions/ui_header.md %}

To clear the cache from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Velbus: Clear cache**.
6. Select the **Config entry**. Optionally, enter a module **Address** to clear only that module.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Config entry:
  description: The Velbus connection to send the command to.
  required: true
Address:
  description: The module address in decimal format. When provided, only this module is cleared. When left empty, the whole cache is cleared. The decimal addresses are shown in front of the modules listed on the integration page.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `velbus.clear_cache`:

{% example %}
action: |
  action: velbus.clear_cache
  data:
    config_entry: "01JGE8XB3MNPZFA836TTZ3KZ46"
    address: 65
{% endexample %}

This clears the cache for the module with address 65 and then starts a new scan.

### Options in YAML

{% options_yaml %}
config_entry:
  description: The Velbus connection to send the command to.
  required: true
  type: string
address:
  description: The module address in decimal format. When provided, only this module is cleared. When left empty, the whole cache is cleared. The decimal addresses are shown in front of the modules listed on the integration page.
  required: false
  type: integer
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
