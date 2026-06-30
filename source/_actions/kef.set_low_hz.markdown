---
title: "Set the low hertz of a KEF speaker"
action: kef.set_low_hz
domain: kef
description: "Sets the subwoofer out low-pass frequency slider of a KEF speaker, in hertz."
related_actions:
  - kef.set_mode
  - kef.set_high_hz
---

Use this action to set the subwoofer out low-pass frequency slider of a KEF speaker, in hertz (Hz). This is the same slider you find in the KEF Control app.

{% include actions/ui_header.md %}

To set the low hertz from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the KEF speaker.
6. From the actions shown for that target, select **KEF: Set low Hertz**.
7. Set the **Hertz value**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Hertz value:
  description: The slider value in hertz, between 40 and 250 in steps of 5.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `kef.set_low_hz`. A basic example looks like this:

{% example %}
action: |
  action: kef.set_low_hz
  target:
    entity_id: media_player.kef_ls50
  data:
    hz_value: 80
{% endexample %}

### Options in YAML

{% options_yaml %}
hz_value:
  description: The slider value in hertz, between 40 and 250 in steps of 5.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
