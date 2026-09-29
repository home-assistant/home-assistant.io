---
title: Update Audyssey
action: denonavr.update_audyssey
domain: denonavr
description: "Update the Audyssey settings on a Denon AVR receiver."
related_actions:
  - denonavr.get_command
  - denonavr.set_dynamic_eq
---

Use this action to update the Audyssey settings on your Denon AVR receiver.

{% include actions/ui_header.md %}

To update Audyssey settings from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Denon AVR media players you want to update.
6. From the actions shown for that target, select **Update Audyssey**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `denonavr.update_audyssey`. A basic example looks like this:

{% example %}
action: |
  action: denonavr.update_audyssey
  target:
    entity_id: media_player.marantz
{% endexample %}

This updates the Audyssey settings on the targeted receiver.

### Options in YAML

This action has no additional options in YAML.

## Good to know

- Updating Audyssey settings can take up to 10 seconds on some receivers.

{% include actions/targets.md domain="media_player" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
