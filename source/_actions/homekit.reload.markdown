---
title: Reload HomeKit
action: homekit.reload
domain: homekit
description: "Reloads HomeKit and reprocesses the YAML configuration."
related_actions:
  - homekit.reset_accessory
  - homekit.unpair
---

The **Reload HomeKit** action reloads the HomeKit Bridge integration and reprocesses its YAML configuration. Use it after you change YAML-defined HomeKit settings and want Home Assistant to apply those changes without a restart.

This action only reloads HomeKit instances that are defined in YAML. It does not change instances you manage from the UI.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **HomeKit Bridge: Reload HomeKit**.
6. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homekit.reload`:

{% example %}
action: |
  action: homekit.reload
{% endexample %}

This reloads HomeKit and reprocesses your YAML configuration.

### Options in YAML

This action has no additional options in YAML.

## Good to know

- Only an administrator account can run this action.
- This action reloads YAML-defined HomeKit instances only. Instances you create in the UI are not changed.
- If you have not changed your YAML, running this action does not make any visible changes.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: reload HomeKit after a scheduled YAML sync

If another process updates your HomeKit YAML before a set time, you can schedule this action so Home Assistant picks up those changes automatically.

- **Trigger**: A scheduled time
- **Action**: HomeKit Bridge: Reload HomeKit

{% details "YAML example for reloading HomeKit after a scheduled sync" %}

{% example %}
automation: |
  alias: "Reload HomeKit after nightly YAML sync"
  triggers:
    - trigger: time
      at: "03:05:00"
  actions:
    - action: homekit.reload
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
