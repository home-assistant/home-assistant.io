---
title: "Issue a Zigbee cluster command"
action: zha.issue_zigbee_cluster_command
domain: zha
description: "Sends a command to a Zigbee cluster on a device."
related_actions:
  - zha.issue_zigbee_group_command
  - zha.set_zigbee_cluster_attribute
---

Use this action to send a command directly to a Zigbee cluster on a single device. This is a low-level tool for triggering device functions that aren't exposed through the regular entities. You need to know the device's IEEE address, the endpoint, the cluster, and the command you want to send.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To issue a cluster command from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Issue Zigbee cluster command**.
6. Fill in the device, endpoint, cluster, command, and any parameters.
7. Select **Save**.

### Options in the UI

{% options_ui %}
IEEE:
  description: The IEEE address of the device.
Endpoint ID:
  description: The endpoint on the device that holds the cluster.
Cluster ID:
  description: The cluster to send the command to.
Cluster type:
  description: Whether the cluster is an input (server) or output (client) cluster. Defaults to input.
  required: false
Command:
  description: The ID of the command to send.
Command type:
  description: Whether the command is a client or server command.
Params:
  description: The parameters to pass to the command, as a mapping of names to values.
  required: false
Manufacturer:
  description: The manufacturer code to use for the command. Use -1 to force no manufacturer code.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zha.issue_zigbee_cluster_command`. A basic example looks like this:

{% example %}
action: |
  action: zha.issue_zigbee_cluster_command
  data:
    ieee: "00:0d:6f:00:05:7d:2d:34"
    endpoint_id: 1
    cluster_id: 8
    command: 1
    command_type: server
    params:
      move_mode: 1
{% endexample %}

### Options in YAML

{% options_yaml %}
ieee:
  description: The IEEE address of the device.
  required: true
  type: string
endpoint_id:
  description: The endpoint on the device that holds the cluster.
  required: true
  type: integer
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
command_type:
  description: Whether the command is a `client` or `server` command.
  required: true
  type: string
params:
  description: The parameters to pass to the command, as a mapping of names to values.
  required: false
  type: map
manufacturer:
  description: The manufacturer code to use for the command. Use -1 to force no manufacturer code.
  required: false
  type: integer
{% endoptions_yaml %}

## Good to know

- You must provide the command parameters through the **Params** field.
- Cluster, command, and endpoint IDs are specific to each device. You can look them up on the device's page under **Manage clusters**.

{% include actions/stuck.md %}

{% include actions/related.md %}
