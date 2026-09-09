---
title: "Set a Zigbee cluster attribute"
action: zha.set_zigbee_cluster_attribute
domain: zha
description: "Writes a value to a Zigbee cluster attribute on a device."
related_actions:
  - zha.issue_zigbee_cluster_command
  - zha.issue_zigbee_group_command
---

Use this action to write a value directly to a Zigbee cluster attribute on a device. This is a low-level tool for fine-tuning device behavior or working around device quirks that aren't exposed through the regular entities. You need to know the device's IEEE address, the endpoint, the cluster, and the attribute you want to change.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To set a cluster attribute from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Set Zigbee cluster attribute**.
6. Fill in the device, endpoint, cluster, attribute, and value.
7. Select **Save**.

### Options in the UI

{% options_ui %}
IEEE:
  description: The IEEE address of the device.
Endpoint ID:
  description: The endpoint on the device that holds the cluster.
Cluster ID:
  description: The cluster that holds the attribute.
Cluster type:
  description: Whether the cluster is an input (server) or output (client) cluster. Defaults to input.
  required: false
Attribute:
  description: The ID of the attribute to write.
Value:
  description: The value to write to the attribute.
Manufacturer:
  description: The manufacturer code to use for the write. Use -1 to force no manufacturer code.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `zha.set_zigbee_cluster_attribute`. A basic example looks like this:

{% example %}
action: |
  action: zha.set_zigbee_cluster_attribute
  data:
    ieee: "00:0d:6f:00:05:7d:2d:34"
    endpoint_id: 1
    cluster_id: 8
    attribute: 17
    value: 50
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
  description: The cluster that holds the attribute.
  required: true
  type: integer
cluster_type:
  description: Whether the cluster is an input (server) or output (client) cluster, set as `in` or `out`. Defaults to `in`.
  required: false
  type: string
attribute:
  description: The ID of the attribute to write.
  required: true
  type: integer
value:
  description: The value to write to the attribute.
  required: true
  type: integer
manufacturer:
  description: The manufacturer code to use for the write. Use -1 to force no manufacturer code.
  required: false
  type: integer
{% endoptions_yaml %}

## Good to know

- Cluster, attribute, and endpoint IDs are specific to each device. You can look them up on the device's page under **Manage clusters**.
- Writing the wrong value to an attribute can cause a device to behave unexpectedly. Double-check the values before you run the action.

{% include actions/stuck.md %}

{% include actions/related.md %}
