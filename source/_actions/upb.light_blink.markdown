---
title: "Blink light"
action: upb.light_blink
domain: upb
description: "Starts a UPB light blinking at a set rate."
related_actions:
  - upb.light_fade_start
  - upb.light_fade_stop
---

Use this action to start a UPB light blinking. The blink rate sets how long the light stays on during each blink.

{% include actions/ui_header.md %}

To blink a light from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select your UPB light.
6. From the actions shown for that target, select **Blink light**.
7. Enter the blink rate, then select **Save**.

### Options in the UI

{% options_ui %}
Blink rate:
  description: The time in seconds that the light stays on during each blink. Allowed values are between 0 and 4.25 seconds. The UPB system limits the blink rate to no faster than a third of a second.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `upb.light_blink`. A basic example looks like this:

{% example %}
action: |
  action: upb.light_blink
  target:
    entity_id: light.kitchen
  data:
    blink_rate: 1
{% endexample %}

### Options in YAML

{% options_yaml %}
blink_rate:
  description: >
    The time in seconds that the light stays on during each blink. Allowed
    values are between 0 and 4.25 seconds. The UPB system limits the blink rate
    to no faster than a third of a second.
  required: false
  type: float
  default: 0.5
{% endoptions_yaml %}

{% include actions/targets.md domain="light" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
