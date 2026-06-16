---
title: "Toggle output"
action: lcn.output_toggle
domain: lcn
description: "Toggles output port."
related_actions:
  - lcn.output_abs
  - lcn.output_rel
  - lcn.pck
---

The **Toggle output** action switches an output port on an LCN module between on and off. If the output is currently off, it turns on, and the other way around.

{% include actions/ui_header.md %}

To toggle an output port from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **LCN: Toggle output**.
6. Select the LCN module or group in the **Device** field and choose the **Output** port.
7. Select **Save**.

This action does not support targets. Instead, you select the LCN module or group through the **Device** field.

### Options in the UI

{% options_ui %}
Device:
  description: The LCN module or group to send the command to.
  required: true
Output:
  description: "The output port of the module. One of: `output1`, `output2`, `output3`, `output4`."
  required: true
Transition:
  description: The transition (ramp) time in seconds, from 0 to 486.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lcn.output_toggle`. A basic example looks like this:

{% example %}
action: |
  action: lcn.output_toggle
  data:
    device_id: 91aa039a2fb6e0b9f9ec7eb219a6b7d2
    output: output1
{% endexample %}

This toggles output port 1 of the selected module.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The device ID of the LCN module or group.
  required: true
  type: string
output:
  description: >
    The output port of the module. See [Ports](/integrations/lcn/#ports).
  required: true
  type: string
transition:
  description: >
    The transition (ramp) time in seconds, from 0 to 486.
  required: false
  default: 0
  type: float
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
