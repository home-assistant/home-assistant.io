---
title: "Set auto-off"
action: switcher_kis.set_auto_off
domain: switcher_kis
description: "Sets the auto-off time for a Switcher power device."
---

Use this action to set the auto-off time for a Switcher power device. Once the auto-off time is reached, the device turns itself off.

{% include actions/ui_header.md %}

To set the auto-off time from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Switcher: Set auto-off**.
6. Select what you want to control. Under **By target** (see [Targets](#targets)), select your Switcher device.
7. Enter the **Auto-off** time.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Auto-off:
  description: The auto-off time as a period of hours and minutes, for example, 02:30 for two and a half hours.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `switcher_kis.set_auto_off`. A basic example looks like this:

{% example %}
action: |
  action: switcher_kis.set_auto_off
  target:
    entity_id: switch.switcher_kis_boiler
  data:
    auto_off: "02:30"
{% endexample %}

This sets the device to turn itself off after two hours and 30 minutes.

### Options in YAML

{% options_yaml %}
auto_off:
  description: >
    The auto-off time as a period of hours and minutes, for example, "02:30"
    for two and a half hours.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/targets.md domain="switch" %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
