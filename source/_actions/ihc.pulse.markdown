---
title: "Pulse"
action: ihc.pulse
domain: ihc
description: "Pulses an input on the IHC controller."
related_actions:
  - ihc.set_runtime_value_bool
  - ihc.set_runtime_value_int
  - ihc.set_runtime_value_float
---

The **Pulse** action sends a short pulse to a resource on your IHC controller. The resource is switched on and then off again after a 400 ms delay, which is handy for triggering inputs that expect a momentary signal.

{% include actions/ui_header.md %}

To send a pulse from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **IHC Controller: Pulse**.
6. Enter the **IHC ID** of the resource to pulse.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Controller ID:
  description: If you have multiple controllers, this is the index of your controller, starting with 0.
  required: false
IHC ID:
  description: The IHC resource ID.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ihc.pulse`. A basic example looks like this:

{% example %}
action: |
  action: ihc.pulse
  data:
    ihc_id: 12345
{% endexample %}

This sends a pulse to the resource with ID `12345`.

### Options in YAML

{% options_yaml %}
controller_id:
  description: >
    If you have multiple controllers, this is the index of your controller,
    starting with 0.
  required: false
  default: 0
  type: integer
ihc_id:
  description: >
    The IHC resource ID.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
