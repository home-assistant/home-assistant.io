---
title: "Set runtime value float"
action: ihc.set_runtime_value_float
domain: ihc
description: "Sets a float runtime value on the IHC controller."
related_actions:
  - ihc.set_runtime_value_bool
  - ihc.set_runtime_value_int
  - ihc.pulse
---

The **Set runtime value float** action sets a decimal runtime value on a resource of your IHC controller. This lets you write directly to an IHC resource by its ID, even when that resource is not exposed as an entity in Home Assistant.

{% include actions/ui_header.md %}

To set a float runtime value from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **IHC Controller: Set runtime value float**.
6. Enter the **IHC ID** of the resource and the float **Value** to set.
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
Value:
  description: The float value to set.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `ihc.set_runtime_value_float`. A basic example looks like this:

{% example %}
action: |
  action: ihc.set_runtime_value_float
  data:
    ihc_id: 12345
    value: 21.5
{% endexample %}

This sets the resource with ID `12345` to `21.5`.

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
value:
  description: >
    The float value to set.
  required: true
  type: float
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
