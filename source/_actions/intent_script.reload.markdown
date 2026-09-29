---
title: Reload intent scripts
action: intent_script.reload
domain: intent_script
description: "Reloads the intent scripts from the YAML configuration."
---

The **Reload intent scripts** action reloads your intent scripts from the YAML configuration. Use it after you change your intent script configuration and want Home Assistant to apply those changes without a restart.

{% include actions/ui_header.md %}

To use this action in an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Intent Script: Reload**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `intent_script.reload`:

{% example %}
action: |
  action: intent_script.reload
{% endexample %}

This reloads your intent scripts from the YAML configuration.

### Options in YAML

This action has no additional options in YAML.

## Good to know

- Only an administrator account can run this action.
- If you have not changed your intent script configuration, running this action does not make any visible changes.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: reload intent scripts after a scheduled YAML sync

If another process updates your intent script YAML before a set time, you can schedule this action so Home Assistant picks up those changes automatically.

- **Trigger**: A scheduled time
- **Action**: Intent Script: Reload

{% details "YAML example for reloading intent scripts after a scheduled sync" %}

{% example %}
automation: |
  alias: "Reload intent scripts after nightly YAML sync"
  triggers:
    - trigger: time
      at: "03:05:00"
  actions:
    - action: intent_script.reload
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
