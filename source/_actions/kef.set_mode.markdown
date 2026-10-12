---
title: "Set the mode of a KEF speaker"
action: kef.set_mode
domain: kef
description: "Sets the digital signal processing mode of a KEF speaker."
related_actions:
  - kef.update_dsp
  - kef.set_desk_db
---

Use this action to set the digital signal processing (DSP) mode of a KEF speaker, the same way you can in the KEF Control app. Any option you leave out keeps its current value.

{% include actions/ui_header.md %}

To set the mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the KEF speaker.
6. From the actions shown for that target, select **KEF: Set mode**.
7. Set the options you want to change.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Desk mode:
  description: Turn desk mode on or off.
  required: false
Wall mode:
  description: Turn wall mode on or off.
  required: false
Phase correction:
  description: Turn phase correction on or off.
  required: false
High pass:
  description: Turn high-pass mode on or off.
  required: false
Subwoofer polarity:
  description: The subwoofer polarity, either - or +.
  required: false
Bass extension:
  description: The bass extension, either Less, Standard, or Extra.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `kef.set_mode`. A basic example looks like this:

{% example %}
action: |
  action: kef.set_mode
  target:
    entity_id: media_player.kef_ls50
  data:
    desk_mode: true
    bass_extension: Standard
{% endexample %}

### Options in YAML

{% options_yaml %}
desk_mode:
  description: Turn desk mode on or off.
  required: false
  type: boolean
  default: false
wall_mode:
  description: Turn wall mode on or off.
  required: false
  type: boolean
  default: false
phase_correction:
  description: Turn phase correction on or off.
  required: false
  type: boolean
  default: false
high_pass:
  description: Turn high-pass mode on or off.
  required: false
  type: boolean
  default: false
sub_polarity:
  description: The subwoofer polarity. Choose from - or +.
  required: false
  type: string
bass_extension:
  description: The bass extension. Choose from Less, Standard, or Extra.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

## Good to know

- Any option you leave out keeps its current value on the speaker.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
