---
title: Remove orphaned entries
action: deconz.remove_orphaned_entries
domain: deconz
description: "Clean up device and entity registry entries that deCONZ no longer provides."
related_actions:
  - deconz.configure
  - deconz.device_refresh
---

Use this action to clean up devices and {% term entities %} that are still listed in Home Assistant but are no longer provided by deCONZ. This keeps your device and entity registries in sync with deCONZ after you remove hardware.

{% important %}
Only users with administrator privileges can run this action.
{% endimportant %}

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **deCONZ: Remove orphaned entries**.
6. Fill in the options you want to use.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Bridge identifier:
  description: A unique string for each piece of deCONZ hardware. You can find it as part of the integration name. This is useful if you run multiple deCONZ integrations.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `deconz.remove_orphaned_entries`. A basic example looks like this:

{% example %}
action: |
  action: deconz.remove_orphaned_entries
{% endexample %}

This removes orphaned entries on your main deCONZ gateway.

### Options in YAML

{% options_yaml %}
bridgeid:
  description: A unique string for each piece of deCONZ hardware. You can find it as part of the integration name. This is useful if you run multiple deCONZ integrations.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- It is a good idea to run this action after restarting Home Assistant so the deCONZ integration properly mirrors what deCONZ provides.
- If you do not provide a bridge identifier and you run more than one deCONZ integration, the action uses your main deCONZ gateway.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
