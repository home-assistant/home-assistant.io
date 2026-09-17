---
title: "Disable Pi-hole"
action: pi_hole.disable
domain: pi_hole
description: "Temporarily disables ad-blocking on your Pi-hole for a set amount of time."
---

Use this action to pause ad-blocking on one or more Pi-holes for a set amount of time. This is handy when a site or app misbehaves because something is being blocked, and you want to switch blocking off briefly without leaving it off for good.

{% include actions/ui_header.md %}

To disable a Pi-hole from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Pi-hole switch entity you want to disable.
6. From the actions shown for that target, select **Disable**.
7. Set the **Duration** for which the Pi-hole should stay disabled.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Duration:
  description: How long the Pi-hole stays disabled, given as a duration. Set it to `0` to keep the Pi-hole disabled until you turn it back on.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `pi_hole.disable`. A basic example looks like this:

{% example %}
action: |
  action: pi_hole.disable
  target:
    entity_id: switch.pi_hole
  data:
    duration: "00:30:00"
{% endexample %}

This disables `switch.pi_hole` for 30 minutes.

### Options in YAML

{% options_yaml %}
duration:
  description: >
    How long the Pi-hole stays disabled, given as a duration such as `"00:30:00"` for 30 minutes. Set it to `0` to keep the Pi-hole disabled until you turn it back on.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="switch" %}

## Good to know

- This action only works with Pi-hole switch entities.
- To disable every Pi-hole at once, target all Pi-hole switch entities, or use `entity_id: all`.
- You can re-enable ad-blocking at any time by turning the Pi-hole switch back on.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: pause ad-blocking for all Pi-holes

Disable every Pi-hole for five minutes when you press an input button, for example to quickly troubleshoot a blocked site.

- **Trigger**: Input button: pressed
- **Action**: Disable Pi-hole
  - **Target**: All Pi-hole switches
  - **Duration**: 5 minutes

{% details "Show example YAML" %}

{% example %}
automation: |
  - alias: "Pause ad-blocking for five minutes"
    triggers:
      - trigger: state
        entity_id: input_button.pause_pi_hole
    actions:
      - action: pi_hole.disable
        target:
          entity_id: all
        data:
          duration: "00:05:00"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
