---
title: "Update the DSP settings of a KEF speaker"
action: kef.update_dsp
domain: kef
description: "Refreshes all digital signal processing settings from a KEF speaker."
related_actions:
  - kef.set_mode
---

Use this action to refresh all digital signal processing (DSP) settings from a KEF speaker. The speaker updates these settings automatically every hour and after each DSP action, so you only need this action when you want the latest values right away.

{% include actions/ui_header.md %}

To update the DSP settings from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the KEF speaker.
6. From the actions shown for that target, select **KEF: Update DSP**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `kef.update_dsp`. A basic example looks like this:

{% example %}
action: |
  action: kef.update_dsp
  target:
    entity_id: media_player.kef_ls50
{% endexample %}

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md domain="media_player" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
