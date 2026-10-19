---
title: "Create task"
action: remember_the_milk.my_rtm_username_create_task
domain: remember_the_milk
description: "Creates or updates a task in Remember The Milk."
---

Use this action to create a task in Remember The Milk. If you provide an ID and a task with that ID already exists, the existing task is updated instead.

{% include actions/ui_header.md %}

To create a Remember The Milk task from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Remember The Milk: `<your_rtm_username>_create_task`**.
6. In the top right, select **Menu** ({% icon "mdi:dots-vertical" %}) > **Edit in YAML**.
7. Enter this action's YAML, following [Using this action in YAML](/actions/remember_the_milk.create_task/#using-this-action-in-yaml).
8. Select **Save**.

{% include actions/yaml_header.md %}

In YAML, this action uses your Remember The Milk account name in the action name. If your username is `my_rtm_username`, refer to this action as `remember_the_milk.my_rtm_username_create_task`:

{% example %}
action: |
  action: remember_the_milk.my_rtm_username_create_task
  data:
    name: "Water the plants ^today #home"
    id: water_plants
{% endexample %}

This creates or updates the task with the ID `water_plants`.

### Options in YAML

{% options_yaml %}
name:
  description: The name of the task to create. You can use [Remember The Milk smart syntax](https://www.rememberthemilk.com/help/answer/basics-smartadd-howdoiuse) when creating a new task.
  required: true
  type: string
id:
  description: An identifier for the task. If a task with this ID already exists, the action updates the task instead of creating a new one.
  required: false
  type: string
{% endoptions_yaml %}

This action does not support targets.

## Good to know

- Replace `my_rtm_username` in the YAML example with the username you configured for Remember The Milk.
- If you do not set an ID, each action run creates a new task.
- Smart syntax is not supported when updating tasks. If the ID already exists, smart syntax commands are ignored and become normal text in the task name.
- Use the same ID with [Complete task](/actions/remember_the_milk.complete_task/) to complete the task later.

{% include actions/stuck.md %}

{% include actions/related.md %}
