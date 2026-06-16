---
title: "Boost heating off"
action: hive.boost_heating_off
domain: hive
description: "Turns off the boost on a Hive heating zone or radiator valve."
related_actions:
  - hive.boost_heating_on
  - hive.boost_hot_water
---

The **Boost heating off** action turns off an active boost on a Hive heating zone or radiator valve. The zone returns to its schedule straight away.

{% include actions/ui_header.md %}

To turn off a heating boost from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the heating zone or radiator valve you want to stop boosting.
6. From the actions shown for that target, select **Boost heating off**.
7. Select **Save**.

### Options in the UI

This action has no additional options in the UI.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `hive.boost_heating_off`. A basic example looks like this:

{% example %}
action: |
  action: hive.boost_heating_off
  target:
    entity_id: climate.heating
{% endexample %}

This turns off the boost on `climate.heating`.

{% include actions/targets.md domain="climate" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
