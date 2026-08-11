---
title: "Run health test"
action: flo.run_health_test
domain: flo
description: "Runs a health test on a Flo by Moen device."
related_actions:
  - flo.set_away_mode
  - flo.set_home_mode
  - flo.set_sleep_mode
---

Use this action to run a health test on a Flo by Moen device. The health test checks your plumbing for leaks by monitoring pressure while the valve is briefly closed.

{% include actions/ui_header.md %}

To run a health test from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select your Flo device.
6. From the actions shown for that target, select **Run health test**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `flo.run_health_test`. A basic example looks like this:

{% example %}
action: |
  action: flo.run_health_test
  target:
    entity_id: switch.flo_shutoff_valve
{% endexample %}

{% include actions/targets.md domain="switch" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
