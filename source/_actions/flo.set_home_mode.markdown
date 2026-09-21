---
title: "Set home mode"
action: flo.set_home_mode
domain: flo
description: "Puts a Flo by Moen device into home mode."
related_actions:
  - flo.set_away_mode
  - flo.set_sleep_mode
  - flo.run_health_test
---

Use this action to put a Flo by Moen device into home mode. Home mode is the normal monitoring mode used when someone is home.

{% include actions/ui_header.md %}

To set home mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select your Flo device.
6. From the actions shown for that target, select **Set home mode**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `flo.set_home_mode`. A basic example looks like this:

{% example %}
action: |
  action: flo.set_home_mode
  target:
    entity_id: switch.flo_shutoff_valve
{% endexample %}

{% include actions/targets.md domain="switch" %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
