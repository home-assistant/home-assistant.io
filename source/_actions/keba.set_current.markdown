---
title: "Set current"
action: keba.set_current
domain: keba
description: "Sets the maximum charging current on a Keba charging station."
related_actions:
  - keba.set_energy
  - keba.set_failsafe
---

Use this action to set the maximum charging current of a Keba charging station, in amperes. This lets you limit how fast a connected car charges, for example to match the available solar power or to stay within the limits of your electrical installation.

{% include actions/ui_header.md %}

To set the maximum current from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Keba Charging Station: Set current**.
6. Enter the **Current** in amperes.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Current:
  description: The maximum charging current in amperes. Allowed values are between 6 A and 63 A. A value of 0 stops the running charging process.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `keba.set_current`. A basic example looks like this:

{% example %}
action: |
  action: keba.set_current
  data:
    current: 16
{% endexample %}

### Options in YAML

{% options_yaml %}
current:
  description: >
    The maximum charging current in amperes. Allowed values are between
    6 A and 63 A. A value of 0 stops the running charging process.
  required: true
  type: float
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: limit charging current at night

Lower the maximum charging current during off-peak hours so the car charges gently overnight.

- **Trigger**: Time, 23:00
- **Action**: Keba Charging Station: Set current

{% details "YAML example for limiting the current at night" %}

{% example %}
automation: |
  alias: "Limit charging current at night"
  triggers:
    - trigger: time
      at: "23:00:00"
  actions:
    - action: keba.set_current
      data:
        current: 10
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
