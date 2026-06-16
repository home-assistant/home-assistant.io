---
title: "Set away mode"
action: streamlabswater.set_away_mode
domain: streamlabswater
description: "Sets the home or away mode for a StreamLabs Water Monitor."
---

Use this action to set home or away mode for a StreamLabs Water Monitor location.

This is useful when you want an automation to switch the monitor to away mode while you are out, for example to change how it watches for water usage.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. If you have more than one location, use the **Location ID** option to choose which one to change. If you leave it empty, the first available location is used.

{% include actions/ui_header.md %}

To set the away mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **StreamLabs: Set away mode**.
6. Choose the **Away mode**. If you have more than one location, also enter the **Location ID**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Away mode:
  description: The mode to set, either `home` or `away`.
  required: true
Location ID:
  description: The location ID of the StreamLabs Water Monitor to change. Leave it empty to use the first available location.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `streamlabswater.set_away_mode`. A basic example looks like this:

{% example %}
action: |
  action: streamlabswater.set_away_mode
  data:
    away_mode: away
{% endexample %}

This sets the monitor at the first available location to away mode.

### Options in YAML

{% options_yaml %}
away_mode:
  description: >
    The mode to set, either `home` or `away`.
  required: true
  type: string
location_id:
  description: >
    The location ID of the StreamLabs Water Monitor to change. Leave it empty
    to use the first available location.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
