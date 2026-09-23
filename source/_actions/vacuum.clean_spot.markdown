---
title: Clean spot
action: vacuum.clean_spot
domain: vacuum
description: "Performs a spot cleaning at the vacuum's location."
---

The **Clean spot with vacuum cleaner** action asks the vacuum to perform a concentrated cleaning cycle at its current position.

Use it when a small area needs extra attention, like around a chair, near pet bowls, or where crumbs have just landed.

{% include actions/ui_header.md %}

To use this action from an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open or create an automation.
3. Add an action and search for **Clean spot with vacuum cleaner**.
4. Select the target vacuum, area, or group.
5. Select **Save**.

{% include actions/yaml_header.md %}

{% example %}
action: |
  action: vacuum.clean_spot
  target:
    entity_id: vacuum.office
{% endexample %}

This starts a spot clean at `vacuum.office`'s current location.

Omitting `entity_id` targets all supported vacuums.

### Options in YAML

YAML sometimes provides additional options for more complex use cases that are not available through the UI.

{% options_yaml %}
target:
  description: The vacuum, area, or group to spot clean.
  required: false
  type: map
{% endoptions_yaml %}

{% include actions/targets.md %}

## Good to know

- Not all vacuum models support spot cleaning.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: run a quick spot clean from a dashboard button

If you notice a small mess, you can trigger a dedicated spot clean without starting a full-house run. This example starts a spot clean when a helper button is pressed.

- **Trigger**: Helper button pressed
- **Action**: Clean spot
- **Target**: Office vacuum

{% details "YAML example for starting a quick spot clean" %}

{% example %}
automation: |
  alias: "Quick spot clean"
  triggers:
    - trigger: state
      entity_id: input_button.quick_spot_clean
  actions:
    - action: vacuum.clean_spot
      target:
        entity_id: vacuum.office
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
