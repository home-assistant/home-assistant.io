---
title: "Set the subwoofer dB of a KEF speaker"
action: kef.set_sub_db
domain: kef
description: "Sets the subwoofer gain slider of a KEF speaker, in decibels."
related_actions:
  - kef.set_mode
  - kef.set_treble_db
---

Use this action to set the subwoofer gain slider of a KEF speaker, in decibels (dB). This is the same slider you find in the KEF Control app.

{% include actions/ui_header.md %}

To set the subwoofer dB from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the KEF speaker.
6. From the actions shown for that target, select **KEF: Set subwoofer dB**.
7. Set the **dB value**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
dB value:
  description: The slider value in decibels, between -10 and 10.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `kef.set_sub_db`. A basic example looks like this:

{% example %}
action: |
  action: kef.set_sub_db
  target:
    entity_id: media_player.kef_ls50
  data:
    db_value: 0
{% endexample %}

### Options in YAML

{% options_yaml %}
db_value:
  description: The slider value in decibels, between -10 and 10.
  required: true
  type: float
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
