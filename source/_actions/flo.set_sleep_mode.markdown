---
title: "Set sleep mode"
action: flo.set_sleep_mode
domain: flo
description: "Puts a Flo by Moen device into sleep mode for a set duration."
related_actions:
  - flo.set_away_mode
  - flo.set_home_mode
  - flo.run_health_test
---

Use this action to put a Flo by Moen device into sleep mode for a set duration. While in sleep mode, Flo pauses its monitoring rules. When the duration ends, the device reverts to the mode you choose.

{% include actions/ui_header.md %}

To set sleep mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select your Flo device.
6. From the actions shown for that target, select **Set sleep mode**.
7. Enter the **Sleep minutes** and the **Revert to mode**.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Sleep minutes:
  description: How long the device stays in sleep mode, in minutes. Choose 120 (2 hours), 1440 (1 day), or 4320 (3 days).
  required: true
Revert to mode:
  description: The mode the device returns to once the sleep duration ends. Choose away or home.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `flo.set_sleep_mode`. A basic example looks like this:

{% example %}
action: |
  action: flo.set_sleep_mode
  target:
    entity_id: switch.flo_shutoff_valve
  data:
    sleep_minutes: 120
    revert_to_mode: home
{% endexample %}

This puts the device into sleep mode for 2 hours, after which it reverts to home mode.

### Options in YAML

{% options_yaml %}
sleep_minutes:
  description: >
    How long the device stays in sleep mode, in minutes. Choose 120 (2 hours),
    1440 (1 day), or 4320 (3 days).
  required: true
  type: integer
revert_to_mode:
  description: >
    The mode the device returns to once the sleep duration ends. Choose away or
    home.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="switch" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
