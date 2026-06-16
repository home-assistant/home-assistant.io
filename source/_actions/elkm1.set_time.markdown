---
title: "Set time"
action: elkm1.set_time
domain: elkm1
description: "Sets the Elk-M1 panel clock to match Home Assistant."
related_actions:
  - elkm1.speak_phrase
  - elkm1.speak_word
---

The **Set time** action sets the clock on the Elk-M1 panel to match the current time in Home Assistant.

This is useful when you want an automation to keep the panel clock accurate, for example after a power loss or on a regular schedule.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. If you have more than one Elk-M1 panel, use the **Prefix** option to choose which panel to set.

{% include actions/ui_header.md %}

To set the panel time from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Elk-M1 Control: Set time**.
6. If you have more than one panel, enter the **Prefix** of the panel you want to set.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Prefix:
  description: The prefix that identifies which panel to set when you have more than one Elk-M1 panel configured. Leave it empty if you have a single panel.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `elkm1.set_time`. A basic example looks like this:

{% example %}
action: |
  action: elkm1.set_time
{% endexample %}

This sets the panel clock to the current Home Assistant time.

### Options in YAML

{% options_yaml %}
prefix:
  description: >
    The prefix that identifies which panel to set when you have more than one
    Elk-M1 panel configured. Leave it empty if you have a single panel.
  required: false
  type: string
  default: ""
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
