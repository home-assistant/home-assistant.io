---
title: "Complete task"
action: remember_the_milk.myaccount_complete_task
domain: remember_the_milk
description: "Completes a Remember The Milk task that was created from Home Assistant."
related_actions:
  - remember_the_milk.myaccount_create_task
---

Use this action to complete a Remember The Milk task that was created from Home Assistant.

{% include actions/ui_header.md %}

To complete a Remember The Milk task from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select **Remember The Milk: Complete task**.
6. Enter the ID of the task to complete.
7. Select **Save**.

### Options in the UI

{% options_ui %}
ID:
  description: The identifier of the task to complete.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, this action uses your Remember The Milk account name in the action name. If your account name is `myaccount`, refer to this action as `remember_the_milk.myaccount_complete_task`:

{% example %}
action: |
  action: remember_the_milk.myaccount_complete_task
  data:
    id: water_plants
{% endexample %}

This completes the task with the ID `water_plants`.

### Options in YAML

{% options_yaml %}
id:
  description: The identifier of the task to complete.
  required: true
  type: string
{% endoptions_yaml %}

This action does not support targets.

## Good to know

- Replace `myaccount` in the YAML example with the account name you configured for Remember The Milk.
- This action can only complete tasks that were created from Home Assistant with an ID.

{% include actions/stuck.md %}

{% include actions/related.md %}
