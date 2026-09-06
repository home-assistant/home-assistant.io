---
title: "Set secondary filtration"
action: smarttub.set_secondary_filtration
domain: smarttub
description: "Updates the secondary filtration mode on a hot tub."
---

Use this action to update the secondary filtration mode on your hot tub.

{% include actions/ui_header.md %}

To update the secondary filtration settings from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **SmartTub: Update secondary filtration settings**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), select your hot tub's secondary filtration cycle sensor.
7. Select a **Mode**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Mode:
  description: "The secondary filtration mode: frequent, infrequent, or away."
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `smarttub.set_secondary_filtration`. A basic example looks like this:

{% example %}
action: |
  action: smarttub.set_secondary_filtration
  target:
    entity_id: sensor.jacuzzi_j_335_secondary_filtration_cycle
  data:
    mode: away
{% endexample %}

This sets the secondary filtration cycle to away mode.

### Options in YAML

{% options_yaml %}
mode:
  description: >
    The secondary filtration mode. One of `frequent`, `infrequent`, or `away`.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="sensor" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: reduce filtration when you leave home

Switch the secondary filtration to away mode when you leave home, so the hot tub filters less while no one is around to use it.

- **Trigger**: You leave home
- **Action**: SmartTub: Update secondary filtration settings

{% details "YAML example for switching to away mode when leaving home" %}

{% example %}
automation: |
  alias: "Hot tub away filtration when not home"
  triggers:
    - trigger: state
      entity_id: person.sam
      to: not_home
  actions:
    - action: smarttub.set_secondary_filtration
      target:
        entity_id: sensor.jacuzzi_j_335_secondary_filtration_cycle
      data:
        mode: away
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
