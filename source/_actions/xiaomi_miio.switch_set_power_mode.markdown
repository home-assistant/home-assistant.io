---
title: "Switch set power mode"
action: xiaomi_miio.switch_set_power_mode
domain: xiaomi_miio
description: "Sets the power mode of a Xiaomi power strip."
related_actions:
  - xiaomi_miio.switch_set_power_price
---

The **Switch set power mode** action sets the power mode of a Xiaomi power strip. This action only works with power strips that support a power mode.

{% include actions/ui_header.md %}

To set the power mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Xiaomi Home: Switch set power mode**.
6. Select the **Mode**.
7. Select **Save**.

This action does not support targets. In the UI, use the **Entity ID** field to choose which Xiaomi power strip to act on. If you leave it empty, the action applies to all of them.

### Options in the UI

{% options_ui %}
Entity ID:
  description: The Xiaomi power strip to act on. If you leave this empty, all of them are affected.
Mode:
  description: "The power mode to set. Choose either green or normal."
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `xiaomi_miio.switch_set_power_mode`. A basic example looks like this:

{% example %}
action: |
  action: xiaomi_miio.switch_set_power_mode
  data:
    entity_id: switch.power_strip
    mode: green
{% endexample %}

This sets `switch.power_strip` to the green power mode.

### Options in YAML

{% options_yaml %}
entity_id:
  description: The Xiaomi power strip to act on. If you leave this out, all of them are affected.
  required: false
  type: [string, list]
mode:
  description: "The power mode to set. Choose either green or normal."
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
