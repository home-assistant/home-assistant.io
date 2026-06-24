---
title: "Reset filter life"
action: wemo.reset_filter_life
domain: wemo
description: "Resets the filter life of a WeMo humidifier to 100%."
related_actions:
  - wemo.set_humidity
---

Use this action to reset the filter lifetime of a Belkin WeMo (Holmes) Smart Humidifier back to 100%. Run it after you replace the filter on your humidifier.

{% include actions/ui_header.md %}

To reset the filter life from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the humidifier you want to control.
6. From the actions shown for that target, select **Belkin WeMo: Reset filter life**.
7. Select **Save**.

### Options in the UI

This action has no additional options beyond the target.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `wemo.reset_filter_life`. A basic example looks like this:

{% example %}
action: |
  action: wemo.reset_filter_life
  target:
    entity_id: fan.bedroom_humidifier
{% endexample %}

This resets the filter life of `fan.bedroom_humidifier` to 100%.

### Options in YAML

This action has no additional YAML options beyond the target.

{% include actions/targets.md domain="fan" %}

## Good to know

- Run this action only after you physically replace the filter, so the reported filter life stays accurate.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
