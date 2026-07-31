---
title: "Issue a Zigbee group command"
action: zha.issue_zigbee_group_command
domain: zha
description: "Sends a command to a Zigbee cluster on a group of devices."
related_actions:
  - zha.issue_zigbee_cluster_command
  - zha.set_zigbee_cluster_attribute
---

Use this action to send a command to a Zigbee cluster on a whole Zigbee group at once. This is a low-level tool that lets you control all members of a group with a single command, instead of addressing each device individually. You need to know the group's address, the cluster, and the command you want to send.

{% include actions/ui_header.md %}

To issue a group command from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Issue Zigbee group command**.
6. Fill in the group, cluster, command, and any arguments.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Group:
  description: The hexadecimal address of the group to send the command to.
Cluster ID:
  description: The cluster to send the command to.
Cluster type:
  description: Whether the cluster is an input (server) or output (client) cluster. Defaults to input.
  required: false
Command:
  description: The ID of the command to send.
Args:
  description: The arguments to pass to the command, as a list.
  required: false
Manufacturer:
  description: The manufacturer code to use for the command. Use -1 to force no manufacturer code.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zha.issue_zigbee_group_command`. A basic example looks like this:

{% example %}
action: |
  action: zha.issue_zigbee_group_command
  data:
    group: "0x0222"
    cluster_id: 6
    command: 1
{% endexample %}

This sends the on command of the on/off cluster to every device in the group.

### Options in YAML

{% options_yaml %}
group:
  description: The hexadecimal address of the group to send the command to.
  required: true
  type: string
cluster_id:
  description: The cluster to send the command to.
  required: true
  type: integer
cluster_type:
  description: Whether the cluster is an input (server) or output (client) cluster, set as `in` or `out`. Defaults to `in`.
  required: false
  type: string
command:
  description: The ID of the command to send.
  required: true
  type: integer
args:
  description: The arguments to pass to the command, as a list.
  required: false
  type: list
manufacturer:
  description: The manufacturer code to use for the command. Use -1 to force no manufacturer code.
  required: false
  type: integer
{% endoptions_yaml %}

## Good to know

- Only users with administrator rights can run this action.
- The group must already exist. Create Zigbee groups on the **Zigbee Home Automation** (ZHA) integration page in {% my integrations title="**Settings** > **Devices & services**" %}.
- Cluster and command IDs are specific to the device type behind the group.

{% include actions/stuck.md %}

{% include actions/related.md %}
