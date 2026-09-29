---
title: "Set latency"
action: snapcast.set_latency
domain: snapcast
description: "Sets the latency of a Snapcast speaker."
related_actions:
  - snapcast.snapshot
  - snapcast.restore
---

The **Set latency** action adjusts the audio latency of a Snapcast speaker, in milliseconds. Use it to fine-tune the timing so a speaker stays in sync with the rest of your multi-room audio.

This is handy when one speaker sounds slightly ahead of or behind the others, for example, a speaker connected over a slower link.

{% include actions/ui_header.md %}

To set a speaker's latency from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Snapcast speaker you want to adjust.
6. From the actions shown for that target, select **Set latency**.
7. Enter the **Latency** in milliseconds.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Latency:
  description: The latency in milliseconds, from 1 to 1000.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `snapcast.set_latency`. A basic example looks like this:

{% example %}
action: |
  action: snapcast.set_latency
  target:
    entity_id: media_player.snapcast_kitchen
  data:
    latency: 100
{% endexample %}

This sets the kitchen speaker's latency to 100 milliseconds.

### Options in YAML

{% options_yaml %}
latency:
  description: >
    The latency in milliseconds, from 1 to 1000.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/targets.md domain="media_player" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
