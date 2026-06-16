---
title: "Switch output turn on for"
action: elkm1.switch_output_turn_on_for
domain: elkm1
description: "Turns on an Elk-M1 output for a set duration."
---

The **Switch output turn on for** action turns on an Elk-M1 output and automatically turns it back off after the duration you set.

This is useful when you want an automation to activate an output for a fixed amount of time, for example to pulse a relay, trigger a gate, or run a siren for a few seconds.

{% include actions/targets.md domain="switch" %}

{% include actions/ui_header.md %}

To turn on an output for a set duration from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Elk-M1 Control: Switch output turn on for**.
6. Choose the Elk-M1 output, then enter the **Duration**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Duration:
  description: How long to keep the output on, from 1 second to 65535 seconds.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `elkm1.switch_output_turn_on_for`. A basic example looks like this:

{% example %}
action: |
  action: elkm1.switch_output_turn_on_for
  target:
    entity_id: switch.elkm1_output_1
  data:
    duration: "00:00:30"
{% endexample %}

This turns the selected output on for 30 seconds, then turns it back off.

### Options in YAML

{% options_yaml %}
duration:
  description: >
    How long to keep the output on, from 1 second to 65535 seconds. You can
    enter the value as a number of seconds or as a `HH:MM:SS` duration.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
