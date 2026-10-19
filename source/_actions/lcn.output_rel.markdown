---
title: "Output relative brightness"
action: lcn.output_rel
domain: lcn
description: "Sets relative brightness of output port in percent."
related_actions:
  - lcn.output_abs
  - lcn.output_toggle
  - lcn.pck
---

This action changes the brightness of an output port on an LCN module by a relative amount. Use a positive value to brighten and a negative value to dim, for example to step a light up by 30%.

{% include actions/ui_header.md %}

To change the relative brightness of an output port from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **LCN: Output relative brightness**.
6. Select the LCN module or group in the **Device** field, choose the **Output** port, and set the **Brightness** change.
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
Brightness:
  description: The relative brightness in percent, from -100 to 100.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `lcn.output_rel`. A basic example looks like this:

{% example %}
action: |
  action: lcn.output_rel
  data:
    device_id: 91aa039a2fb6e0b9f9ec7eb219a6b7d2
    output: output1
    brightness: 30
{% endexample %}

This increases the brightness of output port 1 by 30%.

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
brightness:
  description: >
    The relative brightness in percent, from -100 to 100.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
