---
title: Set dynamic equalizer
action: denonavr.set_dynamic_eq
domain: denonavr
description: "Enable or disable the DynamicEQ setting on a Denon AVR receiver."
related_actions:
  - denonavr.get_command
  - denonavr.update_audyssey
---

Use this action to enable or disable the DynamicEQ setting on your Denon AVR receiver.

{% include actions/ui_header.md %}

To set DynamicEQ from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Denon AVR media players you want to control.
6. From the actions shown for that target, select **Set dynamic equalizer**.
7. Fill in the options you want to use.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Dynamic equalizer:
  description: Turn on to enable DynamicEQ, turn off to disable it.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `denonavr.set_dynamic_eq`. A basic example looks like this:

{% example %}
action: |
  action: denonavr.set_dynamic_eq
  target:
    entity_id: media_player.marantz
  data:
    dynamic_eq: true
{% endexample %}

This enables DynamicEQ on the targeted receiver.

### Options in YAML

{% options_yaml %}
dynamic_eq:
  description: Whether DynamicEQ should be enabled or disabled.
  required: true
  type: boolean
  default: true
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
