---
title: "Set target humidity"
action: wemo.set_humidity
domain: wemo
description: "Sets the target humidity on a WeMo humidifier."
related_actions:
  - wemo.reset_filter_life
---

Use this action to set the target relative humidity on a Belkin WeMo (Holmes) Smart Humidifier.

{% include actions/ui_header.md %}

To set the target humidity from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the humidifier you want to control.
6. From the actions shown for that target, select **Belkin WeMo: Set humidity**.
7. Set **Target humidity** to the relative humidity you want.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Target humidity:
  description: The target relative humidity as a percentage. The value is rounded down and mapped to one of the humidity settings the WeMo humidifier supports (45, 50, 55, 60, or 100).
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `wemo.set_humidity`. A basic example looks like this:

{% example %}
action: |
  action: wemo.set_humidity
  target:
    entity_id: fan.bedroom_humidifier
  data:
    target_humidity: 55
{% endexample %}

This sets the target humidity of `fan.bedroom_humidifier` to 55%.

### Options in YAML

{% options_yaml %}
target_humidity:
  description: The target relative humidity as a percentage. The value is rounded down and mapped to one of the humidity settings the WeMo humidifier supports (45, 50, 55, 60, or 100).
  required: true
  type: float
{% endoptions_yaml %}

{% include actions/targets.md domain="fan" %}

## Good to know

- The WeMo humidifier only supports the humidity settings 45, 50, 55, 60, and 100. Any other value you set is rounded down to the nearest supported setting.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
