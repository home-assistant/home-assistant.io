---
title: Select HDMI output
action: media_player.onkyo_select_hdmi_output
domain: onkyo
description: "Switches the active HDMI output on your Onkyo, Integra, or Pioneer receiver."
---

The **Select HDMI output** action switches the active HDMI output (or output combination) on your Onkyo, Integra, or Pioneer receiver. Use it to send the picture to your main TV, a projector on a sub output, or both at once.

The output codes that work depend on your specific model, so you may need to try a few to find the right one.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Onkyo: Select HDMI output**.
6. Set the receiver entity and the HDMI output code you want.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. Instead, you set the receiver as a regular option.

### Options in the UI

{% options_ui %}
Entity:
  description: The media player entity of the receiver you want to control. You can provide more than one.
HDMI output:
  description: "The output code to switch to. One of: no, analog, yes, out, out-sub, sub, hdbaset, or both."
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `media_player.onkyo_select_hdmi_output`. A basic example looks like this:

{% example %}
action: |
  action: media_player.onkyo_select_hdmi_output
  data:
    entity_id: media_player.onkyo
    hdmi_output: out-sub
{% endexample %}

This sends the picture to the sub HDMI output.

### Options in YAML

{% options_yaml %}
entity_id:
  description: The media player entity (or entities) of the receiver you want to control.
  required: true
  type: string
hdmi_output:
  description: "The output code to switch to. One of: no, analog, yes, out, out-sub, sub, hdbaset, or both."
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- The available output codes vary by model. For example, on the TX-NR676E, `out` selects the main output, `out-sub` selects the sub output, and `sub` selects both.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
