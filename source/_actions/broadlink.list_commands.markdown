---
title: "List commands"
action: broadlink.list_commands
domain: broadlink
description: "Returns the names of the devices and commands a Broadlink remote has learned."
related_actions:
  - remote.learn_command
  - remote.send_command
  - remote.delete_command
---

Use this action to get the names of the devices and commands that a Broadlink remote has learned, for example to check which commands are available before you send one. It only reads names. It doesn't send anything, and it doesn't return the IR or RF codes.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To list the learned commands from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target** (see [Targets](#targets)), select the Broadlink remote you want to read.
6. From the actions shown for that target, under **Broadlink**, select **List commands**.
7. In the **Response variable** field, enter a name to store the result in, such as `learned`. You'll use this name to read the result in later steps.
8. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `broadlink.list_commands`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: broadlink.list_commands
  target:
    entity_id: remote.bedroom
  response_variable: learned
{% endexample %}

### Options in YAML

This action has no options.

{% include actions/targets.md entity_type="Broadlink remote" example="remote.bedroom" %}

## Response data

The response has an entry for each remote you targeted, keyed by its entity ID. Each entry has `devices`, which maps the name of each learned device to the list of its command names. Devices and commands are sorted by name. A remote without learned commands returns an empty `devices`.

A shortened example of the response looks like this:

```yaml
remote.bedroom:
  devices:
    soundbar:
      - mute
      - power
    tv:
      - power
      - volume_up
```

With the action call above, `learned['remote.bedroom'].devices` contains the devices and their commands.

## Good to know

- You need permission to control the remote to use this action.
- The remote must be available. If you target a single remote that is unavailable, the action fails. If you target several remotes, the unavailable ones are left out of the response.
- A remote that is turned off can still be listed.
- The action lists what the Broadlink integration has already learned, and it only works with Broadlink remotes. It doesn't define a common set of commands for remotes. To learn commands, refer to [Learning commands](/integrations/broadlink/#learning-commands).

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
