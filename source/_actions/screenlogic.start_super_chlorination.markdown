---
title: "Start super chlorination"
action: screenlogic.start_super_chlorination
domain: screenlogic
description: "Starts super chlorination on a ScreenLogic gateway."
related_actions:
  - screenlogic.stop_super_chlorination
  - screenlogic.set_color_mode
---

The **Start super chlorination** action begins a super chlorination cycle on your ScreenLogic gateway, raising the chlorine level to shock the pool. You can set how long it runs, or leave it at the default of 24 hours.

This is handy for scheduling a shock treatment automatically, for example after a busy weekend or a spell of hot weather.

{% include actions/ui_header.md %}

To start super chlorination from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Pentair ScreenLogic: Start super chlorination**.
6. Choose the **Config entry** for your gateway and, optionally, set the **Run time**.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Config entry:
  description: The ScreenLogic gateway to start super chlorination on.
  required: true
Run time:
  description: The number of hours for super chlorination to run, from 0 to 72. Defaults to 24 hours.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `screenlogic.start_super_chlorination`. A basic example looks like this:

{% example %}
action: |
  action: screenlogic.start_super_chlorination
  data:
    config_entry: YOUR_CONFIG_ENTRY_ID
    runtime: 12
{% endexample %}

This starts super chlorination for 12 hours.

### Options in YAML

{% options_yaml %}
config_entry:
  description: >
    The ScreenLogic gateway to start super chlorination on.
  required: true
  type: string
runtime:
  description: >
    The number of hours for super chlorination to run, from 0 to 72.
  required: false
  type: integer
  default: 24
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
