---
title: "Stop super chlorination"
action: screenlogic.stop_super_chlorination
domain: screenlogic
description: "Stops super chlorination on a ScreenLogic gateway."
related_actions:
  - screenlogic.start_super_chlorination
  - screenlogic.set_color_mode
---

The **Stop super chlorination** action ends an ongoing super chlorination cycle on your ScreenLogic gateway. It is the counterpart to [Start super chlorination](/actions/screenlogic.start_super_chlorination/).

This is handy for cutting a shock treatment short, for example stopping it early once the chlorine level is high enough or before you plan to swim.

{% include actions/ui_header.md %}

To stop super chlorination from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Pentair ScreenLogic: Stop super chlorination**.
6. Choose the **Config entry** for your gateway.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Config entry:
  description: The ScreenLogic gateway to stop super chlorination on.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `screenlogic.stop_super_chlorination`. A basic example looks like this:

{% example %}
action: |
  action: screenlogic.stop_super_chlorination
  data:
    config_entry: YOUR_CONFIG_ENTRY_ID
{% endexample %}

This stops an ongoing super chlorination cycle.

### Options in YAML

{% options_yaml %}
config_entry:
  description: >
    The ScreenLogic gateway to stop super chlorination on.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
