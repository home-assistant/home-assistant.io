---
title: "Assume the state of a Sensibo device"
action: sensibo.assume_state
domain: sensibo
description: "Tells Sensibo whether an HVAC device is on or off without sending a command to it."
related_actions:
  - sensibo.full_state
---

An HVAC device is often also controlled by a physical remote or other means, which can put Sensibo out of sync with the device. Use this action to tell Sensibo whether the HVAC device is currently on or off, without sending a control command to the actual device.

{% include actions/ui_header.md %}

To assume a state from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Sensibo climate device.
6. From the actions shown for that target, select **Sensibo: Assume state**.
7. Select whether the device is **on** or **off**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
State:
  description: Whether the HVAC device is on or off.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `sensibo.assume_state`. A basic example looks like this:

{% example %}
action: |
  action: sensibo.assume_state
  target:
    entity_id: climate.living_room
  data:
    state: "on"
{% endexample %}

### Options in YAML

{% options_yaml %}
state:
  description: Whether the HVAC device is on or off. Choose from on or off.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="climate" %}

## Good to know

- This action only updates what Sensibo thinks the device state is. It does not turn the HVAC device on or off.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
