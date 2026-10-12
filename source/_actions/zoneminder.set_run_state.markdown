---
title: "Set run state"
action: zoneminder.set_run_state
domain: zoneminder
description: "Changes the active run state of a ZoneMinder instance."
---

Use this action to switch your ZoneMinder instance to a different run state from an automation or a script, for example to change to a "Home" run state when you arrive home.

{% include actions/ui_header.md %}

To set the run state from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **ZoneMinder: Set run state**.
6. Set the **ID** of the ZoneMinder host and the **Name** of the run state to apply.
7. Select **Save**.

This action does not support targets. You select the ZoneMinder instance through the **ID** field instead of choosing an area, device, entity, or label.

### Options in the UI

{% options_ui %}
ID:
  description: The host of the ZoneMinder instance to update.
  required: true
Name:
  description: The name of the run state to apply.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zoneminder.set_run_state`. A basic example looks like this:

{% example %}
action: |
  action: zoneminder.set_run_state
  data:
    id: ZM_HOST
    name: "Home"
{% endexample %}

This switches the ZoneMinder instance to the `Home` run state.

### Options in YAML

{% options_yaml %}
id:
  description: The host of the ZoneMinder instance to update.
  required: true
  type: string
name:
  description: The name of the run state to apply.
  required: true
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}
